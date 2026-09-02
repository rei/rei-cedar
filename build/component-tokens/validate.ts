/**
 * Token validation for component token contracts.
 *
 * Loads the published token manifest from @rei/cdr-tokens and validates that
 * the contract's token references and generated semantic custom properties
 * can be satisfied by the token system.
 *
 * While the semantic token layer is not yet fully shipped, validation falls
 * back to warning about unknown semantic combinations. Legacy token references
 * are checked against the published @rei/cdr-tokens JSON manifests.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ComponentTokenContract, ColorSlotMap, InteractionState } from './types';

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

  // Load optional local semantic manifest if present
  const semanticManifestPath = path.join(__dirname, '../../canonical/tokens.json');
  if (fs.existsSync(semanticManifestPath)) {
    const content = JSON.parse(fs.readFileSync(semanticManifestPath, 'utf-8'));
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

  // Validate variants have all required roles and states
  for (const [variantName, variant] of Object.entries(contract.variants)) {
    const requiredRoles: Role[] = ['surface', 'text', 'border', 'icon'];
    const requiredStates: InteractionState[] = [
      'rest',
      'hover',
      'focus-visible',
      'active',
      'disabled',
    ];

    for (const state of requiredStates) {
      const slotMap = variant[state] as ColorSlotMap | undefined;
      if (!slotMap) {
        errors.push(`${contract.component}: variants.${variantName} missing state "${state}"`);
        continue;
      }
      for (const role of requiredRoles) {
        if (!(role in slotMap) || !slotMap[role]) {
          errors.push(
            `${contract.component}: variants.${variantName}.${state} missing role "${role}"`,
          );
        }
      }
    }
  }

  // Validate legacy token references
  if (contract.legacy) {
    for (const [key, tokenName] of Object.entries(contract.legacy)) {
      // Legacy tokens are Sass variables; we can't validate them against the JSON manifest directly,
      // but they should match tokens.$cdr-* so the Sass compile will catch typos.
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
