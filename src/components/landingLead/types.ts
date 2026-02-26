/**
 * CdrLandingLead component properties
 */
export type CdrLandingLeadProps = {
  /** Sets the landing lead's image source */
  imgSrc: string;
  /** Comma-separated list of img srcsets */
  imgSrcset?: string;
  /** Sets the landing lead's image alt */
  imgAlt?: string;
  /** Sets the landing lead's heading */
  heading: string;
  /** Sets the landing lead's subheading */
  subheading?: string;
};

/**
 * CdrHeadingSubheadingBlock component properties
 */
export type CdrHeadingSubheadingBlockProps = {
  /** Sets the HTML tag for the heading element */
  headingTag?: string;
};
