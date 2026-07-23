<template>
  <div
    v-if="hasFilmstripFrames"
    ref="CdrFilmstripContainer"
    v-bind="dataAttributes"
  >
    <!-- @slot Optional injection of a heading element for the filmstrip -->
    <slot name="heading" />
    <CdrFilmstripEngine
      :class="classAttr"
      :id="filmstripId"
      :description="description"
      :frame-extra="frameExtra"
      :frames="frames"
      :frames-gap="framesGap"
      :frames-to-show="framesToShow"
      :frames-to-scroll="framesToScroll"
      :focus-selector="focusSelector"
      :is-showing-arrows="isShowingArrows"
      :viewport-tabindex="viewportTabindex"
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
  CdrFilmstripConfig,
  CdrFilmstrip,
  CdrFilmstripScrollPayload,
} from './interfaces';
import { computed, h, provide, ref, useAttrs, useId } from 'vue';
import { CdrFilmstripEventKey } from '../../types/symbols';

/**
 * Responsive, accessible filmstrip for displaying a horizontal list of content frames.
 *
 * @uses CdrFilmstripEngine
 */
defineOptions({ name: 'CdrFilmstrip' });

defineSlots<{
  /** Optional injection of a heading element for the filmstrip */
  'heading'(props: Record<string, never>): any;
}>();

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
   * @default empty filmstrip adapter
   */
  adapter: (): CdrFilmstripConfig<Record<string, unknown>> => {
    console.warn(`No adapter provided for CdrFilmstrip`);
    return {
      frames: [],
      filmstripId: 'empty-filmstrip',
      component: h('div'),
      description: 'An empty filmstrip',
    };
  },
});

const emit = defineEmits<{
  /**
   * Emitted when a user clicks the navigation arrows.
   * @param payload - The arrow click event metadata.
   */
  (e: 'arrowClick', payload: CdrFilmstripArrowClickPayload): void;

  /**
   * Emitted when the filmstrip scrolls to a new frame.
   * @param payload - The scroll event metadata including target index.
   */
  (e: 'scrollNavigate', payload: CdrFilmstripScrollPayload): void;

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

const attrs = useAttrs();
const classAttr = attrs.class || '';

provide(CdrFilmstripEventKey, emit);

const CdrFilmstripContainer = ref<HTMLElement | null>(null);
const FRAMES_TO_SHOW_DEFAULT = 6;
const filmstripUniqueId = useId();
const filmstripConfig = computed<CdrFilmstripConfig<unknown>>(() => props.adapter(props.model));
const framesToShow = ref(filmstripConfig.value.framesToShow ?? FRAMES_TO_SHOW_DEFAULT);
const framesToScroll = ref(filmstripConfig.value.framesToScroll ?? framesToShow.value);
const frames = computed(() => filmstripConfig.value.frames as CdrFilmstripFrame<never>[]);
const hasFilmstripFrames = computed(() => frames.value.length > 0);
const filmstripId = computed(() => `${filmstripConfig.value.filmstripId}-${filmstripUniqueId}`);
const description = computed(() => filmstripConfig.value.description);
const framesGap = computed(() => filmstripConfig.value.framesGap ?? 0);
const frameExtra = computed(() => filmstripConfig.value.frameExtra ?? 0.25);
const isShowingArrows = computed(() => filmstripConfig.value.isShowingArrows ?? true);
const useDefaultResizeStrategy = filmstripConfig.value.useDefaultResizeStrategy ?? false;
const focusSelector = computed(() => filmstripConfig.value.focusSelector ?? ':first-child');
const viewportTabindex = computed(() => filmstripConfig.value.viewportTabindex ?? '-1');
const dataAttributes = computed(() => filmstripConfig.value.dataAttributes ?? {});

function onArrowClick({ event, direction }: CdrFilmstripArrowClickPayload) {
  emit('arrowClick', {
    event,
    direction,
    model: props.model as Record<string, unknown>,
  });
}

function onScrollNavigate({ index, event }: CdrFilmstripScrollPayload): void {
  emit('scrollNavigate', {
    event,
    index,
    model: props.model as Record<string, unknown>,
  });
}

function defaultResizeStrategy() {
  const screenWidth = window.innerWidth;
  framesToShow.value = screenWidth >= 1024 ? 5 : screenWidth >= 768 ? 4 : 2;
  framesToScroll.value = Math.max(framesToShow.value - 1, 1);
}

const onResize = useDebounceFn(() => {
  if (useDefaultResizeStrategy) {
    defaultResizeStrategy();
  }

  emit('resize', {
    model: props.model as Record<string, unknown>,
    framesToShow,
    framesToScroll,
  } satisfies CdrFilmstripResizePayload);
}, 25);

useResizeObserver(CdrFilmstripContainer, onResize);
</script>
