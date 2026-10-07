// A quiet, original pentatonic score. No downloaded music or runtime network.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'public/audio/cedar-score.wav');
const sampleRate = 22050;
const duration = 124;
const samples = sampleRate * duration;
const buffer = Buffer.alloc(44 + samples * 4);
buffer.write('RIFF', 0);
buffer.writeUInt32LE(buffer.length - 8, 4);
buffer.write('WAVEfmt ', 8);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(2, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 4, 28);
buffer.writeUInt16LE(4, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(samples * 4, 40);
const chords = [
  [130.81, 196, 293.66],
  [110, 164.81, 261.63],
  [87.31, 130.81, 220],
  [98, 146.83, 246.94],
];
const melody = [523.25, 659.25, 783.99, 587.33, 659.25, 880, 783.99, 587.33];
const boundaries = [6, 18, 28, 41, 52, 60, 80, 98, 117];
for (let i = 0; i < samples; i++) {
  const t = i / sampleRate;
  const fade = Math.min(1, t / 2.5, (duration - t) / 3);
  const chordIndex = Math.floor(t / 9.6) % chords.length;
  const chordTime = t % 9.6;
  const padEnvelope = Math.min(1, chordTime / 1.4, (9.6 - chordTime) / 1.4);
  let left = 0;
  let right = 0;
  for (let n = 0; n < 3; n++) {
    const note = chords[chordIndex][n];
    const pad = Math.sin(2 * Math.PI * note * t) * 0.023 * padEnvelope;
    left += pad + Math.sin(2 * Math.PI * note * 1.001 * t) * 0.008 * padEnvelope;
    right += pad + Math.sin(2 * Math.PI * note * 0.999 * t) * 0.008 * padEnvelope;
  }
  const beat = Math.floor(t / 0.6);
  const age = t % 0.6;
  if (beat % 2 === 0) {
    const note = melody[Math.floor(beat / 2) % melody.length];
    const envelope = Math.min(1, age / 0.012) * Math.exp(-age * 7);
    const pluck =
      (Math.sin(2 * Math.PI * note * age) + Math.sin(4 * Math.PI * note * age) * 0.22) *
      envelope *
      0.07;
    left += pluck * (beat % 4 === 0 ? 1 : 0.6);
    right += pluck * (beat % 4 === 0 ? 0.6 : 1);
  }
  for (const at of boundaries) {
    const dt = t - at;
    if (dt >= -0.2 && dt <= 0.35) {
      const a = dt + 0.2;
      const envelope = Math.sin((Math.PI * a) / 0.55) ** 2;
      const chime = Math.sin(2 * Math.PI * (780 * a - 320 * a * a)) * envelope * 0.018;
      left += chime;
      right += chime;
    }
  }
  buffer.writeInt16LE(Math.round(Math.tanh(left * fade) * 32767), 44 + i * 4);
  buffer.writeInt16LE(Math.round(Math.tanh(right * fade) * 32767), 46 + i * 4);
}
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, buffer);
console.log('Original 124-second stereo score written to public/audio/cedar-score.wav');
