import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { labelStyle, theme } from '../theme';

type StatChipProps = {
  label: string;
  value: string;
  hint: string;
  appearAt: number;
};

export const StatChip: React.FC<StatChipProps> = ({ label, value, hint, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  return (
    <div
      style={{
        minWidth: 150,
        padding: '8px 14px 9px',
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radiusSoft,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        opacity: appear,
        transform: `translateY(${(1 - appear) * 8}px)`,
      }}
    >
      <span style={labelStyle}>{label}</span>
      <span
        style={{
          fontFamily: theme.fontSans,
          fontSize: 22,
          fontWeight: 600,
          lineHeight: 1.1,
          color: theme.ink,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      <span style={{ fontFamily: theme.fontSans, fontSize: 11, color: theme.muted }}>{hint}</span>
    </div>
  );
};
