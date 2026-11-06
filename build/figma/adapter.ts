import type {
  ColorSlotValue,
  ComponentTokenContract,
  ContractValue,
} from '../component-tokens/types';
import { slotVar } from '../component-tokens/naming';
import { colorsEqual } from './color';
import {
  figmaNameToCssVar,
  indexCollectionVariables,
  resolveVariable,
  FigmaResolveError,
  type ResolvedFigmaVariable,
} from './resolve';
import type { ContractTarget, FigmaComponentAdapter, FigmaDataset, FigmaVariable } from './types';
import type { TokenColorMap } from './tokens';
import { tokenCssVar } from './tokens';

export type FindingCode =
  | 'alias-mismatch'
  | 'value-mismatch'
  | 'missing-token'
  | 'missing-figma'
  | 'unmapped-figma'
  | 'legacy'
  | 'stale-legacy'
  | 'duplicate-classification'
  | 'duplicate-figma'
  | 'contract-target-missing'
  | 'unresolved-value'
  | 'missing-collection';

export interface SyncFinding {
  code: FindingCode;
  severity: 'error' | 'warning' | 'info';
  figma?: string;
  target?: string;
  expected?: string;
  actual?: string;
  message: string;
}

export interface SyncTargetResult {
  target: string;
  compare: 'alias' | 'value';
  expectedVar: string | null;
  expectedColor: string | null;
  actualAlias: string | null;
  actualColor: string | null;
  ok: boolean;
  findings: SyncFinding[];
}

export interface SyncEntryResult {
  figma: string;
  alias: string | null;
  color: string | null;
  targets: SyncTargetResult[];
  findings: SyncFinding[];
  legacy?: boolean;
}

export interface SyncReport {
  adapter: string;
  component: string;
  source: {
    fileKey: string;
    collectionId: string;
    collectionName: string;
    modeId: string | null;
  };
  ok: boolean;
  counts: {
    mappedVariables: number;
    legacyVariables: number;
    targets: number;
    okTargets: number;
    errors: number;
    warnings: number;
  };
  entries: SyncEntryResult[];
  findings: SyncFinding[];
}

function targetLabel(target: ContractTarget): string {
  return target.kind === 'slot'
    ? `${target.variant}.${target.state}.${target.role}`
    : `${target.variant}.extras.${target.extra}`;
}

export function contractTargetValue(
  contract: ComponentTokenContract,
  target: ContractTarget,
): ColorSlotValue | ContractValue | undefined {
  const variant = contract.variants[target.variant];
  if (!variant) return undefined;

  if (target.kind === 'slot') {
    return variant[target.state]?.[target.role];
  }

  const value = variant.extras?.[target.extra];
  return value ?? undefined;
}

interface ExpectedTarget {
  cssVar: string | null;
  isToken: boolean;
}

function expectedTargetCssVar(
  contract: ComponentTokenContract,
  target: ContractTarget,
  value: ColorSlotValue | ContractValue,
): ExpectedTarget {
  if (target.kind === 'slot') {
    return {
      cssVar: slotVar(contract.interaction, target.role, value as ColorSlotValue),
      isToken: true,
    };
  }

  const contractValue = value as ContractValue;
  return {
    cssVar: contractValueCssVar(contractValue),
    isToken: contractValue.kind === 'token',
  };
}

export function contractValueCssVar(value: ContractValue): string | null {
  if (value.kind === 'token') return tokenCssVar(value.name);
  if (typeof value.value !== 'string') return null;
  const match = /^var\(\s*(--[a-z0-9-]+)\s*\)$/i.exec(value.value.trim());
  return match?.[1] ?? null;
}

function errorFinding(
  code: FindingCode,
  message: string,
  extra: Partial<SyncFinding> = {},
): SyncFinding {
  return { code, severity: 'error', message, ...extra };
}

function warningFinding(
  code: FindingCode,
  message: string,
  extra: Partial<SyncFinding> = {},
): SyncFinding {
  return { code, severity: 'warning', message, ...extra };
}

