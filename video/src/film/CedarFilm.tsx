import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FontFaces, useCedarFonts } from '../fonts';
import { DURATION_IN_FRAMES, theme } from '../theme';
import { AccordionScene, ButtonScene, WorkflowScene } from './ComponentScenes';
import {
  FamiliesScene,
  GrammarScene,
  IntroScene,
  OutroScene,
  PaletteScene,
  RolesScene,
} from './FoundationScenes';
import { cream, ease, green, lime, mono } from './kit';
import { chapters, voiceTracks, type ChapterId } from './timing';
import { ArchitectureScene, DynamicScene, FrictionScene, PillarsScene } from './NarrativeScenes';

const scenes: Record<ChapterId, React.FC> = {
  intro: IntroScene,
  friction: FrictionScene,
  pillars: PillarsScene,
  architecture: ArchitectureScene,
  palettes: PaletteScene,
  filter: () => <PaletteScene filtered />,
  families: FamiliesScene,
  grammar: GrammarScene,
  roles: RolesScene,
  button: ButtonScene,
  accordion: AccordionScene,
  dynamic: DynamicScene,
  workflow: WorkflowScene,
  outro: OutroScene,
};

export const CedarFilm: React.FC = () => {
  useCedarFonts();
  const frame = useCurrentFrame();
  const current = [...chapters].reverse().find((chapter) => frame >= chapter.from) ?? chapters[0];
  const dark = ['intro', 'pillars', 'grammar', 'outro'].includes(current.id);
  return (
    <AbsoluteFill
      style={{
        fontFamily: theme.fontSans,
        background: cream,
        overflow: 'hidden',
        scale: 0.997,
      }}
    >
      <FontFaces />
      {chapters.map((chapter) => {
        const id = chapter.id as ChapterId;
        const Scene = scenes[id];
        return (
          <Sequence
            key={chapter.id}
            from={chapter.from}
            durationInFrames={chapter.duration}
            name={chapter.label}
          >
            <Scene />
            {voiceTracks(id).map((beat, i) => (
              <Sequence
                key={beat.file}
                from={beat.from}
                durationInFrames={beat.frames}
                name={`Voice ${i + 1}: ${beat.text}`}
              >
                <Audio
                  src={staticFile(beat.file)}
                  volume={1}
                />
              </Sequence>
            ))}
          </Sequence>
        );
      })}
      <div
        style={{
          position: 'absolute',
          top: 34,
          left: 96,
          right: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: dark ? cream : green,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 19 }}>
          <svg
            width="33"
            height="38"
            viewBox="0 0 33 38"
          >
            <path
              d="M16.5 1 4 19h7L2 29h12v8h5v-8h12L22 19h7Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 31, fontWeight: 650, letterSpacing: -0.7 }}>Cedar</span>
          <span
            style={{
              width: 1,
              height: 25,
              background: dark ? '#72917C' : '#D7D4CE',
              marginLeft: 9,
            }}
          />
          <span style={{ ...mono, fontSize: 18, letterSpacing: 1.7 }}>
            A FIELD GUIDE TO SEMANTIC COLOR
          </span>
        </div>
        <span style={{ ...mono, fontSize: 19, color: dark ? '#C0CCBE' : '#8E887D' }}>
          REI CO-OP
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 27,
          left: 96,
          right: 96,
          color: dark ? '#C0CCBE' : '#8E887D',
          display: 'flex',
          justifyContent: 'space-between',
          ...mono,
          fontSize: 16,
          letterSpacing: 1,
        }}
      >
        <span>{current.label.toUpperCase()}</span>
        <span>cedar.rei.com</span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          width: `${(100 * frame) / (DURATION_IN_FRAMES - 1)}%`,
          background: dark ? lime : green,
        }}
      />
      {chapters.slice(1).map((chapter) => {
        const p = ease(frame, chapter.from - 12, chapter.from + 12);
        if (p <= 0 || p >= 1) return null;
        return (
          <AbsoluteFill
            key={chapter.id}
            style={{
              background: green,
              transform: `translateX(${(-1 + p * 2) * 1920}px)`,
              borderRight: `14px solid ${lime}`,
              zIndex: 100,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
