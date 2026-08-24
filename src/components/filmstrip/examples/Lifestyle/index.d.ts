/** Optional heading rendered above the lifestyle filmstrip. */
export interface Content {
  heading: Heading;
}

/** Heading text and Cedar presentation settings. */
export interface Heading {
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: string;
}

/** Legacy image input retained by the example for compatibility. */
export interface LegacyMedia {
  src: string;
  alt: string;
}

/** Breakpoint-aware image input used by `BasePicture`. */
export interface Media {
  images: Images;
  alt: string;
  useResizing: boolean;
  renderedSizes: RenderedSizes;
}

/** Art-directed images selected at Cedar breakpoints. */
export interface Images {
  xs: ImageObject;
  sm?: ImageObject;
  md?: ImageObject;
  lg?: ImageObject;
}

/** Source image and the crops available to the responsive renderer. */
export interface ImageObject {
  caption: string | null;
  alt: string;
  attribution: string | null;
  renditions: ImageRenditions;
  imageType: 'jpg' | 'png' | 'gif' | 'webp' | 'svg';
}

/** Original and art-directed renditions of one source image. */
export interface ImageRenditions {
  original: ImageRendition | null;
  wide: ImageRendition | null;
  vertical: ImageRendition | null;
}

/** Image URL and intrinsic dimensions. */
export interface ImageRendition {
  src: string;
  width: number;
  height: number;
}

/** Browser `sizes` values used by mobile and desktop sources. */
export interface RenderedSizes {
  mobile: string;
  desktop: string;
}

/** Link rendered over or below a lifestyle image. */
export interface Cta {
  target: string;
  text: string;
}

/** Source item mapped to one lifestyle frame. */
export interface LifestyleFrame {
  media: Media | LegacyMedia;
  cta: Cta;
}

/** Source model and visual policy consumed by the lifestyle adapter. */
export interface Lifestyle {
  content?: Content;
  /** Frame treatment shared by every item in the filmstrip. */
  frameStyle?: 'lifestyle-portrait' | 'lifestyle-portrait-sm' | 'lifestyle-square';
  /** Desired number of complete desktop frames. */
  framesVisible?: number;
  frames?: LifestyleFrame[];
}

/** Props received by the lifestyle frame component. */
export type LifestyleFrameExtended = Lifestyle & LifestyleFrame & CdrFilmstripFrameFocusProps;

/** Payload published by a lifestyle frame through `CdrFilmstripEventKey`. */
export interface LifestyleFrameClickPayload {
  /** Original CTA click event. */
  event: Event;
  /** Lifestyle item represented by the activated frame. */
  item: LifestyleFrameExtended;
}
import type { CdrFilmstripFrameFocusProps } from '../../interfaces';
