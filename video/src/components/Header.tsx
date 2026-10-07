import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { meta } from '../data/model';
import { HEADER_HEIGHT, theme } from '../theme';
import { timeline } from '../timeline';
import { StatChip } from './StatChip';

export const Header: React.FC = () => {
  const frame = useCurrentFrame();

  const stepsValue = Math.round(
    interpolate(
      frame,
      [timeline.filterStart + 36, timeline.filterStart + 128],
      [meta.stepCount, meta.matchedStepCount],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      },
    ),
  );
  const palettesReflowed = frame >= timeline.reflowStart + 40;

  return (
    <div
      style={{
        height: HEADER_HEIGHT,
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 4,
            height: 42,
            borderRadius: 2,
            backgroundColor: theme.brand,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span
            style={{ fontFamily: theme.fontSans, fontSize: 17, fontWeight: 600, color: theme.ink }}
          >
            Cedar Design System
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 9.5,
                letterSpacing: 1.3,
                textTransform: 'uppercase',
                color: theme.brand,
              }}
            >
              color foundation
            </span>
            <span
              style={{ width: 3, height: 3, borderRadius: 3, backgroundColor: theme.borderStrong }}
            />
            <span style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.muted }}>
              primitive colors → semantic colors
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <StatChip
          label="palettes"
          value={
            palettesReflowed
              ? `${meta.matchedPaletteCount} / ${meta.paletteCount}`
              : `${meta.paletteCount}`
          }
          hint={palettesReflowed ? 'contribute steps' : 'in Primitive Colors'}
          appearAt={20}
        />
        <StatChip
          label="palette steps"
          value={`${stepsValue}`}
          hint={
            stepsValue === meta.matchedStepCount
              ? `${meta.matchedStepCount} exact matches`
              : 'all web token steps'
          }
          appearAt={26}
        />
        <StatChip
          label="semantic tokens"
          value={`${meta.semanticTokenCount}`}
          hint="in Semantic Colors"
          appearAt={32}
        />
      </div>
    </div>
  );
};
