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
    url: string,
    name: string,
    id?: string,
  }
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
  page: number,
  url: string,
  ellip?: boolean
}

/**
 * Select data object
 * 
 * @interface selectOption
 * @text {string} The displayed option
 * @value {string} The underlying value for the option
 */
export interface selectOption {
  text: string,
  value: string,
}

export interface choreographerSchema {
  type: string,
  props?: object,
  content?: string | choreographerSchema
}

/**
 * Image component properties
 * 
 * @interface baseImageProps
 * 
 */
export interface baseImageProps {
  /** The image src */
  src: string,
  /** The image alt. Defaults to empty string. */
  alt?: string,
  /** Comma seperated list of image sources */
  srcset?: string,
  /** Comma seperated list of source sizes */
  sizes?: string,
  /**
   * Aspect ratio of the image, passes to the CSS aspect-ratio property.
   * @demoTextField true
   * @demoPlaceholderText Example: '16-9'
   */
  ratio?: string,
  /**
   * Object position of the image, passes value to CSS object-position property.
   * @demoTextField true
   */
  position?: string,
  /**
   * Object fit of the image, passes value to CSS object-fit property
   * @demoTextField true
   */
  fit?: string,
  /**
   * Border radius of the image. Accepts shorthand for cedar radius tokens ("soft", "softer", "round") or a custom value which is passed ot the CSS border-radius property.
   * @demoTextField true
   */
  radius?: "soft" | "softer" | "round" | string,
  /**
   * Value for loading attribute ("lazy", "eager", "auto")
   * @demoIgnore
   */
  loading?: "lazy" | "eager",
  /** 
   * value for decoding attribute ()
   * @demoIgnore
   */
  decoding?: "async" | "sync" | "auto",
  /** 
   * value for fetch priority attribute
   * @demoIgnore
   */
  fetchpriority?: "high" | "low" | "auto",
}

/**
 * An object containing 1..n child objects containing HTMLSourceElement attributes
 * 
 * @interface pictureSourceObject
 * @extends HTMLSourceElement
 */
export interface pictureSourceObject {
  [key: string] : {
    media: string,
    srcset: string,
    width?: string,
    height?: string,
    type?: string,
    sizes?: string,
  }
}