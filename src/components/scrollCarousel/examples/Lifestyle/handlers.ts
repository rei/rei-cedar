import type {
  CdrScrollCarouselArrowClickPayload,
  CdrScrollCarouselResizePayload,
} from '../../interfaces';
import type { Lifestyle, LifestyleSlideClickPayload } from '.';
import { CdrBreakpointLg, CdrBreakpointMd } from '@rei/cdr-tokens';

/**
 * Handles slide click events in the carousel and logs analytics data.
 *
 * @param {unknown} payload - The event payload containing details about the clicked slide.
 * @return {void}
 */
export function onSlideClick(payload: unknown): void {
  const { event, item } = payload as LifestyleSlideClickPayload;

  const analytics = {
    target: item.cta.target,
    text: item.cta.text,
  };

  console.log('onSlideClick', { event, item, analytics });
}

/**
 * Handles arrow click events in the carousel.
 * Determines scroll direction and formats analytics tracking data.
 *
 * @param {unknown} payload - The event payload containing navigation details.
 * @return {void}
 */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrScrollCarouselArrowClickPayload;
  const { slidesVisible, slideStyle } = model as Partial<Lifestyle>;

  const scrollDirection = direction === 'right' ? 'forwardScroll' : 'backScroll';
  const scrollValue = `scroll-${direction}`;
  const analytics = {
    [scrollDirection]: scrollValue, // Scroll direction tracking key
    slidesVisible,
    slideStyle,
  };

  console.log('onArrowClick', { event, direction, analytics });
}

/**
 * Handles window resize events and updates the carousel's
 * internal state for `slidesToShow` and `slidesToScroll` based
 * on the current window size.
 *
 * @param {unknown} payload - The event payload containing
 *   information about the carousel's config and model.
 * @return {void}
 */
export function onResize(payload: unknown): void {
  const { slidesToScroll, slidesToShow, model = {} } = payload as CdrScrollCarouselResizePayload;
  const { slidesVisible = 3 } = model as Partial<Lifestyle>;

  const { clientWidth } = window.document.body;
  switch (true) {
    case clientWidth >= Number(CdrBreakpointLg):
      slidesToShow.value = slidesVisible;
      slidesToScroll.value = slidesVisible - 1;
      break;
    case clientWidth >= Number(CdrBreakpointMd):
      slidesToShow.value = 3;
      slidesToScroll.value = 2;
      break;
    default:
      slidesToShow.value = 2;
      slidesToScroll.value = 1;
  }
}
