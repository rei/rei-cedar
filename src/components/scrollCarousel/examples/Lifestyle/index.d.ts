export interface Content {
  heading: Heading;
}

export interface Heading {
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: string;
}

export interface LegacyMedia {
  src: string;
  alt: string;
}

export interface Media {
  images: Images;
  alt: string;
  useResizing: boolean;
  renderedSizes: RenderedSizes;
}

export interface Images {
  xs: ImageObject;
  sm?: ImageObject;
  md?: ImageObject;
  lg?: ImageObject;
}

export interface ImageObject {
  caption: string | null;
  alt: string;
  attribution: string | null;
  renditions: ImageRenditions;
  imageType: 'jpg' | 'png' | 'gif' | 'webp' | 'svg';
}

export interface ImageRenditions {
  original: ImageRendition | null;
  wide: ImageRendition | null;
  vertical: ImageRendition | null;
}

export interface ImageRendition {
  src: string;
  width: number;
  height: number;
}

export interface RenderedSizes {
  mobile: string;
  desktop: string;
}

export interface Cta {
  target: string; // URI as string
  text: string;
}

export interface LifestyleSlide {
  media: Media | LegacyMedia;
  cta: Cta;
}

export interface LifestyleModel {
  content?: Content;
  slideStyle?:
    | 'lifestyle-portrait'
    | 'lifestyle-portrait-sm'
    | 'lifestyle-square';
  slidesVisible?: number;
  slides?: LifestyleSlide[];
}

export interface LifestyleSlideExtended extends LifestyleModel, LifestyleSlide {
  lastSlide?: boolean;
}

export interface LifestyleSlideClickPayload {
  /** The event triggered by the slide click. */
  event: Event;
  /** The slide item that was clicked. */
  item: LifestyleSlideExtended;
}
