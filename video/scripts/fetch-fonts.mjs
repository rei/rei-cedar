#!/usr/bin/env node
/**
 * Downloads the Cedar web fonts that Storybook loads from rei.com
 * (see `src/styles/cdr-fonts.scss` and `.storybook/manager.css`) into
 * `video/public/fonts`, so studio previews and renders are self-contained.
 *
 * Idempotent: existing files are kept. Fonts are REI-proprietary and stay
 * gitignored — this script only mirrors what the Storybook chrome already
 * loads from //www.rei.com/satchel/media/font-optimized/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const videoRoot = path.resolve(scriptDir, '..');
const outDir = path.join(videoRoot, 'public', 'fonts');

const BASE_URL = 'https://www.rei.com/satchel/media/font-optimized';
const FONTS = [
  ['Graphik/Graphik-VF-Web-Subset.woff2', 'Graphik-VF-Web-Subset.woff2'],
  ['Pressura/gt-pressura-mono-regular.woff2', 'gt-pressura-mono-regular.woff2'],
  ['Pressura/gt-pressura-mono-bold.woff2', 'gt-pressura-mono-bold.woff2'],
  ['Stuart/REIStuart-VF-Web-Subset.woff2', 'REIStuart-VF-Web-Subset.woff2'],
];

fs.mkdirSync(outDir, { recursive: true });

let downloaded = 0;
for (const [remotePath, fileName] of FONTS) {
  const target = path.join(outDir, fileName);
  if (fs.existsSync(target) && fs.statSync(target).size > 0) continue;

  const response = await fetch(`${BASE_URL}/${remotePath}`);
  if (!response.ok) {
    throw new Error(`Failed to download ${remotePath}: HTTP ${response.status}`);
  }
  fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  downloaded += 1;
}

console.log(
  downloaded === 0
    ? 'fonts already present in public/fonts'
    : `downloaded ${downloaded} font file(s) to public/fonts`,
);
