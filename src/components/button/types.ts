/**
 * CdrButton component properties
 */
export type CdrButtonProps = {
  /** Renders CdrButton as a button or a element */
  tag?: 'button' | 'a';
  /** Sets the button type */
  type?: 'button' | 'submit' | 'reset';
  /** Modifies the style variant for this component */
  modifier?: 'primary' | 'secondary' | 'sale' | 'dark' | 'link';
  /** Sets the button size; values can target responsive breakpoints */
  size?: string;
  /** Sets button width to 100% */
  fullWidth?: boolean | string;
  /** Renders an icon-only button */
  iconOnly?: boolean;
  /** Renders an icon-only button with a background color and border */
  withBackground?: boolean;
};
