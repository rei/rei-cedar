import type { ImageFit, ImageLoading, ImageRadius } from '../../types/other';

/**
 * Base properties for image components (CdrImg, CdrPicture)
 * Provides common image attributes and styling options
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
  fit?: ImageFit;
  /**
   * Object position of the image, passes value to CSS object-position property.
   * @demoSelectMultiple true
   * @values center,top,right,bottom,left
   */
  position?: string;
  /**
   * Border radius of the image. Accepts shorthand for cedar radius tokens ("soft", "softer", "round") or a custom value which is passed to the CSS border-radius property.
   * @demoSelectMultiple false
   * @values unset, soft, softer, round, 10%
   */
  radius?: ImageRadius | string;
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
  loading?: ImageLoading;
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
 * CdrImg component properties
 * Image component with responsive and performance optimization features
 */
export type CdrImgProps = BaseImageProps;
