#!/usr/bin/env node
/**
 * visual-diff.mjs — Red-pixel delta images for migration comparisons.
 *
 * Zero dependencies: minimal PNG codec (8-bit, non-interlaced; gray/RGB/RGBA)
 * plus a per-pixel Euclidean RGB distance with a noise threshold.
 *
 * Changed pixels render solid red on white; everything else white.
 * Threshold default (2) hides only near-identical pixel noise while retaining
 * subtle semantic changes such as #FAFBF9 → #FCFCFB (distance 3).
 *
 * Usage:
 *   node scripts/visual-diff.mjs --before test/visual-baseline/cdr-abstract \
 *     --after test/visual-after/cdr-abstract --out test/visual-delta/cdr-abstract \
 *     [--threshold 24]
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const args = process.argv.slice(2);
// Supports `--flag value` and `--flag=value` forms. An explicitly empty value
// (`--flag ""`) is honored as empty; a dangling flag warns and uses fallback.
const get = (flag, fallback = '') => {
  const eq = args.find((a) => a.startsWith(flag + '='));
  if (eq !== undefined) return eq.slice(flag.length + 1);
  const i = args.indexOf(flag);
  if (i === -1) return fallback;
  if (i + 1 >= args.length || args[i + 1].startsWith('--')) {
    console.error(`warning: ${flag} has no value, using default`);
    return fallback;
  }
  return args[i + 1];
};

const isPng = (f) => f.toLowerCase().endsWith('.png');

const beforeDir = get('--before');
const afterDir = get('--after');
const outDir = get('--out');
const thresholdRaw = get('--threshold', '2');
const THRESHOLD = Number(thresholdRaw);

if (!beforeDir || !afterDir || !outDir) {
  console.error('Usage: visual-diff.mjs --before <dir> --after <dir> --out <dir> [--threshold N]');
  process.exit(1);
}
if (!fs.existsSync(beforeDir)) {
  console.error(`Before directory not found: ${beforeDir}`);
  process.exit(1);
}
if (!fs.existsSync(afterDir)) {
  console.error(`After directory not found: ${afterDir}`);
  process.exit(1);
}
// A non-numeric threshold makes every comparison report parity (dist > NaN is
// always false) — fail loudly instead of printing a false green gate.
if (!Number.isFinite(THRESHOLD) || THRESHOLD < 0) {
  console.error(`Invalid --threshold "${thresholdRaw}": must be a number >= 0`);
  process.exit(1);
}

// ── CRC32 ────────────────────────────────────────────────────────────────────
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

// ── PNG decode (8-bit, non-interlaced; color types 0/2/6) → RGBA ─────────────
function readPng(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) {
    throw new Error(`${file}: not a PNG`);
  }
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      const interlace = data[12];
      if (bitDepth !== 8) throw new Error(`${file}: only 8-bit supported`);
      if (interlace !== 0) throw new Error(`${file}: interlaced not supported`);
      if (![0, 2, 6].includes(colorType))
        throw new Error(`${file}: color type ${colorType} unsupported`);
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + len;
  }
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const rgba = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const row = raw.subarray(p, p + stride);
    p += stride;
    const cur = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prevRow[x];
      const c = x >= channels ? prevRow[x - channels] : 0;
      let v = row[x];
      if (filter === 1) v = (v + a) & 0xff;
      else if (filter === 2) v = (v + b) & 0xff;
      else if (filter === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) {
        const pa = Math.abs(b - c);
        const pb = Math.abs(a - c);
        const pc = Math.abs(a + b - 2 * c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        v = (v + pr) & 0xff;
      }
      cur[x] = v;
    }
    cur.copy(prevRow);
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * 4;
      if (colorType === 6) {
        rgba[o] = cur[x * 4];
        rgba[o + 1] = cur[x * 4 + 1];
        rgba[o + 2] = cur[x * 4 + 2];
        rgba[o + 3] = cur[x * 4 + 3];
      } else if (colorType === 2) {
        rgba[o] = cur[x * 3];
        rgba[o + 1] = cur[x * 3 + 1];
        rgba[o + 2] = cur[x * 3 + 2];
        rgba[o + 3] = 255;
      } else {
        rgba[o] = rgba[o + 1] = rgba[o + 2] = cur[x];
        rgba[o + 3] = 255;
      }
    }
  }
  return { width, height, data: rgba };
}
// ── PNG encode (RGBA → 8-bit color type 6, filter 0) ─────────────────────────
function writePng(file, width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const chunks = [
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ];
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  fs.writeFileSync(file, Buffer.concat([sig, ...chunks]));
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'ascii'), data])), 8 + data.length);
  return out;
}

// ── Diff ─────────────────────────────────────────────────────────────────────
function diffPair(beforeFile, afterFile, outFile) {
  const a = readPng(beforeFile);
  const b = readPng(afterFile);
  if (a.width !== b.width || a.height !== b.height) {
    console.error(
      `SKIP ${path.basename(beforeFile)}: size mismatch (${a.width}x${a.height} vs ${b.width}x${b.height})`,
    );
    return null;
  }
  const out = Buffer.alloc(a.width * a.height * 4);
  let changed = 0;
  for (let i = 0; i < a.width * a.height; i++) {
    const o = i * 4;
    const dr = a.data[o] - b.data[o];
    const dg = a.data[o + 1] - b.data[o + 1];
    const db = a.data[o + 2] - b.data[o + 2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist > THRESHOLD) {
      out[o] = 229;
      out[o + 1] = 30;
      out[o + 2] = 40;
      out[o + 3] = 255;
      changed++;
    } else {
      out[o] = out[o + 1] = out[o + 2] = 255;
      out[o + 3] = 255;
    }
  }
  writePng(outFile, a.width, a.height, out);
  const pct = ((changed / (a.width * a.height)) * 100).toFixed(2);
  return { file: path.basename(beforeFile), changed, pct };
}

fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(beforeDir).filter(isPng).sort();
const afterFiles = fs.readdirSync(afterDir);
if (files.length === 0) {
  console.error(`warning: no .png files in ${beforeDir}`);
}
const summary = {};
let done = 0;
let skipped = 0;
for (const f of files) {
  const afterFile = path.join(afterDir, f);
  // Never let one unreadable file abort the batch: report SKIP, keep going,
  // and still write the summary for everything that did diff.
  const altCase = fs.existsSync(afterFile)
    ? null
    : afterFiles.find((x) => x.toLowerCase() === f.toLowerCase());
  try {
    if (!fs.existsSync(afterFile)) {
      if (altCase) {
        console.error(`SKIP ${f}: case mismatch (after dir has ${altCase})`);
      } else {
        console.error(`SKIP ${f}: no after image`);
      }
      skipped++;
      continue;
    }
    const r = diffPair(path.join(beforeDir, f), afterFile, path.join(outDir, f));
    if (r) {
      console.log(`${r.file}: ${r.changed} px changed (${r.pct}%) @ threshold ${THRESHOLD}`);
      summary[f] = { changed: r.changed, pct: r.pct, threshold: THRESHOLD };
      done++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.error(`SKIP ${f}: ${err.message.split('\n')[0]}`);
    skipped++;
  }
}
fs.writeFileSync(path.join(outDir, 'delta-summary.json'), JSON.stringify(summary, null, 2));
console.log(`Delta images: ${done} → ${outDir}${skipped ? ` (${skipped} skipped)` : ''}`);
if (skipped > 0 || done === 0) {
  console.error('Visual diff incomplete; resolve skipped files before reviewing the gate.');
  process.exitCode = 1;
}
