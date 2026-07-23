import { CdrSpaceThreeQuarterX } from '@rei/cdr-tokens/tokens';
import type { Lifestyle, LifestyleFrameExtended } from '.';
import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';
import FrameComponent from './LifestyleFrame.vue';

/**
 * Maps the lifestyle example model to frame props and layout settings.
 *
 * The model selects the visual treatment and desktop frame count. The shared
 * engine remains responsible for navigation and focus.
 */
export const adapter: CdrFilmstripAdapter<LifestyleFrameExtended, Partial<Lifestyle>> = (
  modelData,
) => {
  const { frames: frameItems = [], frameStyle, framesVisible = 4 } = modelData;
  const frames: CdrFilmstripFrame<LifestyleFrameExtended>[] = Array.isArray(frameItems)
    ? frameItems.map((frame, index) => ({
        key: `lifestyle-frame-${index}`,
        props: {
          ...frame,
          frameStyle,
        },
      }))
    : [];

  return {
    component: FrameComponent,
    frames,
    filmstripId: 'lifestyle',
    description: 'Lifestyle filmstrip',
    framesGap: parseInt(CdrSpaceThreeQuarterX, 10),
    framesToShow: framesVisible,
    focusSelector: '[data-focus]',
  } satisfies CdrFilmstripConfig<LifestyleFrameExtended>;
};

export default adapter;
