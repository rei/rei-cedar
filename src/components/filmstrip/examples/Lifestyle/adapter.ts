import { CdrSpaceThreeQuarterX } from '@rei/cdr-tokens';
import type { Lifestyle, LifestyleFrameExtended } from '.';
import type { CdrFilmstripAdapter, CdrFilmstripConfig } from '../../interfaces';
import type { CdrSurfaceScrollFrame } from '../../../surfaceScroll/interfaces';
import FrameComponent from './LifestyleFrame.vue';

export const adapter: CdrFilmstripAdapter<LifestyleFrameExtended> = (modelData) => {
  /**
   * Extracts frames from the raw model data.
   */
  const {
    frames: frameItems = [],
    frameStyle,
    framesVisible: framesVisible = 4,
  } = modelData as Partial<Lifestyle>;

  /**
   * Determines the filmstrip ID.
   */
  const filmstripId = 'lifestyle';

  /**
   * Transforms raw items into an array of frames for the filmstrip.
   *
   * @type {CdrSurfaceScrollFrame<LifestyleFrameExtended>[]}
   */
  const frames: CdrSurfaceScrollFrame<LifestyleFrameExtended>[] = Array.isArray(frameItems)
    ? frameItems.map((frame, index) => ({
        key: `lifestyle-frame-${index}`,
        props: {
          ...frame,
          frameStyle,
          lastFrame: index === frameItems.length - 1,
        },
      }))
    : [];

  /**
   * Constructs the filmstrip model with the resolved frames and metadata.
   *
   * @type {CdrFilmstripConfig<LifestyleFrameExtended>}
   */
  const filmstripConfig: CdrFilmstripConfig<LifestyleFrameExtended> = {
    component: FrameComponent,
    frames,
    filmstripId: filmstripId,
    description: 'Lifestyle filmstrip',
    framesGap: parseInt(CdrSpaceThreeQuarterX, 10),
    framesToShow: framesVisible,
    focusSelector: ':first-child a',
  };

  return filmstripConfig;
};

export default adapter;
