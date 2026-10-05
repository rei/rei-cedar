import type { CSSProperties, ReactNode } from 'react';
import { interpolate, Easing, spring, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { buttonColors, color } from './data';
import type { InteractionState } from '../../../build/component-tokens/types';

export const ink = '#312D27';
export const cream = '#F8F7F2';
export const green = '#143528';
export const lime = '#E5FD9C';
export const orange = '#D44703';
export const mono: CSSProperties = { fontFamily: theme.fontMono };
export const ease = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
export const rise = (frame: number, delay = 0) =>
  spring({ frame: frame - delay, fps: 30, config: { damping: 24, stiffness: 120, mass: 0.8 } });

export const Reveal: React.FC<{
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  x?: number;
}> = ({ children, delay = 0, style, x = 0 }) => {
  const p = rise(useCurrentFrame(), delay);
  return (
    <div
      style={{
        opacity: Math.min(p, 1),
        transform: `translate(${(1 - p) * x}px, ${(1 - p) * 28}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{ children: ReactNode; light?: boolean }> = ({
  children,
  light,
}) => (
  <div
    style={{
      ...mono,
      fontSize: 21,
      letterSpacing: 2.6,
      textTransform: 'uppercase',
      color: light ? lime : green,
    }}
  >
    {children}
  </div>
);

export const Heading: React.FC<{
  index: string;
  title: string;
  detail: string;
  light?: boolean;
}> = ({ index, title, detail, light }) => (
  <div style={{ position: 'absolute', top: 120, left: 96, right: 96 }}>
    <Reveal>
      <Eyebrow light={light}>{index} / Cedar semantic color</Eyebrow>
    </Reveal>
    <Reveal delay={5}>
      <h1
        style={{
          fontFamily: theme.fontSerif,
          fontSize: 76,
          fontWeight: 450,
          letterSpacing: -2.8,
          margin: '14px 0 10px',
          lineHeight: 1.1,
          color: light ? cream : ink,
        }}
      >
        {title}
      </h1>
    </Reveal>
    <Reveal delay={12}>
      <div style={{ fontSize: 27, lineHeight: 1.4, color: light ? '#C0CCBE' : '#746E63' }}>
        {detail}
      </div>
    </Reveal>
  </div>
);

export const Caption: React.FC<{ children: ReactNode; light?: boolean }> = ({
  children,
  light,
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 78,
      left: 96,
      right: 96,
      fontSize: 25,
      lineHeight: 1.4,
      color: light ? '#C0CCBE' : '#746E63',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    <span style={{ width: 24, height: 2, background: light ? lime : green }} />
    {children}
  </div>
);

export const Panel: React.FC<{ children: ReactNode; style?: CSSProperties; dark?: boolean }> = ({
  children,
  style,
  dark,
}) => (
  <div
    style={{
      border: `1px solid ${dark ? '#385443' : '#D7D4CE'}`,
      background: dark ? '#1B3025' : '#FFFFFF',
      borderRadius: 18,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Code: React.FC<{
  lines: string[];
  frame: number;
  start?: number;
  highlight?: number;
  title: string;
  fontSize?: number;
}> = ({ lines, frame, start = 0, highlight, title, fontSize = 25 }) => (
  <Panel
    dark
    style={{ overflow: 'hidden' }}
  >
    <div
      style={{
        borderBottom: '1px solid #385443',
        padding: '18px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
      }}
    >
      {[orange, '#FFDB22', '#BFDDCA'].map((c) => (
        <span
          key={c}
          style={{ width: 11, height: 11, borderRadius: '50%', background: c }}
        />
      ))}
      <span style={{ ...mono, fontSize: 19, color: '#C0CCBE', marginLeft: 12 }}>{title}</span>
    </div>
    <div style={{ padding: '20px 24px 22px', ...mono, fontSize, lineHeight: 1.4, color: cream }}>
      {lines.map((line, i) => {
        const p = ease(frame, start + i * 2, start + i * 2 + 8);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              background: highlight === i ? '#385443' : 'transparent',
              borderRadius: 4,
              opacity: p,
            }}
          >
            <span
              style={{
                width: 38,
                flexShrink: 0,
                textAlign: 'right',
                marginRight: 22,
                color: '#72917C',
                fontSize: fontSize - 4,
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                whiteSpace: 'pre',
                color: line.trim().startsWith('//')
                  ? '#8FB098'
                  : line.includes("'")
                    ? '#E5FD9C'
                    : cream,
              }}
            >
              {line || ' '}
            </span>
          </div>
        );
      })}
    </div>
  </Panel>
);

export const Arrow: React.FC<{ size?: number; color?: string; down?: boolean }> = ({
  size = 30,
  color: stroke = 'currentColor',
  down,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ transform: down ? 'rotate(90deg)' : undefined }}
  >
    <path
      d="M5 16h21M18 7l9 9-9 9"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cursor: React.FC<{ x: number; y: number; pressed?: boolean; opacity?: number }> = ({
  x,
  y,
  pressed,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `scale(${pressed ? 0.86 : 1})`,
      opacity,
      zIndex: 20,
    }}
  >
    <svg
      width="44"
      height="52"
      viewBox="0 0 44 52"
    >
      <path
        d="M4 3v36l10-9 9 18 9-5-9-17h15Z"
        fill={cream}
        stroke={ink}
        strokeWidth="2.5"
      />
    </svg>
    {pressed ? (
      <div
        style={{
          position: 'absolute',
          top: -16,
          left: -16,
          width: 45,
          height: 45,
          border: `2px solid ${lime}`,
          borderRadius: '50%',
        }}
      />
    ) : null}
  </div>
);

export const Topography: React.FC<{ dark?: boolean; frame?: number; style?: CSSProperties }> = ({
  dark,
  frame = 0,
  style,
}) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    style={{ position: 'absolute', inset: 0, opacity: dark ? 0.18 : 0.07, ...style }}
  >
    {Array.from({ length: 18 }, (_, i) => (
      <ellipse
        key={i}
        cx={1450 + Math.sin(frame / 110) * 18}
        cy="590"
        rx={240 + i * 38}
        ry={150 + i * 34}
        fill="none"
        stroke={dark ? lime : green}
        strokeWidth="1.5"
        transform={`rotate(-22 1450 590)`}
      />
    ))}
  </svg>
);

export const ButtonPreview: React.FC<{
  state?: InteractionState;
  scale?: number;
  legacy?: boolean;
  label?: string;
}> = ({ state = 'rest', scale = 1, legacy, label = 'Add to cart' }) => {
  const c = buttonColors(state);
  const ring = state === 'hover' || state === 'focus-visible' || state === 'active' ? 3 : 1;
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 17 * scale,
        minWidth: 258 * scale,
        height: 66 * scale,
        padding: `0 ${28 * scale}px`,
        boxSizing: 'border-box',
        fontSize: 24 * scale,
        fontWeight: 500,
        borderRadius: 8 * scale,
        background: legacy ? '#1F513F' : c.surface,
        color: legacy ? '#FAFBF9' : c.text,
        boxShadow: `inset 0 0 0 ${ring * scale}px ${c.border}${state === 'active' ? `, inset 0 0 0 ${5 * scale}px ${color('border-neutral-trace')}` : ''}`,
        transform: state === 'active' ? 'translateY(2px)' : undefined,
      }}
    >
      {label}
      <Arrow
        size={26 * scale}
        color={legacy ? '#FAFBF9' : c.icon}
      />
    </div>
  );
};

export const AccordionPreview: React.FC<{ open: number; hover?: boolean; scale?: number }> = ({
  open,
  hover,
  scale = 1,
}) => (
  <div
    style={{
      width: '100%',
      borderTop: `1px solid ${color('control-border-neutral-faint')}`,
      borderBottom: `1px solid ${color('control-border-neutral-faint')}`,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${26 * scale}px ${24 * scale}px`,
        background: hover ? color('control-surface-neutral-faint') : 'transparent',
        color: color('control-text-neutral-prominent'),
        fontSize: 26 * scale,
        fontWeight: 600,
      }}
    >
      <span>Trail details</span>
      <svg
        width={26 * scale}
        height={26 * scale}
        viewBox="0 0 28 28"
        style={{ transform: `rotate(${open * 180}deg)` }}
      >
        <path
          d="m5 10 9 9 9-9"
          fill="none"
          stroke={color('control-icon-neutral-prominent')}
          strokeWidth="2.5"
        />
      </svg>
    </div>
    <div style={{ height: open * 148 * scale, overflow: 'hidden' }}>
      <div
        style={{
          padding: `${8 * scale}px ${24 * scale}px ${24 * scale}px`,
          fontSize: 22 * scale,
          lineHeight: 1.6,
          color: color('control-text-neutral-prominent'),
          opacity: Math.min(open * 2, 1),
        }}
      >
        A little room to explore.
        <br />
        Distance: 4.8 miles · Elevation: 860 ft
        <br />
        <span style={{ fontSize: 18 * scale, color: '#8E887D' }}>
          Open the panel. Keep the purpose.
        </span>
      </div>
    </div>
  </div>
);
