/**
 * generate-component-maps.ts
 *
 * Reads component token contracts (*.tokens.ts) and generates:
 *   - SCSS maps files (`Cdr{Component}.maps.scss`) for internal use
 *   - Flat CSS files (`Cdr{Component}.tokens.css`) for non-SCSS consumers
 *
 * Generated artifacts should be reviewed and committed with their contracts.
 * The current CI workflow does not verify regeneration.
 *
 * Usage:
 *   npx tsx build/generate-component-maps.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  ComponentTokenContract,
  ContractValue,
  VariantContract,
} from './component-tokens/types';
import { explicitSlots, mapSlug, propKey, slotVar } from './component-tokens/naming';
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

// ============================================================================
// GENERATORS
// ============================================================================

function generateDefaults(slug: string, defaults: Record<string, ContractValue>): string {
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

  const maxKeyLen = entries.length > 0 ? Math.max(...entries.map(([k]) => k.length)) : 0;

  for (const group of groups) {
    const present = group.keys.filter((key) => defaults[key] !== undefined);
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

  return `$${slug}-defaults: (\n${lines.join('\n')}\n);`;
}

function generateColorVariant(
  variantName: string,
  variant: VariantContract,
  interaction: string | undefined,
  legacy: Record<string, string>,
): string {
  const lines: string[] = [];

  for (const { state, role, value } of explicitSlots(variant)) {
    const key = propKey(role, state);
    const legacyToken = legacy[`${variantName}/${key}`];
    const semanticProp = slotVar(interaction, role, value);

    if (!legacyToken) {
      lines.push(`    ${key}: var(${semanticProp}),`);
    } else {
      lines.push(`    ${key}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
    }
  }

  if (variant.extras) {
    for (const extraKey of Object.keys(variant.extras)) {
      const legacyKey = `${variantName}/${extraKey}`;
      const legacyToken = legacy[legacyKey];
      if (legacyToken) {
        lines.push(`    ${extraKey}: #{tokens.$${legacyToken}},`);
      } else {
        console.warn(`  ⚠ ${variantName}/${extraKey}: extra has no legacy entry and is omitted`);
      }
    }
  }

  return `  ${variantName}: (\n${lines.join('\n')}\n  ),`;
}

function generateColors(
  slug: string,
  variants: Record<string, VariantContract>,
  interaction: string | undefined,
  legacy: Record<string, string>,
): string {
  const variantBlocks = Object.entries(variants)
    .map(([name, variant]) => generateColorVariant(name, variant, interaction, legacy))
    .join('\n');

  return `$${slug}-colors: (\n${variantBlocks}\n);`;
}

function generateSizes(slug: string, sizes: Record<string, Record<string, ContractValue>>): string {
  const sizeBlocks = Object.entries(sizes)
    .map(([sizeName, dims]) => {
      const entries = Object.entries(dims)
        .map(([key, value]) => `    ${key}: ${scssValue(value)},`)
        .join('\n');
      return `  ${sizeName}: (\n${entries}\n  ),`;
    })
    .join('\n');

  return `$${slug}-sizes: (\n${sizeBlocks}\n);`;
}

/** Current visual recipes are implemented by the action CSS template. */
function recipeFamily(recipe: NonNullable<ComponentTokenContract['recipe']>): string {
  switch (recipe) {
    case 'pressable':
    case 'text-action':
    case 'elevated':
    case 'icon-only':
    case 'outlined':
      return 'action';
  }
  return 'unimplemented';
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

    // Generate CSS only when this recipe has an implemented behavior template.
    // No output is promised just because a contract declares an interaction.
    if (contract.recipe) {
      const cssOutPath = path.join(componentDir, 'styles', `${componentName}.tokens.css`);

      let css: string;
      switch (recipeFamily(contract.recipe)) {
        case 'action':
          css = generateActionCSS(
            contract,
            path.relative(path.join(__dirname, '..'), contractPath),
          );
          break;
        default:
          console.warn(
            `  ⚠ No CSS behavior template for recipe "${contract.recipe}" — skipping CSS generation`,
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
  const slug = mapSlug(contract.component);
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
  sections.push(generateDefaults(slug, contract.defaults));

  if (Object.keys(contract.variants).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// COLOR MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(
      generateColors(slug, contract.variants, contract.interaction, contract.legacy ?? {}),
    );
  }

  if (contract.sizes && Object.keys(contract.sizes).length > 0) {
    sections.push('');
    sections.push(`// ${'='.repeat(76)}`);
    sections.push(`// SIZE MAP`);
    sections.push(`// ${'='.repeat(76)}\n`);
    sections.push(generateSizes(slug, contract.sizes));
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
