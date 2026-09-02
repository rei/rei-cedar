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
 *   npx tsx build/generate-component-maps.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
  const cssRole = role === 'icon' ? 'text' : role; // icon color resolves against the text-role token family
  return interaction
    ? `--cdr-color-${interaction}-${cssRole}-${suffix}`
    : `--cdr-color-${cssRole}-${suffix}`;
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

function generateDefaults(defaults: Record<string, ContractValue>): string {
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
    lines.push(`  // ${group.comment}`);
    for (const key of group.keys) {
      const value = defaults[key];
      if (!value) continue;
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

  return `$button-defaults: (\n${lines.join('\n')}\n);`;
}

function generateColorVariant(
  variantName: string,
  variant: VariantContract,
  interaction: string | undefined,
  legacy: Record<string, string>,
): string {
  const lines: string[] = [];

  for (const state of STATES) {
    const slotMap = variant[state];

    for (const role of ['surface', 'text', 'border', 'icon'] as const) {
      const value = slotMap[role];
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
        lines.push(`    ${key}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
      }
    }
  }

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
  interaction: string | undefined,
  legacy: Record<string, string>,
): string {
  const variantBlocks = Object.entries(variants)
    .map(([name, variant]) => generateColorVariant(name, variant, interaction, legacy))
    .join('\n');

  return `$button-colors: (\n${variantBlocks}\n);`;
}

function generateSizes(sizes: Record<string, Record<string, ContractValue>>): string {
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
  const manifest = await loadTokenManifest();

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

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, scss, 'utf-8');
    console.log(`  → ${path.relative(SRC_DIR, outPath)} (${scss.split('\n').length} lines)`);

    // Generate CSS token-assignment file if the contract declares a recipe family.
    // Note: `interaction` (the taxonomy tier) and the CSS behavior template
    // dispatch key are separate concepts. CdrButton's interaction is 'action'
    // and it also happens to use the 'action' behavior template, but the
    // dispatch below is driven by the recipe's family, not the taxonomy tier.
    if (contract.recipe) {
      const cssOutPath = path.join(componentDir, 'styles', `${componentName}.tokens.css`);

      let css: string;
      switch (contract.interaction) {
        case 'action':
          css = generateActionCSS(contract);
          break;
        default:
          console.log(
            `  ⚠ No CSS behavior template for interaction "${contract.interaction}" — skipping CSS generation`,
          );
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

  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// GENERATED FILE — do not edit manually`);
  sections.push(`// Source: ${relSource}`);
  sections.push(`// Regenerate: npx tsx build/generate-component-maps.ts`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(`@use '@rei/cdr-tokens/scss' as tokens;\n`);

  sections.push(`// ${'='.repeat(76)}`);
  sections.push(`// DEFAULTS MAP`);
  sections.push(`// ${'='.repeat(76)}\n`);
  sections.push(generateDefaults(contract.defaults));

  if (Object.keys(contract.variants).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// COLOR MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(generateColors(contract.variants, contract.interaction, contract.legacy ?? {}));
  }

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
