import type { Component, Ref } from 'vue';

/** A keyed frame and the props passed to its rendering component. */
export interface CdrFilmstripFrame<Props = Record<string, unknown>> {
  key: string;
  props: Props;
}

/** Low-level layout and interaction properties for the filmstrip engine. */
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

/** Public filmstrip input resolved by an adapter. */
export interface CdrFilmstrip<T> {
  adapter: CdrFilmstripAdapter<T>;
  model: T;
}

/** Adapter output consumed by the generic filmstrip engine. */
export interface CdrFilmstripConfig<T = Record<string, unknown>> {
  component: Component;
  frames: CdrFilmstripFrame<T>[];
  filmstripId: string;
  description: string;
  dataAttributes?: Record<string, unknown>;
  frameExtra?: number;
  framesGap?: number;
  framesToScroll?: number;
  framesToShow?: number;
  isShowingArrows?: boolean;
  useDefaultResizeStrategy?: boolean;
  focusSelector?: string;
  viewportTabindex?: string;
}

export interface CdrFilmstripArrowClickPayload<T = Record<string, unknown>> {
  direction: 'left' | 'right';
  event: Event;
  model?: T;
}

export interface CdrFilmstripScrollPayload<T = Record<string, unknown>> {
  index: number;
  event: Event;
  model?: T;
}

export interface CdrFilmstripResizePayload<T = Record<string, unknown>> {
  framesToShow: Ref<number>;
  framesToScroll: Ref<number>;
  model?: T;
}

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

export interface CdrFilmstripEventEmitter {
  (event: string, payload?: unknown): void;
}

export interface CdrFilmstripAdapter<T> {
  (modelData: unknown): CdrFilmstripConfig<T>;
}
