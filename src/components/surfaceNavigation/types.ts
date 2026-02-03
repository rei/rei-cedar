import type {
  Tag,
  Background,
  BorderColor,
  BorderStyle,
  SpaceFixed,
  Radius,
  Shadow,
} from '../../types/other';
import type { StateConfig } from '../surface/types';

/**
 * CdrSurfaceNavigation component properties
 * Navigation variant of CdrSurface for navigation contexts
 */
export type CdrSurfaceNavigationProps = {
  /** Adds in a background color based on the current palette's tokens */
  background?: Background | StateConfig<Background>;
  /** Specifies a border color based on the token options within Cedar */
  borderColor?: BorderColor | StateConfig<BorderColor>;
  /** Specifies a border style based on the token options within Cedar */
  borderStyle?: BorderStyle | StateConfig<BorderStyle>;
  /** Specifies a border width based on the token options within Cedar */
  borderWidth?: SpaceFixed | StateConfig<SpaceFixed>;
  /** Adds in a border radius based on the token options within Cedar */
  borderRadius?: Radius | StateConfig<Radius>;
  /** Adds a shadow based on the token options within Cedar */
  boxShadow?: Shadow | StateConfig<Shadow>;
  /** Determines which HTML tag to use */
  tag?: Tag;
  /** Defines a palette for the component's style variations */
  palette?: 'default' | 'sandstone' | 'membership-subtle' | 'membership-vibrant';
};
