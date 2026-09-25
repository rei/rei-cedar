/**
 * Token validation for component token contracts.
 *
 * Loads the published @rei/cdr-tokens manifest and checks contract shape,
 * known foundation references, and legacy Sass token names. Semantic color
 * paths are still design-approved future names, not published runtime tokens.
 *
 * While the semantic token layer is not yet fully shipped, validation falls
 * back to warning about unknown semantic combinations. Legacy token references
 * are checked against the published @rei/cdr-tokens JSON manifests.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  ColorRole,
  ColorSlotMap,
  ColorSlotValue,
  ComponentTokenContract,
  InteractionState,
} from './types';
import { slotVar } from './naming';

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
 * Currently scans the foundation JSON files for known tokens. Semantic tokens
 * are not yet published, so the semantic set is empty until the pipeline
 * produces a manifest.
 */
export async function loadTokenManifest(): Promise<TokenManifest> {
  const knownTokens = new Set<string>();
  const semanticTokens = new Set<string>();

  const tokenJsonDir = path.join(
    __dirname,
    '../../node_modules/@rei/cdr-tokens/dist/rei-dot-com/json/foundations',
  );

  if (fs.existsSync(tokenJsonDir)) {
    const files = fs.readdirSync(tokenJsonDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const content = JSON.parse(fs.readFileSync(path.join(tokenJsonDir, file), 'utf-8'));
      extractTokenNames(content, knownTokens);
    }
  }

  // Load optional local semantic manifests if present. The normalized color
  // list supplies approved future runtime names before those tokens ship.
  const semanticManifestPath = path.join(__dirname, '../../canonical/tokens.json');
  if (fs.existsSync(semanticManifestPath)) {
    const content = JSON.parse(fs.readFileSync(semanticManifestPath, 'utf-8'));
    extractSemanticTokens(content, semanticTokens);
  }
  const semanticColorListPath = path.join(
    __dirname,
    '../../.agents/skills/semantic-token-migration/references/semantic-colors.json',
  );
  if (fs.existsSync(semanticColorListPath)) {
    const content = JSON.parse(fs.readFileSync(semanticColorListPath, 'utf-8'));
    extractSemanticTokens(content, semanticTokens);
  }

  return { knownTokens, semanticTokens };
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

/** Validate a contract against the manifest. */
export function validateContract(contract: ComponentTokenContract, manifest: TokenManifest) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate token references in defaults
  for (const [key, value] of Object.entries(contract.defaults)) {
    if (value.kind === 'token') {
      if (!manifest.knownTokens.has(value.name)) {
        warnings.push(
          `${contract.component}: defaults.${key} references unknown token "${value.name}"`,
        );
      }
    }
  }

  // Validate sizes
  if (contract.sizes) {
    for (const [size, dims] of Object.entries(contract.sizes)) {
      for (const [key, value] of Object.entries(dims)) {
        if (value.kind === 'token' && !manifest.knownTokens.has(value.name)) {
          warnings.push(
            `${contract.component}: sizes.${size}.${key} references unknown token "${value.name}"`,
          );
        }
      }
    }
  }

  if (Object.keys(contract.defaults).length === 0) {
    errors.push(
      `${contract.component}: defaults must include values captured from the existing stylesheet`,
    );
  }
  if (contract.recipe && contract.interaction !== 'action') {
    errors.push(
      `${contract.component}: recipe "${contract.recipe}" currently requires interaction "action"`,
    );
  }

  // Components declare only the roles and states they actually style.
  // `rest` must contain at least one role; additional states are optional.
  const validRoles = new Set<Role>(['surface', 'text', 'border', 'icon']);
  const missingSemanticSlots = new Map<string, Set<string>>();
  const validSlotValue = (value: unknown): boolean => {
    if (typeof value === 'string') return /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value);
    if (value && typeof value === 'object' && 'fullPath' in value) {
      const fullPath = (value as { fullPath: unknown }).fullPath;
      return typeof fullPath === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(fullPath);
    }
    return false;
  };
  const states: InteractionState[] = ['rest', 'hover', 'focus-visible', 'active', 'disabled'];
  for (const [variantName, variant] of Object.entries(contract.variants)) {
    if (!variant.rest || Object.keys(variant.rest).length === 0) {
      errors.push(
        `${contract.component}: variants.${variantName}.rest must declare at least one color role`,
      );
      continue;
    }
    for (const state of states) {
      const slotMap = variant[state] as Partial<ColorSlotMap> | undefined;
      if (!slotMap) continue;
      if (Object.keys(slotMap).length === 0) {
        errors.push(
          `${contract.component}: variants.${variantName}.${state} is empty; omit unsupported states`,
        );
        continue;
      }
      for (const [role, value] of Object.entries(slotMap)) {
        const location = `${contract.component}: variants.${variantName}.${state}.${role}`;
        if (!validRoles.has(role as Role)) {
          errors.push(`${location} is not a supported color role`);
        } else if (!validSlotValue(value)) {
          errors.push(
            `${location} must be a semantic suffix or a fullPath with bare path segments`,
          );
        } else if (manifest.semanticTokens.size > 0) {
          const semanticName = slotVar(
            contract.interaction,
            role as ColorRole,
            value as ColorSlotValue,
          ).replace(/^--/, '');
          if (!manifest.semanticTokens.has(semanticName)) {
            const locations = missingSemanticSlots.get(semanticName) ?? new Set<string>();
            locations.add(`variants.${variantName}.${state}.${role}`);
            missingSemanticSlots.set(semanticName, locations);
          }
        }
      }
    }
  }

  for (const [semanticName, locations] of missingSemanticSlots) {
    warnings.push(
      `${contract.component}: semantic color --${semanticName} is not in the approved color list (used by ${[...locations].join(', ')})`,
    );
  }

  // Validate legacy token references
  if (contract.legacy) {
    for (const [key, tokenName] of Object.entries(contract.legacy)) {
      if (!tokenName.startsWith('cdr-')) {
        warnings.push(
          `${contract.component}: legacy["${key}"] token "${tokenName}" does not look like a Cedar token name`,
        );
      }
    }
  }

  for (const warning of warnings) console.warn(`  ⚠ ${warning}`);
  for (const error of errors) {
    console.error(`  ✖ ${error}`);
  }
  if (errors.length > 0) {
    throw new Error(`Contract validation failed for ${contract.component}`);
  }
}
