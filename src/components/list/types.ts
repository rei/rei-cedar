import type { ListTag } from '../../types/componentOptions';

/**
 * CdrList component properties
 */
export type CdrListProps = {
  /** Sets list type and HTML element as "unordered" or "ordered" */
  tag?: ListTag;
  /** Modifies the style variant for this component */
  modifier?: string;
};
