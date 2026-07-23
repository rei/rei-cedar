import type {
  CdrFilmstripArrowClickPayload,
  CdrFilmstripLayout,
  CdrFilmstripResizeContext,
} from '../../interfaces';
import type { Lifestyle, LifestyleFrameClickPayload } from '.';
import { CdrBreakpointLg, CdrBreakpointMd } from '@rei/cdr-tokens/tokens';

/** Demonstrates how a frame event can be translated into click analytics. */
export function onFrameClick(payload: unknown): void {
  const { event, item } = payload as LifestyleFrameClickPayload;

  const analytics = {
    target: item.cta.target,
    text: item.cta.text,
  };

  console.log('onFrameClick', { event, item, analytics });
}

/** Demonstrates analytics derived from the source model and arrow direction. */
export function onArrowClick(payload: unknown): void {
  const { direction, event, model = {} } = payload as CdrFilmstripArrowClickPayload;
  const { framesVisible, frameStyle } = model as Partial<Lifestyle>;

  const scrollDirection = direction === 'right' ? 'forwardScroll' : 'backScroll';
  const scrollValue = `scroll-${direction}`;
  const analytics = {
    [scrollDirection]: scrollValue,
    framesVisible,
    frameStyle,
  };

  console.log('onArrowClick', { event, direction, analytics });
}

/**
 * Returns the lifestyle example's responsive frame counts.
 */
export function resizeStrategy({
  model,
  viewportWidth,
}: CdrFilmstripResizeContext<Partial<Lifestyle>>): CdrFilmstripLayout {
  const { framesVisible = 3 } = model;
  const framesToShow =
    viewportWidth >= Number(CdrBreakpointLg)
      ? framesVisible
      : viewportWidth >= Number(CdrBreakpointMd)
        ? 3
        : 2;

  return {
    framesToShow,
    framesToScroll: framesToShow - 1,
  };
}
