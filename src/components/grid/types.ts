import type { Tag, Breakpoint } from '../../types/componentOptions';

export const gridGutterSizeOptions = ['none', 'small', 'medium', 'large'] as const;
export type GridGutterSize = (typeof gridGutterSizeOptions)[number];

type GridGutterResponsiveToken = `${GridGutterSize}@${Breakpoint}`;

// Support common responsive strings up to 4 breakpoint tokens.
export type GridGutter =
  | GridGutterSize
  | GridGutterResponsiveToken
  | `${GridGutterResponsiveToken} ${GridGutterResponsiveToken}`
  | `${GridGutterResponsiveToken} ${GridGutterResponsiveToken} ${GridGutterResponsiveToken}`
  | `${GridGutterResponsiveToken} ${GridGutterResponsiveToken} ${GridGutterResponsiveToken} ${GridGutterResponsiveToken}`;

/**
 * CdrGrid component properties
 */
export type CdrGridProps = {
  /**
   * Defines gutter spacing.
   *
   * Accepts one size for all breakpoints (`medium`) or responsive tokens
   * separated by spaces (`small@xs medium@sm large@md large@lg`).
   */
  gutter?: GridGutter;
  /** Sets the HTML tag for the grid element */
  tag?: Tag;
};
