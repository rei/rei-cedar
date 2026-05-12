import type { SwitchSize } from '../../types/componentOptions';

/**
 * CdrToggleButton component properties
 * Permits switching two or more options on and off
 */
export type CdrToggleButtonProps = {
  /** Sets the value and aria-label for the toggle button. Display can be overridden using default slot */
  toggleValue: string;
};

/**
 * CdrToggleGroup component properties
 * Container for CdrToggleButton components
 */
export type CdrToggleGroupProps = {
  /** v-model binding */
  modelValue: string | number | boolean | object | unknown[];
  /** Sets toggle button size */
  size?: SwitchSize;
};
