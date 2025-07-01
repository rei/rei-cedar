import type { Component } from 'vue';

/**
 * @template Props
 * @typedef {object} CdrSurfaceScrollFrame
 * @property {string} key - The unique key for the frame.
 * @property {Props} props - Props or data associated with the frame.
 */
export interface CdrSurfaceScrollFrame<Props = Record<string, unknown>> {
  key: string;
  props: Props;
}

/**
 * @typedef {object} CdrSurfaceScrollEngine
 * @property {string} [id] - Unique ID for targeting or testing.
 * @property {string} [description] - ARIA description for screen readers.
 * @property {string} [dataUi] - Data attribute for analytics or test hooks.
 * @property {boolean} [isShowingArrows] - Whether navigation arrows should be visible.
 * @property {CdrSurfaceScrollEngine[]} [frames] - Array of scroll frames.
 * @property {number} [framesToShow] - Frames visible at once.
 * @property {number} [framesToScroll] - Frames to scroll on arrow click.
 * @property {number} [framesGap] - Pixel gap between frames.
 * @property {number} [frameExtra] - Extra width factor for layout tuning.
 * @property {string} [focusSelector] - Selector for initial focusable frame.
 * @property {string} [viewportTabindex] - Tabindex value for scroll viewport.
 */
export interface CdrSurfaceScrollEngine {
  id?: string;
  description?: string;
  dataUi?: string;
  isShowingArrows?: boolean;
  frames?: CdrSurfaceScrollFrame[];
  framesToShow?: number;
  framesToScroll?: number;
  framesGap?: number;
  frameExtra?: number;
  focusSelector?: string;
  viewportTabindex?: string;
}

/**
 * @template T
 * @typedef {object} CdrSurfaceScrollArrowClickPayload
 * @property {'left'|'right'} direction - Direction of navigation.
 * @property {Event} event - The click event.
 * @property {T} [model] - Optional model reference.
 */
export interface CdrSurfaceScrollArrowClickPayload<T = Record<string, unknown>> {
  direction: 'left' | 'right';
  event: Event;
  model?: T;
}

/**
 * @template T
 * @typedef {object} CdrSurfaceScrollPayload
 * @property {number} index - Index of the frame scrolled into view.
 * @property {Event} event - The scroll event.
 * @property {T} [model] - Optional model reference.
 */
export interface CdrSurfaceScrollPayload<T = Record<string, unknown>> {
  index: number;
  event: Event;
  model?: T;
}

/**
 * @typedef {object} CdrSurfaceScrollArrow
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
export interface CdrSurfaceScrollArrow {
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
