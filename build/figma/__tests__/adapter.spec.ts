import { describe, expect, it } from 'vitest';
import { checkAdapterSync, contractTargetValue } from '../adapter';
import buttonAdapter from '../adapters/button';
import { mergeFigmaDatasets, figmaNameToCssVar } from '../resolve';
import { parseTokenColors } from '../tokens';
import type { FigmaComponentAdapter, FigmaDataset, FigmaValue, FigmaVariable } from '../types';
import type { ComponentTokenContract } from '../../component-tokens/types';
import { token } from '../../component-tokens/types';

const SOURCE_COLLECTION = 'VariableCollectionId:test-source';
const SEMANTIC_COLLECTION = 'VariableCollectionId:test-semantics';

const contract: ComponentTokenContract = {
  component: 'cdr-test',
  prefix: '--cdr-test',
  interaction: 'action',
  defaults: {},
  variants: {
    primary: {
      identity: 'brand',
      rest: {
        surface: 'brand',
        text: 'neutral-faint',
        border: 'brand',
        icon: 'neutral-faint',
      },
      active: {
        surface: 'brand',
        text: 'neutral-faint',
        border: 'brand',
        icon: 'neutral-faint',
      },
      extras: { 'active-inset': token('cdr-action-surface-brand-faint') },
    },
  },
};

const miniAdapter: FigmaComponentAdapter = {
  id: 'test',
  component: 'cdr-test',
  source: {
    fileKey: 'source',
    collectionId: SOURCE_COLLECTION,
    name: 'Test source',
  },
  libraryFileKeys: ['semantics'],
  variablePrefix: 'button/',
  contract,
  bindings: [
    {
      figma: 'button/primary/surface',
      targets: [
        { target: { kind: 'slot', variant: 'primary', state: 'rest', role: 'surface' } },
        { target: { kind: 'slot', variant: 'primary', state: 'active', role: 'surface' } },
      ],
    },
    {
      figma: 'button/primary/text',
      targets: [
        { target: { kind: 'slot', variant: 'primary', state: 'rest', role: 'text' } },
        {
          target: { kind: 'slot', variant: 'primary', state: 'rest', role: 'icon' },
          compare: 'value',
        },
      ],
    },
    {
      figma: 'button/primary/surround-surface-active',
      targets: [{ target: { kind: 'extra', variant: 'primary', extra: 'active-inset' } }],
    },
  ],
  legacy: [{ figma: 'button/legacy/surface', reason: 'not rendered' }],
};

const tokenColors = new Map([
  ['--cdr-action-surface-brand', '#143528'],
  ['--cdr-action-surface-brand-faint', '#bfddca'],
  ['--cdr-action-text-neutral-faint', '#f7f7f5'],
  ['--cdr-action-icon-neutral-faint', '#f7f7f5'],
]);

function color(hex: string): FigmaValue {
  const value = hex.replace('#', '');
  return {
    r: Number.parseInt(value.slice(0, 2), 16) / 255,
    g: Number.parseInt(value.slice(2, 4), 16) / 255,
    b: Number.parseInt(value.slice(4, 6), 16) / 255,
    a: 1,
  };
}

function variable(
  id: string,
  name: string,
  collectionId: string,
  value: FigmaValue,
): FigmaVariable {
  return {
    id,
    name,
    variableCollectionId: collectionId,
    resolvedType: 'COLOR',
    valuesByMode: { 'mode:light': value },
  };
}

function alias(id: string): FigmaValue {
  return { type: 'VARIABLE_ALIAS', id };
}

function dataset(variables: FigmaVariable[]): FigmaDataset {
  return {
    collections: {
      [SOURCE_COLLECTION]: {
        id: SOURCE_COLLECTION,
        name: 'Test source',
        defaultModeId: 'mode:light',
        modes: [{ modeId: 'mode:light', name: 'light' }],
      },
    },
    variables: Object.fromEntries(variables.map((entry) => [entry.id, entry])),
  };
}

function standardVariables(): FigmaVariable[] {
  return [
    variable('sem-surface', 'color/action/surface/brand', SEMANTIC_COLLECTION, color('#143528')),
    variable(
      'sem-brand-faint',
      'color/action/surface/brand-faint',
      SEMANTIC_COLLECTION,
      color('#bfddca'),
    ),
    variable('sem-text', 'color/action/text/neutral-faint', SEMANTIC_COLLECTION, color('#f7f7f5')),
    variable('button-surface', 'button/primary/surface', SOURCE_COLLECTION, alias('sem-surface')),
    variable('button-text', 'button/primary/text', SOURCE_COLLECTION, alias('sem-text')),
    variable(
      'button-surround',
      'button/primary/surround-surface-active',
      SOURCE_COLLECTION,
      alias('sem-brand-faint'),
    ),
    variable('legacy-surface', 'button/legacy/surface', SOURCE_COLLECTION, color('#ffffff')),
  ];
}

