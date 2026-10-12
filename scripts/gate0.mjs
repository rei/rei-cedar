#!/usr/bin/env node
/**
 * gate0.mjs — Terminal (TUI) before/after color card for Gate 0.
 *
 * Renders the legacy color vs. the proposed semantic color side by side
 * using ANSI truecolor: header bars, a sample paragraph in each color,
 * and swatch + token-name meta lines. No browser, no temp files.
 *
 * Usage:
 *   node scripts/gate0.mjs --before "#4B4A48" --after "#746E63" \
 *     --before-name "cdr-color-text-primary" --after-name "--cdr-text-neutral" \
 *     --title "Gate 0 — CdrAbstract · Universal" \
 *     --text "Fueling well is the key..." \
 *     --note "Not pixel-identical..."
 *
 * All flags optional; sensible fallbacks keep the card renderable.
 */

const args = process.argv.slice(2);
const valueFlags = new Set([
  '--before',
  '--after',
  '--before-name',
  '--after-name',
  '--title',
  '--text',
  '--note',
  '--sub',
  '--reason',
  '--state',
  '--after-extra',
]);
// Supports `--flag value` and `--flag=value` forms. An explicitly empty value
// (`--flag ""`) is honored as empty; a dangling flag warns and uses fallback.
const get = (flag, fallback = '') => {
  const eq = args.find((a) => a.startsWith(flag + '='));
  if (eq !== undefined) return eq.slice(flag.length + 1);
  const i = args.indexOf(flag);
  if (i === -1) return fallback;
  if (i + 1 >= args.length || valueFlags.has(args[i + 1])) {
    console.error(`warning: ${flag} has no value, using default`);
    return fallback;
  }
  return args[i + 1];
};

const usedFallback = (flag) => !args.includes(flag) && !args.some((a) => a.startsWith(flag + '='));

// Neutral placeholders — never pilot values. Warn so a bare invocation that
// renders these can't be mistaken for a real Gate 0 card.
const beforeHex = get('--before', '#808080');
const afterHex = get('--after', '#C0C0C0');
if (usedFallback('--before') || usedFallback('--after')) {
  console.error('warning: using placeholder colors — pass --before/--after for a real card');
}
const beforeName = get('--before-name', 'legacy');
const afterName = get('--after-name', 'semantic');
const title = get('--title', 'Gate 0');
const sample =
  get('--text', 'Fueling well is the key to longevity and improvement in running.') || '';
const note = get('--note', '');
const sub = get('--sub', '');
const compactRequested = args.includes('--compact');
const reason = get('--reason', '');
const state = get('--state', '');

const isHex = (s) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s);
for (const [flag, value] of [
  ['--before', beforeHex],
  ['--after', afterHex],
]) {
  if (!isHex(value)) {
    console.error(`Invalid ${flag} "${value}": expected #rgb or #rrggbb`);
    process.exit(1);
  }
}

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const v =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const fg = ([r, g, b]) => `\x1b[38;2;${r};${g};${b}m`;
const bg = ([r, g, b]) => `\x1b[48;2;${r};${g};${b}m`;
const reset = '\x1b[0m';
const bold = '\x1b[1m';
const dim = '\x1b[2m';

/** White or black text, whichever reads on the given background. */
const onColor = (hex) => {
  const [r, g, b] = hexToRgb(hex);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? '\x1b[30m' : '\x1b[97m';
};

// Honor COLUMNS for piped output; never lay out wider than the real terminal.
const termCols = Number(process.env.COLUMNS) || process.stdout.columns || 100;
const width = Math.max(24, Math.min(termCols, 120));
const gap = 3;
const panelW = Math.floor((width - gap) / 2);
const compact = compactRequested || width < 64;

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  const push = (s) => {
    if (s) lines.push(s);
  };
  for (let word of words) {
    // Hard-break tokens longer than the panel instead of blowing out the layout.
    while (word.length > max) {
      const room = max - line.length;
      if (room > 1) {
        line += word.slice(0, room);
        word = word.slice(room);
      }
      push(line.trimEnd());
      line = '';
    }
    if ((line + ' ' + word).trim().length > max) {
      push(line.trimEnd());
      line = '';
    }
    line += word + ' ';
  }
  push(line.trimEnd());
  return lines;
}

/** Truncate a single-line meta value that would otherwise break the layout. */
function trunc(s, max) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

/** Pad a (possibly ANSI-decorated) string to the panel width. */
function pad(visible, w, decorated) {
  const padLen = Math.max(0, w - visible.length);
  return decorated + ' '.repeat(padLen);
}

function panel(tag, hex, name, extra = '') {
  const rgb = hexToRgb(hex);
  const lines = [];
  const barLabel = ` ${tag} `;
  lines.push({
    v: barLabel,
    d: `${bg(rgb)}${onColor(hex)}${bold}${barLabel}${reset}`,
  });
  for (const wl of wrap(sample, panelW - 4)) {
    const inner = `  ${wl}`;
    lines.push({ v: inner, d: `${fg(rgb)}${inner}${reset}` });
  }
  const swatch = '■■';
  const meta = trunc(`  ${name} · ${hex}${extra ? ` · ${extra}` : ''}`, panelW);
  lines.push({ v: meta, d: `${fg(rgb)}${swatch}${reset}${dim}${meta}${reset}` });
  return lines;
}

const left = panel('BEFORE — LEGACY', beforeHex, beforeName);
const right = panel('AFTER — SEMANTIC', afterHex, afterName, get('--after-extra', ''));

console.log(`\n${bold}${trunc(title, width)}${reset}`);
if (compact) {
  const sw = (hex) => `${bg(hexToRgb(hex))}  ${reset}`;
  console.log(`${sw(beforeHex)}${trunc(` OLD  ${beforeName} · ${beforeHex}`, width - 4)}`);
  console.log(`${sw(afterHex)}${trunc(` NEW  ${afterName} · ${afterHex}`, width - 4)}`);
  if (state) console.log(`State: ${state}`);
  if (reason) console.log(`\n${wrap(`Why: ${reason}`, width).join('\n')}`);
  if (note) console.log(`${wrap(`⚠ ${note}`, width).join('\n')}\n`);
  process.exit(0);
}
if (sub) console.log(`${dim}${sub}${reset}`);
console.log('-'.repeat(width));

const rows = Math.max(left.length, right.length);
for (let i = 0; i < rows; i++) {
  const l = left[i] || { v: '', d: '' };
  const r = right[i] || { v: '', d: '' };
  console.log(`${pad(l.v, panelW, l.d)}${' '.repeat(gap)}${r.d}`);
}
console.log('-'.repeat(width));
if (note) console.log(`⚠️  ${note}\n`);
