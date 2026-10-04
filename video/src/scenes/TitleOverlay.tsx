import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { meta } from '../data/model';
import { eyebrowStyle, theme } from '../theme';
import { timeline } from '../timeline';

export const TitleOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [timeline.titleIn, timeline.titleIn + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(frame, [timeline.titleOut - 26, timeline.titleOut], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const opacity = enter * (1 - exit);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: 'rgba(247, 245, 243, 0.92)',
        opacity,
        transform: `translateY(${(1 - enter) * 16 - exit * 24}px)`,
        pointerEvents: 'none',
      }}
    >
      <span style={eyebrowStyle}>cedar design system · color foundation</span>
      <h1
        style={{
          margin: 0,
          fontFamily: theme.fontSerif,
          fontSize: 96,
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: -0.5,
          color: theme.ink,
          textAlign: 'center',
        }}
      >
        {meta.paletteCount} palettes, {meta.stepCount} steps
      </h1>
      <div style={{ width: 72, height: 8, borderRadius: 4, backgroundColor: theme.accent }} />
      <p style={{ margin: 0, fontFamily: theme.fontSans, fontSize: 20, color: theme.text }}>
        The Primitive Colors set, filtered to Semantic Colors — then rebuilt as the semantic
        structure.
      </p>
    </div>
  );
};
