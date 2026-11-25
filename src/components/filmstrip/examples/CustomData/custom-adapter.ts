import type { CustomModel } from './types';
import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';

/**
 * What is an adapter?
 *
 * An adapter is a function that converts data from one format to another.
 * Think of it like a travel adapter - it converts your plug to fit the wall outlet.
 *
 * In this case:
 * - Your data has the format your app uses (e.g., products with IDs, names, prices)
 * - Cedar Filmstrip needs data in a different format (frames with keys and props)
 * - The adapter converts your data into Cedar's format
 *
 * How it works:
 * 1. The adapter receives your data (your model)
 * 2. It maps each item in your data to a "frame" (a single item in the filmstrip)
 * 3. Each frame needs a unique key (Vue uses this to track items)
 * 4. Each frame has props (the data your frame component needs)
 * 5. The adapter returns configuration (how many items to show, spacing, etc.)
 *
 * Why use an adapter?
 * - Keeps your data format unchanged (your app doesn't need to change)
 * - Cedar doesn't need to know about your data structure
 * - You control how your data maps to Cedar's components
 * - Easy to test and maintain
 */
export const customAdapter: CdrFilmstripAdapter<unknown, CustomModel> = (modelData) => {
  const { items = [], title } = modelData;

  // Step 1: Map your custom items to frame objects
  // Each item in your data becomes a frame in the filmstrip
  const frames: CdrFilmstripFrame<unknown>[] = items.map((item) => ({
    // Step 2: Give each frame a unique key
    // This helps Vue track which item is which when the list changes
    key: `custom-item-${item.id}`,

    // Step 3: Pass the data your frame component needs
    // Only pass what your CustomFrame component uses
    props: {
      name: item.name,
      value: item.value,
    },
  }));

  // Step 4: Return the filmstrip configuration
  return {
    component: null as any, // Will be set by the parent component
    frames, // The list of frames we created above
    filmstripId: 'custom-data', // Unique ID for this filmstrip (for accessibility)
    description: title, // Description for screen readers
    framesGap: 12, // Space between frames in pixels
    responsiveFrames: {
      // How many frames to show at different screen sizes
      xs: 1, // Mobile: show 1 frame
      sm: 2, // Small screens: show 2 frames
      md: 3, // Medium screens: show 3 frames
      lg: 4, // Large screens: show 4 frames
    },
    focusSelector: '[data-focus]', // Which elements in frames can receive keyboard focus
  } satisfies CdrFilmstripConfig<unknown, CustomModel>;
};

export default customAdapter;
