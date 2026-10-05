import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { importNarration } from './import-narration.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const externalManifest = path.join(root, 'public/audio/elevenlabs/manifest.json');
if (fs.existsSync(externalManifest) && process.env.CEDAR_SCRATCH_NARRATION !== '1') {
  importNarration(externalManifest);
  process.exit(0);
}

const story = JSON.parse(fs.readFileSync(path.join(root, 'src/film/story.json'), 'utf8'));
const directory = path.join(root, 'public/audio/narration');
const binaries = path.join(root, 'node_modules/@remotion/compositor-darwin-x64');
const voice = process.env.CEDAR_NARRATOR_VOICE ?? 'Samantha';
const rate = process.env.CEDAR_NARRATOR_RATE ?? '158';
const ledger = {};
fs.mkdirSync(directory, { recursive: true });
for (const chapter of story) {
  let start = 0.4;
  const beats = [];
  for (const [index, words] of chapter.beats.entries()) {
    const name = `${chapter.id}-${index}`;
    const script = path.join(directory, `${name}.txt`);
    const raw = path.join(directory, `${name}-raw.wav`);
    const output = path.join(directory, `${name}.wav`);
    const signature = JSON.stringify({ voice, rate, words });
    const cache = path.join(directory, `${name}.cache`);
    if (
      !fs.existsSync(output) ||
      !fs.existsSync(cache) ||
      fs.readFileSync(cache, 'utf8') !== signature
    ) {
      fs.writeFileSync(script, words);
      execFileSync('/usr/bin/say', [
        '-v',
        voice,
        '-r',
        rate,
        '-f',
        script,
        '-o',
        raw,
        '--file-format=WAVE',
        '--data-format=LEI16@48000',
      ]);
      execFileSync(
        path.join(binaries, 'ffmpeg'),
        [
          '-y',
          '-v',
          'error',
          '-i',
          raw,
          '-af',
          'loudnorm=I=-16:TP=-1.5:LRA=7',
          '-ar',
          '48000',
          '-ac',
          '2',
          output,
        ],
        { cwd: binaries },
      );
      fs.writeFileSync(cache, signature);
    }
    const duration = Number(
      execFileSync(
        path.join(binaries, 'ffprobe'),
        [
          '-v',
          'error',
          '-show_entries',
          'format=duration',
          '-of',
          'default=noprint_wrappers=1:nokey=1',
          output,
        ],
        { cwd: binaries, encoding: 'utf8' },
      ).trim(),
    );
    const from = Math.ceil(start * 30);
    const frames = Math.ceil(duration * 30);
    beats.push({
      file: `audio/narration/${name}.wav`,
      text: words,
      from,
      frames,
      seconds: duration,
    });
    start = (from + frames) / 30 + 0.18;
  }
  const last = beats.at(-1);
  const speechEnd = (last.from + last.frames) / 30;
  // Keep speech clear of the 12-frame transition wipe, with a reading hold.
  const seconds = Math.max(chapter.seconds, Math.ceil(speechEnd + 0.65));
  ledger[chapter.id] = { voice, rate: Number(rate), seconds, speechEnd, beats, tracks: beats };
  console.log(
    `${chapter.id}: speech ends ${speechEnd.toFixed(2)}s; chapter ${seconds}s; ${beats.length} synced cues`,
  );
}
fs.writeFileSync(
  path.join(root, 'src/data/narration-timing.json'),
  JSON.stringify(ledger, null, 2) + '\n',
);
console.log(`Narration ready: ${voice}, ${Object.keys(ledger).length} chapters.`);
