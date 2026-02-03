/**
 * Valid HTML tag types for CdrLink component
 */
export type CdrLinkTag = 'a' | 'button';

/**
 * CdrLink component properties
 * Links can be rendered as anchors or buttons with various styling options
 */
export type CdrLinkProps = {
  /** Sets valid HTML element tag */
  tag?: CdrLinkTag;
  /** Sets value for anchors href property. Requires tag prop value to be `a`. */
  href?: string;
  /** Sets color and fill */
  inheritColor?: boolean;
  /** Modifies the style variant for this component. */
  modifier?: '' | 'standalone';
  /** @ignore */
  target?: string;
  /** @ignore */
  rel?: string;
};
