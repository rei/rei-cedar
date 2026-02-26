/**
 * CdrFormGroup component properties
 */
export type CdrFormGroupProps = {
  /** Custom ID that is mapped to the form error */
  id?: string;
  /** Sets the label/legend for the form group */
  label?: string;
  /** Sets the form group to an error state */
  error?: boolean | string;
  /** Adds required label to the form group */
  required?: boolean;
  /** Adds optional label to the form group */
  optional?: boolean;
  /** Renders form group in a disabled state */
  disabled?: boolean;
};
