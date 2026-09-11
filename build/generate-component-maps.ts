/**
 * generate-component-maps.ts
 *
 * Reads component token contracts (*.tokens.ts) and generates:
 *   - SCSS maps files (`Cdr{Component}.maps.scss`) for internal use
 *   - Flat CSS files (`Cdr{Component}.tokens.css`) for non-SCSS consumers
 *
 * Generated artifacts are committed and verified by CI.
 *
 * Usage:
 *   pnpm build:maps
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'oxfmt';
import type {
  ComponentTokenContract,
  ColorSlotMap,
  ContractValue,
  VariantContract,
} from './component-tokens/types';
import { generateActionCSS } from './component-tokens/families/action';
import { loadTokenManifest, validateContract } from './component-tokens/validate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

// ============================================================================
// HELPERS
// ============================================================================

/** Format a contract value for SCSS output */
function scssValue(value: ContractValue): string {
  if (value.kind === 'semantic') {
    const fallback =
      value.fallback.kind === 'token'
        ? `var(--${value.fallback.name}, #{tokens.$${value.fallback.name}})`
        : value.fallback.value;
    return `var(--cdr-color-${value.name}, ${fallback})`;
  }
  if (value.kind === 'literal') {
    return typeof value.value === 'number' ? String(value.value) : value.value;
  }
  return `tokens.$${value.name}`;
}

/** Component property name for each confirmed role */
const PROP_NAME: Record<keyof ColorSlotMap, string> = {
  surface: 'background',
  text: 'text',
  border: 'border',
  icon: 'fill',
};

/** Component property name for a given role + state */
function propKey(role: keyof ColorSlotMap, state: string): string {
  const name = PROP_NAME[role];
  return state === 'rest' ? name : `${name}-${state}`;
}

/** Build a semantic custom property, honoring the omittable interaction segment */
function semanticVar(
  interaction: string | undefined,
  role: keyof ColorSlotMap,
  suffix: string,
): string {
  return interaction
    ? `--cdr-color-${interaction}-${role}-${suffix}`
    : `--cdr-color-${role}-${suffix}`;
}

const STATES: Array<keyof VariantContract & string> = [
  'rest',
  'hover',
  'focus-visible',
  'active',
  'disabled',
];

// ============================================================================
// GENERATORS
// ============================================================================

function generateDefaults(defaults: Record<string, ContractValue>, prefix: string): string {
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

  const maxKeyLen = Math.max(...entries.map(([k]) => k.length));

  for (const group of groups) {
    const present = group.keys.filter((key) => defaults[key]);
    if (present.length === 0) continue;
    lines.push(`  // ${group.comment}`);
    for (const key of present) {
      const value = defaults[key];
      const pad = ' '.repeat(maxKeyLen - key.length);
      lines.push(`  ${key}:${pad} ${scssValue(value)},`);
    }
  }

  const grouped = new Set(groups.flatMap((g) => g.keys));
  for (const [key, value] of entries) {
    if (!grouped.has(key)) {
      const pad = ' '.repeat(maxKeyLen - key.length);
      lines.push(`  ${key}:${pad} ${scssValue(value)},`);
    }
  }

  return `$${prefix}-defaults: (\n${lines.join('\n')}\n);`;
}

function generateColorVariant(
  variantName: string,
  variant: VariantContract,
  interaction: string | undefined,
  legacy: Record<string, string>,
): string {
  const lines: string[] = [];

  for (const state of STATES) {
    const slotMap = variant[state] as ColorSlotMap | undefined;
    if (!slotMap) continue;

    for (const role of ['surface', 'text', 'border', 'icon'] as const) {
      const value = slotMap[role];
      if (!value) continue;
      const key = propKey(role, state);
      const legacyKey = `${variantName}/${key}`;
      const legacyToken = legacy[legacyKey];

      const semanticProp =
        typeof value === 'object' && 'fullPath' in value
          ? `--cdr-color-${value.fullPath}`
          : semanticVar(interaction, role, value);

      if (!legacyToken) {
        lines.push(`    ${key}: var(${semanticProp}),`);
      } else {
        lines.push(
          `    ${key}: var(${semanticProp}, var(--${legacyToken}, #{tokens.$${legacyToken}})),`,
        );
      }
    }
  }

  if (variant.extras) {
    for (const [extraKey, value] of Object.entries(variant.extras)) {
      const legacyKey = `${variantName}/${extraKey}`;
      const legacyToken = legacy[legacyKey];
      if (value) {
        lines.push(`    ${extraKey}: ${scssValue(value)},`);
      } else if (legacyToken) {
        lines.push(`    ${extraKey}: #{tokens.$${legacyToken}},`);
      }
    }
  }

  return `  ${variantName}: (\n${lines.join('\n')}\n  ),`;
}