describe('Figma → Cedar adapter', () => {
  it('merges datasets from the source file and its variable libraries', () => {
    const source = dataset(standardVariables());
    const semantic = {
      collections: {},
      variables: {
        'library-only': variable(
          'library-only',
          'color/action/surface/brand',
          SEMANTIC_COLLECTION,
          color('#143528'),
        ),
      },
    };
    const merged = mergeFigmaDatasets(source, semantic);
    expect(merged.variables['library-only']).toBeDefined();
  });

  it('passes when aliases and values match the Cedar contract', () => {
    const report = checkAdapterSync(miniAdapter, dataset(standardVariables()), tokenColors);

    expect(report.ok).toBe(true);
    expect(report.counts.errors).toBe(0);
    expect(report.counts.targets).toBe(5);
    expect(report.counts.okTargets).toBe(5);
    expect(report.findings.find((finding) => finding.code === 'legacy')).toBeDefined();
  });

  it('compares icon slots by value when Figma deliberately uses a text role', () => {
    const report = checkAdapterSync(miniAdapter, dataset(standardVariables()), tokenColors);
    const textEntry = report.entries.find((entry) => entry.figma === 'button/primary/text');
    const iconTarget = textEntry?.targets.find((target) => target.target === 'primary.rest.icon');

    expect(iconTarget?.compare).toBe('value');
    expect(iconTarget?.expectedColor).toBe('#f7f7f5');
    expect(iconTarget?.ok).toBe(true);
  });

  it('reports an alias mismatch without failing value comparison', () => {
    const variables = standardVariables().map((entry) =>
      entry.id === 'button-text'
        ? {
            ...entry,
            valuesByMode: { 'mode:light': alias('sem-wrong-text') },
          }
        : entry,
    );
    variables.push(
      variable(
        'sem-wrong-text',
        'color/action/text/neutral-trace',
        SEMANTIC_COLLECTION,
        color('#f7f7f5'),
      ),
    );

    const report = checkAdapterSync(miniAdapter, dataset(variables), tokenColors);
    const finding = report.findings.find((entry) => entry.code === 'alias-mismatch');

    expect(finding?.target).toBe('primary.rest.text');
    expect(finding?.actual).toBe('--cdr-action-text-neutral-trace');
    expect(report.findings.some((entry) => entry.code === 'value-mismatch')).toBe(false);
  });

  it('reports a value mismatch when the alias name matches but the color drifts', () => {
    const variables = standardVariables().map((entry) =>
      entry.id === 'sem-surface'
        ? { ...entry, valuesByMode: { 'mode:light': color('#000000') } }
        : entry,
    );

    const report = checkAdapterSync(miniAdapter, dataset(variables), tokenColors);
    const finding = report.findings.find((entry) => entry.code === 'value-mismatch');

    expect(finding?.actual).toBe('#000000');
    expect(finding?.expected).toBe('#143528');
    expect(report.ok).toBe(false);
  });

  it('reports missing, unmapped, and stale legacy variables', () => {
    const variables = standardVariables().filter((entry) => entry.id !== 'button-surface');
    variables.push(
      variable('button-unknown', 'button/unknown/surface', SOURCE_COLLECTION, color('#ffffff')),
    );

    const report = checkAdapterSync(
      {
        ...miniAdapter,
        legacy: [
          ...miniAdapter.legacy,
          { figma: 'button/removed/surface', reason: 'removed from Figma' },
        ],
      },
      dataset(variables),
      tokenColors,
    );

    expect(report.findings.some((entry) => entry.code === 'missing-figma')).toBe(true);
    expect(report.findings.some((entry) => entry.code === 'unmapped-figma')).toBe(true);
    expect(report.findings.some((entry) => entry.code === 'stale-legacy')).toBe(true);
    expect(report.ok).toBe(false);
  });

  it('keeps the button adapter fully classified and contract-backed', () => {
    const names = [
      ...buttonAdapter.bindings.map((binding) => binding.figma),
      ...buttonAdapter.legacy.map((entry) => entry.figma),
    ];

    expect(new Set(names).size).toBe(names.length);
    expect(names.every((name) => name.startsWith(buttonAdapter.variablePrefix))).toBe(true);

    for (const binding of buttonAdapter.bindings) {
      expect(binding.targets.length).toBeGreaterThan(0);
      for (const target of binding.targets) {
        expect(contractTargetValue(buttonAdapter.contract, target.target)).toBeDefined();
      }
    }
  });

  it('converts Figma color variable names to Cedar custom properties', () => {
    expect(figmaNameToCssVar('color/action/surface/brand')).toBe('--cdr-action-surface-brand');
    expect(figmaNameToCssVar('color/action/text/neutral-faint')).toBe(
      '--cdr-action-text-neutral-faint',
    );
    expect(figmaNameToCssVar('color/warm-grey-250')).toBe('--cdr-warm-grey-250');
    expect(figmaNameToCssVar('button/primary/surface')).toBeNull();
  });

  it('parses only color declarations from the token CSS', () => {
    const parsed = parseTokenColors(`
      :root {
        --cdr-action-surface-brand: #143528;
        --cdr-action-surface-brand: oklch(29.971% 0.0459 165.16);
        --cdr-space-one-x: 0.8rem;
      }
    `);
    expect(parsed.get('--cdr-action-surface-brand')).toBe('#143528');
    expect(parsed.has('--cdr-space-one-x')).toBe(false);
  });
});
