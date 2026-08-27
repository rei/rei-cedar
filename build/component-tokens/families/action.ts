/**
 * Action Family — CSS Behavior Template
 *
 * Defines the structural CSS pattern shared by action-family components:
 * Button, Chip, Card, ToggleButton.
 *
 * Pattern: rest state has base colors; hover thickens border + adds elevation;
 * active adds inset ring; disabled grays out.
 *
 * The family template is combined with a component's token contract to produce
 * complete CSS. The contract provides the DATA (which tokens, which variants);
 * the template provides the BEHAVIOR (how states work, how box-shadow is built).
 *
 * Lives here temporarily — moves to a shared package when more families exist.
 */

import type { ComponentTokenContract } from '../types';

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

/** Resolve a contract default value to a CSS expression */
function cssValue(value: string | number): string {
  if (typeof value === 'number') return String(value);
  if (value.startsWith('cdr-')) return `var(--${value})`;
  return value;
}

/** Build a semantic custom property name from intent + CSS depth + suffix */
function semanticProp(intent: string, cssDepth: string, suffix: string): string {
  return `--cdr-color-${intent}-${cssDepth}-${suffix}`;
}

/** Build a dual-value CSS expression: semantic with legacy fallback */
function dualValue(semanticVar: string, legacyToken?: string): string {
  if (!legacyToken) return `var(${semanticVar})`;
  return `var(${semanticVar}, var(--${legacyToken}))`;
}

const CSS_DEPTH: Record<string, string> = { bg: 'surface', fg: 'text', edge: 'border' };
const PROP_NAME: Record<string, string> = {
  bg: 'background',
  fg: 'text',
  edge: 'border',
  fill: 'fill',
};
const STATES = ['rest', 'hover', 'active', 'disabled'] as const;

function propKey(depth: string, state: string): string {
  const name = PROP_NAME[depth] ?? depth;
  return state === 'rest' ? name : `${name}-${state}`;
}

// ============================================================================
// CSS GENERATION
// ============================================================================

export function generateActionCSS(contract: ComponentTokenContract): string {
  const cls = `.${contract.component}`;
  const p = contract.prefix;
  const sections: string[] = [];

  sections.push(header(contract));
  sections.push(baseRule(cls, p, contract));
  sections.push(stateRules(cls, p));
  sections.push(iconRules(cls, p));
  sections.push(variantRules(cls, p, contract));
  sections.push(sizeRules(cls, p, contract));
  sections.push(responsiveRules(cls, p, contract));

  return sections.filter(Boolean).join('\n\n') + '\n';
}

// ── Header ──────────────────────────────────────────────────────────────────

function header(contract: ComponentTokenContract): string {
  return [
    `/* ${'='.repeat(72)} */`,
    `/* GENERATED — ${contract.component} (action family)`,
    `/* Source: ${contract.component.replace('cdr-', '')}/CdrButton.tokens.ts`,
    `/* Regenerate: npx tsx build/generate-component-maps.ts`,
    `/* ${'='.repeat(72)} */`,
  ].join('\n');
}

// ── Base Rule ───────────────────────────────────────────────────────────────

function baseRule(cls: string, p: string, contract: ComponentTokenContract): string {
  const lines: string[] = [];
  lines.push(`${cls} {`);

  // CSS resets
  lines.push(`  /* resets */`);
  lines.push(`  border: none;`);
  lines.push(`  cursor: pointer;`);
  lines.push(`  display: inline-flex;`);
  lines.push(`  font-style: normal;`);
  lines.push(`  outline: none;`);
  lines.push(`  overflow: visible;`);
  lines.push(`  margin: 0;`);
  lines.push(`  text-align: left;`);
  lines.push(`  text-decoration: none;`);
  lines.push(`  text-transform: none;`);
  lines.push(`  vertical-align: middle;`);
  lines.push(``);

  // Custom property defaults
  lines.push(`  /* defaults */`);
  for (const [key, value] of Object.entries(contract.defaults)) {
    lines.push(`  ${p}-${key}: ${cssValue(value)};`);
  }
  lines.push(``);

  // Applied properties
  lines.push(`  /* applied */`);
  lines.push(`  border-radius: var(${p}-radius);`);
  lines.push(`  font-family: var(${p}-font-family);`);
  lines.push(`  font-weight: var(${p}-font-weight);`);
  lines.push(`  letter-spacing: var(${p}-letter-spacing);`);
  lines.push(`  font-size: var(${p}-font-size);`);
  lines.push(`  line-height: var(${p}-line-height);`);
  lines.push(`  padding: var(${p}-padding);`);
  lines.push(`  background-color: var(${p}-background);`);
  lines.push(`  color: var(${p}-text);`);
  lines.push(`  fill: var(${p}-fill);`);
  lines.push(`  box-shadow:`);
  lines.push(`    inset 0 0 0 1px var(${p}-border),`);
  lines.push(`    var(${p}-elevation);`);
  lines.push(`  transition:`);
  lines.push(`    box-shadow var(${p}-transition-duration) var(${p}-transition-timing),`);
  lines.push(`    background-color var(${p}-transition-duration) var(${p}-transition-timing),`);
  lines.push(`    color var(${p}-transition-duration) var(${p}-transition-timing),`);
  lines.push(`    fill var(${p}-transition-duration) var(${p}-transition-timing);`);

  lines.push(`}`);
  return lines.join('\n');
}

