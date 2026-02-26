/**
 * CdrQuote component properties
 */
export type CdrQuoteProps = {
  /** Sets the semantic HTML element for the quote */
  tag?: 'blockquote' | 'aside' | 'q' | 'div';
  /** Modifies the style variant for the quote */
  modifier?: '' | 'pull';
  /** Sets the quote body text */
  summary?: string;
  /** Sets the quote attribution text */
  citation?: string;
};
