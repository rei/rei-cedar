import type { CustomModel } from './types';
import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';

/**
 * Custom Data Adapter
 *
 * This adapter demonstrates how to translate your custom data model
 * into the frame structure that CdrFilmstrip expects.
 *
 * Key concepts:
 * 1. Map your custom model items to frame objects
 * 2. Each frame needs a unique key for Vue's list rendering
 * 3. Pass only the props your frame component needs
 * 4. Configure responsive behavior with responsiveFrames
 * 5. Set focusSelector if your frame has focusable elements
 */
export const customAdapter: CdrFilmstripAdapter<unknown, CustomModel> = (modelData) => {
  const { items = [], title } = modelData;

  // Map your custom items to frame objects
  const frames: CdrFilmstripFrame<unknown>[] = items.map((item) => ({
    key: `custom-item-${item.id}`, // Unique key for Vue
    props: {
      name: item.name,
      value: item.value,
    },
  }));

  // Return the filmstrip configuration
  return {
    component: null, // Will be set by the parent component
    frames,
    filmstripId: 'custom-data',
    description: title,
    framesGap: 12, // Gap between frames in pixels
    responsiveFrames: {
      xs: 1, // Show 1 frame on mobile
      sm: 2, // Show 2 frames on small screens
      md: 3, // Show 3 frames on medium screens
      lg: 4, // Show 4 frames on large screens
    },
    focusSelector: '[data-focus]', // Selector for focusable elements in frames
  } satisfies CdrFilmstripConfig<unknown, CustomModel>;
};

export default customAdapter;
