import type {
  Tag,
  Space,
  Shadow,
  Radius,
  BorderColor,
  BorderStyle,
  Modifier,
  Background,
  Orientation,
  ScaleValue,
  StatusType,
} from './other';

/**
 * HtmlAttributes data object for allowing any HTML attribute
 * @interface HtmlAttributes
 */
export interface HtmlAttributes {
  [key: string]: any;
}

/**
 * Breadcrumb data object
 *
 * @interface breadcrumbItem
 * @url {string} The url for the breadcrumb link
 * @name {string} The display name for breadcrumb link
 * @id {string} Optional id
 */
export interface breadcrumbItem {
  item: {
    url: string;
    name: string;
    id?: string;
  };
}

/**
 * Pagination data object
 *
 * @interface paginationItem
 * @page {number} The page number, also used as link text
 * @url {string} The url for the pagination link
 * @ellip {boolean} Optional flag to render pagination to truncate pagination links
 */
export interface paginationItem {
  page: number;
  url: string;
  ellip?: boolean;
}

/**
 * Select data object
 *
 * @interface selectOption
 * @text {string} The displayed option
 * @value {string} The underlying value for the option
 */
export interface selectOption {
  text: string;
  value: string;
}

export interface choreographerSchema {
  type: string;
  props?: object;
  content?: string | choreographerSchema;
}

/**
 * Image component properties
 *
 * @interface baseImageProps
 *
 */
export interface baseImageProps {
  /** The image src */
  src: string;
  /** The image alt. Defaults to empty string. */
  alt?: string;
  /** Comma separated list of image sources */
  srcset?: string;
  /** Comma separated list of source sizes */
  sizes?: string;
  /**
   * Object fit of the image, passes value to CSS object-fit property
   * @demoSelectMultiple false
   * @values none,contain,cover,fill,scale-down
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * Object position of the image, passes value to CSS object-position property.
   * @demoSelectMultiple true
   * @values center,top,right,bottom,left
   */
  position?: string;
  /**
   * Border radius of the image. Accepts shorthand for cedar radius tokens ("soft", "softer", "round") or a custom value which is passed ot the CSS border-radius property.
   * @demoSelectMultiple false
   * @values unset, soft, softer, round, 10%
   */
  radius?: 'soft' | 'softer' | 'round' | string;
  /**
   * Aspect ratio of the image, passes to the CSS aspect-ratio property.
   * @demoSelectMultiple false
   * @values auto,1/1,1/2,3/4,9/16,2/1,4/3,16/9
   */
  ratio?: string;
  /**
   * Value for loading attribute ("lazy", "eager", "auto")
   * @demoIgnore
   */
  loading?: 'lazy' | 'eager';
  /**
   * value for decoding attribute ()
   * @demoIgnore
   */
  decoding?: 'async' | 'sync' | 'auto';
  /**
   * value for fetch priority attribute
   * @demoIgnore
   */
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * An object containing 1..n child objects containing HTMLSourceElement attributes
 *
 * @interface pictureSourceObject
 * @extends HTMLSourceElement
 */
export interface pictureSourceObject {
  [key: string]: {
    media: string;
    srcset: string;
    width?: string;
    height?: string;
    type?: string;
    sizes?: string;
  };
}

/**
 * Text component properties
 * @interface baseTextProps
 */
export interface baseTextProps extends HtmlAttributes {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: string;
}

/**
 * surface contains the props used to create a surface
 * @interface surface
 * @extends HtmlAttributes
 */
export interface surface extends HtmlAttributes {
  /**
   * Adds in a background color based on the current palette's tokens.
   * @demoSelectMultiple false
   * @values primary, secondary, brand-spruce, sale
   */
  background?: Background;
  /**
   * Specifies a border color based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values primary, secondary, success, warning, error, info
   */
  borderColor?: BorderColor;
  /**
   * Specifies a border style based on the token options within Cedar.
   * @values dotted, dashed, solid
   */
  borderStyle?: BorderStyle;
  /**
   * Specifies a border width based on the token options within Cedar.
   * @values zero, sixteenth-x, eighth-x, three-sixteenth-x, quarter-x'
   */
  borderWidth?: Space;
  /**
   * Determines which set of styles to apply to the component.
   * @values default
   */
  modifier?: Modifier;
  /**
   * Adds in a border radius based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values sharp, soft, softer, softest, round
   */
  radius?: Radius;
  /**
   * Adds a shadow based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values flat, raised, elevated, floating, lifted
   */
  shadow?: Shadow;
  /**
   * Determines which HTML tag to use.
   */
  tag?: Tag;
  /**
   * Adds in a border. Comes with a default color, width, and style.
   */
  withBorder?: boolean;
  /**
   * Defines a palette for the component's style variations.
   * @values default, sandstone, membership-subtle, membership-vibrant
   */
  palette?: 'default' | 'sandstone' | 'membership-subtle' | 'membership-vibrant';
}

export interface surfaceSelection extends HtmlAttributes {
  /**
   * Determines if the button is in a checked state. Adds an `aria-checked` attribute to the button.
   * @skip true
   */
  checked?: boolean;
  /**
   * Determines if the button is in a disabled state.
   * @skip true
   */
  disabled?: boolean;
  /**
   * Determines if the button is in a loading state. Adds a `data-loading` attribute to the button. Using CSS, this will hide the default slot and show the loading slot.
   * @skip true
   */
  loading?: boolean;
  /**
   * Determines which set of styles to apply to the component.
   * @values default
   */
  modifier?: Modifier;
  /**
   * Determines if the layout is in horizontal or vertical mode.
   * @values horizontal, vertical
   */
  orientation?: Orientation;
  /**
   * Determines the role of the button. Typically, this will either be `radio` or `checkbox`.
   */
  role?: string;
  /**
   * Adds a shadow based on the token options within Cedar.
   * @values flat, raised, elevated, floating, lifted
   */
  shadow?: Shadow;
  /**
   * Determines which HTML tag to use.
   */
  tag?: Tag;
}

export interface surfaceSelectionLayout extends HtmlAttributes {
  /**
   * Determines if the layout is in horizontal or vertical mode.
   * @values horizontal, vertical
   */
  orientation?: Orientation;
}

export interface fulfillmentTileContent extends HtmlAttributes {
  /**
   * Determines if the content should expand when space is available.
   */
  stretch?: boolean;
  /**
   * Sets the type scale
   * @values -2, -1, 0, 1
   */
  scale?: ScaleValue;
}

export interface fulfillmentTileIcon extends HtmlAttributes {
  /**
   * The intent or type of message being displayed.
   * @values info, warning, success, error, default
   */
  type?: StatusType;
}
