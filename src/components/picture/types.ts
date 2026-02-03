import type { BaseImageProps } from '../image/types';

/**
 * An object containing one or more child objects with HTMLSourceElement attributes for responsive images
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
 * CdrPicture component properties
 * Extends BaseImageProps with responsive source sets
 */
export type CdrPictureProps = BaseImageProps & {
  /** An object containing one or more child objects with HTMLSourceElement attributes for responsive images */
  sources: PictureSourceObject;
};
