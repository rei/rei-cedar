import type { PositionValue } from '../../types/componentOptions';

/**
 * CdrTooltip component properties
 * Floating label used to clarify interface actions
 */
export type CdrTooltipProps = {
  /** Sets the position where the tooltip will render relative to the trigger element */
  position?: PositionValue;
  /** If true, tooltip will dynamically set its position to ensure it renders within the visible browser window */
  autoPosition?: boolean;
  /** ID for the tooltip element, required for accessibility */
  id?: string;
  /** Add custom class to the tooltip content wrapper */
  contentClass?: string;
  /** Used to programmatically control the tooltip state */
  open?: boolean;
};
