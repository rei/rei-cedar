import type {
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
} from 'radix-vue'
import { HtmlAttributes } from '../../lib';

type WithHTMLAttrs<T> = T & HtmlAttributes;

export interface CdrSurfaceScroll {
  rootProps?: WithHTMLAttrs<ScrollAreaRootProps>;
  scrollbarProps?: WithHTMLAttrs<ScrollAreaScrollbarProps>;
  thumbProps?: WithHTMLAttrs<ScrollAreaThumbProps>;
  viewportProps?: WithHTMLAttrs<ScrollAreaViewportProps>;
}