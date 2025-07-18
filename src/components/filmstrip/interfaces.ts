import type { Component, Ref } from 'vue';
/**
 * @template Props
 * @typedef {object} CdrFilmstripFrame
 * @property {string} key - The unique key for the frame.
 * @property {Props} props - Props or data associated with the frame.
 */
export interface CdrFilmstripFrame<Props = Record<string, unknown>> {
  key: string;
  props: Props;
}

/**
 * @typedef {object} CdrFilmstripEngine
 * @property {string} [id] - Unique ID for targeting or testing.
 * @property {string} [description] - ARIA description for screen readers.
 * @property {string} [dataUi] - Data attribute for analytics or test hooks.
 * @property {boolean} [isShowingArrows] - Whether navigation arrows should be visible.
 * @property {CdrFilmstripFrame[]} [frames] - Array of filmstrip frames.
 * @property {number} [framesToShow] - Frames visible at once.
 * @property {number} [framesToScroll] - Frames to scroll on arrow click.
 * @property {number} [framesGap] - Pixel gap between frames.
 * @property {number} [frameExtra] - Extra width factor for layout tuning.
 * @property {string} [focusSelector] - Selector for initial focusable frame.
 * @property {string} [viewportTabindex] - Tabindex value for scroll viewport.
 */
export interface CdrFilmstripEngine {
  id?: string;
  description?: string;
  dataUi?: string;
  isShowingArrows?: boolean;
  frames?: CdrFilmstripFrame[];
  framesToShow?: number;
  framesToScroll?: number;
  framesGap?: number;
  frameExtra?: number;
  focusSelector?: string;
  viewportTabindex?: string;
}

/**
 * @template T
 * @typedef {object} CdrFilmstrip
 * @property {CdrFilmstripAdapter<T>} adapter - Adapter function to build a filmstrip config.
 * @property {T} model - Model data passed into the adapter.
 */
export interface CdrFilmstrip<T> {
  adapter: CdrFilmstripAdapter<T>;
  model: T;
}

/**
 * @template T
 * @typedef {object} CdrFilmstripConfig
 * @property {Component} component - Component used to render each frame.
 * @property {CdrFilmstripFrame<T>[]} frames - Array of frame definitions.
 * @property {string} filmstripId - Unique ID for the filmstrip instance.
 * @property {string} description - Textual description for screen readers.
 * @property {Record<string, unknown>} [dataAttributes] - Optional HTML data attributes.
 * @property {number} [framesGap] - Pixel gap between frames.
 * @property {number} [framesToShow] - Count of visible frames.
 * @property {boolean} [useDefaultResizeStrategy] - Whether to auto-resize based on container.
 * @property {string} [focusSelector] - CSS selector for focus management.
 */
export interface CdrFilmstripConfig<T = Record<string, unknown>> {
  component: Component;
  frames: CdrFilmstripFrame<T>[];
  filmstripId: string;
  description: string;
  dataAttributes?: Record<string, unknown>;
  framesGap?: number;
  framesToShow?: number;
  useDefaultResizeStrategy?: boolean;
  focusSelector?: string;
}

/**
 * @template T
 * @typedef {object} CdrFilmstripArrowClickPayload
 * @property {'left'|'right'} direction - Direction of navigation.
 * @property {Event} event - The click event.
 * @property {T} [model] - Optional model reference.
 */
export interface CdrFilmstripArrowClickPayload<T = Record<string, unknown>> {
  direction: 'left' | 'right';
  event: Event;
  model?: T;
}

/**
 * @template T
 * @typedef {object} CdrFilmstripScrollPayload
 * @property {number} index - Index of the frame scrolled into view.
 * @property {Event} event - The scroll event.
 * @property {T} [model] - Optional model reference.
 */
export interface CdrFilmstripScrollPayload<T = Record<string, unknown>> {
  index: number;
  event: Event;
  model?: T;
}

/**
 * @template T
 * @typedef {object} CdrFilmstripResizePayload
 * @property {Ref<number>} framesToShow - Updated visible frames.
 * @property {Ref<number>} framesToScroll - Updated scroll delta.
 * @property {T} [model] - Optional model reference.
 */
export interface CdrFilmstripResizePayload<T = Record<string, unknown>> {
  framesToShow: Ref<number>;
  framesToScroll: Ref<number>;
  model?: T;
}

/**
 * @typedef {object} CdrFilmstripArrow
 * @property {'left'|'right'} direction - Direction the arrow points.
 * @property {Component} icon - Icon component.
 * @property {object} attributes - DOM attributes for the arrow.
 * @property {string} attributes.data-ui
 * @property {string} attributes.class
 * @property {string} attributes.aria-label
 * @property {string} attributes.aria-controls
 * @property {number} attributes.tabindex
 * @property {string} attributes.size
 * @property {boolean} attributes.disabled
 */
export interface CdrFilmstripArrow {
  direction: 'left' | 'right';
  icon: Component;
  attributes: {
    'data-ui': string;
    class: string;
    'aria-label': string;
    'aria-controls': string;
    tabindex: number;
    size: string;
    disabled: boolean;
  };
}

/**
 * @typedef {function} CdrFilmstripEventEmitter
 * @param {string} event - Name of the event.
 * @param {unknown} [payload] - Optional data.
 */
export interface CdrFilmstripEventEmitter {
  (event: string, payload?: unknown): void;
}

/**
 * @template T
 * @typedef {function} CdrFilmstripAdapter
 * @param {T} modelData - Raw model input.
 * @returns {CdrFilmstripConfig<T>} Filmstrip configuration.
 */
export interface CdrFilmstripAdapter<T> {
  (modelData: unknown): CdrFilmstripConfig<T>;
}
