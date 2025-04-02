import type { Component, Ref } from 'vue';
/**
 * Interface representing a single frame in the filmstrip.
 *
 * @template Props - The type of props that the frame component will receive (defaulting to `Record<string, unknown>`).
 */
export interface CdrFilmstripFrame<Props = Record<string, unknown>> {
  /**
   * The unique key for the frame, used to differentiate frames.
   */
  key: string;

  /**
   * The properties or data associated with the frame.
   * The type of these props is flexible and can be customized for different types of frames.
   */
  props: Props;
}

/**
 * Interface representing the props for a filmstrip component.
 *
 * @description This type defines the properties that can be passed into a filmstrip component.
 */
export interface CdrFilmstripEngine {
  /**
   * Unique ID for the filmstrip.
   * This ID can be used for targeting specific filmstrips or for testing/analytics purposes.
   */
  id?: string;

  /**
   * ARIA description for accessibility purposes.
   * This helps describe the purpose of the filmstrip for screen readers.
   */
  description?: string;

  /**
   * A custom data attribute for testing or analytics.
   * This allows the filmstrip component to be targeted in testing scenarios or analytics tracking.
   */
  dataUi?: string;

  /**
   * Flag to determine whether navigation arrows should be displayed.
   * This allows the user to control whether arrows for navigation should appear.
   */
  isShowingArrows?: boolean;

  /**
   * List of frames in the filmstrip.
   * This is an array of `Frame` objects that will populate the filmstrip.
   */
  frames?: CdrFilmstripFrame[];

  /**
   * The number of frames to show at a time in the filmstrip.
   * This defines how many frames are visible to the user in a single view.
   */
  framesToShow?: number;

  /**
   * The number of frames to scroll on each arrow click.
   * This determines how many frames are moved when the user clicks on a navigation arrow.
   */
  framesToScroll?: number;

  /**
   * The gap between each frame in the filmstrip.
   * This specifies the spacing between frames in pixels.
   */
  framesGap?: number;

  /**
   * Additional width factor for the frames.
   * This can be used to adjust the width of the frames beyond the default.
   */
  frameExtra?: number;

  /**
   * CSS selector for the initial focusable frame.
   * This allows you to specify which frame should receive focus when the filmstrip is initialized.
   */
  focusSelector?: string;

  /**
   * The tabindex value for the filmstrip viewport.
   * This allows the filmstrip viewport to be included in the tab order for accessibility purposes.
   */
  viewportTabindex?: string;
}

/**
 * Interface for the CdrFilmstripEngine component's props.
 *
 * @description This type defines the structure of the props that will be passed to the `CdrFilmstripEngine` component.
 */
export interface CdrFilmstrip<T> {
  /**
   * The adapter function that transforms `model` data into a structured filmstrip model.
   * This function is responsible for generating the frames and metadata for the filmstrip.
   */
  adapter?: CdrFilmstripAdapter<T>;

  /**
   * The model data used to resolve filmstrip content.
   * This can be any object that holds the raw data needed to transform into the filmstrip's structure.
   */
  model: T;
}

/**
 * The data returned by the filmstrip adapter, encapsulating the full filmstrip structure.
 */
export interface CdrFilmstripConfig<T = Record<string, unknown>> {
  /**
   * The component used for rendering each individual frame.
   */
  component: Component;

  /**
   * The array of frames, each containing metadata and references to the components.
   */
  frames: CdrFilmstripFrame<T>[];

  /**
   * The unique ID of the filmstrip.
   */
  filmstripId: string;

  /**
   * A description of the filmstrip for accessibility or display purposes.
   */
  description: string;

  /**
   * Additional data attributes for the filmstrip container.
   */
  dataAttributes?: Record<string, unknown>;

  /**
   * Gap between frames in the filmstrip.
   */
  framesGap?: number;

  /**
   * The number of frames to show at a time in the filmstrip.
   */
  framesToShow?: number;

  /**
   * Whether to dynamically adjust the number of frames to show based on screen size.
   */
  useDefaultResizeStrategy?: boolean;

  /**
   * CSS selector for the initial focusable frame.
   */
  focusSelector?: string;
}

/**
 * Payload for filmstrip arrow click events.
 */
export interface CdrFilmstripArrowClickPayload<T = Record<string, unknown>> {
  /**
   * The direction of the arrow that was clicked.
   */
  direction: 'left' | 'right';

  /**
   * The event object associated with the click.
   */
  event: Event;

  /**
   * The model data associated with the filmstrip.
   */
  model?: T;
}

/**
 * Payload for filmstrip resize events.
 */
export interface CdrFilmstripResizePayload<T = Record<string, unknown>> {
  /**
   * The number of frames to show at a time in the filmstrip.
   */
  framesToShow: Ref<number>;
  /**
   * The number of frames to scroll on each arrow click.
   */
  framesToScroll: Ref<number>;
  /**
   * The model data associated with the filmstrip.
   */
  model?: T;
}

/**
 * Interface representing a filmstrip arrow, including its properties and attributes.
 */
export interface CdrFilmstripArrow {
  /**
   * The direction the arrow points to.
   */
  direction: 'left' | 'right';

  /**
   * The icon component associated with the arrow.
   */
  icon: Component;

  /**
   * Attributes for the arrow element.
   */
  attributes: {
    /**
     * Data attribute for UI identification.
     */
    'data-ui': string;

    /**
     * CSS class for styling the arrow.
     */
    class: string;

    /**
     * Accessible label for the arrow.
     */
    'aria-label': string;

    /**
     * ARIA controls attribute to specify the controlled element.
     */
    'aria-controls': string;

    /**
     * Tabindex for focus management.
     */
    tabindex: number;

    /**
     * Size of the arrow component.
     */
    size: string;

    /**
     * Disabled state of the arrow.
     */
    disabled: boolean;
  };
}

/**
 * Interface representing a function that emits events with a specified name and an optional payload.
 * This function signature allows for emitting arbitrary events with dynamic event names.
 * The payload is optional and can be of any type (`unknown`).
 *
 * This is useful for components or systems where events are emitted dynamically,
 * and the event names and payloads can vary at runtime.
 *
 * @param {string} event - The name of the event to emit.
 * @param {unknown} [payload] -´ An optional payload associated with the event.
 *
 * @example
 * // Example usage of CdrFilmstripEventEmitter interface
 * const emitEvent: CdrFilmstripEventEmitter = (event, payload) => {
 *   // handle emitting the event (e.g., using Vue's `emit` function)
 *   console.log(`Event: ${event}, Payload:`, payload);
 * };
 *
 * // Emitting a known event
 * emitEvent('arrowClick', { direction: 'left' });
 *
 * // Emitting a custom event with no payload
 * emitEvent('frameChange');
 */
export interface CdrFilmstripEventEmitter {
  (event: string, payload?: unknown): void;
}

/**
 * Interface representing the structure and behavior of a Filmstrip Adapter.
 * This adapter function takes the raw model data and returns the transformed filmstrip information.
 */
export interface CdrFilmstripAdapter<T> {
  /**
   * Resolves and transforms the given model data into filmstrip-specific metadata.
   *
   * @param modelData - Raw data for the filmstrip, typically coming from an API or external model.
   * @returns {CdrFilmstripConfig} The transformed filmstrip data, including frames, filmstrip metadata, and other necessary details.
   */
  (modelData: unknown): CdrFilmstripConfig<T>;
}
