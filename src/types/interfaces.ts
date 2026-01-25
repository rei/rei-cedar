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

// #region Generic Interfaces
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generic key-value pair object allowing any property types
 *
 * @interface NameValuePair
 */
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
 * Breadcrumb navigation item data structure
 *
 * @interface BreadcrumbItem
 */
export interface BreadcrumbItem {
  item: {
    /** The URL for the breadcrumb link */
    url: string;
    /** The display name for the breadcrumb link */
    name: string;
    /** Optional unique identifier */
    id?: string;
  };
}

/**
 * Pagination navigation item data structure
 *
 * @interface PaginationItem
 */
export interface PaginationItem {
  /** The page number, also used as link text */
  page: number;
  /** The URL for the pagination link */
  url: string;
  /** Optional flag to render an ellipsis for truncated pagination */
  ellip?: boolean;
}

/**
 * Option data structure for select/dropdown components
 *
 * @interface SelectOption
 */
export interface SelectOption {
  /** The displayed label text for the option */
  text: string;
  /** The underlying value for the option */
  value: string;
}

/**
 * Schema definition for a choreographer component node
 *
 * @interface ChoreographerSchema
 */
export interface ChoreographerSchema {
  /** Component type identifier */
  type?: string;
  /** Component properties */
  props?: object;
  /** Named slots with nested schemas */
  slots?: { [key: string]: ChoreographerSchema };
  /** Content - either text or nested schema */
  content?: string | ChoreographerSchema;
}

/**
 * Map of component names to Vue component definitions
 *
 * @interface ChoreographerComponents
 */
export interface ChoreographerComponents {
  [key: string]: Component;
}

/**
 * Choreographer configuration for rendering dynamic component trees
 *
 * @interface Choreographer
 */
export interface Choreographer {
  schema: [ChoreographerSchema];
  components?: ChoreographerComponents;
}

/**
 * Base properties for image components (CdrImg, CdrPicture)
 * Provides common image attributes and styling options
 *
 * @interface BaseImageProps
 */
