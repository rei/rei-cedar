import type { Component } from 'vue';
import type {
  Tag,
  Background,
  BorderColor,
  BorderStyle,
  SpaceFixed,
  Radius,
  Shadow,
  ScaleValue,
  StatusType,
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
 * Content configuration for CdrFulfillmentTile component.
 */
export interface FulfillmentTileContent {
  /**
   * Sets the type scale for text sizing
   * @values -2, -1, 0, 1
   */
  scale?: ScaleValue;
}

/**
 * Icon configuration for CdrFulfillmentTile component.
 */
export interface FulfillmentTileIcon {
  /**
   * The intent or type of message being displayed.
   * @values info, warning, success, error, default
   */
  type?: StatusType;
}

/**
 * Layout interface for fulfillment tile
 */
export interface FulfillmentTileLayout {
  /** The component or HTML tag to render at the root level */
  as?: Component | string;
  [key: string]: any;
}

/**
 * CdrFulfillmentTile component properties
 * Selection variant of surface with interactive states for fulfillment options
 */
export type CdrFulfillmentTileProps = {
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
  /** Determines if the surface is in a checked state. Adds an `aria-checked` attribute */
  checked?: boolean;
  /** Determines if the surface is in a disabled state */
  disabled?: boolean;
  /** Determines if the surface is in a loading state */
  loading?: boolean;
  /** Determines the ARIA role of the surface. Typically 'radio' or 'checkbox' */
  role?: string;
  /** Layout props that will be merged with selection defaults */
  layout?: FulfillmentTileLayout;
};

/**
 * CdrFulfillmentTileIcon component properties
 */
export type CdrFulfillmentTileIconProps = {
  /** The intent or type of icon being displayed */
  type?: StatusType;
};
