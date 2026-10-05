#!/usr/bin/env node
/**
 * Builds the video's data model from the repository token sources.
 *
 * Sources (resolved from the repository root, two levels above this project):
 *   - web-tokens.json
 *   - .agents/skills/semantic-token-migration/references/semantic-colors.json
 *
 * Output: src/data/token-model.json (gitignored; `npm run build:data` before dev/render)
 *
 * Matching rule: a palette step matches a semantic color when their hex values
 * are exactly equal (case-insensitive). The video claims "palette steps that are
 * in semantic-colors.json", so the match is deliberately strict — no fuzzy
 * matching and no taxonomy-based guessing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const videoRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(videoRoot, '..');

const WEB_TOKENS_PATH = path.join(repoRoot, 'web-tokens.json');
const SEMANTIC_COLORS_PATH = path.join(
  repoRoot,
  '.agents',
  'skills',
  'semantic-token-migration',
  'references',
  'semantic-colors.json',
);
const OUTPUT_PATH = path.join(videoRoot, 'src', 'data', 'token-model.json');

const readJson = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Missing ${path.relative(repoRoot, filePath)}. This project expects to live inside the rei-cedar checkout.`,
    );
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const parseHue = (description) => {
  const match = /oklch\(\s*[\d.]+\s+[\d.]+\s+([\d.]+)\s*\)/.exec(description ?? '');
  return match ? Number(match[1]) : null;
};

const webTokens = readJson(WEB_TOKENS_PATH);
const semanticColors = readJson(SEMANTIC_COLORS_PATH);

// Flatten semantic-colors.json leaves into { name, path, group, hex }.
const semanticLeaves = [];
const walkSemantic = (node, trail) => {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (value && typeof value === 'object' && 'name' in value && 'value' in value) {
      const segments = [...trail, key];
      semanticLeaves.push({
        name: String(value.name),
        path: segments.join('/'),
        group: segments[0] ?? 'unknown',
        hex: String(value.value).toUpperCase(),
      });
    } else if (value && typeof value === 'object') {
      walkSemantic(value, [...trail, key]);
    }
  }
};
walkSemantic(semanticColors.color ?? semanticColors, []);

const semanticByHex = new Map();
for (const leaf of semanticLeaves) {
  const refs = semanticByHex.get(leaf.hex) ?? [];
  refs.push({ name: leaf.name, path: leaf.path, group: leaf.group, hex: leaf.hex });
  semanticByHex.set(leaf.hex, refs);
}

const palettes = Object.entries(webTokens)
  .filter(([key]) => !key.startsWith('$'))
  .map(([name, tokenGroup]) => {
    const steps = Object.entries(tokenGroup)
      .filter(([key]) => !key.startsWith('$'))
      .map(([step, token]) => {
        const hex = String(token.$value?.hex ?? '').toUpperCase();
        return {
          step,
          order: Number.parseInt(step, 10),
          hex,
          oklch: token.$description ?? '',
          hue: parseHue(token.$description),
          semantic: semanticByHex.get(hex) ?? [],
        };
      })
      .sort((a, b) => a.order - b.order);
    return {
      name,
      steps,
      matchedCount: steps.filter((step) => step.semantic.length > 0).length,
    };
  });

const stepCount = palettes.reduce((total, palette) => total + palette.steps.length, 0);
const matchedStepCount = palettes.reduce((total, palette) => total + palette.matchedCount, 0);
const matchedPaletteCount = palettes.filter((palette) => palette.matchedCount > 0).length;

const paletteHexes = new Set(palettes.flatMap((palette) => palette.steps.map((step) => step.hex)));
const matchedLeaves = semanticLeaves.filter((leaf) => paletteHexes.has(leaf.hex));
const unmatchedHexes = [...new Set(semanticLeaves.map((leaf) => leaf.hex))]
  .filter((hex) => !paletteHexes.has(hex))
  .sort();

// One spotlight example per semantic category: prefer text/surface over
// border/icon roles, then the shortest path, so the callout reads as a token.
const roleOrder = ['text', 'surface', 'border', 'icon'];
const roleRank = (tokenPath) => {
  const segments = tokenPath.split('/');
  const role = segments.length > 1 ? segments[segments.length - 2] : segments[0];
  const index = roleOrder.indexOf(role);
  return index === -1 ? roleOrder.length : index;
};

const shortestRef = (refs) =>
  [...refs].sort((a, b) => {
    const byRole = roleRank(a.path) - roleRank(b.path);
    if (byRole !== 0) return byRole;
    return a.path.length - b.path.length || a.path.localeCompare(b.path);
  })[0];

const rgbOf = (hex) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return { r: ((value >> 16) & 255) / 255, g: ((value >> 8) & 255) / 255, b: (value & 255) / 255 };
};

const hueOf = (hex) => {
  const { r, g, b } = rgbOf(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 0;
  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  return (hue * 60 + 360) % 360;
};

const chromaOf = (hex) => {
  const { r, g, b } = rgbOf(hex);
  return Math.max(r, g, b) - Math.min(r, g, b);
};

const hueDistance = (a, b) => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

// Spotlight examples: the palette steps shared by the most semantic tokens,
// constrained to different palettes and visually distinct hues.
const spotlightCandidates = palettes
  .filter((palette) => palette.matchedCount > 0)
  .map((palette) => {
    const best = palette.steps
      .filter((step) => step.semantic.length > 0)
      .reduce((a, b) => (b.semantic.length > a.semantic.length ? b : a));
    const ref = shortestRef(best.semantic);
    return {
      name: ref.name,
      path: ref.path,
      group: ref.group,
      hex: best.hex,
      palette: palette.name,
      step: best.step,
      tokenCount: best.semantic.length,
      hue: hueOf(best.hex),
      chroma: chromaOf(best.hex),
    };
  })
  .sort((a, b) => b.tokenCount - a.tokenCount || a.palette.localeCompare(b.palette));

const picked = [];
const tryPick = (minHueDistance, maxNeutrals) => {
  let neutrals = picked.filter((example) => example.chroma <= 0.06).length;
  for (const candidate of spotlightCandidates) {
    if (picked.length >= 6) return;
    if (picked.some((example) => example.palette === candidate.palette)) continue;
    const isNeutral = candidate.chroma <= 0.06;
    if (isNeutral && neutrals >= maxNeutrals) continue;
    const hueClash = picked.some(
      (example) =>
        example.chroma > 0.06 &&
        !isNeutral &&
        hueDistance(example.hue, candidate.hue) < minHueDistance,
    );
    if (hueClash) continue;
    if (isNeutral) neutrals += 1;
    picked.push(candidate);
  }
};
tryPick(30, 1);
tryPick(12, 2);
tryPick(0, 3);

const examples = picked.map(({ hue, chroma, ...example }) => example);

// ─── Semantic structure ──────────────────────────────────────────────────────
// The six categories (four interaction families plus Universal and Graphics), each with
// its namespaces, role breakdown and every token resolved to a primitive step.

const CATEGORY_DEFS = [
  {
    id: 'universal',
    label: 'Universal',
    interaction: null,
    namespaces: ['surface', 'border', 'text'],
    description: 'Plain content, surfaces, borders and text with no interaction or status meaning.',
  },
  {
    id: 'graphic',
    label: 'Graphics',
    interaction: null,
    namespaces: ['graphic'],
    description: 'Decorative or informational visuals with no interactive state.',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    interaction: 'feedback',
    namespaces: ['feedback'],
    description: 'System status, validation, loading, warning, success and error.',
  },
  {
    id: 'action',
    label: 'Action',
    interaction: 'action',
    namespaces: ['action'],
    description: 'Commits, submits, navigates or triggers something elsewhere.',
  },
  {
    id: 'control',
    label: 'Control',
    interaction: 'control',
    namespaces: ['control'],
    description: 'Manipulates or configures the interface in place.',
  },
  {
    id: 'selection',
    label: 'Selection',
    interaction: 'selection',
    namespaces: ['selection'],
    description: 'Expresses a choice among alternatives that persists visually.',
  },
];

const structureRoleOrder = ['surface', 'border', 'text', 'icon'];
const roleOf = (tokenPath) => {
  const segments = tokenPath.split('/');
  return segments.length > 1 ? segments[segments.length - 2] : segments[0];
};

// First palette/step in source order that carries a given hex.
const sourceByHex = new Map();
for (const palette of palettes) {
  for (const step of palette.steps) {
    if (!sourceByHex.has(step.hex)) {
      sourceByHex.set(step.hex, { palette: palette.name, step: step.step });
    }
  }
}

const structure = CATEGORY_DEFS.map((definition) => {
  const tokens = semanticLeaves
    .filter((leaf) => definition.namespaces.includes(leaf.group))
    .sort(
      (a, b) =>
        structureRoleOrder.indexOf(roleOf(a.path)) - structureRoleOrder.indexOf(roleOf(b.path)) ||
        a.path.localeCompare(b.path),
    )
    .map((leaf) => {
      const source = sourceByHex.get(leaf.hex);
      return {
        name: leaf.name,
        path: leaf.path,
        group: leaf.group,
        hex: leaf.hex,
        palette: source?.palette ?? null,
        step: source?.step ?? null,
      };
    });

  const roleCounts = new Map();
  for (const token of tokens) {
    const role = roleOf(token.path);
    roleCounts.set(role, (roleCounts.get(role) ?? 0) + 1);
  }

  return {
    ...definition,
    count: tokens.length,
    roles: [...roleCounts.entries()]
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => structureRoleOrder.indexOf(a.role) - structureRoleOrder.indexOf(b.role)),
    swatches: [...new Set(tokens.map((token) => token.hex))].slice(0, 14),
    tokens,
  };
});

// Resolve the old colors from the installed Cedar token package, never from a
// guessed nearest palette color. Used by the filmed migration mapping table.
const legacyColors = {};
const legacyRoot = path.join(repoRoot, 'node_modules/@rei/cdr-tokens/dist/rei-dot-com/json');
const walkLegacy = (node) => {
  if (!node || typeof node !== 'object') return;
  if (typeof node.name === 'string' && /^#[0-9a-f]{6}$/i.test(node.$value ?? '')) {
    legacyColors[`--${node.name}`] = node.$value.toUpperCase();
  } else {
    Object.values(node).forEach(walkLegacy);
  }
};
const readLegacyDirectory = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) readLegacyDirectory(fullPath);
    else if (entry.name.endsWith('.json')) walkLegacy(readJson(fullPath));
  }
};
if (!fs.existsSync(legacyRoot))
  throw new Error('Install the repository dependencies to resolve legacy Cedar color values.');
readLegacyDirectory(legacyRoot);

const model = {
  source: {
    webTokens: 'web-tokens.json',
    semanticColors: '.agents/skills/semantic-token-migration/references/semantic-colors.json',
    generatedAt: new Date().toISOString(),
  },
  meta: {
    paletteCount: palettes.length,
    matchedPaletteCount,
    stepCount,
    matchedStepCount,
    semanticTokenCount: semanticLeaves.length,
    matchedSemanticTokenCount: matchedLeaves.length,
    unmatchedHexes,
  },
  examples,
  legacyColors,
  structure,
  palettes,
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(model, null, 2)}\n`);

const relativeOutput = path.relative(repoRoot, OUTPUT_PATH);
console.log(`token model written to ${relativeOutput}`);
console.log(`  palettes: ${matchedPaletteCount}/${palettes.length} contribute a matched step`);
console.log(`  steps:    ${matchedStepCount}/${stepCount} matched by exact hex`);
console.log(`  tokens:   ${matchedLeaves.length}/${semanticLeaves.length} semantic colors matched`);
if (unmatchedHexes.length > 0) {
  console.log(`  no palette step for: ${unmatchedHexes.join(', ')}`);
}
