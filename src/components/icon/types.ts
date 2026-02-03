/**
 * CdrIcon component properties
 */
export type CdrIconProps = {
  /** Sets the href attribute for use with SVG symbol sprite */
  use?: string;
  /** Sets icon fill to inherit from parent */
  inheritColor?: boolean;
  /** Sets the icon size */
  size?: 'small' | 'medium' | 'large' | string;
};
