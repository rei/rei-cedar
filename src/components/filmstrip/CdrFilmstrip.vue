<template>
  <div
    v-if="hasFilmstripFrames"
    ref="CdrFilmstripContainer"
    v-bind="dataAttributes"
  >
    <slot name="heading" />
    <CdrFilmstripEngine
      :class="classAttr"
      :id="filmstripId"
      :description="description"
      :frames="frames"
      :frames-gap="framesGap"
      :frames-to-show="framesToShow"
      :frames-to-scroll="framesToScroll"
      :focus-selector="focusSelector"
      @ariaMessage="$emit('ariaMessage', $event)"
      @arrowClick="onArrowClick"
    >
      <template #frame="{ ...frameProps }: Record<string, unknown>">
        <component
          :is="filmstripConfig.component"
          v-bind="frameProps"
        />
      </template>
    </CdrFilmstripEngine>
  </div>
</template>

<script setup lang="ts">
import CdrFilmstripEngine from './CdrFilmstripEngine.vue';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import type {
  CdrFilmstripFrame,
  CdrFilmstripArrowClickPayload,
  CdrFilmstripResizePayload,
  CdrFilmstripEventEmitter,
  CdrFilmstripConfig,
  CdrFilmstrip,
} from './interfaces';
import { computed, h, provide, ref, useAttrs, useId, watch } from 'vue';
import { CdrFilmstripEventKey } from '../../types/symbols';

/**
 * Configures the options for the CdrFilmstrip component.
 */
defineOptions({ name: 'CdrFilmstrip' });

/**
 * Emits an event with a specified name and optional payload.
 */
const emit = defineEmits<{
  (e: string, payload?: unknown): void;
}>();

/**
 * Provides a centralized event emitter function for the filmstrip and its frames.
 */
const emitEvent: CdrFilmstripEventEmitter = (eventName, payload) => {
  emit(eventName, payload);
};

const attrs = useAttrs();
/**
 * Extracts the class attribute from the component's attributes.
 */
const classAttr = attrs.class || '';

/**
 * Provides the event emitter function to child components.
 */
provide(CdrFilmstripEventKey, emitEvent);

/**
 * Defines the props for the CdrFilmstrip component.
 */
const props = withDefaults(defineProps<CdrFilmstrip<unknown>>(), {
  model: () => ({}),
  adapter: () => {
    console.warn(`No adapter provided for CdrFilmstrip`);
    const filmstripConfig: CdrFilmstripConfig<unknown> = {
      frames: [],
      filmstripId: 'empty-filmstrip',
      component: h('div'),
      description: 'An empty filmstrip',
    };
    return filmstripConfig;
  },
});

// Reference to the filmstrip container element.
const CdrFilmstripContainer = ref<HTMLElement | null>(null);
const FRAMES_TO_SHOW_DEFAULT = 6;

/**
 * Resolves and transforms the filmstrip model.
 */
const filmstripConfig = computed<CdrFilmstripConfig<unknown>>(() => props.adapter(props.model));

/**
 * Number of frames to display at a time.
 */
const framesToShow = ref<number>(filmstripConfig?.value?.framesToShow ?? FRAMES_TO_SHOW_DEFAULT);

/**
 * Number of frames to scroll at a time.
 */
const framesToScroll = ref<number>(framesToShow.value);

/**
 * Extracts frames from the resolved filmstrip model.
 */
const frames = computed(() => filmstripConfig.value.frames as CdrFilmstripFrame<never>[]);

/**
 * Checks if the filmstrip has frames.
 */
const hasFilmstripFrames = computed(() => frames.value.length > 0);

/**
 * Retrieves filmstrip metadata.
 */
const filmstripId = computed(() => `${filmstripConfig.value.filmstripId}-${useId()}`);

/**
 * Retrieves the description for the filmstrip.
 */
const description = computed(() => filmstripConfig.value.description);

/**
 * Retrieves the gap between frames.
 */
const framesGap = computed(() => filmstripConfig?.value?.framesGap || 0);

/**
 * Determines if the filmstrip should use the default resize strategy.
 */
const useDefaultResizeStrategy = ref<boolean>(
  typeof filmstripConfig?.value?.useDefaultResizeStrategy === 'boolean'
    ? filmstripConfig.value.useDefaultResizeStrategy
    : false,
);

/**
 * Retrieves the focus selector for the filmstrip.
 */
const focusSelector = computed(() => filmstripConfig?.value?.focusSelector || ':first-child');

/**
 * Retrieves the data attributes for the filmstrip.
 */
const dataAttributes = computed(() => filmstripConfig.value?.dataAttributes || {});

/**
 * Handles arrow click events.
 */
function onArrowClick({ event, direction }: CdrFilmstripArrowClickPayload) {
  const arrowClickPayload: CdrFilmstripArrowClickPayload = {
    event,
    direction,
    model: props.model as Record<string, unknown>,
  };
  emit('arrowClick', arrowClickPayload);
}

/**
 * Updates the number of frames dynamically based on screen size.
 * Used only when no `resizeStrategy` is provided in `filmstripConfig`.
 */
function defaultResizeStrategy() {
  const screenWidth = window.innerWidth;
  framesToShow.value = screenWidth >= 1024 ? 5 : screenWidth >= 768 ? 4 : 2;
  framesToScroll.value = Math.max(framesToShow.value - 1, 1);
}

/**
 * Handles window resize events.
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
 * Sets up the resize observer for the filmstrip container.
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
