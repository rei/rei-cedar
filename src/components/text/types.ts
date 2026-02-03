import type { Tag } from '../../types/other';

/**
 * Base properties for text components
 */
export interface BaseTextProps {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
}

/**
 * CdrText component properties
 * Text wrapper component for semantic HTML elements
 */
export type CdrTextProps = {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
};
