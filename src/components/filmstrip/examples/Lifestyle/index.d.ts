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

export interface LifestyleFrame {
  media: Media | LegacyMedia;
  cta: Cta;
}

export interface Lifestyle {
  content?: Content;
  frameStyle?: 'lifestyle-portrait' | 'lifestyle-portrait-sm' | 'lifestyle-square';
  framesVisible?: number;
  frames?: LifestyleFrame[];
}

export interface LifestyleFrameExtended extends Lifestyle, LifestyleFrame {
  lastFrame?: boolean;
}

export interface LifestyleFrameClickPayload {
  /** The event triggered by the frame click. */
  event: Event;
  /** The frame item that was clicked. */
  item: LifestyleFrameExtended;
}
