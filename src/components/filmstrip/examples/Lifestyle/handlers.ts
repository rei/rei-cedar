import type { CdrFilmstripArrowClickPayload, CdrFilmstripResizePayload } from '../../interfaces';
import type { Lifestyle, LifestyleFrameClickPayload } from '.';
import { CdrBreakpointLg, CdrBreakpointMd } from '@rei/cdr-tokens';

/**
 * Handles frame click events in the filmstrip and logs analytics data.
 *
 * @param {unknown} payload - The event payload containing details about the clicked frame.
 * @return {void}
 */
export function onFrameClick(payload: unknown): void {
  const { event, item } = payload as LifestyleFrameClickPayload;

  const analytics = {
    target: item.cta.target,
    text: item.cta.text,
  };

  console.log('onFrameClick', { event, item, analytics });
}

/**
 * Handles arrow click events in the filmstrip.
 * Determines scroll direction and formats analytics tracking data.
 *
 * @param {unknown} payload - The event payload containing navigation details.
 * @return {void}
 */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrFilmstripArrowClickPayload;
  const { framesVisible, frameStyle } = model as Partial<Lifestyle>;

  const scrollDirection = direction === 'right' ? 'forwardScroll' : 'backScroll';
  const scrollValue = `scroll-${direction}`;
  const analytics = {
    [scrollDirection]: scrollValue, // Scroll direction tracking key
    framesVisible,
    frameStyle,
  };

  console.log('onArrowClick', { event, direction, analytics });
}

/**
 * Handles window resize events and updates the filmstrip's
 * internal state for `framesToShow` and `framesToScroll` based
 * on the current window size.
 *
 * @param {unknown} payload - The event payload containing
 *   information about the filmstrip's config and model.
 * @return {void}
 */
export function onResize(payload: unknown): void {
  const { framesToScroll, framesToShow, model = {} } = payload as CdrFilmstripResizePayload;
  const { framesVisible = 3 } = model as Partial<Lifestyle>;

  const { clientWidth } = window.document.body;
  switch (true) {
    case clientWidth >= Number(CdrBreakpointLg):
      framesToShow.value = framesVisible;
      framesToScroll.value = framesVisible - 1;
      break;
    case clientWidth >= Number(CdrBreakpointMd):
      framesToShow.value = 3;
      framesToScroll.value = 2;
      break;
    default:
      framesToShow.value = 2;
      framesToScroll.value = 1;
  }
}
