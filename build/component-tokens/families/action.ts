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

import type { ComponentTokenContract, ContractValue } from '../types';
import { explicitSlots, propKey, slotVar } from '../naming';

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
  if (value.kind === 'literal') {
    return typeof value.value === 'number' ? String(value.value) : value.value;
  }
  return `var(--${value.name})`;
}

/** Build a dual-value CSS expression: semantic with legacy fallback */
function dualValue(semanticVar: string, legacyToken?: string): string {
  if (!legacyToken) return `var(${semanticVar})`;
  return `var(${semanticVar}, var(--${legacyToken}))`;
}

// ============================================================================
// CSS GENERATION
// ============================================================================

export function generateActionCSS(contract: ComponentTokenContract, source: string): string {
  const cls = `.${contract.component}`;
  const p = contract.prefix;
  const sections: string[] = [];

  sections.push(header(contract, source));
  sections.push(baseRule(cls, p, contract));
  sections.push(iconRules(cls, p));
  sections.push(variantRules(cls, p, contract));
  sections.push(sizeRules(cls, p, contract));
  sections.push(responsiveRules(cls, p, contract));

  return sections.filter(Boolean).join('\n\n') + '\n';
}

// ── Header ──────────────────────────────────────────────────────────────────

function header(contract: ComponentTokenContract, source: string): string {
  return [
    `/* ${'='.repeat(72)} */`,
    `/* GENERATED — ${contract.component} token assignments (action family)`,
    `/* Recipe: ${contract.recipe ?? 'pressable'}`,
    `/* Source: ${source}`,
    `/* Regenerate: npx tsx build/generate-component-maps.ts`,
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

    for (const { state, role, value } of explicitSlots(variant)) {
      const key = propKey(role, state);
      const semVar = slotVar(contract.interaction, role, value);
      const legacyToken = legacy[`${variantName}/${key}`];
      lines.push(`  ${p}-${key}: ${dualValue(semVar, legacyToken)};`);
    }

    // Extras (e.g. active-inset)
    if (variant.extras) {
      for (const extraKey of Object.keys(variant.extras)) {
        const legacyToken = legacy[`${variantName}/${extraKey}`];
        if (legacyToken) {
          lines.push(`  ${p}-${extraKey}: var(--${legacyToken});`);
        } else {
          console.warn(`  ⚠ ${variantName}/${extraKey}: extra has no legacy entry and is omitted`);
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
