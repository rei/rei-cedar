import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { openBrowser, renderStill, selectComposition } from '@remotion/renderer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'out/review-v2');
const story = JSON.parse(fs.readFileSync(path.join(root, 'src/film/story.json'), 'utf8'));
const narration = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/narration-timing.json'), 'utf8'),
);
const starts = {};
let frame = 0;
for (const chapter of story) {
  starts[chapter.id] = frame;
  frame += narration[chapter.id].seconds * 30;
}
const cue = (id, beat, after = 35) => starts[id] + narration[id].beats[beat].from + after;
const shots = [
  ['01-intro', 100],
  ['02-friction', cue('friction', 1)],
  ['03-pillars', cue('pillars', 3)],
  ['04-architecture', cue('architecture', 1)],
  ['05-palettes', cue('palettes', 1)],
  ['06-scopes', cue('filter', 1)],
  ['07-families', cue('families', 5)],
  ['08-grammar', cue('grammar', 6, 50)],
  ['09-roles-assembled', starts.roles + 36],
  ['10-roles-expanded', cue('roles', 1, 50)],
  ['11-roles-reassembled', cue('roles', 2, 68)],
  ['12-button-mapping', cue('button', 1, 22)],
  ['13-button-contract', cue('button', 2, 28)],
  ['14-button-generated', cue('button', 3, 24)],
  ['15-button-hover', cue('button', 4, 10)],
  ['16-button-focus', cue('button', 5, 12)],
  ['17-button-active', cue('button', 6, 25)],
  ['18-button-disabled', cue('button', 6, 82)],
  ['19-accordion-scopes', cue('accordion', 0, 35)],
  ['20-accordion-contract', cue('accordion', 1, 25)],
  ['21-accordion-open', cue('accordion', 2, 58)],
  ['22-accordion-closed', cue('accordion', 2, 134)],
  ['23-dynamic', cue('dynamic', 2)],
  ['24-skill', cue('workflow', 4)],
  ['25-outro', cue('outro', 1)],
];
fs.mkdirSync(directory, { recursive: true });
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src/index.ts'),
  publicDir: path.join(root, 'public'),
});
const browser = await openBrowser('chrome');
try {
  const composition = await selectComposition({
    serveUrl,
    id: 'CedarSemanticTokens',
    puppeteerInstance: browser,
  });
  const requested = process.argv.slice(2);
  for (const [name, frame] of shots) {
    if (requested.length > 0 && !requested.includes(name)) continue;
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: path.join(directory, `${name}.png`),
      puppeteerInstance: browser,
      scale: 0.75,
      logLevel: 'error',
    });
    console.log(`${name} / frame ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
