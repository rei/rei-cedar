/**
 * Token validation for component token contracts.
 *
 * Loads the published token manifest from @rei/cdr-tokens and validates that
 * the contract's token references and generated semantic custom properties
 * can be satisfied by the token system.
 *
 * Semantic paths are checked against the taxonomy, and against the optional
 * canonical manifest when supplied. Every legacy reference must exist in the
 * published @rei/cdr-tokens JSON manifests.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  ComponentTokenContract,
  ColorSlotMap,
  ContractValue,
  InteractionState,
} from './types';
import { COLOR_IDENTITIES, COLOR_ROLES, EXPRESSIONS, INTERACTION_FAMILIES } from './types';

type Role = keyof ColorSlotMap;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TokenManifest {
  /** Legacy/current tokens that are known to exist (e.g. cdr-radius-softer) */
  knownTokens: Set<string>;
  /** Semantic tokens that are expected in the next token release */
  semanticTokens: Set<string>;
}

/**
 * Load the token manifest from @rei/cdr-tokens JSON files.
 *
 * Scans the full published JSON tree (foundations, components, and platform
 * files) for known tokens — component-level tokens such as
 * `cdr-color-text-link-rest` live outside `foundations/`. Semantic tokens
 * are not yet published, so the semantic set is empty until the pipeline
 * produces a manifest.
 */
export async function loadTokenManifest(): Promise<TokenManifest> {
  const knownTokens = new Set<string>();
  const semanticTokens = new Set<string>();

  const tokenJsonDir = path.join(
    __dirname,
    '../../node_modules/@rei/cdr-tokens/dist/rei-dot-com/json',
  );

  if (fs.existsSync(tokenJsonDir)) {
    for (const file of collectJsonFiles(tokenJsonDir)) {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
      extractTokenNames(content, knownTokens);
    }
  }
  if (!knownTokens.size)
    throw new Error('No @rei/cdr-tokens manifest found. Run pnpm install first.');

  // Load optional local semantic manifest if present
  const semanticManifestPath = path.join(__dirname, '../../canonical/tokens.json');
  if (fs.existsSync(semanticManifestPath)) {
    const content = JSON.parse(fs.readFileSync(semanticManifestPath, 'utf-8'));
    extractSemanticTokens(content, semanticTokens);
  }

  return { knownTokens, semanticTokens };
}

/** Recursively collect every JSON file under a directory. */
function collectJsonFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractTokenNames(obj: unknown, out: Set<string>, prefix = '') {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    for (const item of obj) extractTokenNames(item, out, prefix);
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === 'name' && typeof value === 'string') {
      out.add(value.replace(/^--/, ''));
      continue;
    }
    if (typeof value === 'string' && key.startsWith('cdr-')) {
      out.add(key);
      continue;
    }
    extractTokenNames(value, out, prefix);
  }
}

function extractSemanticTokens(obj: unknown, out: Set<string>) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (const item of obj) extractSemanticTokens(item, out);
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'name' && typeof value === 'string') {
      out.add(value.replace(/^--/, ''));
    } else {
      extractSemanticTokens(value, out);
    }
  }
}