function infoFinding(
  code: FindingCode,
  message: string,
  extra: Partial<SyncFinding> = {},
): SyncFinding {
  return { code, severity: 'info', message, ...extra };
}

/**
 * Compare one component adapter against Figma variables and the installed token
 * package. The adapter is intentionally read-only: it reports drift but never
 * writes to Figma or to the contract source.
 */
export function checkAdapterSync(
  adapter: FigmaComponentAdapter,
  dataset: FigmaDataset,
  tokenColors: TokenColorMap,
): SyncReport {
  const findings: SyncFinding[] = [];
  const entries: SyncEntryResult[] = [];
  const collection = dataset.collections[adapter.source.collectionId];

  if (!collection) {
    findings.push(
      errorFinding(
        'missing-collection',
        `Figma collection ${adapter.source.collectionId} (${adapter.source.name}) was not returned by the API.`,
      ),
    );
  }

  let byName: Map<string, FigmaVariable> = new Map();
  try {
    byName = indexCollectionVariables(dataset, adapter.source.collectionId);
  } catch (error) {
    findings.push(
      errorFinding('duplicate-figma', error instanceof Error ? error.message : String(error)),
    );
  }

  const sourceNames = new Set(
    [...byName.keys()].filter((name) => name.startsWith(adapter.variablePrefix)),
  );
  const bindingNames = new Set<string>();
  const legacyByName = new Map(adapter.legacy.map((entry) => [entry.figma, entry]));
  const modeId = adapter.source.modeId ?? collection?.defaultModeId ?? null;

  for (const binding of adapter.bindings) {
    if (bindingNames.has(binding.figma)) {
      findings.push(
        errorFinding(
          'duplicate-figma',
          `Adapter declares "${binding.figma}" more than once in bindings.`,
          { figma: binding.figma },
        ),
      );
    }
    bindingNames.add(binding.figma);

    if (legacyByName.has(binding.figma)) {
      findings.push(
        errorFinding(
          'duplicate-classification',
          `Adapter classifies "${binding.figma}" as both mapped and legacy.`,
          { figma: binding.figma },
        ),
      );
    }

    const variable = byName.get(binding.figma);
    if (!variable) {
      const finding = errorFinding(
        'missing-figma',
        `Figma variable "${binding.figma}" was not found in ${adapter.source.name}.`,
        { figma: binding.figma },
      );
      findings.push(finding);
      entries.push({
        figma: binding.figma,
        alias: null,
        color: null,
        targets: [],
        findings: [finding],
      });
      continue;
    }

    const entryFindings: SyncFinding[] = [];
    let resolved: ResolvedFigmaVariable;
    try {
      resolved = resolveVariable(dataset, variable.id, modeId ?? undefined);
    } catch (error) {
      const finding = errorFinding(
        'unresolved-value',
        error instanceof FigmaResolveError ? error.message : String(error),
        { figma: binding.figma },
      );
      findings.push(finding);
      entries.push({
        figma: binding.figma,
        alias: null,
        color: null,
        targets: [],
        findings: [finding],
      });
      continue;
    }

    const actualAlias = resolved.aliasName ? figmaNameToCssVar(resolved.aliasName) : null;
    const actualColor = resolved.color;
    const targetResults: SyncTargetResult[] = [];

    for (const bindingTarget of binding.targets) {
      const label = targetLabel(bindingTarget.target);
      const compare = bindingTarget.compare ?? 'alias';
      const value = contractTargetValue(adapter.contract, bindingTarget.target);
      const targetFindings: SyncFinding[] = [];

      if (!value) {
        targetFindings.push(
          errorFinding(
            'contract-target-missing',
            `The Cedar contract does not define ${adapter.component} ${label}.`,
            { figma: binding.figma, target: label },
          ),
        );
        targetResults.push({
          target: label,
          compare,
          expectedVar: null,
          expectedColor: null,
          actualAlias,
          actualColor,
          ok: false,
          findings: targetFindings,
        });
        continue;
      }

      const expected = expectedTargetCssVar(adapter.contract, bindingTarget.target, value);
      const expectedVar = expected.cssVar;
      const expectedColor = expectedVar ? (tokenColors.get(expectedVar) ?? null) : null;

      if (compare === 'alias') {
        if (!actualAlias) {
          targetFindings.push(
            errorFinding(
              'alias-mismatch',
              `Figma variable "${binding.figma}" does not alias a color token.`,
              {
                figma: binding.figma,
                target: label,
                expected: expectedVar ?? undefined,
                actual: resolved.aliasName ?? undefined,
              },
            ),
          );
        } else if (expectedVar && actualAlias !== expectedVar) {
          targetFindings.push(
            errorFinding(
              'alias-mismatch',
              `Expected ${expectedVar}, but Figma aliases ${actualAlias} (${resolved.aliasName}).`,
              {
                figma: binding.figma,
                target: label,
                expected: expectedVar,
                actual: actualAlias,
              },
            ),
          );
        }
      }

      if (expected.isToken && expectedVar && !expectedColor) {
        targetFindings.push(
          errorFinding(
            'missing-token',
            `The installed @rei/cdr-tokens package does not expose ${expectedVar}.`,
            { figma: binding.figma, target: label, expected: expectedVar },
          ),
        );
      }

      if (expectedColor) {
        if (!actualColor) {
          targetFindings.push(
            errorFinding(
              'unresolved-value',
              `Figma variable "${binding.figma}" did not resolve to a color.`,
              { figma: binding.figma, target: label, expected: expectedColor },
            ),
          );
        } else if (!colorsEqual(expectedColor, actualColor)) {
          targetFindings.push(
            errorFinding(
              'value-mismatch',
              `Expected ${expectedVar} (${expectedColor}), but Figma resolves to ${actualColor}.`,
              {
                figma: binding.figma,
                target: label,
                expected: expectedColor,
                actual: actualColor,
              },
            ),
          );
        }
      }

      targetResults.push({
        target: label,
        compare,
        expectedVar,
        expectedColor,
        actualAlias,
        actualColor,
        ok: targetFindings.length === 0,
        findings: targetFindings,
      });
      entryFindings.push(...targetFindings);
    }

    findings.push(...entryFindings);
    entries.push({
      figma: binding.figma,
      alias: resolved.aliasName ?? null,
      color: actualColor,
      targets: targetResults,
      findings: entryFindings,
    });
  }

  for (const name of sourceNames) {
    if (bindingNames.has(name) || legacyByName.has(name)) continue;
    findings.push(
      errorFinding(
        'unmapped-figma',
        `Figma variable "${name}" is not mapped to the Cedar contract and is not documented as legacy.`,
        { figma: name },
      ),
    );
  }

  for (const legacy of adapter.legacy) {
    if (sourceNames.has(legacy.figma)) {
      const finding = infoFinding(
        'legacy',
        `Legacy Figma variable "${legacy.figma}": ${legacy.reason}`,
        { figma: legacy.figma },
      );
      findings.push(finding);
      entries.push({
        figma: legacy.figma,
        alias: null,
        color: null,
        targets: [],
        findings: [finding],
        legacy: true,
      });
    } else {
      findings.push(
        warningFinding(
          'stale-legacy',
          `Legacy entry "${legacy.figma}" no longer exists in Figma; remove it from the adapter.`,
          { figma: legacy.figma },
        ),
      );
    }
  }

  const errors = findings.filter((finding) => finding.severity === 'error').length;
  const warnings = findings.filter((finding) => finding.severity === 'warning').length;
  const targets = entries.reduce((sum, entry) => sum + entry.targets.length, 0);
  const okTargets = entries.reduce(
    (sum, entry) => sum + entry.targets.filter((target) => target.ok).length,
    0,
  );

  return {
    adapter: adapter.id,
    component: adapter.component,
    source: {
      fileKey: adapter.source.fileKey,
      collectionId: adapter.source.collectionId,
      collectionName: collection?.name ?? adapter.source.name,
      modeId,
    },
    ok: errors === 0,
    counts: {
      mappedVariables: adapter.bindings.length,
      legacyVariables: adapter.legacy.length,
      targets,
      okTargets,
      errors,
      warnings,
    },
    entries,
    findings,
  };
}
