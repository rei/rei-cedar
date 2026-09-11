/**
 * Action Family — CSS Token-Assignment Template
 *
 * Defines the token-assignment pattern shared by action-family components:
 * Button, Chip, Card, ToggleButton, carousel arrows, media controls.
 *
 * ACTION intent: Interactive elements that trigger user actions, navigation,
 * content manipulation, or final submission.
 *
 * This is NOT the full component stylesheet. It generates the layer that maps
 * semantic custom properties to a component's `--cdr-{component}-*` properties.
 * Component modules remain responsible for selectors, layout, and special cases.
 *
 * The contract provides DATA (which tokens, which variants, which recipe).
 * The family template provides the SCHEMA (which slots and states must be set).
 *
 * Lives here temporarily — moves to a shared package when more families exist.
 */

import path from 'path';
import type {
  ComponentTokenContract,
  ColorSlotMap,
  InteractionState,
  ContractValue,
} from '../types';

type Role = keyof ColorSlotMap;

// ============================================================================
// BREAKPOINTS (from @rei/cdr-tokens)
// ============================================================================

const BREAKPOINTS = [
  { name: 'xs', query: '(max-width: 767px)' },
  { name: 'sm', query: '(min-width: 768px) and (max-width: 991px)' },
  { name: 'md', query: '(min-width: 992px) and (max-width: 1231px)' },
  { name: 'lg', query: '(min-width: 1232px)' },
] as const;

// ============================================================================
// VALUE RESOLUTION
// ============================================================================

/** Resolve a contract value to a CSS expression */
function cssValue(value: ContractValue): string {
  if (value.kind === 'semantic') {
    return `var(--cdr-color-${value.name}, ${cssValue(value.fallback)})`;
  }
  if (value.kind === 'literal') {
    return typeof value.value === 'number' ? String(value.value) : value.value;
  }
  return `var(--${value.name})`;
}

/** Component property name for each confirmed role */
const PROP_NAME: Record<Role, string> = {
  surface: 'background',
  text: 'text',
  border: 'border',
  icon: 'fill',
};

/** Component property name for a given role and state */
function componentProp(role: Role, state: InteractionState): string {
  const base = PROP_NAME[role];
  return state === 'rest' ? base : `${base}-${state}`;
}

/**
 * Build a semantic custom property name, honoring the omittable interaction
 * segment and the independent icon role.
 */
function semanticProp(interaction: string | undefined, role: Role, suffix: string): string {
  return interaction
    ? `--cdr-color-${interaction}-${role}-${suffix}`
    : `--cdr-color-${role}-${suffix}`;
}

/** Build a dual-value CSS expression: semantic with legacy fallback */
function dualValue(semanticVar: string, legacyToken?: string): string {
  if (!legacyToken) return `var(${semanticVar})`;
  return `var(${semanticVar}, var(--${legacyToken}))`;
}

const STATES: InteractionState[] = ['rest', 'hover', 'focus-visible', 'active', 'disabled'];

// ============================================================================
// CSS GENERATION
// ============================================================================

export function generateActionCSS(contract: ComponentTokenContract, sourcePath?: string): string {
  const cls = `.${contract.component}`;
  const p = contract.prefix;
  const sections: string[] = [];

  sections.push(header(contract, sourcePath));
  sections.push(baseRule(cls, p, contract));
  sections.push(stateRules(cls, p));
  sections.push(iconRules(cls, p));
  sections.push(variantRules(cls, p, contract));
  sections.push(sizeRules(cls, p, contract));
  sections.push(responsiveRules(cls, p, contract));

  return sections.filter(Boolean).join('\n\n') + '\n';
}

// ── Header ──────────────────────────────────────────────────────────────────

function header(contract: ComponentTokenContract, sourcePath?: string): string {
  // Prefer the real contract path: deriving filenames from the component name
  // breaks for multi-word components (e.g. cdr-fulfillment-tile lives in
  // fulfillmentTile/CdrFulfillmentTile.tokens.ts).
  const shortName = contract.component.replace(/^cdr-/, '');
  const contractFile = `Cdr${shortName[0].toUpperCase()}${shortName.slice(1)}.tokens.ts`;
  const source = sourcePath
    ? path.relative(path.join(__dirname, '..', '..', '..'), sourcePath)
    : `${shortName}/${contractFile}`;
  return [
    `/* ${'='.repeat(72)} */`,
    `/* GENERATED — ${contract.component} token assignments (action family)`,
    `/* Recipe: ${contract.recipe ?? 'pressable'}`,
    `/* Source: ${source}`,
    `/* Regenerate: pnpm build:maps`,
    `/* ${'='.repeat(72)} */`,
  ].join('\n');
}

// ── Base Rule ───────────────────────────────────────────────────────────────

function baseRule(cls: string, p: string, contract: ComponentTokenContract): string {
  const lines: string[] = [];
  lines.push(`${cls} {`);

  // Custom property defaults
  lines.push(`  /* defaults */`);
  for (const [key, value] of Object.entries(contract.defaults)) {
    lines.push(`  ${p}-${key}: ${cssValue(value)};`);
  }

  lines.push(`}`);
  return lines.join('\n');
}

