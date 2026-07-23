import type { Component, Ref } from 'vue';

/**
 * One item in the filmstrip.
 *
 * The key identifies the frame across renders. The engine passes `props` to the
 * component selected by the adapter.
 */
export interface CdrFilmstripFrame<Props = Record<string, unknown>> {
  /** Stable key used by Vue when rendering the frame list. */
  key: string;
  /** Values passed to the frame component. */
  props: Props;
}

/**
 * Focus state supplied to each frame by `CdrFilmstripEngine`.
 *
 * A frame applies this value to the same primary action selected by
 * `focusSelector`.
 */
export interface CdrFilmstripFrameFocusProps {
  /** Managed tab position for the frame's primary action. */
  tabindex?: string;
}

/** Layout, navigation, and focus settings accepted by `CdrFilmstripEngine`. */
export interface CdrFilmstripEngine {
  /** Root ID and prefix for IDs referenced by ARIA attributes. */
  id?: string;
  /** Accessible label for the scrollable viewport. */
  description?: string;
  /** Value for the root `data-ui` attribute. */
  dataUi?: string;
  /** Whether the built-in previous and next buttons can be shown. */
  isShowingArrows?: boolean;
  /** Frames rendered in horizontal order. */
  frames?: CdrFilmstripFrame[];
  /** Number of complete frames visible in the viewport. */
  framesToShow?: number;
  /** Number of frames advanced by an arrow click. */
  framesToScroll?: number;
  /** Gap between frames in pixels. */
  framesGap?: number;
  /** Fraction of the next frame left visible as a visual cue. */
  frameExtra?: number;
  /** Selector for the primary action that receives the managed frame tabindex. */
  focusSelector?: string;
  /** Tabindex applied to the scrollable viewport. */
  viewportTabindex?: string;
}

/** Consumer-owned model and the adapter that translates it for the filmstrip. */
export interface CdrFilmstrip<T> {
  /** Converts the source model into the engine's rendering contract. */
  adapter: CdrFilmstripAdapter<T>;
  /** Source data passed to the adapter and included with emitted events. */
  model: T;
}

/**
 * Rendering contract returned by a filmstrip adapter.
 *
 * Adapters own the frame component and source-data mapping. The shared
 * filmstrip owns layout, scrolling, focus, and navigation.
 */
export interface CdrFilmstripConfig<T = Record<string, unknown>> {
  /** Component used to render every frame. */
  component: Component;
  /** Ordered frames and their component props. */
  frames: CdrFilmstripFrame<T>[];
  /** Base ID. `CdrFilmstrip` appends a unique instance suffix. */
  filmstripId: string;
  /** Accessible label for the scrollable viewport. */
  description: string;
  /** Attributes applied to the outer filmstrip container. */
  dataAttributes?: Record<string, unknown>;
  /** Fraction of the next frame left visible as a visual cue. */
  frameExtra?: number;
  /** Gap between frames in pixels. */
  framesGap?: number;
  /** Number of frames advanced by an arrow click. */
  framesToScroll?: number;
  /** Number of complete frames visible in the viewport. */
  framesToShow?: number;
  /** Whether the built-in previous and next buttons can be shown. */
  isShowingArrows?: boolean;
  /** Whether Cedar's breakpoint-based resize policy runs before the `resize` event. */
  useDefaultResizeStrategy?: boolean;
  /** Selector for the primary action that receives the managed frame tabindex. */
  focusSelector?: string;
  /** Tabindex applied to the scrollable viewport. */
  viewportTabindex?: string;
}

/** Event emitted after a built-in navigation button is activated. */
export interface CdrFilmstripArrowClickPayload<T = Record<string, unknown>> {
  /** Direction requested by the user. */
  direction: 'left' | 'right';
  /** Original click event. */
  event: Event;
  /** Source model supplied to `CdrFilmstrip`. */
  model?: T;
}

/** Event emitted during direct viewport scrolling. */
export interface CdrFilmstripScrollPayload<T = Record<string, unknown>> {
  /** Zero-based index of the frame nearest the viewport's leading edge. */
  index: number;
  /** Original scroll event. */
  event: Event;
  /** Source model supplied to `CdrFilmstrip`. */
  model?: T;
}

/**
 * Mutable layout values emitted when the filmstrip container changes size.
 *
 * Consumers can update the refs to apply their own responsive policy.
 */
export interface CdrFilmstripResizePayload<T = Record<string, unknown>> {
  /** Current number of complete visible frames. */
  framesToShow: Ref<number>;
  /** Current arrow-navigation increment. */
  framesToScroll: Ref<number>;
  /** Source model supplied to `CdrFilmstrip`. */
  model?: T;
}

/** Internal render model for one navigation button. */
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
 * Event channel injected into frame descendants by `CdrFilmstrip`.
 *
 * @param event Consumer-defined event name forwarded by the wrapper.
 * @param payload Optional data supplied by the frame component.
 */
export interface CdrFilmstripEventEmitter {
  (event: string, payload?: unknown): void;
}

/**
 * Converts consumer-owned data into the shared filmstrip rendering contract.
 *
 * `T` describes the props passed to each frame component.
 *
 * @param modelData Consumer-owned model supplied to `CdrFilmstrip`.
 * @returns Frame rendering and layout settings for the shared engine.
 */
export interface CdrFilmstripAdapter<T> {
  (modelData: unknown): CdrFilmstripConfig<T>;
}