// ── State Rules ─────────────────────────────────────────────────────────────

function stateRules(cls: string, p: string): string {
  const sections: string[] = [];

  // Hover / Focus
  sections.push(
    [
      `${cls}:hover,`,
      `${cls}:focus {`,
      `  outline: none;`,
      `  outline-offset: 0;`,
      `  text-decoration: none;`,
      `  background-color: var(${p}-background-hover, var(${p}-background));`,
      `  color: var(${p}-text-hover, var(${p}-text));`,
      `  fill: var(${p}-fill-hover, var(${p}-fill));`,
      `  box-shadow:`,
      `    inset 0 0 0 3px var(${p}-border-hover, var(${p}-border)),`,
      `    var(${p}-elevation-hover);`,
      `}`,
    ].join('\n'),
  );

  // Active
  sections.push(
    [
      `${cls}:active {`,
      `  outline: none;`,
      `  background-color: var(${p}-background-active, var(${p}-background));`,
      `  color: var(${p}-text-active, var(${p}-text));`,
      `  fill: var(${p}-fill-active, var(${p}-fill));`,
      `  box-shadow:`,
      `    inset 0 0 0 3px var(${p}-border-active, var(${p}-border)),`,
      `    inset 0 0 0 5px var(${p}-active-inset, transparent),`,
      `    var(${p}-elevation-active);`,
      `}`,
    ].join('\n'),
  );

  // Disabled
  sections.push(
    [
      `${cls}[disabled] {`,
      `  cursor: not-allowed;`,
      `  background-color: var(${p}-background-disabled, var(${p}-background));`,
      `  color: var(${p}-text-disabled, var(${p}-text));`,
      `  fill: var(${p}-fill-disabled, var(${p}-fill));`,
      `  box-shadow: inset 0 0 0 1px var(${p}-border-disabled, var(${p}-border));`,
      `}`,
    ].join('\n'),
  );

  return sections.join('\n\n');
}

// ── Icon Rules ──────────────────────────────────────────────────────────────

function iconRules(cls: string, p: string): string {
  return [
    `${cls} svg {`,
    `  align-self: center;`,
    `  fill: inherit;`,
    `  width: var(${p}-icon-size);`,
    `  height: var(${p}-icon-size);`,
    `}`,
    ``,
    `${cls}${cls}--has-icon-left {`,
    `  padding-left: calc(var(${p}-icon-padding) - var(${p}-icon-gap));`,
    `}`,
    `${cls}${cls}--has-icon-left svg {`,
    `  margin-right: var(${p}-icon-gap);`,
    `}`,
    ``,
    `${cls}${cls}--has-icon-right {`,
    `  padding-right: calc(var(${p}-icon-padding) - var(${p}-icon-gap));`,
    `}`,
    `${cls}${cls}--has-icon-right svg {`,
    `  margin-left: var(${p}-icon-gap);`,
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
      const depthMap = variant[state];

      for (const depth of ['bg', 'fg', 'edge'] as const) {
        const suffix = depthMap[depth];
        const cssDepth = CSS_DEPTH[depth];
        const key = propKey(depth, state);
        const semVar = semanticProp(variant.intent, cssDepth, suffix);
        const legacyToken = legacy[`${variantName}/${key}`];
        lines.push(`  ${p}-${key}: ${dualValue(semVar, legacyToken)};`);
      }

      // Fill
      const fillKey = propKey('fill', state);
      const fillOverride = variant.fillOverrides?.[state];

      if (fillOverride) {
        let semVar: string;
        if (typeof fillOverride === 'object' && 'fullPath' in fillOverride) {
          semVar = `--cdr-color-${fillOverride.fullPath}`;
        } else {
          semVar = semanticProp(variant.intent, 'text', fillOverride);
        }
        const legacyToken = legacy[`${variantName}/${fillKey}`];
        lines.push(`  ${p}-${fillKey}: ${dualValue(semVar, legacyToken)};`);
      } else {
        // Mirror foreground
        const fgSuffix = depthMap.fg;
        const semVar = semanticProp(variant.intent, 'text', fgSuffix);
        const legacyToken = legacy[`${variantName}/${propKey('fg', state)}`];
        lines.push(`  ${p}-${fillKey}: ${dualValue(semVar, legacyToken)};`);
      }
    }

    // Extras (e.g. active-inset)
    if (variant.extras) {
      for (const extraKey of Object.keys(variant.extras)) {
        const legacyToken = legacy[`${variantName}/${extraKey}`];
        if (legacyToken) {
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
  dims: Record<string, string | number>,
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
