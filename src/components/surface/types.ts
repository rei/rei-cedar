import type {
  Tag,
  Background,
  BorderColor,
  BorderStyle,
  SpaceFixed,
  Radius,
  Shadow,
} from '../../types/other';

/**
 * Configuration object for state-based property values.
 * Allows different values for different interaction states.
 */
export interface StateConfig<PropertyValue> {
  /** Default/resting state value */
  rest: PropertyValue;
  /** Value when element is hovered */
  hover?: PropertyValue;
  /** Value when element is active/pressed */
  active?: PropertyValue;
  /** Value when element is checked/selected */
  checked?: PropertyValue;
  /** Value when element is in loading state */
  loading?: PropertyValue;
  /** Value when element is disabled */
  disabled?: PropertyValue;
  /** Value when link has been visited */
  visited?: PropertyValue;
}

/**
 * Properties for creating a foundational surface component with visual styling options.
 * Surfaces provide background, borders, shadows, and other visual treatments.
 */
export interface Surface {
  /**
   * Adds in a background color based on the current palette's tokens.
   */
  background?: Background | StateConfig<Background>;
  /**
   * Specifies a border color based on the token options within Cedar.
   */
  borderColor?: BorderColor | StateConfig<BorderColor>;
  /**
   * Specifies a border style based on the token options within Cedar.
   */
  borderStyle?: BorderStyle | StateConfig<BorderStyle>;
  /**
   * Specifies a border width based on the token options within Cedar.
   */
  borderWidth?: SpaceFixed | StateConfig<SpaceFixed>;
  /**
   * Adds in a border radius based on the token options within Cedar.
   */
  borderRadius?: Radius | StateConfig<Radius>;
  /**
   * Adds a shadow based on the token options within Cedar.
   */
  boxShadow?: Shadow | StateConfig<Shadow>;
  /**
   * Determines which HTML tag to use.
   */
  tag?: Tag;
  /**
   * Defines a palette for the component's style variations.
   */
  palette?: 'default' | 'sandstone' | 'membership-subtle' | 'membership-vibrant';
}

/**
 * CdrSurface component properties
 * Foundational container for creating structured layouts with visual styling options
 */
export type CdrSurfaceProps = Surface;