// ── State Rules (token-assignment skeleton) ─────────────────────────────────

function stateRules(cls: string, p: string): string {
  return [
    `${cls}:hover {`,
    `  /* use --${p.replace(/^--/, '')}-*-hover custom properties */`,
    `}`,
    ``,
    `${cls}:focus-visible {`,
    `  /* use --${p.replace(/^--/, '')}-*-focus-visible custom properties */`,
    `}`,
    ``,
    `${cls}:active {`,
    `  /* use --${p.replace(/^--/, '')}-*-active custom properties */`,
    `}`,
    ``,
    `${cls}[disabled] {`,
    `  /* use --${p.replace(/^--/, '')}-*-disabled custom properties */`,
    `}`,
  ].join('\n');
}

// ── Icon Rules ──────────────────────────────────────────────────────────────

function iconRules(cls: string, p: string): string {
  return [
    `${cls} svg {`,
    `  width: var(${p}-icon-size);`,
    `  height: var(${p}-icon-size);`,
    `}`,
    ``,
    `${cls}${cls}--has-icon-left {`,
    `  padding-left: calc(var(${p}-icon-padding) - var(${p}-icon-gap));`,
    `}`,
    `${cls}${cls}--has-icon-right {`,
    `  padding-right: calc(var(${p}-icon-padding) - var(${p}-icon-gap));`,
    `}`,
  ].join('\n');
}

// ── Variant Rules ───────────────────────────────────────────────────────────

function variantRules(cls: string, p: string, contract: ComponentTokenContract): string {
  const legacy = contract.legacy ?? {};
  const blocks: string[] = [];

  for (const [variantName, variant] of Object.entries(contract.variants)) {
    const lines: string[] = [];
    lines.push(`${cls}--${variantName} {`);

    for (const state of STATES) {
      const slotMap = variant[state] as ColorSlotMap;
      if (!slotMap) continue;

      for (const role of ['surface', 'text', 'border', 'icon'] as Role[]) {
        const value = slotMap[role];
        if (!value) continue;
        const key = componentProp(role, state);
        const semVar =
          typeof value === 'object' && 'fullPath' in value
            ? `--cdr-color-${value.fullPath}`
            : semanticProp(contract.interaction, role, value);
        const legacyToken = legacy[`${variantName}/${key}`];
        lines.push(`  ${p}-${key}: ${dualValue(semVar, legacyToken)};`);
      }
    }

    // Extras (e.g. active-inset)
    if (variant.extras) {
      for (const [extraKey, value] of Object.entries(variant.extras)) {
        const legacyToken = legacy[`${variantName}/${extraKey}`];
        if (value) {
          lines.push(`  ${p}-${extraKey}: ${cssValue(value)};`);
        } else if (legacyToken) {
          lines.push(`  ${p}-${extraKey}: var(--${legacyToken});`);
        }
      }
    }

    lines.push(`}`);
    blocks.push(lines.join('\n'));
  }

  return blocks.join('\n\n');
}

// ── Size Rules ──────────────────────────────────────────────────────────────

function sizeBlock(
  cls: string,
  p: string,
  sizeName: string,
  dims: Record<string, ContractValue>,
  suffix = '',
): string {
  const lines: string[] = [];
  const selector = suffix ? `${cls}--${sizeName}\\@${suffix}` : `${cls}--${sizeName}`;
  lines.push(`${selector} {`);
  for (const [key, value] of Object.entries(dims)) {
    lines.push(`  ${p}-${key}: ${cssValue(value)};`);
  }
  lines.push(`  width: auto;`);
  lines.push(`}`);
  return lines.join('\n');
}

function sizeRules(cls: string, p: string, contract: ComponentTokenContract): string {
  if (!contract.sizes) return '';
  return Object.entries(contract.sizes)
    .map(([name, dims]) => sizeBlock(cls, p, name, dims))
    .join('\n\n');
}

function fullWidthBlock(cls: string, suffix = ''): string {
  const selector = suffix ? `${cls}--full-width\\@${suffix}` : `${cls}--full-width`;
  return `${selector} {\n  width: 100%;\n  justify-content: center;\n}`;
}

// ── Responsive Rules ────────────────────────────────────────────────────────

function responsiveRules(cls: string, p: string, contract: ComponentTokenContract): string {
  if (!contract.sizes) return '';

  const blocks: string[] = [];
  for (const bp of BREAKPOINTS) {
    const inner: string[] = [];
    for (const [name, dims] of Object.entries(contract.sizes)) {
      inner.push(sizeBlock(cls, p, name, dims, bp.name));
    }
    inner.push(fullWidthBlock(cls, bp.name));

    blocks.push(`@media ${bp.query} {\n${indent(inner.join('\n\n'), 2)}\n}`);
  }
  return blocks.join('\n\n');
}

function indent(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}
