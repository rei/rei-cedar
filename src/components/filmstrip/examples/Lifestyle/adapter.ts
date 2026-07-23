import { CdrSpaceThreeQuarterX } from '@rei/cdr-tokens/tokens';
import type { Lifestyle, LifestyleFrameExtended } from '.';
import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';
import FrameComponent from './LifestyleFrame.vue';

export const adapter: CdrFilmstripAdapter<LifestyleFrameExtended> = (modelData) => {
  const {
    frames: frameItems = [],
    frameStyle,
    framesVisible = 4,
  } = modelData as Partial<Lifestyle>;
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
    focusSelector: ':first-child a',
  } satisfies CdrFilmstripConfig<LifestyleFrameExtended>;
};

export default adapter;
