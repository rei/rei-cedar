import type { PrimarySecondary } from '../../types/other';

/**
 * CdrLabelWrapper component properties
 */
export type CdrLabelWrapperProps = {
  /** Custom CSS class for the label element */
  labelClass?: string;
  /** Custom CSS class for the content element */
  contentClass?: string;
  /** Sets the background color */
  background?: PrimarySecondary;
  /** Sets the disabled state */
  disabled?: boolean;
  /** Sets a modifier class */
  modifier?: string;
  /** Sets the size, supports responsive values */
  size?: string;
};
