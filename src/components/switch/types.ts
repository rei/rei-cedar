/**
 * CdrSwitch component properties
 * Permits selection from two opposing options
 */
export type CdrSwitchProps = {
  /** Sets a custom ID for the switch. If this value is not set, it will be auto-generated */
  id?: string;
  /** Sets the size of the switch */
  size?: 'medium' | 'large';
  /** Sets the label and switch to expand to the full width of its container with space-between */
  fullWidth?: boolean;
  /** v-model binding */
  modelValue: boolean;
};
