import type { Component, Ref } from 'vue';
/**
 * Interface representing a single slide in the carousel.
 *
 * @template Props - The type of props that the slide component will receive (defaulting to `Record<string, unknown>`).
 */
export interface CdrScrollCarouselSlide<Props = Record<string, unknown>> {
  /**
   * The unique key for the slide, used to differentiate slides.
   */
  key: string;

  /**
   * The properties or data associated with the slide.
   * The type of these props is flexible and can be customized for different types of slides.
   */
  props: Props;
}

/**
 * Interface representing the props for a carousel component.
 *
 * @description This type defines the properties that can be passed into a carousel component.
 */
export interface CdrScrollCarouselEngine {
  /**
   * Unique ID for the carousel.
   * This ID can be used for targeting specific carousels or for testing/analytics purposes.
   */
  id?: string;

  /**
   * ARIA description for accessibility purposes.
   * This helps describe the purpose of the carousel for screen readers.
   */
  description?: string;

  /**
   * A custom data attribute for testing or analytics.
   * This allows the carousel component to be targeted in testing scenarios or analytics tracking.
   */
  dataUi?: string;

  /**
   * Flag to determine whether navigation arrows should be displayed.
   * This allows the user to control whether arrows for navigation should appear.
   */
  isShowingArrows?: boolean;

  /**
   * List of slides in the carousel.
   * This is an array of `Slide` objects that will populate the carousel.
   */
  slides?: CdrScrollCarouselSlide[];

  /**
   * The number of slides to show at a time in the carousel.
   * This defines how many slides are visible to the user in a single view.
   */
  slidesToShow?: number;

  /**
   * The number of slides to scroll on each arrow click.
   * This determines how many slides are moved when the user clicks on a navigation arrow.
   */
  slidesToScroll?: number;

  /**
   * The gap between each slide in the carousel.
   * This specifies the spacing between slides in pixels.
   */
  slidesGap?: number;

  /**
   * Additional width factor for the slides.
   * This can be used to adjust the width of the slides beyond the default.
   */
  slideExtra?: number;

  /**
   * CSS selector for the initial focusable slide.
   * This allows you to specify which slide should receive focus when the carousel is initialized.
   */
  focusSelector?: string;

  /**
   * The tabindex value for the carousel viewport.
   * This allows the carousel viewport to be included in the tab order for accessibility purposes.
   */
  viewportTabindex?: string;
}

/**
 * Interface for the CarouselEngine component's props.
 *
 * @description This type defines the structure of the props that will be passed to the `CarouselEngine` component.
 */
export interface CdrScrollCarousel<T> {
  /**
   * The adapter function that transforms `model` data into a structured carousel model.
   * This function is responsible for generating the slides and metadata for the carousel.
   */
  adapter: CdrScrollCarouselAdapter<T>;

  /**
   * The model data used to resolve carousel content.
   * This can be any object that holds the raw data needed to transform into the carousel's structure.
   */
  model: T;
}

/**
 * The data returned by the carousel adapter, encapsulating the full carousel structure.
 */
export interface CdrScrollCarouselConfig<T = Record<string, unknown>> {
  /**
   * The component used for rendering each individual slide.
   */
  component: Component;

  /**
   * The array of slides, each containing metadata and references to the components.
   */
  slides: CdrScrollCarouselSlide<T>[];

  /**
   * The unique ID of the carousel.
   */
  carouselId: string;

  /**
   * A description of the carousel for accessibility or display purposes.
   */
  description: string;

  /**
   * Additional data attributes for the carousel container.
   */
  dataAttributes?: Record<string, unknown>;

  /**
   * Gap between slides in the carousel.
   */
  slidesGap?: number;

  /**
   * The number of slides to show at a time in the carousel.
   */
  slidesToShow?: number;

  /**
   * Whether to dynamically adjust the number of slides to show based on screen size.
   */
  useDefaultResizeStrategy?: boolean;

  /**
   * CSS selector for the initial focusable slide.
   */
  focusSelector?: string;
}

/**
 * Payload for carousel arrow click events.
 */
export interface CdrScrollCarouselArrowClickPayload<T = Record<string, unknown>> {
  /**
   * The direction of the arrow that was clicked.
   */
  direction: 'left' | 'right';

  /**
   * The event object associated with the click.
   */
  event: Event;

  /**
   * The model data associated with the carousel.
   */
  model?: T;
}

/**
 * Payload for carousel resize events.
 */
export interface CdrScrollCarouselResizePayload<T = Record<string, unknown>> {
  /**
   * The number of slides to show at a time in the carousel.
   */
  slidesToShow: Ref<number>;
  /**
   * The number of slides to scroll on each arrow click.
   */
  slidesToScroll: Ref<number>;
  /**
   * The model data associated with the carousel.
   */
  model?: T;
}

/**
 * Interface representing a carousel arrow, including its properties and attributes.
 */
export interface CdrScrollCarouselArrow {
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
 * // Example usage of CarouselEventEmitter interface
 * const emitEvent: CarouselEventEmitter = (event, payload) => {
 *   // handle emitting the event (e.g., using Vue's `emit` function)
 *   console.log(`Event: ${event}, Payload:`, payload);
 * };
 *
 * // Emitting a known event
 * emitEvent('arrowClick', { direction: 'left' });
 *
 * // Emitting a custom event with no payload
 * emitEvent('slideChange');
 */
export interface CdrScrollCarouselEventEmitter {
  (event: string, payload?: unknown): void;
}

/**
 * Interface representing the structure and behavior of a Carousel Adapter.
 * This adapter function takes the raw model data and returns the transformed carousel information.
 */
export interface CdrScrollCarouselAdapter<T> {
  /**
   * Resolves and transforms the given model data into carousel-specific metadata.
   *
   * @param modelData - Raw data for the carousel, typically coming from an API or external model.
   * @returns {CdrScrollCarouselConfig} The transformed carousel data, including slides, carousel metadata, and other necessary details.
   */
  (modelData: unknown): CdrScrollCarouselConfig<T>;
}
