import type { CheckboxModifier, PrimarySecondary } from '../../types/componentOptions';

/**
 * CdrCheckbox component properties
 */
export type CdrCheckboxProps = {
  /** Passes a CSS class to the label for custom styles */
  labelClass?: string;
  /** Passes a CSS class to the input for custom styles */
  inputClass?: string;
  /** Passes a CSS class to the slot wrapper for custom styles */
  contentClass?: string;
  /** Show checkbox in indeterminate state */
  indeterminate?: boolean | string;
  /** Disables the checkbox */
  disabled?: boolean;
  /** The value when checked */
  trueValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** The value when unchecked */
  falseValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** The value when used in a checkbox group */
  customValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** Sets the background color the input is rendered on */
  background?: PrimarySecondary;
  /** Sets the checkbox size */
  size?: string;
  /** Modifies the component style variant */
  modifier?: CheckboxModifier;
  /** Model value for v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
};
