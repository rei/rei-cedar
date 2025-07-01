<template>
  <div
    v-if="hasFilmstripFrames"
    ref="CdrFilmstripContainer"
    v-bind="dataAttributes"
  >
    <!-- @slot Optional injection of a heading element for the filmstrip -->
    <slot name="heading" />
    <CdrSurfaceScroll
      :class="classAttr"
      :id="filmstripId"
      :description="description"
      :frames="frames"
      :frames-gap="framesGap"
      :frames-to-show="framesToShow"
      :frames-to-scroll="framesToScroll"
      :focus-selector="focusSelector"
      @aria-message="$emit('ariaMessage', $event)"
      @arrow-click="onArrowClick"
      @scroll-navigate="onScrollNavigate"
    >
      <template #frame="{ ...frameProps }: Record<string, unknown>">
        <component
          :is="filmstripConfig.component"
          v-bind="frameProps"
        />
      </template>
    </CdrSurfaceScroll>
  </div>
</template>

<script setup lang="ts">
import CdrSurfaceScroll from '../surfaceScroll/CdrSurfaceScroll.vue';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import type {
  CdrFilmstripResizePayload,
  CdrFilmstripEventEmitter,
  CdrFilmstripConfig,
  CdrFilmstrip,
  CdrFilmstripAdapter,
} from './interfaces';
import type {
  CdrSurfaceScrollFrame,
  CdrSurfaceScrollArrowClickPayload,
  CdrSurfaceScrollPayload,
} from '../surfaceScroll/interfaces';
import { computed, h, provide, ref, useAttrs, useId, watch } from 'vue';
import { CdrFilmstripEventKey } from '../../types/symbols';

/**
 * Responsive, accessible filmstrip for displaying a horizontal list of content frames.
 *
 * @uses CdrSurfaceScroll
 */
defineOptions({ name: 'CdrFilmstrip' });

const props = withDefaults(defineProps<CdrFilmstrip<unknown>>(), {
  /**
   * Default model provided to the filmstrip.
   * Returns an empty object when no model is passed.
   * @returns {Record<string, unknown>}
   * @default {}
   */
  model: (): Record<string, unknown> => ({}),

  /**
   * Default adapter used by the filmstrip when no custom adapter is provided.
   * Returns an empty filmstrip configuration using a generic wrapper element.
   *
   * @param {Record<string, unknown>} modelData - The raw model data passed to the adapter.
   * @returns {CdrFilmstripConfig<Record<string, unknown>>} A valid empty configuration for the filmstrip.
   * @default defaultAdapter
   */
  adapter: (): CdrFilmstripAdapter<Record<string, unknown>> => {
    return (): CdrFilmstripConfig<Record<string, unknown>> => {
      console.warn(`No adapter provided for CdrFilmstrip`);
      return {
        frames: [],
        filmstripId: 'empty-filmstrip',
        component: h('div'),
        description: 'An empty filmstrip',
      };
    };
  },
});

const emit = defineEmits<{
  /**
   * Emitted when a user clicks the navigation arrows.
   * @param payload - The arrow click event metadata.
   */
  (e: 'arrowClick', payload: CdrSurfaceScrollArrowClickPayload): void;

  /**
   * Emitted when the filmstrip scrolls to a new frame.
   * @param payload - The scroll event metadata including target index.
   */
  (e: 'scrollNavigate', payload: CdrSurfaceScrollPayload): void;

  /**
   * Emitted when the layout changes due to screen or container resize.
   * @param payload - The resize metadata including updated frame counts.
   */
  (e: 'resize', payload: CdrFilmstripResizePayload): void;

  /**
   * Emitted to update screen readers with the current frame information.
   * @param payload - A string message intended for screen readers.
   */
  (e: 'ariaMessage', payload: string): void;

  /**
   * Emitted when a custom event is triggered.
   * @param payload - The optional payload for a custom event.
   */
  (e: string, payload?: unknown): void;
}>();

/**
 * Provides a centralized event emitter function for the filmstrip and its frames.
 * This enables child components to dispatch events upward.
 *
 * @param {string} eventName - The name of the event to emit.
 * @param {unknown} payload - The data payload to emit with the event.
 */
const emitEvent: CdrFilmstripEventEmitter = (eventName, payload) => {
  emit(eventName, payload);
};

const attrs = useAttrs();
/**
 * Extracts the class attribute from the component's attributes.
 * This class is applied to the CdrSurfaceScroll for styling purposes.
 */
const classAttr = attrs.class || '';

/**
 * Provides the event emitter function to child components via dependency injection.
 * This allows descendant components to trigger events on the filmstrip component.
 */
provide(CdrFilmstripEventKey, emitEvent);

// Reference to the filmstrip container element.
const CdrFilmstripContainer = ref<HTMLElement | null>(null);
const FRAMES_TO_SHOW_DEFAULT = 6;

/**
 * Resolves and transforms the filmstrip model.
 * The adapter function is applied to the model to obtain a consistent filmstrip configuration.
 *
 * @returns {CdrFilmstripConfig<unknown>} The transformed filmstrip configuration.
 */
const filmstripConfig = computed<CdrFilmstripConfig<unknown>>(() => props.adapter(props.model));

