#!/usr/bin/env node
/**
 * visual-gallery.mjs — Before/after image gallery for migration gates.
 *
 * Builds a static HTML page from baseline PNGs (Gate 1: before only;
 * Gate 5: before + after side by side) and opens it in the default browser.
 *
 * Usage:
 *   Gate 1: node scripts/visual-gallery.mjs --before test/visual-baseline/cdr-abstract
 *   Gate 5: node scripts/visual-gallery.mjs --before test/visual-baseline/cdr-abstract \
 *             --after test/visual-after/cdr-abstract
 *
 * Flags:
 *   --before <dir>   baseline PNG directory (required)
 *   --after <dir>    after PNG directory (optional; omit at Gate 1)
 *   --delta <dir>    visual-diff output directory (optional middle pane with
 *                    changed-pixel badges from delta-summary.json)
 *   --title <text>   page title
 *   --no-open        print the file path without opening a browser
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const get = (flag, fallback = '') => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const beforeDir = get('--before');
const afterDir = get('--after', '');
const deltaDir = get('--delta', '');
const title = get('--title', 'Visual comparison');
const noOpen = args.includes('--no-open');

if (!beforeDir || !fs.existsSync(beforeDir)) {
  console.error(`Before directory not found: ${beforeDir}`);
  process.exit(1);
}

const isPng = (f) => f.toLowerCase().endsWith('.png');
const shots = fs.readdirSync(beforeDir).filter(isPng).sort();
if (shots.length === 0) {
  console.error(`warning: no .png files in ${beforeDir}`);
}

// Escape user-controlled text for HTML; encode file URLs so spaces/#/? survive.
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fileUrl = (dir, f) => pathToFileURL(path.resolve(dir, f)).href;

// Per-shot changed-pixel stats (written by visual-diff.mjs); shown as a badge
// on the Delta pane so an all-white delta reads as "parity", not "broken".
let summary = {};
if (deltaDir) {
  const summaryFile = path.join(path.resolve(deltaDir), 'delta-summary.json');
  if (fs.existsSync(summaryFile)) {
    try {
      summary = JSON.parse(fs.readFileSync(summaryFile, 'utf-8'));
    } catch {
      summary = {};
    }
  }
}
const badge = (f) => {
  const s = summary[f];
  // Guard malformed entries (missing/NaN counts) — a bad badge must never
  // crash the gallery or print "undefined".
  if (!s || !Number.isFinite(s.changed)) return '';
  if (s.changed === 0) return ' · 0 px — parity';
  const pct = typeof s.pct === 'string' || Number.isFinite(s.pct) ? s.pct : '?';
  return ` · ${s.changed.toLocaleString()} px (${pct}%)`;
};

const hasAfter = Boolean(afterDir && fs.existsSync(afterDir));
if (afterDir && !hasAfter) {
  console.error(`After directory not found: ${afterDir}`);
  process.exit(1);
}
if (deltaDir && !fs.existsSync(deltaDir)) {
  console.error(`Delta directory not found: ${deltaDir}`);
  process.exit(1);
}

const cards = shots
  .map((f) => {
    const name = f.replace(/\.png$/i, '');
    const deltaFile = deltaDir ? path.join(deltaDir, f) : '';
    const deltaPane =
      deltaFile && fs.existsSync(deltaFile)
        ? `<div class="pane"><div class="tag delta">Delta${badge(f)}</div><a href="${fileUrl(deltaDir, f)}" target="_blank"><img src="${fileUrl(deltaDir, f)}" alt="${esc(name)} delta"></a></div>`
        : '';
    const link = (dir) => {
      const url = fileUrl(dir, f);
      return `<a href="${url}" target="_blank"><img src="${url}" alt="${esc(name)}"></a>`;
    };
    const beforePaneFull = `<div class="pane"><div class="tag before">Before</div>${link(beforeDir)}</div>`;
    if (!hasAfter) {
      return `<section class="card"><h2>${esc(name)}</h2><div class="panes single">${beforePaneFull}</div></section>`;
    }
    const afterPane = fs.existsSync(path.join(afterDir, f))
      ? `<div class="pane"><div class="tag after">After</div>${link(afterDir)}</div>`
      : `<div class="pane"><div class="tag after">After</div><div class="ph">Missing after screenshot: ${f}</div></div>`;
    return `<section class="card"><h2>${esc(name)}</h2><div class="panes">${beforePaneFull}${deltaPane}${afterPane}</div></section>`;
  })
  .join('\n');

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
body{font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;margin:0;padding:24px 32px;background:#f4f4f5;color:#222}
h1{font-size:22px;margin:0 0 4px}.sub{font-size:13px;color:#666;margin-bottom:20px}
.card{background:#fff;border:1px solid #ddd;border-radius:10px;margin-bottom:20px;overflow:hidden}
.card h2{font-size:14px;margin:0;padding:10px 16px;border-bottom:1px solid #eee}
.panes{display:flex}.pane{flex:1;min-width:0}.pane+.pane{border-left:1px solid #eee}
.tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 16px}
.before{background:#4B4A48;color:#fff}.after{background:#746E63;color:#fff}
.delta{background:#b00020;color:#fff}
.pane img{width:100%;height:300px;object-fit:cover;object-position:top;display:block;background:#fff}
.pane a{display:block}
.ph{padding:40px 16px;color:#888;font-size:13px;text-align:center}
.panes.single .pane{max-width:900px}
</style></head><body>
<h1>${esc(title)}</h1><div class="sub">${shots.length} screenshots · ${afterDir ? 'before vs after' : 'baseline (before) only'} · panes cropped to top, click any image for full size</div>
${cards}</body></html>`;

const outDir = '/tmp/visual-gallery';
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'index.html');
fs.writeFileSync(out, html);
console.log(`Gallery: ${out} (${shots.length} screenshots)`);

if (!noOpen) {
  try {
    const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
    execSync(`${opener} "${out}"`, { stdio: 'ignore' });
    console.log('Opened in browser.');
  } catch {
    console.log(`Open manually: file://${out}`);
  }
}
