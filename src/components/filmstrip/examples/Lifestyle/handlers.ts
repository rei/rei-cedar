import type { CdrFilmstripArrowClickPayload } from '../../interfaces';
import type { Lifestyle, LifestyleFrameClickPayload } from '.';

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
