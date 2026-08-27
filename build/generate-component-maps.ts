/**
 * generate-component-maps.ts
 *
 * Reads component token contracts (*.tokens.ts) and generates SCSS maps files.
 * Each contract produces a `Cdr{Component}.maps.scss` containing:
 *   - $component-defaults  (key → value)
 *   - $component-colors    (variant → depth×state values with dual-value pattern)
 *   - $component-sizes     (size → dimension values)
 *
 * Usage:
 *   npx tsx build/generate-component-maps.ts
 *
 * The generated file replaces the hand-written maps file. The vars and module
 * files are unaffected — they consume the maps generically via @each.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ComponentTokenContract, VariantContract, DepthMap } from './component-tokens/types';
import { generateActionCSS } from './component-tokens/families/action';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

// ============================================================================
// HELPERS
// ============================================================================

/** Check if a string value is a token reference (starts with 'cdr-') */
function isTokenRef(value: string | number): boolean {
  return typeof value === 'string' && value.startsWith('cdr-');
}

/** Format a value for SCSS output */
function scssValue(value: string | number): string {
  if (typeof value === 'number') return String(value);
  return isTokenRef(value) ? `tokens.$${value}` : value;
}

/** CSS depth name mapping: contract depth → CSS custom property depth */
const CSS_DEPTH: Record<string, string> = {
  bg: 'surface',
  fg: 'text',
  edge: 'border',
};

/** Component property name for a given depth + state */
function propKey(depth: 'bg' | 'fg' | 'edge' | 'fill', state: string): string {
  const name =
    depth === 'bg' ? 'background' : depth === 'fg' ? 'text' : depth === 'edge' ? 'border' : 'fill';
  return state === 'rest' ? name : `${name}-${state}`;
}

/** States in the order we want them in the SCSS map */
const STATES = ['rest', 'hover', 'active', 'disabled'] as const;

// ============================================================================
// GENERATORS
// ============================================================================

function generateDefaults(defaults: Record<string, string | number>): string {
  const lines: string[] = [];
  const entries = Object.entries(defaults);

  // Group by comment category based on key prefixes
  const groups = [
    { comment: 'Layout', keys: ['radius', 'padding'] },
    {
      comment: 'Typography',
      keys: ['font-family', 'font-weight', 'letter-spacing', 'font-size', 'line-height'],
    },
    { comment: 'Icons', keys: ['icon-size', 'icon-padding', 'icon-gap'] },
    { comment: 'Transitions', keys: ['transition-duration', 'transition-timing'] },
    { comment: 'Color', keys: ['background', 'text', 'fill', 'border'] },
    { comment: 'Elevation', keys: ['elevation', 'elevation-hover', 'elevation-active'] },
  ];

  // Compute max key length for alignment
  const maxKeyLen = Math.max(...entries.map(([k]) => k.length));

  for (const group of groups) {
    lines.push(`  // ${group.comment}`);
    for (const key of group.keys) {
      const value = defaults[key];
      if (value === undefined) continue;
      const pad = ' '.repeat(maxKeyLen - key.length);
      lines.push(`  ${key}:${pad} ${scssValue(value)},`);
    }
  }

  // Catch any keys not in a group
  const grouped = new Set(groups.flatMap((g) => g.keys));
  for (const [key, value] of entries) {
    if (!grouped.has(key)) {
      const pad = ' '.repeat(maxKeyLen - key.length);
      lines.push(`  ${key}:${pad} ${scssValue(value)},`);
    }
  }

  return `$button-defaults: (\n${lines.join('\n')}\n);`;
}