/**
 * Number of frames to display at a time.
 * Defaults to FRAMES_TO_SHOW_DEFAULT if the adapter does not specify a value.
 *
 * @default FRAMES_TO_SHOW_DEFAULT
 */
const framesToShow = ref<number>(filmstripConfig?.value?.framesToShow ?? FRAMES_TO_SHOW_DEFAULT);

/**
 * Number of frames to scroll at a time.
 * Typically matches the number of frames displayed unless overridden.
 */
const framesToScroll = ref<number>(framesToShow.value);

/**
 * Extracts frames from the resolved filmstrip model.
 *
 * @returns {CdrSurfaceScrollFrame<never>[]} An array of frames to be rendered by the filmstrip engine.
 */
const frames = computed(() => filmstripConfig.value.frames as CdrSurfaceScrollFrame<never>[]);

/**
 * Checks if the filmstrip has any frames to display.
 *
 * @returns {boolean} True if there is at least one frame, false otherwise.
 */
const hasFilmstripFrames = computed(() => frames.value.length > 0);

/**
 * Retrieves filmstrip metadata and generates a unique filmstrip ID.
 * The unique ID is used for accessibility and to prevent DOM conflicts.
 *
 * @returns {string} A unique identifier for the filmstrip.
 */
const filmstripId = computed(() => `${filmstripConfig.value.filmstripId}-${useId()}`);

/**
 * Retrieves the description for the filmstrip.
 * This description is used to provide context for screen readers.
 *
 * @returns {string} The filmstrip's description.
 */
const description = computed(() => filmstripConfig.value.description);

/**
 * Retrieves the gap between frames as defined in the filmstrip configuration.
 *
 * @returns {number} The gap (in pixels) between individual frames.
 */
const framesGap = computed(() => filmstripConfig?.value?.framesGap || 0);

/**
 * Determines if the filmstrip should use the default resize strategy.
 * This flag controls whether the component automatically adjusts the number
 * of frames displayed based on the window size.
 *
 * @returns {boolean} True if the default resize strategy is enabled, false otherwise.
 */
const useDefaultResizeStrategy = ref<boolean>(
  typeof filmstripConfig?.value?.useDefaultResizeStrategy === 'boolean'
    ? filmstripConfig.value.useDefaultResizeStrategy
    : false,
);

/**
 * Retrieves the focus selector for the filmstrip.
 * This selector determines which element within a frame should receive focus for accessibility.
 *
 * @returns {string} The CSS selector for the focusable element.
 */
const focusSelector = computed(() => filmstripConfig?.value?.focusSelector || ':first-child');

/**
 * Retrieves additional data attributes for the filmstrip container.
 *
 * @returns {Record<string, unknown>} An object containing data attributes to be applied to the container.
 */
const dataAttributes = computed(() => filmstripConfig.value?.dataAttributes || {});

/**
 * Handles arrow click events for navigating through the filmstrip.
 * Constructs an arrow click payload and emits the 'arrowClick' event.
 *
 * @param {CdrSurfaceScrollArrowClickPayload} param0 - The arrow click event payload.
 */
function onArrowClick({ event, direction }: CdrSurfaceScrollArrowClickPayload) {
  const arrowClickPayload: CdrSurfaceScrollArrowClickPayload = {
    event,
    direction,
    model: props.model as Record<string, unknown>,
  };
  emit('arrowClick', arrowClickPayload);
}

/**
 * Handles scroll navigation events in the filmstrip.
 * Constructs a scroll payload and emits the 'scrollNavigate' event.
 *
 * @param {CdrSurfaceScrollPayload} param0 - The scroll event payload.
 */
function onScrollNavigate({ index, event }: CdrSurfaceScrollPayload): void {
  const scrollPayload: CdrSurfaceScrollPayload = {
    event,
    index,
    model: props.model as Record<string, unknown>,
  };
  emit('scrollNavigate', scrollPayload);
}

/**
 * Updates the number of frames displayed based on the current screen width.
 * This function implements a default resize strategy in the absence of a custom strategy.
 */
function defaultResizeStrategy() {
  const screenWidth = window.innerWidth;
  framesToShow.value = screenWidth >= 1024 ? 5 : screenWidth >= 768 ? 4 : 2;
  framesToScroll.value = Math.max(framesToShow.value - 1, 1);
}

/**
 * Handles window resize events and updates the filmstrip layout accordingly.
 * The resize handling is debounced to improve performance.
 */
const onResize = useDebounceFn(() => {
  const resizePayload: CdrFilmstripResizePayload = {
    model: props.model as Record<string, unknown>,
    framesToShow: framesToShow,
    framesToScroll: framesToScroll,
  };
  emit('resize', resizePayload);
  if (useDefaultResizeStrategy.value) {
    defaultResizeStrategy();
  }
}, 25);

/**
 * Sets up a resize observer on the filmstrip container element.
 * This ensures that the filmstrip layout updates automatically when the container size changes.
 */
watch(
  () => CdrFilmstripContainer.value,
  (el) => {
    if (el) {
      useResizeObserver(el, onResize);
    }
  },
  { immediate: true },
);
</script>
