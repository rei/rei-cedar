import type { ContainerModifier, Tag } from '../../types/componentOptions';

/**
 * CdrContainer component properties
 */
export type CdrContainerProps = {
  /** Sets the HTML tag for the container element */
  tag?: Tag;
  /** Controls whether container is static or fluid width */
  modifier?: ContainerModifier;
};
