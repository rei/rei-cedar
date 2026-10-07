import { interpolate, useCurrentFrame } from 'remotion';
import { FOOTER_HEIGHT, theme } from '../theme';
import { timeline } from '../timeline';

export const Footer: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [timeline.gridInStart, timeline.gridInStart + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        height: FOOTER_HEIGHT,
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: theme.fontMono,
        fontSize: 10.5,
        color: theme.faint,
        opacity,
      }}
    >
      <span>source: Primitive Colors · Semantic Colors (157 tokens)</span>
      <span>cedar.rei.com · guidelines · tokens · components</span>
    </div>
  );
};
