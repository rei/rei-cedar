import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Import Higgsfield / ElevenLabs chapter recordings with measured phrase
// markers. Markers are recording-relative seconds, not estimated reading times.
export function importNarration(manifestFile) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const story = JSON.parse(fs.readFileSync(path.join(root, 'src/film/story.json'), 'utf8'));
  const binaries = path.join(root, 'node_modules/@remotion/compositor-darwin-x64');
  const outputDir = path.join(root, 'public/audio/elevenlabs');
  const ledger = {};
  fs.mkdirSync(outputDir, { recursive: true });
  for (const chapter of story) {
    const take = manifest.chapters.find((item) => item.id === chapter.id);
    if (!take || take.cues?.length !== chapter.beats.length) {
      throw new Error(
        `${chapter.id}: provide a recording and ${chapter.beats.length} measured phrase cues.`,
      );
    }
    const source = path.resolve(path.dirname(manifestFile), take.file);
    const output = path.join(outputDir, `${chapter.id}.wav`);
    const signature = createHash('sha256').update(fs.readFileSync(source)).digest('hex');
    const cache = `${output}.cache`;
    if (
      !fs.existsSync(output) ||
      !fs.existsSync(cache) ||
      fs.readFileSync(cache, 'utf8') !== signature
    ) {
      execFileSync(
        path.join(binaries, 'ffmpeg'),
        [
          '-y',
          '-v',
          'error',
          '-i',
          source,
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
    if (!Number.isFinite(duration) || duration <= 0)
      throw new Error(`${chapter.id}: empty recording.`);
    const offset = 12;
    const totalFrames = Math.ceil(duration * 30);
    const beats = chapter.beats.map((text, index) => {
      const at = take.cues[index];
      const next = take.cues[index + 1] ?? duration;
      if (
        !Number.isFinite(at) ||
        at < 0 ||
        at >= duration ||
        next <= at ||
        next > duration + 0.01
      ) {
        throw new Error(
          `${chapter.id}: phrase markers must increase within the measured ${duration.toFixed(2)}s recording.`,
        );
      }
      return {
        text,
        from: offset + Math.round(at * 30),
        frames: Math.max(1, Math.round((next - at) * 30)),
        seconds: next - at,
      };
    });
    const speechEnd = (offset + totalFrames) / 30;
    const seconds = Math.max(chapter.seconds, Math.ceil(speechEnd + 0.65));
    ledger[chapter.id] = {
      provider: 'ElevenLabs',
      voice: take.voice ?? manifest.voice,
      seconds,
      speechEnd,
      beats,
      tracks: [
        {
          file: `audio/elevenlabs/${chapter.id}.wav`,
          from: offset,
          frames: totalFrames,
          text: chapter.beats.join(' '),
        },
      ],
    };
    console.log(
      `${chapter.id}: ${duration.toFixed(2)}s recording; ${seconds}s chapter; ${beats.length} measured cues`,
    );
  }
  fs.writeFileSync(
    path.join(root, 'src/data/narration-timing.json'),
    JSON.stringify(ledger, null, 2) + '\n',
  );
  console.log('ElevenLabs narration imported; visual cues follow the recordings.');
}
