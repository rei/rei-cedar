import type { ResponsiveSpace, Spacing } from '../../types/other';

/**
 * Object position values for positioning content within a container
 */
export type ObjectPosition =
  | 'left-top'
  | 'center-top'
  | 'right-top'
  | 'left-center'
  | 'center-center'
  | 'right-center'
  | 'left-bottom'
  | 'center-bottom'
  | 'right-bottom';

/**
 * Responsive object position values mapped to Cedar breakpoints
 */
export type ResponsivePosition = {
  xs?: ObjectPosition;
  sm?: ObjectPosition;
  md?: ObjectPosition;
  lg?: ObjectPosition;
};

/**
 * CdrObjectOverlay component properties
 * Component for positioning content in 9 different positions relative to a container
 */
export type CdrObjectOverlayProps = {
  /** Determines if the container will have a gradient based on position */
  withGradient?: boolean;
  /** Theme for the gradient (dark or light) */
  gradientTheme?: 'dark' | 'light';
  /** Position of the content relative to the container */
  position?: ResponsivePosition | ObjectPosition;
  /** Margin space around the positioned content */
  margin?: ResponsiveSpace | Spacing;
  /** Padding space around the positioned content */
  padding?: ResponsiveSpace | Spacing;
  /** Sets the HTML tag for the container element */
  tag?: string;
};
