import type { InputType, PrimarySecondary } from '../../types/componentOptions';

/**
 * CdrInput component properties
 */
export type CdrInputProps = {
  /** Custom ID that is mapped to the label 'for' attribute. If this value is not set, it will be randomly generated. */
  id?: string;
  /** 'type' attribute for the input as defined by w3c. Only supporting text|email|number|password|search|url|tel|date|datetime-local. */
  type?: InputType;
  /** Sets the text value for the input label. Required for a11y compliance. */
  label: string;
  /** Sets default attributes for an input that should launch a numeric keyboard */
  numeric?: boolean;
  /** Removes the label element but sets the input `aria-label` to `label` text for a11y. */
  hideLabel?: boolean;
  /** Number of rows for input. Converts component to text-area if rows greater than 1. */
  rows?: number;
  /** Sets the background color the input is rendered on */
  background?: PrimarySecondary;
  /** Sets the input field size */
  size?: string;
  /** Sets the `role` attribute for the embedded error state messaging. */
  errorRole?: string;
  /** Sets the input to an error state, displays the `error` slot if one is present. */
  error?: boolean | string;
  /** Sets the disabled state for the input field and label styling. */
  disabled?: boolean;
  /** Sets aria-required on the input field and displays an asterisk next to the input label. */
  required?: boolean;
  /** Displays '(optional)' text next to the input label. */
  optional?: boolean;
  /** The v-model value for the input */
  modelValue?: string | number;
  /** Adds a custom class to the cdr-label-standalone container div */
  inputContainerClass?: string;
  /** Passes a custom class to the label for custom styles */
  labelClass?: string;
};
