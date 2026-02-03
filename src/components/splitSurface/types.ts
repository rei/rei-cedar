/**
 * CdrSplitSurface component properties
 * Introduces a layered surface for distinct content sections
 */
export type CdrSplitSurfaceProps = {
  /** Sets the orientation of the surface to the top or bottom slot */
  surface?: 'top' | 'bottom';
  /** Sets the HTML tag for the split-surface element */
  tag?: string;
};
