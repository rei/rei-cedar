/**
 * CdrLabelStandalone component properties
 */
export type CdrLabelStandaloneProps = {
  /** The ID of the form element this label is associated with */
  forId: string;
  /** The label text */
  label?: string;
  /** Sets the disabled state for the label styling */
  disabled?: boolean;
  /** Adds required indicator to the label */
  required?: boolean;
  /** Adds optional indicator to the label */
  optional?: boolean;
  /** Visually hides the label but keeps it accessible to screen readers */
  hideLabel?: boolean;
  /** Custom CSS class for the label element */
  labelClass?: string;
};