function generateColorVariant(
  variantName: string,
  variant: VariantContract,
  legacy: Record<string, string>,
): string {
  const lines: string[] = [];

  for (const state of STATES) {
    const depthMap: DepthMap = variant[state];

    // Background (surface)
    for (const depth of ['bg', 'fg', 'edge'] as const) {
      const suffix = depthMap[depth];
      const cssDepth = CSS_DEPTH[depth];
      const key = propKey(depth, state);
      const semanticProp = `--cdr-color-${variant.intent}-${cssDepth}-${suffix}`;
      const legacyKey = `${variantName}/${key}`;
      const legacyToken = legacy[legacyKey];

      if (!legacyToken) {
        // No legacy fallback — just the semantic custom property
        lines.push(`    ${key}: var(${semanticProp}),`);
      } else {
        lines.push(`    ${key}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
      }
    }

    // Fill — mirrors foreground unless overridden
    const fillKey = propKey('fill', state);
    const fillOverride = variant.fillOverrides?.[state];

    if (fillOverride) {
      // Explicit fill override
      let semanticProp: string;
      if (typeof fillOverride === 'object' && 'fullPath' in fillOverride) {
        semanticProp = `--cdr-color-${fillOverride.fullPath}`;
      } else {
        semanticProp = `--cdr-color-${variant.intent}-text-${fillOverride}`;
      }
      const legacyKey = `${variantName}/${fillKey}`;
      const legacyToken = legacy[legacyKey];
      if (legacyToken) {
        lines.push(`    ${fillKey}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
      } else {
        lines.push(`    ${fillKey}: var(${semanticProp}),`);
      }
    } else {
      // Mirror foreground
      const fgSuffix = depthMap.fg;
      const semanticProp = `--cdr-color-${variant.intent}-text-${fgSuffix}`;
      // Use the text legacy token for fill too
      const fgLegacyKey = `${variantName}/${propKey('fg', state)}`;
      const legacyToken = legacy[fgLegacyKey];
      if (legacyToken) {
        lines.push(`    ${fillKey}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
      } else {
        lines.push(`    ${fillKey}: var(${semanticProp}),`);
      }
    }
  }

  // Extras (e.g., active-inset)
  if (variant.extras) {
    for (const extraKey of Object.keys(variant.extras)) {
      const legacyKey = `${variantName}/${extraKey}`;
      const legacyToken = legacy[legacyKey];
      if (legacyToken) {
        lines.push(`    ${extraKey}: #{tokens.$${legacyToken}},`);
      }
    }
  }

  return `  ${variantName}: (\n${lines.join('\n')}\n  ),`;
}

function generateColors(
  variants: Record<string, VariantContract>,
  legacy: Record<string, string>,
): string {
  const variantBlocks = Object.entries(variants)
    .map(([name, variant]) => generateColorVariant(name, variant, legacy))
    .join('\n');

  return `$button-colors: (\n${variantBlocks}\n);`;
}

function generateSizes(sizes: Record<string, Record<string, string | number>>): string {
  const sizeBlocks = Object.entries(sizes)
    .map(([sizeName, dims]) => {
      const entries = Object.entries(dims)
        .map(([key, value]) => `    ${key}: ${scssValue(value)},`)
        .join('\n');
      return `  ${sizeName}: (\n${entries}\n  ),`;
    })
    .join('\n');

  return `$button-sizes: (\n${sizeBlocks}\n);`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  // Discover contracts
  const contractFiles = findContracts(SRC_DIR);

  if (contractFiles.length === 0) {
    console.log('No *.tokens.ts contract files found.');
    return;
  }

  for (const contractPath of contractFiles) {
    console.log(`Processing: ${path.relative(SRC_DIR, contractPath)}`);

    const mod = await import(contractPath);
    const contract: ComponentTokenContract = mod.default;

    const scss = generateScss(contract, contractPath);

    // Write to the vars/ directory alongside existing files
    const componentDir = path.dirname(contractPath);
    const componentName = path.basename(contractPath, '.tokens.ts');
    const outPath = path.join(componentDir, 'styles', 'vars', `${componentName}.maps.scss`);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, scss, 'utf-8');
    console.log(`  → ${path.relative(SRC_DIR, outPath)} (${scss.split('\n').length} lines)`);

    // Generate CSS if the contract declares a family
    if (contract.family) {
      const cssOutPath = path.join(componentDir, 'styles', `${componentName}.css`);

      let css: string;
      switch (contract.family) {
        case 'action':
          css = generateActionCSS(contract);
          break;
        default:
          console.log(`  ⚠ Unknown family "${contract.family}" — skipping CSS generation`);
          continue;
      }

      fs.writeFileSync(cssOutPath, css, 'utf-8');
      console.log(`  → ${path.relative(SRC_DIR, cssOutPath)} (${css.split('\n').length} lines)`);
    }
  }
}

function generateScss(contract: ComponentTokenContract, sourcePath: string): string {
  const relSource = path.relative(path.join(__dirname, '..'), sourcePath);
  const sections: string[] = [];

  // Header
  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// GENERATED FILE — do not edit manually`);
  sections.push(`// Source: ${relSource}`);
  sections.push(`// Regenerate: npx tsx build/generate-component-maps.ts`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(`@use '@rei/cdr-tokens/scss' as tokens;\n`);

  // Defaults
  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// DEFAULTS MAP`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(generateDefaults(contract.defaults));

  // Colors
  if (Object.keys(contract.variants).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// COLOR MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(generateColors(contract.variants, contract.legacy ?? {}));
  }

  // Sizes
  if (contract.sizes && Object.keys(contract.sizes).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// SIZE MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(generateSizes(contract.sizes));
  }

  return sections.join('\n') + '\n';
}

function findContracts(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findContracts(fullPath));
    } else if (entry.name.endsWith('.tokens.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
