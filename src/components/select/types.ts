import type { PrimarySecondary } from '../../types/other';

/**
 * Option data structure for select/dropdown components
 */
export interface SelectOption {
  /** The displayed label text for the option */
  text: string;
  /** The underlying value for the option */
  value: string;
}

/**
 * CdrSelect component properties
 * Allows the selection of one or more options from a dropdown list
 */
export type CdrSelectProps = {
  /** Custom ID that is mapped to the label 'for' attribute. If this value is not set, it will be auto-generated */
  id?: string;
  /** Sets the text value for the select label. Required for accessibility compliance */
  label: string;
  /** Visually hides the label element, but leaves it available to screen readers for accessibility compliance */
  hideLabel?: boolean;
  /** Adds an option that is disabled and selected by default to serve as a placeholder for the select */
  prompt?: string;
  /** Build options programmatically with data. Provide an array of objects or an array of strings */
  options?: SelectOption[] | string[];
  /** Sets the background color the select is rendered on */
  background?: PrimarySecondary;
  /** Sets the component's size; values can target responsive breakpoints */
  size?: string;
  /** Sets the select to an error state, displays the error slot if one is present */
  error?: boolean | string;
  /** Sets the role attribute for the embedded error state messaging */
  errorRole?: string;
  /** v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** Disables the input and sets appropriate styling */
  disabled?: boolean;
  /** Sets aria-required on the input field and displays an asterisk next to the select label */
  required?: boolean;
  /** Displays '(optional)' text next to the select label */
  optional?: boolean;
  /** Turns CdrSelect into a multi-select element */
  multiple?: boolean;
  /** Sets the height of the CdrSelect when using the multiple option */
  multipleSize?: number;
};
