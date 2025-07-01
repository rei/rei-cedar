import type { Component, Ref } from 'vue';

import type { CdrSurfaceScrollFrame } from '../surfaceScroll/interfaces';

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
 * @property {CdrSurfaceScrollFrame<T>[]} frames - Array of frame definitions.
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
  frames: CdrSurfaceScrollFrame<T>[];
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
