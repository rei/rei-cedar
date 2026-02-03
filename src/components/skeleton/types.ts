/**
 * CdrSkeleton component properties
 * Visually communicates content is in the process of loading
 */
export type CdrSkeletonProps = {
  /** Toggle animation on/off. Automatically disabled if prefers-reduced-motion is set by user */
  motion?: boolean;
};

/**
 * CdrSkeletonBone component properties
 * Individual skeleton placeholder element
 */
export type CdrSkeletonBoneProps = {
  /** Sets the type of content placeholder */
  type?: 'default' | 'heading' | 'line' | 'rectangle' | 'square';
};