export interface BaseImageProps {
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
 * An object containing one or more child objects with HTMLSourceElement attributes for responsive images
 *
 * @interface PictureSourceObject
 */
export interface PictureSourceObject {
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
 * @interface BaseTextProps
 */
export interface BaseTextProps {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
}

/**
 * Properties for foundational layout container using CSS Grid.
 * Provides responsive grid configuration with flow, columns, rows, and gap options.
 *
 * @interface Layout
 * @extends NameValuePair
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

/**
 * Configuration object for state-based property values.
 * Allows different values for different interaction states.
 *
 * @interface StateConfig
 * @template PropertyValue - The type of value for each state
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
 *
 * @interface Surface
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
 * Extended surface interface for selectable/interactive surfaces.
 * Adds support for checked, disabled, and loading states with appropriate ARIA attributes.
 *
 * @interface SurfaceSelection
 * @extends Surface
 */
export interface SurfaceSelection extends Surface {
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

/**
 * Content configuration for CdrFulfillmentTile component.
 *
 * @interface FulfillmentTileContent
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
 *
 * @interface FulfillmentTileIcon
 */
export interface FulfillmentTileIcon {
  /**
   * The intent or type of message being displayed.
   * @values info, warning, success, error, default
   */
  type?: StatusType;
}

/**
 * Properties for MediaObject component layout configuration.
 * Extends Layout with media-specific positioning and sizing options.
 *
 * @interface MediaObject
 * @extends Layout
 */
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

/**
 * Object position values for positioning content within a container
 */
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

/**
 * Responsive object position values mapped to Cedar breakpoints
 */
export type ResponsivePosition = {
  xs?: ObjectPosition;
  sm?: ObjectPosition;
  md?: ObjectPosition;
  lg?: ObjectPosition;
};

/**
 * Tuple of spacing values following CSS shorthand pattern (1-4 values)
 */
export type SpaceTuple =
  | [SpaceFixed]
  | [SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed, SpaceFixed];

/**
 * Spacing value - either a single token or a tuple for directional spacing
 */
export type Spacing = SpaceFixed | SpaceTuple;

/**
 * Responsive spacing values mapped to Cedar breakpoints
 */
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
 * Interface for the `CdrFilmstrip` component.
 */
export * from '../components/filmstrip/interfaces';

// #endregion

// #region Component Props Types
/**
 * CdrAbstract component properties
 * Text wrapper component for abstract/introductory content
 */
export type CdrAbstractProps = {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
};

/**
 * CdrAccordion component properties
 */
export type CdrAccordionProps = {
  /** The unique id of an accordion */
  id: string;
  /** Toggle this value to open/close the accordion */
  opened?: boolean;
  /** Sets a compact style */
  compact?: boolean;
  /** Sets a border-aligned style */
  borderAligned?: boolean;
  /** Sets the heading level */
  level: string | number;
  /** Toggles content spacing (padding) */
  contentSpacing?: boolean;
  /** Sets the readable text on CdrAccordion button (also can be slotted) */
  label?: string;
};

/**
 * CdrBanner component properties
 */
export type CdrBannerProps = {
  type: 'info' | 'warning' | 'success' | 'error' | 'default';
};

/**
 * CdrBreadcrumb component properties
 */
export type CdrBreadcrumbProps = {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Enables truncation of breadcrumb items */
  truncationEnabled?: boolean;
  /** Unique id for the breadcrumb */
  id?: string;
};

/**
 * CdrButton component properties
 */
export type CdrButtonProps = {
  /** Renders CdrButton as a button or a element */
  tag?: 'button' | 'a';
  /** Sets the button type */
  type?: 'button' | 'submit' | 'reset';
  /** Modifies the style variant for this component */
  modifier?: 'primary' | 'secondary' | 'sale' | 'dark' | 'link';
  /** Sets the button size; values can target responsive breakpoints */
  size?: string;
  /** Sets button width to 100% */
  fullWidth?: boolean | string;
  /** Renders an icon-only button */
  iconOnly?: boolean;
  /** Renders an icon-only button with a background color and border */
  withBackground?: boolean;
};

/**
 * CdrCaption component properties
 */
export type CdrCaptionProps = {
  /** Sets the string content for the description body of the caption */
  summary?: string;
  /** Sets the string content for attribution */
  credit?: string;
};

/**
 * CdrCard component properties
 */
export type CdrCardProps = {
  /** Sets valid HTML container element tag */
  tag?: Tag;
};

/**
 * CdrCheckbox component properties
 */
export type CdrCheckboxProps = {
  /** Passes a CSS class to the label for custom styles */
  labelClass?: string;
  /** Passes a CSS class to the input for custom styles */
  inputClass?: string;
  /** Passes a CSS class to the slot wrapper for custom styles */
  contentClass?: string;
  /** Show checkbox in indeterminate state */
  indeterminate?: boolean | string;
  /** Disables the checkbox */
  disabled?: boolean;
  /** The value when checked */
  trueValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** The value when unchecked */
  falseValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** The value when used in a checkbox group */
  customValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** Sets the background color the input is rendered on */
  background?: Background;
  /** Sets the checkbox size */
  size?: string;
  /** Modifies the component style variant */
  modifier?: '' | 'hide-figure';
  /** Model value for v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
};

/**
 * CdrChip component properties
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface CdrChipProps {}

/**
 * CdrChipGroup component properties
 */
export type CdrChipGroupProps = {
  /** Sets a label that describes the chip group */
  label: string;
  /** Visually hides the chip group label but makes it accessible to screen readers */
  hideLabel?: boolean;
};

/**
 * CdrChoreographer component properties
 * Dynamic component renderer based on schema configuration
 */
export type CdrChoreographerProps = {
  /** Array of component schemas defining the structure */
  schema: [ChoreographerSchema];
  /** Optional map of custom components to make available */
  components?: ChoreographerComponents;
};

/**
 * CdrContainer component properties
 */
export type CdrContainerProps = {
  /** Sets the HTML tag for the container element */
  tag?: Tag;
  /** Controls whether container is static or fluid width */
  modifier?: 'static' | 'fluid';
};

/**
 * CdrFormError component properties
 */
export type CdrFormErrorProps = {
  /** Error message to display, can be boolean or string */
  error?: boolean | string;
};

/**
 * CdrFormGroup component properties
 */
export type CdrFormGroupProps = {
  /** Custom ID that is mapped to the form error */
  id?: string;
  /** Sets the label/legend for the form group */
  label?: string;
  /** Sets the form group to an error state */
  error?: boolean | string;
  /** Adds required label to the form group */
  required?: boolean;
  /** Adds optional label to the form group */
  optional?: boolean;
  /** Renders form group in a disabled state */
  disabled?: boolean;
};

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
  layout?: Layout;
};

/**
 * CdrGrid component properties
 */
export type CdrGridProps = {
  /** Defines gutter size, accepts responsive values */
  gutter?: string;
  /** Sets the HTML tag for the grid element */
  tag?: Tag;
};

/**
 * CdrHeadingSubheadingBlock component properties
 */
export type CdrHeadingSubheadingBlockProps = {
  /** Sets the HTML tag for the heading element */
  headingTag?: string;
};

/**
 * CdrIcon component properties
 */
export type CdrIconProps = {
  /** Sets the href attribute for use with SVG symbol sprite */
  use?: string;
  /** Sets icon fill to inherit from parent */
  inheritColor?: boolean;
  /** Sets the icon size */
  size?: 'small' | 'medium' | 'large' | string;
};

/**
 * CdrImg component properties
 * Image component with responsive and performance optimization features
 */
export type CdrImgProps = {
  /** The image src */
  src: string;
  /** The image alt. Defaults to empty string */
  alt?: string;
  /** Comma separated list of image sources */
  srcset?: string;
  /** Comma separated list of source sizes */
  sizes?: string;
  /** Object fit of the image, passes value to CSS object-fit property */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position of the image, passes value to CSS object-position property */
  position?: string;
  /** Border radius of the image. Accepts shorthand for cedar radius tokens or custom value */
  radius?: 'soft' | 'softer' | 'round' | string;
  /** Aspect ratio of the image, passes to the CSS aspect-ratio property */
  ratio?: string;
  /** Value for loading attribute */
  loading?: 'lazy' | 'eager';
  /** Value for decoding attribute */
  decoding?: 'async' | 'sync' | 'auto';
  /** Value for fetch priority attribute */
  fetchpriority?: 'high' | 'low' | 'auto';
};

/**
 * CdrInput component properties
 */
export type CdrInputProps = {
  /** Custom ID that is mapped to the label 'for' attribute. If this value is not set, it will be randomly generated. */
  id?: string;
  /** 'type' attribute for the input as defined by w3c. Only supporting text|email|number|password|search|url|tel|date|datetime-local. */
  type?:
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'url'
    | 'tel'
    | 'date'
    | 'datetime-local';
  /** Sets the text value for the input label. Required for a11y compliance. */
  label: string;
  /** Sets default attributes for an input that should launch a numeric keyboard */
  numeric?: boolean;
  /** Removes the label element but sets the input `aria-label` to `label` text for a11y. */
  hideLabel?: boolean;
  /** Number of rows for input. Converts component to text-area if rows greater than 1. */
  rows?: number;
  /** Sets the background color the input is rendered on */
  background?: 'primary' | 'secondary';
  /** Sets the input field size */
  size?: string;
  /** Sets the `role` attribute for the embedded error state messaging. */
  errorRole?: string;
  /** Sets the input to an error state, displays the `error` slot if one is present. */
  error?: boolean | string;
  /** Sets the disabled state for the input field and label styling. */
  disabled?: boolean;
  /** Sets aria-required on the input field and displays an asterisk next to the input label. */
  required?: boolean;
  /** Displays '(optional)' text next to the input label. */
  optional?: boolean;
  /** The v-model value for the input */
  modelValue?: string | number;
  /** Adds a custom class to the cdr-label-standalone container div */
  inputContainerClass?: string;
  /** Passes a custom class to the label for custom styles */
  labelClass?: string;
};

/**
 * CdrKicker component properties
 * Text component for kicker/eyebrow content above headlines
 */
export type CdrKickerProps = {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
};

/**
 * CdrLabelStandalone component properties
 */
export type CdrLabelStandaloneProps = {
  /** The ID of the form element this label is associated with */
  forId: string;
  /** The label text */
  label?: string;
  /** Sets the disabled state for the label styling */
  disabled?: boolean;
  /** Adds required indicator to the label */
  required?: boolean;
  /** Adds optional indicator to the label */
  optional?: boolean;
  /** Visually hides the label but keeps it accessible to screen readers */
  hideLabel?: boolean;
  /** Custom CSS class for the label element */
  labelClass?: string;
};

/**
 * CdrLabelWrapper component properties
 */
export type CdrLabelWrapperProps = {
  /** Custom CSS class for the label element */
  labelClass?: string;
  /** Custom CSS class for the content element */
  contentClass?: string;
  /** Sets the background color */
  background?: 'primary' | 'secondary';
  /** Sets the disabled state */
  disabled?: boolean;
  /** Sets a modifier class */
  modifier?: string;
  /** Sets the size, supports responsive values */
  size?: string;
};

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
 * CdrLayout component properties
 * Foundational layout container using CSS Grid with responsive configuration
 */
export type CdrLayoutProps = {
  /** Determines if the layout is in horizontal or vertical mode */
  queryType?: QueryType;
  /** Specifies the auto-placement behavior. This is translated to `grid-auto-flow` */
  flow?: Flow;
  /** Specifies how auto-generated tracks will be created */
  flowValue?: string;
  /** Determines the number of columns at various breakpoints */
  columns?: StructureOption;
  /** Determines the number of rows at various breakpoints */
  rows?: StructureOption;
  /** Specifies a gap based on the token options within Cedar */
  gap?: Space;
  /** Specifies a row gap based on the token options within Cedar */
  rowGap?: Space;
  /** Specifies a column gap based on the token options within Cedar */
  columnGap?: Space;
  /** The component or HTML tag to render at the root level */
  as?: Component | string;
  /** Additional properties allowed */
  [key: string]: any;
};

/**
 * Valid HTML tag types for CdrLink component
 */
export type CdrLinkTag = 'a' | 'button';

/**
 * CdrLink component properties
 * Links can be rendered as anchors or buttons with various styling options
 */
export type CdrLinkProps = {
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
};

/**
 * CdrList component properties
 */
export type CdrListProps = {
  /** Sets list type and HTML element as "unordered" or "ordered" */
  tag?: 'ul' | 'ol';
  /** Modifies the style variant for this component */
  modifier?: string;
};

/**
 * CdrMediaObject component properties
 * Component that pairs images or videos with related text in a consistent way
 */
export type CdrMediaObjectProps = {
  /** Determines if the layout is in horizontal or vertical mode */
  queryType?: QueryType;
  /** Specifies the auto-placement behavior */
  flow?: Flow;
  /** Specifies how auto-generated tracks will be created */
  flowValue?: string;
  /** Determines the number of columns at various breakpoints */
  columns?: StructureOption;
  /** Determines the number of rows at various breakpoints */
  rows?: StructureOption;
  /** Specifies a gap based on the token options within Cedar */
  gap?: Space;
  /** Specifies a row gap based on the token options within Cedar */
  rowGap?: Space;
  /** Specifies a column gap based on the token options within Cedar */
  columnGap?: Space;
  /** The component or HTML tag to render at the root level */
  as?: Component | string;
  /** The alignment of the media and content along the x or y axis */
  align?: Alignment;
  /** The position of the media, in relation to the content */
  mediaPosition?: Position;
  /** The width of the column that media is placed within */
  mediaWidth?: MediaMeasurement;
  /** The height of the column that media is placed within */
  mediaHeight?: MediaMeasurement;
  /** Forces media to take up the full height and width of the media container */
  mediaCover?: boolean;
  /** Determines if content will overlay the media */
  overlay?: boolean;
  /** The alignment of the content along the x axis */
  overlayRowAlign?: AlignmentValue;
  /** The alignment of the content along the y axis */
  overlayColumnAlign?: AlignmentValue;
  /** The spacing token to use for padding around the content */
  contentPadding?: SpaceFixed;
  /** Additional properties allowed */
  [key: string]: any;
};

/**
 * CdrModal component properties
 */
export type CdrModalProps = {
  /** Toggles the state of the modal */
  opened: boolean;
  /** Sets `aria-label` and modal title text. Can also use title slot to set title. */
  label: string;
  /** Toggles the modal title text, which comes from `label` prop or `title` slot. */
  showTitle?: boolean;
  /** Text for aria-describedby attribute. Applied to modal content element */
  ariaDescribedby?: string | null;
  /** Sets the `role` attribute on the modal content element */
  role?: 'dialog' | 'alertdialog';
  /** Sets unique `id` for modal */
  id?: string | null;
  /** Adds custom class to the `cdr-modal__overlay` div */
  overlayClass?: string;
  /** Adds custom class to the `cdr-modal__outerWrap` div */
  wrapperClass?: string;
  /** Adds custom class to the `cdr-modal__innerWrap` div */
  contentClass?: string;
  /** Sets duration for modal's close animation */
  animationDuration?: number;
};

/**
 * CdrObjectOverlay component properties
 * Component for positioning content in 9 different positions relative to a container
 */
export type CdrObjectOverlayProps = {
  /** Determines if the container will have a gradient based on position */
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
};

/**
 * CdrPagination component properties
 */
export type CdrPaginationProps = {
  /** Define a custom slug for the generated pagination item IDs */
  id?: string;
  /** Sets the total number of pages for displaying "Page x of <totalPages>" */
  totalPages?: number | null;
  /** Array of objects containing pagination data */
  pages: PaginationItem[];
  /** Sets which tag type is used to render pagination elements */
  linkTag?: 'a' | 'button';
  /** Used to customize the aria-label for the root pagination element */
  forLabel?: string;
  /** Used for binding v-model, represents the current page */
  modelValue?: number;
};

/**
 * CdrPicture component properties
 * Extends BaseImageProps with responsive source sets
 */
export type CdrPictureProps = BaseImageProps & {
  /** An object containing one or more child objects with HTMLSourceElement attributes for responsive images */
  sources: PictureSourceObject;
};

/**
 * CdrPopover component properties
 */
export type CdrPopoverProps = {
  /** Sets the position where the popover will render relative to the trigger element */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** If set to true, popover will attempt to dynamically set its position */
  autoPosition?: boolean;
  /** Sets the title for the popover content. Can also be provided via the title slot */
  label?: string;
  /** ID for the popover element, required for accessibility */
  id: string;
  /** Add custom class to the popover content wrapper */
  contentClass?: string;
  /** Used to programmatically control the popover state */
  open?: boolean;
};

/**
 * CdrPopup component properties (internal helper component)
 */
export type CdrPopupProps = {
  /** Whether the popup is opened */
  opened?: boolean;
  /** Sets the position where the popup will render */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** If set to true, popup will attempt to dynamically set its position */
  autoPosition?: boolean;
  /** Add custom class to the popup content wrapper */
  contentClass?: string;
};

/**
 * CdrQuote component properties
 */
export type CdrQuoteProps = {
  /** Sets the semantic HTML element for the quote */
  tag?: 'blockquote' | 'aside' | 'q' | 'div';
  /** Modifies the style variant for the quote */
  modifier?: '' | 'pull';
  /** Sets the quote body text */
  summary?: string;
  /** Sets the quote attribution text */
  citation?: string;
};

/**
 * CdrRadio component properties
 */
export type CdrRadioProps = {
  /** Adds CSS class to the label for custom styles */
  labelClass?: string;
  /** Adds CSS class to the input for custom styles */
  inputClass?: string;
  /** Adds CSS class to the slot wrapper for custom styles */
  contentClass?: string;
  /** Disables the radio */
  disabled?: boolean;
  /** Sets the name of the radio button */
  name: string;
  /** Modifies the style variants for this component */
  modifier?: string;
  /** Sets the radio size; values can target responsive breakpoints */
  size?: string;
  /** Sets the background color the radio button is rendered on */
  background?: Background;
  /** Sets the value of the radio */
  customValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
};

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

/**
 * CdrSelect component properties
 * Allows the selection of one or more options from a dropdown list
 */
export type CdrSelectProps = {
  /** Custom ID that is mapped to the label 'for' attribute. If this value is not set, it will be auto-generated */
  id?: string;
  /** Sets the text value for the select label. Required for accessibility compliance */
  label: string;
  /** Visually hides the label element, but leaves it available to screen readers for accessibility compliance */
  hideLabel?: boolean;
  /** Adds an option that is disabled and selected by default to serve as a placeholder for the select */
  prompt?: string;
  /** Build options programmatically with data. Provide an array of objects or an array of strings */
  options?: SelectOption[] | string[];
  /** Sets the background color the select is rendered on */
  background?: string;
  /** Sets the component's size; values can target responsive breakpoints */
  size?: string;
  /** Sets the select to an error state, displays the error slot if one is present */
  error?: boolean | string;
  /** Sets the role attribute for the embedded error state messaging */
  errorRole?: string;
  /** v-model binding */
  modelValue?: string | number | boolean | object | unknown[] | symbol | ((...args: any[]) => any);
  /** Disables the input and sets appropriate styling */
  disabled?: boolean;
  /** Sets aria-required on the input field and displays an asterisk next to the select label */
  required?: boolean;
  /** Displays '(optional)' text next to the select label */
  optional?: boolean;
  /** Turns CdrSelect into a multi-select element */
  multiple?: boolean;
  /** Sets the height of the CdrSelect when using the multiple option */
  multipleSize?: number;
};

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

/**
 * CdrSplitSurface component properties
 * Introduces a layered surface for distinct content sections
 */
export type CdrSplitSurfaceProps = {
  /** Sets the orientation of the surface to the top or bottom slot */
  surface?: 'top' | 'bottom';
  /** Sets the HTML tag for the split-surface element */
  tag?: string;
};

/**
 * CdrSurface component properties
 * Foundational container for creating structured layouts with visual styling options
 */
export type CdrSurfaceProps = {
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

/**
 * CdrSurfaceScroll component properties
 * A scrollable surface component that provides custom scrollbars and smooth scrolling behavior
 */
export interface CdrSurfaceScroll {
  /** Root props passed to ScrollAreaRoot */
  rootProps?: any;
  /** Scrollbar props passed to ScrollAreaScrollbar */
  scrollbarProps?: any;
  /** Thumb props passed to ScrollAreaThumb */
  thumbProps?: any;
  /** Viewport props passed to ScrollAreaViewport */
  viewportProps?: any;
}

/**
 * CdrSurfaceScrollProps alias for CdrSurfaceScroll interface
 */
export type CdrSurfaceScrollProps = CdrSurfaceScroll;

/**
 * CdrSurfaceSelection component properties
 * Extended surface for selectable/interactive surfaces with state management
 */
export type CdrSurfaceSelectionProps = {
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
  layout?: Layout;
};

/**
 * CdrSwitch component properties
 * Permits selection from two opposing options
 */
export type CdrSwitchProps = {
  /** Sets a custom ID for the switch. If this value is not set, it will be auto-generated */
  id?: string;
  /** Sets the size of the switch */
  size?: 'medium' | 'large';
  /** Sets the label and switch to expand to the full width of its container with space-between */
  fullWidth?: boolean;
  /** v-model binding */
  modelValue: boolean;
};

/**
 * CdrTable component properties
 * Organizes structured data for users to easily scan, compare, and analyze
 */
export type CdrTableProps = {
  /** Sets row colors to alternate between darker and lighter backgrounds. Striping will not apply when border is true */
  striped?: boolean;
  /** Adds borders between rows. Will disable striped if both are true */
  border?: boolean;
  /** Sets the width to 100%. Also accepts space separated strings for breakpoints */
  fullWidth?: boolean | string;
  /** Makes the table scroll horizontally when it would overflow its container */
  responsive?: boolean;
  /** Adds a darker background on row hover */
  hover?: boolean;
  /** Sets the table size (cell padding); values can target responsive breakpoints */
  size?: string;
};

/**
 * CdrTabs component properties
 * Organizes related content into groups for people to navigate between
 */
export type CdrTabsProps = {
  /** Sets height of the tabs container element */
  height?: string;
  /** Sets the index of the tab that should be active on initial page load. Note that this property is zero-indexed */
  activeTab?: number;
  /** Modifies the style variants for this component */
  modifier?: string;
  /** Use small to reduce spacing around the tabs for a denser visual design */
  size?: string;
  /** Sets the background color of the tab. For CdrTabs that are rendered on non-primary backgrounds */
  backgroundColor?: string;
};

/**
 * CdrTabPanel component properties
 * Individual tab panel content container
 */
export type CdrTabPanelProps = {
  /** Sets reference identifier for tab content. Required for accessibility */
  id?: string;
  /** Sets tab display name. Required and must be unique for each tab */
  name?: string;
  /** Sets reference identifier for tab header. Required for accessibility */
  ariaLabelledby?: string;
};

/**
 * CdrText component properties
 * Text wrapper component for semantic HTML elements
 */
export type CdrTextProps = {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
};

/**
 * CdrTitle component properties
 * Heading wrapper component for semantic HTML elements
 */
export type CdrTitleProps = {
  /** Sets the HTML tag (p, span, h1, h2, etc) */
  tag?: Tag;
};

/**
 * CdrToast component properties
 * Non-modal dialog used to communicate the status of a task or process
 */
export type CdrToastProps = {
  /** Sets the toast type */
  type?: 'info' | 'warning' | 'success' | 'error' | 'default';
  /** Used to programmatically control the toast open/close state */
  open?: boolean;
  /** Set to false to disable automatic closing after the dismissDelay */
  autoDismiss?: boolean;
  /** Sets the interval (in milliseconds) before the toast automatically closes */
  dismissDelay?: number;
};

/**
 * CdrToggleButton component properties
 * Permits switching two or more options on and off
 */
export type CdrToggleButtonProps = {
  /** Sets the value and aria-label for the toggle button. Display can be overridden using default slot */
  toggleValue: string;
};

/**
 * CdrToggleGroup component properties
 * Container for CdrToggleButton components
 */
export type CdrToggleGroupProps = {
  /** v-model binding */
  modelValue: string | number | boolean | object | unknown[];
  /** Sets toggle button size */
  size?: 'medium' | 'large';
};

/**
 * CdrTooltip component properties
 * Floating label used to clarify interface actions
 */
export type CdrTooltipProps = {
  /** Sets the position where the tooltip will render relative to the trigger element */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** If true, tooltip will dynamically set its position to ensure it renders within the visible browser window */
  autoPosition?: boolean;
  /** ID for the tooltip element, required for accessibility */
  id?: string;
  /** Add custom class to the tooltip content wrapper */
  contentClass?: string;
  /** Used to programmatically control the tooltip state */
  open?: boolean;
};
// #endregion
