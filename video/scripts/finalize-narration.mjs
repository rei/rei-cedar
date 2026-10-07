import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Copy the rendered picture and mix the original voice takes at their frame
// positions. Encoding once avoids the audio delay in the intermediate render.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.resolve(process.argv[2] ?? path.join(root, 'out/cedar-semantic-tokens-v2.mp4'));
const temporary = target.replace(/\.mp4$/, '.narration.mp4');
if (temporary === target || !fs.existsSync(target)) throw new Error('Provide a rendered MP4.');
const story = JSON.parse(fs.readFileSync(path.join(root, 'src/film/story.json'), 'utf8'));
const ledger = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/narration-timing.json'), 'utf8'),
);
const takes = [];
let frame = 0;
for (const chapter of story) {
  const entry = ledger[chapter.id];
  for (const track of entry.tracks) {
    takes.push({ file: path.join(root, 'public', track.file), frame: frame + track.from });
  }
  frame += entry.seconds * 30;
}
const duration = frame / 30;
const filters = takes.map((take, index) => {
  const delay = (take.frame * 1000) / 30;
  return `[${index + 1}:a]adelay=${delay}|${delay}[voice${index}]`;
});
filters.push(
  takes.map((_, index) => `[voice${index}]`).join('') +
    `amix=inputs=${takes.length}:normalize=0:duration=longest,apad=whole_dur=${duration},atrim=duration=${duration}[narration]`,
);
const binaries = path.join(root, 'node_modules/@remotion/compositor-darwin-x64');
try {
  execFileSync(
    path.join(binaries, 'ffmpeg'),
    [
      '-y',
      '-v',
      'error',
      '-i',
      target,
      ...takes.flatMap((take) => ['-i', take.file]),
      '-filter_complex',
      filters.join(';'),
      '-map',
      '0:v:0',
      '-map',
      '[narration]',
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-ar',
      '48000',
      '-ac',
      '2',
      '-t',
      String(duration),
      '-movflags',
      '+faststart',
      temporary,
    ],
    { cwd: binaries },
  );
  fs.renameSync(temporary, target);
  console.log(
    `Narration finalized: ${takes.length} original takes at measured frame positions; ${duration}s.`,
  );
} finally {
  if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
}
