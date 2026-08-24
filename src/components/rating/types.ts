/**
 * CdrRating component properties
 * Provides insight into user opinions for products, experiences, and more
 */
export type CdrRatingProps = {
  /** Sets the rating values between 0 and 5 */
  rating: string | number;
  /** Sets the total number of ratings */
  count?: string | number | null;
  /** Hides the word 'reviews' if true */
  compact?: boolean;
  /** Sets the rating component (icons and text) to display inline and wraps them in an anchor tag so they can act as link */
  href?: string;
  /** Sets the rating size */
  size?: string;
};
