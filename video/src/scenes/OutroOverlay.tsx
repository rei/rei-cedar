import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { meta } from '../data/model';
import { eyebrowStyle, theme } from '../theme';
import { timeline } from '../timeline';

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
    <span
      style={{
        fontFamily: theme.fontSans,
        fontSize: 46,
        fontWeight: 600,
        letterSpacing: -0.5,
        color: theme.ink,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </span>
    <span style={{ fontFamily: theme.fontSans, fontSize: 13.5, color: theme.muted }}>{label}</span>
  </div>
);

export const OutroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [timeline.outroIn, timeline.outroIn + 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        backgroundColor: 'rgba(247, 245, 243, 0.97)',
        opacity: appear,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 38,
      }}
    >
      <span style={eyebrowStyle}>result</span>
      <h2
        style={{
          margin: 0,
          fontFamily: theme.fontSerif,
          fontSize: 56,
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: -0.5,
          color: theme.ink,
          textAlign: 'center',
        }}
      >
        {meta.matchedStepCount} palette steps back {meta.matchedSemanticTokenCount} of{' '}
        {meta.semanticTokenCount} semantic tokens
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: 64 }}>
        <Stat
          value={`${meta.matchedPaletteCount} / ${meta.paletteCount}`}
          label="palettes contribute a step"
        />
        <div style={{ width: 1, height: 64, backgroundColor: theme.border }} />
        <Stat
          value={`${meta.matchedStepCount} / ${meta.stepCount}`}
          label="palette steps matched"
        />
        <div style={{ width: 1, height: 64, backgroundColor: theme.border }} />
        <Stat
          value={`${meta.matchedSemanticTokenCount} / ${meta.semanticTokenCount}`}
          label="semantic tokens backed"
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontFamily: theme.fontSans, fontSize: 20, color: theme.text }}>
          Migrate by intent — pick the family, map the role, keep the identity.
        </span>
        <span style={{ fontFamily: theme.fontMono, fontSize: 14, color: theme.brand }}>
          color.action.surface.brand.faint
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
          }}
        >
          {['#143528', '#e5fd9c', '#3d6db9', '#ffdb22'].map((color) => (
            <div
              key={color}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span style={{ fontFamily: theme.fontMono, fontSize: 11, color: theme.muted }}>
          cedar design system · color foundation · primitive colors → semantic colors
        </span>
      </div>
    </div>
  );
};