/** Validate paths, fallbacks, and supported contract features before writing artifacts. */
export function validateContract(contract: ComponentTokenContract, manifest: TokenManifest) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const expressionSteps = EXPRESSIONS.filter((expression) => expression !== 'base').join('|');
  const semanticPattern = new RegExp(
    `^cdr-color-(?:(?:${INTERACTION_FAMILIES.join('|')})-)?(?:${COLOR_ROLES.join('|')})-(?:${COLOR_IDENTITIES.join('|')})(?:-(?:${expressionSteps}))?$`,
  );
  const interactions = new Set<string>(INTERACTION_FAMILIES);
  const identities = new Set<string>(COLOR_IDENTITIES);
  const allowedVariantKeys = new Set([
    'identity',
    'rest',
    'hover',
    'focus-visible',
    'active',
    'disabled',
    'extras',
  ]);
  const requireToken = (name: string, location: string) => {
    if (!manifest.knownTokens.has(name))
      errors.push(`${location}: unknown fallback token "${name}"`);
  };
  const requireSemantic = (name: string, location: string) => {
    if (!semanticPattern.test(name)) errors.push(`${location}: invalid semantic path "${name}"`);
    if (manifest.semanticTokens.size && !manifest.semanticTokens.has(name)) {
      errors.push(`${location}: semantic token "${name}" is absent from the supplied manifest`);
    }
  };
  const checkLiteral = (value: string | number, location: string) => {
    // Literals may carry intentional CSS (e.g. 'white', 'rgb(...)'), but a
    // bare var() reference bypasses token tracking — flag it for review.
    if (typeof value === 'string' && /var\(\s*--[a-z0-9-]+\s*\)/.test(value) && !/,/.test(value))
      warnings.push(`${location}: literal contains a bare var() without fallback`);
  };
  const checkValue = (value: ContractValue, location: string) => {
    if (value.kind === 'token') requireToken(value.name, location);
    else if (value.kind === 'semantic') {
      requireSemantic(`cdr-color-${value.name}`, location);
      if (value.fallback.kind === 'token') requireToken(value.fallback.name, location);
      else if (value.fallback.kind === 'literal') {
        if (String(value.fallback.value).trim() === '') errors.push(`${location}: empty fallback`);
        else checkLiteral(value.fallback.value, location);
      }
    } else if (value.kind === 'literal') {
      checkLiteral(value.value, location);
    } else errors.push(`${location}: unsupported contract value`);
  };

  if (
    !/^cdr-[a-z][a-z0-9-]*$/.test(contract.component) ||
    contract.prefix !== `--${contract.component}`
  ) {
    errors.push('component and prefix must name the same Cedar component');
  }
  if (contract.interaction && !interactions.has(contract.interaction)) {
    errors.push(`interaction "${contract.interaction}" is outside the semantic taxonomy`);
  }
  for (const [key, value] of Object.entries(contract.defaults))
    checkValue(value, `defaults.${key}`);
  for (const [size, values] of Object.entries(contract.sizes ?? {})) {
    for (const [key, value] of Object.entries(values)) checkValue(value, `sizes.${size}.${key}`);
  }
  const roles: Role[] = ['surface', 'text', 'border', 'icon'];
  const states: InteractionState[] = ['rest', 'hover', 'focus-visible', 'active', 'disabled'];
  const properties = { surface: 'background', text: 'text', border: 'border', icon: 'fill' };
  const consumedLegacy = new Set<string>();
  for (const [name, variant] of Object.entries(contract.variants)) {
    if (!identities.has(variant.identity))
      errors.push(
        `variants.${name}: identity "${variant.identity}" is outside the semantic taxonomy`,
      );
    for (const key of Object.keys(variant)) {
      if (!allowedVariantKeys.has(key))
        errors.push(`variants.${name}.${key}: unknown variant field`);
    }
    if (!variant.rest || !Object.keys(variant.rest).length)
      errors.push(`variants.${name}: missing rest slots`);
    for (const state of states) {
      const slots = variant[state];
      if (contract.recipe === 'pressable' && (!slots || roles.some((role) => !slots[role]))) {
        errors.push(`variants.${name}.${state}: pressable recipes require every color role`);
      }
      for (const [role, value] of Object.entries(slots ?? {})) {
        const location = `variants.${name}.${state}.${role}`;
        if (!roles.includes(role as Role)) {
          errors.push(`${location}: unknown role`);
          continue;
        }
        const semanticName =
          typeof value === 'string'
            ? `cdr-color-${contract.interaction ? `${contract.interaction}-` : ''}${role}-${value}`
            : `cdr-color-${value.fullPath}`;
        requireSemantic(semanticName, location);
        const key = `${name}/${properties[role as Role]}${state === 'rest' ? '' : `-${state}`}`;
        if (contract.legacy?.[key]) consumedLegacy.add(key);
        else if (!manifest.semanticTokens.has(semanticName))
          errors.push(`${location}: missing published fallback for ${key}`);
      }
    }
    for (const [key, value] of Object.entries(variant.extras ?? {})) {
      // Extras are named slots outside the role matrix: unlike variant slots
      // they may be literal-backed by design (e.g. an intentional halo color),
      // so the legacy-or-manifest rule below does not apply to them.
      if (value) checkValue(value, `variants.${name}.extras.${key}`);
      else if (contract.legacy?.[`${name}/${key}`]) consumedLegacy.add(`${name}/${key}`);
      else errors.push(`variants.${name}.extras.${key}: missing fallback`);
    }
  }
  if (contract.conditions && Object.keys(contract.conditions).length) {
    errors.push('conditions are not generated; declare consumed slots or variants instead');
  }
  if (
    contract.foundationAssignments &&
    Object.values(contract.foundationAssignments).some((values) => Object.keys(values ?? {}).length)
  ) {
    errors.push('foundationAssignments are not generated; use defaults instead');
  }
  if (contract.recipe && (contract.interaction !== 'action' || contract.recipe !== 'pressable')) {
    errors.push('only the action/pressable CSS recipe is implemented');
  }
  for (const [key, name] of Object.entries(contract.legacy ?? {})) {
    requireToken(name, `legacy.${key}`);
    if (!consumedLegacy.has(key)) errors.push(`legacy.${key}: unused fallback`);
  }
  for (const warning of warnings) console.warn(`  ⚠ ${warning}`);
  if (errors.length)
    throw new Error(
      `Contract validation failed for ${contract.component}:\n${errors.map((error) => `  ${error}`).join('\n')}`,
    );
}