function generateColors(
  variants: Record<string, VariantContract>,
  interaction: string | undefined,
  legacy: Record<string, string>,
  prefix: string,
): string {
  const variantBlocks = Object.entries(variants)
    .map(([name, variant]) => generateColorVariant(name, variant, interaction, legacy))
    .join('\n');

  return `$${prefix}-colors: (\n${variantBlocks}\n);`;
}

function generateSizes(
  sizes: Record<string, Record<string, ContractValue>>,
  prefix: string,
): string {
  const sizeBlocks = Object.entries(sizes)
    .map(([sizeName, dims]) => {
      const entries = Object.entries(dims)
        .map(([key, value]) => `    ${key}: ${scssValue(value)},`)
        .join('\n');
      return `  ${sizeName}: (\n${entries}\n  ),`;
    })
    .join('\n');

  return `$${prefix}-sizes: (\n${sizeBlocks}\n);`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const manifest = await loadTokenManifest();
  const check = process.argv.includes('--check');
  // Pass only formatting fields to the formatter: .oxfmtrc.json also carries
  // file-selection keys (e.g. ignorePatterns) that are not format options.
  const { ignorePatterns: _ignorePatterns, ...formatConfig } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../.oxfmtrc.json'), 'utf8'),
  );
  const stale: string[] = [];
  async function emit(outPath: string, source: string) {
    const result = await format(outPath, source, formatConfig);
    if (result.errors.length)
      throw new Error(`Cannot format ${outPath}: ${JSON.stringify(result.errors)}`);
    if (check) {
      if (!fs.existsSync(outPath) || fs.readFileSync(outPath, 'utf8') !== result.code)
        stale.push(outPath);
    } else {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, result.code, 'utf8');
    }
  }

  const contractFiles = findContracts(SRC_DIR);

  if (contractFiles.length === 0) {
    console.log('No *.tokens.ts contract files found.');
    return;
  }

  for (const contractPath of contractFiles) {
    console.log(`Processing: ${path.relative(SRC_DIR, contractPath)}`);

    const mod = await import(contractPath);
    const contract: ComponentTokenContract = mod.default;

    validateContract(contract, manifest);

    const scss = generateScss(contract, contractPath);

    const componentDir = path.dirname(contractPath);
    const componentName = path.basename(contractPath, '.tokens.ts');
    const outPath = path.join(componentDir, 'styles', 'vars', `${componentName}.maps.scss`);

    await emit(outPath, scss);
    console.log(`  → ${path.relative(SRC_DIR, outPath)} (${scss.split('\n').length} lines)`);

    // Generate CSS token-assignment file if the contract declares a recipe.
    // Dispatch is driven by the recipe (the CSS behavior template), not by
    // the interaction tier: today only 'pressable' exists, and unknown
    // recipes fail loudly instead of silently skipping output.
    if (contract.recipe) {
      const cssOutPath = path.join(componentDir, 'styles', `${componentName}.tokens.css`);

      let css: string;
      switch (contract.recipe) {
        case 'pressable':
          css = generateActionCSS(contract, contractPath);
          break;
        default:
          throw new Error(
            `No CSS behavior template for recipe "${contract.recipe}" (${path.relative(SRC_DIR, contractPath)})`,
          );
      }

      await emit(cssOutPath, css);
      console.log(`  → ${path.relative(SRC_DIR, cssOutPath)} (${css.split('\n').length} lines)`);
    }
  }
  if (stale.length)
    throw new Error(
      `Generated tokens are stale. Run pnpm build:maps:\n${stale.map((file) => path.relative(SRC_DIR, file)).join('\n')}`,
    );
}

export function generateScss(contract: ComponentTokenContract, sourcePath: string): string {
  const relSource = path.relative(path.join(__dirname, '..'), sourcePath);
  // Map prefix derived from the component name (cdr-button → button) so each
  // contract generates its own namespaced maps.
  const prefix = contract.component.replace(/^cdr-/, '');
  const sections: string[] = [];

  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// GENERATED FILE — do not edit manually`);
  sections.push(`// Source: ${relSource}`);
  sections.push(`// Regenerate: pnpm build:maps`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(`@use '@rei/cdr-tokens/scss' as tokens;\n`);

  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// DEFAULTS MAP`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(generateDefaults(contract.defaults, prefix));

  if (Object.keys(contract.variants).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// COLOR MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(
      generateColors(contract.variants, contract.interaction, contract.legacy ?? {}, prefix),
    );
  }

  if (contract.sizes && Object.keys(contract.sizes).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// SIZE MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(generateSizes(contract.sizes, prefix));
  }

  return sections.join('\n') + '\n';
}

export function findContracts(dir: string): string[] {
  const results: string[] = [];
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));
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

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
