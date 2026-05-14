/**
 * CdrChip component properties
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface CdrChipProps {}

/**
 * CdrChipGroup component properties
 */
export type CdrChipGroupProps = {
  /** Sets a label that describes the chip group */
  label: string;
  /** Visually hides the chip group label but makes it accessible to screen readers */
  hideLabel?: boolean;
};
