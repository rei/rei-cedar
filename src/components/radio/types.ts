/**
 * CdrRadio component properties
 */
export type CdrRadioProps = {
  /** Adds CSS class to the label for custom styles */
  labelClass?: string;
  /** Adds CSS class to the input for custom styles */
  inputClass?: string;
  /** Adds CSS class to the slot wrapper for custom styles */
  contentClass?: string;
  /** Disables the radio */
  disabled?: boolean;
  /** Sets the name of the radio button */
  name: string;
  /** Modifies the style variants for this component */
  modifier?: string;
  /** Sets the radio size; values can target responsive breakpoints */
  size?: string;
  /** Sets the background color the radio button is rendered on */
  background?: 'primary' | 'secondary';
  /** Sets the value of the radio */
  customValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
};
