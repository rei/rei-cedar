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
 * InlineCss data object for allowing any CSS attribute, including CSS variables
 * @interface InlineCss
 */
export interface InlineCss {
  [key: string]: any;
}

/**
 * SurfaceProps contains the props used to create a surface
 * @interface CdrSurfaceProps
 * @extends HtmlAttributes
 */
export interface CdrSurfaceProps extends HtmlAttributes {
  modifier?: Modifier;
  background?: Background;
  tag?: Tag;
  shadow?: Shadow;
  radius?: Radius;
  withBorder?: boolean;
  borderWidth?: Space;
  borderColor?: BorderColor;
  borderStyle?: BorderStyle;
  m?: Space;
  mx?: Space;
  my?: Space;
  ml?: Space;
  mr?: Space;
  mt?: Space;
  mb?: Space;
  p?: Space;
  px?: Space;
  py?: Space;
  pl?: Space;
  pr?: Space;
  pt?: Space;
  pb?: Space;
}

export interface CdrSurfaceSelectionProps extends CdrSurfaceProps {
  checked: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  loading?: boolean;
  orientation?: Orientation;
}
