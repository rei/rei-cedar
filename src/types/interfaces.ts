import type { Component } from 'vue';
import type {
  Tag,
  Space,
  SpaceFixed,
  Shadow,
  Radius,
  BorderColor,
  BorderStyle,
  Background,
  ScaleValue,
  StatusType,
  Flow,
  StructureOption,
  QueryType,
  Position,
  Alignment,
  AlignmentValue,
  MediaMeasurement,
} from './other';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NameValuePair {
  [key: string]: any;
}

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

export interface ChoreographerSchema {
  type?: string;
  props?: object;
  slots?: { [key: string]: ChoreographerSchema };
  content?: string | ChoreographerSchema;
}

export interface ChoreographerComponents {
  [key: string]: Component;
}

export interface Choreographer {
  schema: [ChoreographerSchema];
  components?: ChoreographerComponents;
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
export interface baseTextProps {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: string;
}

/**
 * Foundational container for creating structured layouts
 * @interface Layout
 */
export interface Layout extends NameValuePair {
  /**
   * Determines if the layout is in horizontal or vertical mode.
   * @demoSelectMultiple false
   * @values container, media
   */
  queryType?: QueryType;
  /**
   * Specifies the auto-placement behavior. This is translated to `grid-auto-flow`.
   * @demoSelectMultiple false
   * @values row, column
   */
  flow?: Flow;
  /**
   * Specifies how auto-generated tracks will be created. This is translated to either `grid-auto-columns` or `grid-auto-rows`, depending on flow.
   */
  flowValue?: string;
  /**
   * Determines the number of columns at various breakpoints
   */
  columns?: StructureOption;
  /**
   * Determines the number of rows at various breakpoints
   */
  rows?: StructureOption;
  /**
   * Specifies a gap based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, scale-4, scale-3--5
   */
  gap?: Space;
  /**
   * Specifies a row gap based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, scale-4, scale-3--5
   */
  rowGap?: Space;
  /**
   * Specifies a column gap based on the token options within Cedar.
   * @demoSelectMultiple false
   * @values zero, one-x, two-x, scale-4, scale-3--5
   */
  columnGap?: Space;
  /**
   * The component or HTML tag to render at the root level. Note: The component "CdrSurface" has special treatment and may be used in quotes.
   */
  as?: Component | string;
}

interface StateConfig<PropertyValue> {
  rest: PropertyValue;
  hover?: PropertyValue;
  active?: PropertyValue;
  checked?: PropertyValue;
  loading?: PropertyValue;
  disabled?: PropertyValue;
  visited?: PropertyValue;
}

/**
 * surface contains the props used to create a surface
 * @interface surface
 */
export interface surface {
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

export interface surfaceSelection extends surface {
  /**
   * Determines if the surface is in a checked state. Adds an `aria-checked` attribute.
   * @demoIgnore
   */
  checked?: boolean;

  /**
   * Determines if the surface is in a disabled state.
   * @demoIgnore
   */
  disabled?: boolean;

  /**
   * Determines if the surface is in a loading state.
   * @demoIgnore
   */
  loading?: boolean;

  /**
   * Determines the ARIA role of the surface. Typically 'radio' or 'checkbox'.
   */
  role?: string;

  /**
   * Layout props that will be merged with selection defaults.
   */
  layout?: Layout;
}

export interface fulfillmentTileContent {
  /**
   * Sets the type scale
   * @values -2, -1, 0, 1
   */
  scale?: ScaleValue;
}

export interface fulfillmentTileIcon {
  /**
   * The intent or type of message being displayed.
   * @values info, warning, success, error, default
   */
  type?: StatusType;
}

export interface MediaObject extends Layout {
  /**
   * @ignore
   */
  queryType?: QueryType;
  /**
   * The alignment of the media and content along the x or y axis, depending on the layout. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values start, center, end
   */
  align?: Alignment;
  /**
   * The position of the media, in relation to the content. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @demoSelectMultiple false
   * @values top, right, bottom, left
   */
  mediaPosition?: Position;
  /**
   * The width of the column that media is placed within. This can be any CSS value. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values 1fr, auto, 25%, 50%, 75%, 200px, 50cqh
   */
  mediaWidth?: MediaMeasurement;
  /**
   * The height of the column that media is placed within. This can be any CSS value. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @values 1fr, auto, 25%, 50%, 75%, 200px, 50cqw
   */
  mediaHeight?: MediaMeasurement;
  /**
   * This property forces media to take up the full height and width of the media container and positions media to be absolute. Images and videos will still need to be configured with object-fit and object-position.
   */
  mediaCover?: boolean;
  /**
   * Determines if content will overlay the media. A default media height is set, but it is suggested to apply your own using as value such as container width units (cqw) or rem.
   */
  overlay?: boolean;
  /**
   * The alignment of the content along the x axis.
   * @values start, center, end
   */
  overlayRowAlign?: AlignmentValue;
  /**
   * The alignment of the content along the y axis.
   * @values start, center, end
   */
  overlayColumnAlign?: AlignmentValue;
  /**
   * The spacing token to use for padding around the content. This can be an object with values for each Cedar breakpoint (xs, sm, md, lg).
   * @demoSelectMultiple false
   * @values zero, one-x, two-x
   */
  contentPadding?: SpaceFixed;
}

export type ObjectPosition =
  | 'left-top'
  | 'center-top'
  | 'right-top'
  | 'left-center'
  | 'center-center'
  | 'right-center'
  | 'left-bottom'
  | 'center-bottom'
  | 'right-bottom';

export type ResponsivePosition = {
  xs?: ObjectPosition;
  sm?: ObjectPosition;
  md?: ObjectPosition;
  lg?: ObjectPosition;
};

export type SpaceTuple =
  | [SpaceFixed]
  | [SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed, SpaceFixed];

export type Spacing = SpaceFixed | SpaceTuple;

export type ResponsiveSpace = {
  xs?: Spacing;
  sm?: Spacing;
  md?: Spacing;
  lg?: Spacing;
};

export interface ObjectOverlayProps {
  /**
   * Determines if the container will have a gradient based on position
   * @demoIgnore
   */
  withGradient?: boolean;
  /** Theme for the gradient (dark or light) */
  gradientTheme?: 'dark' | 'light';
  /** Position of the content relative to the container */
  position?: ResponsivePosition | ObjectPosition;
  /** Margin space around the positioned content */
  margin?: ResponsiveSpace | Spacing;
  /** Padding space around the positioned content */
  padding?: ResponsiveSpace | Spacing;
  /** Sets the HTML tag for the container element */
  tag?: string;
}

/**
 * Props for the CdrLink component.
 */
export type CdrLinkTag = 'a' | 'button';

export interface CdrLinkProps {
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
}

/**
 * Interface for the `CdrFilmstrip` component.
 */
export * from '../components/filmstrip/interfaces';
