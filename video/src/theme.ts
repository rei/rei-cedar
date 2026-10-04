import type { CSSProperties } from 'react';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const DURATION_IN_FRAMES = 1580;

export const HEADER_HEIGHT = 96;
export const FOOTER_HEIGHT = 32;

/** Layout shared by the swatch grid and the callout tray. */
export const GRID_PADDING_X = 40;
export const GRID_TOP = 18;
export const TRAY_HEIGHT = 84;
export const TRAY_GAP = 12;

/**
 * Doc-site tokens used by the Storybook chrome — values from
 * `.storybook/cedar-theme.ts` and `@rei/cdr-tokens/dist/docsite/json/web.json`.
 */
export const theme = {
  pageBg: '#f7f5f3', // cdr-color-background-primary
  card: '#ffffff', // cdr-color-background-secondary
  cardMuted: '#edeae3', // warm-grey-200 (doc-site active nav)
  border: '#d5cfc3', // cdr-color-border-primary
  borderStrong: '#958e83', // cdr-color-border-secondary
  ink: '#2e2e2b', // cdr-color-text-emphasis
  text: '#4b4a48', // cdr-color-text-secondary
  muted: '#736e65', // warm-grey-700
  faint: '#958e83',
  brand: '#1f513f', // cdr-color-text-brand
  accent: '#e5fd9c', // lichen 100 — border/accent
  knockout: '#2e2e2b', // knockout surface (Storybook code panels)
  knockoutText: '#fafbf9', // cdr-color-text-inverse
  warningInk: '#8a6a00', // warning-yellow 1100
  fontSans: 'Graphik, "Graphik fallback", "Helvetica Neue", sans-serif',
  fontSerif: 'Stuart, "Stuart fallback", Georgia, serif',
  fontMono: 'Pressura, "Courier New", monospace',
  radius: 8,
  radiusSoft: 4,
  shadow: '0 1px 2px rgba(46, 46, 43, 0.06), 0 2px 10px rgba(46, 46, 43, 0.04)',
} as const;

export const cardStyle: CSSProperties = {
  backgroundColor: theme.card,
  border: `1px solid ${theme.border}`,
  borderRadius: theme.radius,
  boxShadow: theme.shadow,
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: theme.fontMono,
  fontSize: 11,
  letterSpacing: 2.4,
  textTransform: 'uppercase',
  color: theme.brand,
};

export const labelStyle: CSSProperties = {
  fontFamily: theme.fontMono,
  fontSize: 10.5,
  letterSpacing: 1.2,
  textTransform: 'uppercase',
  color: theme.muted,
};
