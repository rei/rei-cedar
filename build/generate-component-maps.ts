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
import {
  explicitSlots,
  hookScope,
  hookVar,
  mapSlug,
  propKey,
  slotVar,
} from './component-tokens/naming';
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
// DOC LABELS — human text for the generated ITEM_DOC comments
// ============================================================================

const ROLE_LABEL: Record<string, string> = {
  surface: 'background',
  text: 'text',
  border: 'border',
  icon: 'icon',
};

const STATE_LABEL: Record<string, string> = {
  rest: '',
  hover: ' on hover',
  'focus-visible': ' on focus',
  active: ' when active',
  disabled: ' when disabled',
};

const EXTRA_LABEL: Record<string, string> = {
  'active-inset': 'inset border color when active',
  surface: 'background color',
};

const SCOPE_WORDING: Record<string, string> = {
  'with-background': "Button with background's",
  'icon-only': "Icon-only button's",
};

function docPrefix(scope: string): string {
  const special = SCOPE_WORDING[scope];
  if (special) return `${special} `;
  const words = scope.replace(/-/g, ' ');
  return `${words.charAt(0).toUpperCase()}${words.slice(1)} button's `;
}

function docComment(scope: string, description: string, hook: string): string {
  return `    // ITEM_DOC: ${docPrefix(scope)}${description}. Override with ${hook}.`;
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
      keys: [
        'font-family',
        'font-style',
        'font-weight',
        'letter-spacing',
        'font-size',
        'line-height',
      ],
    },
    { comment: 'Icons', keys: ['icon-size', 'icon-padding', 'icon-gap'] },
    {
      comment: 'Icon-only layout',
      keys: ['icon-only-radius', 'icon-only-padding', 'icon-only-large-padding'],
    },
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
  contract: ComponentTokenContract,
  legacy: Record<string, string>,
): string {
  const lines: string[] = [];
  const scope = hookScope(variantName, contract.defaultVariant);
  const useHooks = contract.hooks === true;

  for (const { state, role, value } of explicitSlots(variant)) {
    const key = propKey(role, state);
    const semanticProp = slotVar(contract.interaction, role, value);
    const legacyToken = legacy[`${variantName}/${key}`];

    if (legacyToken) {
      // Legacy bridge: semantic token with a legacy Sass fallback (no hook).
      lines.push(`    ${key}: var(${semanticProp}, #{tokens.$${legacyToken}}),`);
    } else if (useHooks) {
      const hook = hookVar(contract.component, scope, role, state);
      const description = `${ROLE_LABEL[role] ?? role} color${STATE_LABEL[state] ?? ''}`;
      lines.push(docComment(variantName, description, hook));
      lines.push(`    ${key}: var(${hook}, var(${semanticProp})),`);
    } else {
      lines.push(`    ${key}: var(${semanticProp}),`);
    }
  }

  if (variant.extras) {
    for (const [extraKey, extraValue] of Object.entries(variant.extras)) {
      const hook = hookVar(contract.component, scope, extraKey, 'rest');
      const legacyToken = legacy[`${variantName}/${extraKey}`];

      if (extraValue && typeof extraValue === 'object' && useHooks) {
        const description = EXTRA_LABEL[extraKey] ?? extraKey.replace(/-/g, ' ');
        lines.push(docComment(variantName, description, hook));
        lines.push(`    ${extraKey}: var(${hook}, ${scssValue(extraValue)}),`);
      } else if (extraValue && typeof extraValue === 'object') {
        lines.push(`    ${extraKey}: ${scssValue(extraValue)},`);
      } else if (legacyToken) {
        lines.push(`    ${extraKey}: #{tokens.$${legacyToken}},`);
      } else {
        console.warn(
          `  ⚠ ${variantName}/${extraKey}: extra has no value and no legacy entry; omitted`,
        );
      }
    }
  }

  return `  ${variantName}: (\n${lines.join('\n')}\n  ),`;
}

// ============================================================================
// HOOK DOCS PARTIAL — docgen reads declarations, not Sass maps, so the public
// hook surface is written to a companion <Component>.hooks.scss that is never
// imported at runtime. Each declaration is preceded by an ITEM_DOC comment.
// ============================================================================

function generateHooksDoc(contract: ComponentTokenContract, sourcePath: string): string {
  const relSource = path.relative(path.join(__dirname, '..'), sourcePath);
  const legacy = contract.legacy ?? {};
  const lines: string[] = [];

  lines.push(`// ${'='.repeat(76)}`);
  lines.push(`// GENERATED FILE — do not edit manually`);
  lines.push(`// Source: ${relSource}`);
  lines.push(`// Regenerate: npx tsx build/generate-component-maps.ts`);
  lines.push(`// Documentation-only hook surface for docgen; not imported at runtime.`);
  lines.push(`// ${'='.repeat(76)}\n`);
  lines.push(`.${contract.component} {`);

  let firstEntry = true;
  const pushEntry = (hook: string, semantic: string, description: string) => {
    if (!firstEntry) lines.push('');
    firstEntry = false;
    lines.push(`  // ITEM_DOC: ${description}. Override with ${hook}.`);
    lines.push(`  ${hook}: var(${hook}, ${semantic});`);
  };

  for (const [variantName, variant] of Object.entries(contract.variants)) {
    const scope = hookScope(variantName, contract.defaultVariant);

    for (const { state, role, value } of explicitSlots(variant)) {
      const key = propKey(role, state);
      if (legacy[`${variantName}/${key}`]) continue; // legacy bridge has no hook
      const hook = hookVar(contract.component, scope, role, state);
      const semanticProp = slotVar(contract.interaction, role, value);
      const description = `${docPrefix(variantName)}${ROLE_LABEL[role] ?? role} color${STATE_LABEL[state] ?? ''}`;
      pushEntry(hook, `var(${semanticProp})`, description);
    }

    if (variant.extras) {
      for (const [extraKey, extraValue] of Object.entries(variant.extras)) {
        if (!extraValue || typeof extraValue !== 'object') continue;
        if (legacy[`${variantName}/${extraKey}`]) continue;
        const hook = hookVar(contract.component, scope, extraKey, 'rest');
        const description = `${docPrefix(variantName)}${EXTRA_LABEL[extraKey] ?? extraKey.replace(/-/g, ' ')}`;
        pushEntry(hook, scssValue(extraValue), description);
      }
    }
  }

  lines.push(`}`);
  return lines.join('\n') + '\n';
}

function generateColors(slug: string, contract: ComponentTokenContract): string {
  const legacy = contract.legacy ?? {};
  const variantBlocks = Object.entries(contract.variants)
    .map(([name, variant]) => generateColorVariant(name, variant, contract, legacy))
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

    // Contracts that opt into the hook surface also get a docgen partial.
    if (contract.hooks === true) {
      const hooksOutPath = path.join(componentDir, 'styles', 'vars', `${componentName}.hooks.scss`);
      const hooksScss = generateHooksDoc(contract, contractPath);
      fs.writeFileSync(hooksOutPath, hooksScss, 'utf-8');
      console.log(
        `  → ${path.relative(SRC_DIR, hooksOutPath)} (${hooksScss.split('\n').length} lines)`,
      );
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
    sections.push(generateColors(slug, contract));
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
