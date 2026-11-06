import fs from 'fs';
import path from 'path';
import { normalizeCssColor } from './color';

export type TokenColorMap = Map<string, string>;

const COLOR_DECLARATION = /--(cdr-[a-z0-9-]+)\s*:\s*(#[0-9a-f]{3,8}|rgba?\([^)]*\))\s*;/gi;

/** Extract color custom properties from a compiled token stylesheet. */
export function parseTokenColors(css: string): TokenColorMap {
  const colors: TokenColorMap = new Map();
  for (const match of css.matchAll(COLOR_DECLARATION)) {
    const [, name, rawValue] = match;
    const normalized = normalizeCssColor(rawValue);
    if (normalized) colors.set(`--${name}`, normalized);
  }
  return colors;
}

/** Load the installed @rei/cdr-tokens foundation colors used by component maps. */
export function loadInstalledTokenColors(projectRoot = process.cwd()): TokenColorMap {
  const foundationsDir = path.join(
    projectRoot,
    'node_modules/@rei/cdr-tokens/dist/rei-dot-com/css/foundations',
  );

  if (!fs.existsSync(foundationsDir)) {
    throw new Error(
      `Could not find the installed token foundations at ${foundationsDir}. Run pnpm install first.`,
    );
  }

  const colors: TokenColorMap = new Map();
  for (const file of fs.readdirSync(foundationsDir).sort()) {
    if (!file.endsWith('.css')) continue;
    const parsed = parseTokenColors(fs.readFileSync(path.join(foundationsDir, file), 'utf8'));
    for (const [name, value] of parsed) colors.set(name, value);
  }
  return colors;
}

export function tokenCssVar(name: string): string {
  return name.startsWith('--') ? name : `--${name}`;
}
