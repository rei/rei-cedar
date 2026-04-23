import type { PositionValue } from '../../types/other';

/**
 * CdrPopover component properties
 */
export type CdrPopoverProps = {
  /** Sets the position where the popover will render relative to the trigger element */
  position?: PositionValue;
  /** If set to true, popover will attempt to dynamically set its position */
  autoPosition?: boolean;
  /** Sets the title for the popover content. Can also be provided via the title slot */
  label?: string;
  /** ID for the popover element, required for accessibility */
  id: string;
  /** Add custom class to the popover content wrapper */
  contentClass?: string;
  /** Used to programmatically control the popover state */
  open?: boolean;
};
