/**
 * CdrAccordion component properties
 */
export type CdrAccordionProps = {
  /** The unique id of an accordion */
  id: string;
  /** Toggle this value to open/close the accordion */
  opened?: boolean;
  /** Sets a compact style */
  compact?: boolean;
  /** Sets a border-aligned style */
  borderAligned?: boolean;
  /** Sets the heading level */
  level: string | number;
  /** Toggles content spacing (padding) */
  contentSpacing?: boolean;
  /** Sets the readable text on CdrAccordion button (also can be slotted) */
  label?: string;
};

/**
 * CdrAccordionGroup component properties
 */
export type CdrAccordionGroupProps = {
  /** When true, accordion content is unwrapped from the accordion container */
  unwrapped?: boolean;
};
