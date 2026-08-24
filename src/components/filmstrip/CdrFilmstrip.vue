<template>
  <div
    v-if="hasFilmstripFrames"
    ref="CdrFilmstripContainer"
    v-bind="dataAttributes"
  >
    <!-- @slot Heading rendered before the scrollable frame list. -->
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

<script
  setup
  lang="ts"
  generic="Model extends object = Record<string, unknown>, FrameProps = Model"
>
import CdrFilmstripEngine from './CdrFilmstripEngine.vue';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import type {
  CdrFilmstripFrame,
  CdrFilmstripArrowClickPayload,
  CdrFilmstripResizePayload,
  CdrFilmstripConfig,
  CdrFilmstrip,
  CdrFilmstripLayout,
  CdrFilmstripScrollPayload,
} from './interfaces';
import { computed, h, provide, ref, useAttrs, useId, watch } from 'vue';
import { CdrFilmstripEventKey } from '../../types/symbols';

/**
 * Adapts consumer-owned data into a horizontal, accessible content rail.
 *
 * The adapter selects the frame component and maps source data into frame
 * props. `CdrFilmstripEngine` owns layout, scrolling, navigation, and focus.
 * Frame descendants can emit consumer-defined events through
 * `CdrFilmstripEventKey`. A missing adapter warns and renders no frames.
 *
 * @uses CdrFilmstripEngine for layout and interaction
 */
defineOptions({ name: 'CdrFilmstrip' });

defineSlots<{
  /** Heading rendered before the scrollable frame list. */
  'heading'(props: Record<string, never>): any;
}>();

const props = withDefaults(defineProps<CdrFilmstrip<Model, FrameProps>>(), {
  model: (): Model => ({}) as Model,

  adapter: (): CdrFilmstripConfig<FrameProps, Model> => {
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
   * Fires after a built-in navigation button is activated.
   * @param payload Original event, direction, and source model.
   */
  (e: 'arrowClick', payload: CdrFilmstripArrowClickPayload): void;

  /**
   * Fires during direct viewport scrolling.
   * @param payload Original event, zero-based frame index, and source model.
   */
  (e: 'scrollNavigate', payload: CdrFilmstripScrollPayload): void;

  /**
   * Fires when the filmstrip container changes size.
   * @param payload Mutable frame counts and the source model.
   */
  (e: 'resize', payload: CdrFilmstripResizePayload): void;

  /**
   * Provides navigation status text for a consumer-owned live region.
   * @param payload Current visible-frame message.
   */
  (e: 'ariaMessage', payload: string): void;

  /**
   * Forwards consumer-defined events emitted by frame descendants.
   * @param payload Optional event data supplied by the frame component.
   */
  (e: string, payload?: unknown): void;
}>();

const attrs = useAttrs();
const classAttr = attrs.class || '';

/** Lets deeply nested frame controls publish events through the wrapper. */
provide(CdrFilmstripEventKey, emit);

const CdrFilmstripContainer = ref<HTMLElement | null>(null);
const FRAMES_TO_SHOW_DEFAULT = 6;
const filmstripUniqueId = useId();
const filmstripConfig = computed<CdrFilmstripConfig<FrameProps, Model>>(() =>
  props.adapter(props.model),
);
/** Mutable layout values initialized from the adapter and updated on resize. */
const framesToShow = ref(filmstripConfig.value.framesToShow ?? FRAMES_TO_SHOW_DEFAULT);
const framesToScroll = ref(filmstripConfig.value.framesToScroll ?? framesToShow.value);
const frames = computed(() => filmstripConfig.value.frames as CdrFilmstripFrame<never>[]);
const hasFilmstripFrames = computed(() => frames.value.length > 0);
const filmstripId = computed(() => `${filmstripConfig.value.filmstripId}-${filmstripUniqueId}`);
const description = computed(() => filmstripConfig.value.description);
const framesGap = computed(() => filmstripConfig.value.framesGap ?? 0);
const frameExtra = computed(() => filmstripConfig.value.frameExtra ?? 0.25);
const isShowingArrows = computed(() => filmstripConfig.value.isShowingArrows ?? true);
const useDefaultResizeStrategy = computed(
  () => filmstripConfig.value.useDefaultResizeStrategy ?? false,
);
const focusSelector = computed(() => filmstripConfig.value.focusSelector ?? ':first-child');
const viewportTabindex = computed(() => filmstripConfig.value.viewportTabindex ?? '-1');
const dataAttributes = computed(() => filmstripConfig.value.dataAttributes ?? {});

watch(filmstripConfig, (config) => {
  framesToShow.value = config.framesToShow ?? FRAMES_TO_SHOW_DEFAULT;
  framesToScroll.value = config.framesToScroll ?? framesToShow.value;
});

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

/** Cedar's optional breakpoint policy for consumers without a custom strategy. */
function defaultResizeStrategy(): CdrFilmstripLayout {
  const screenWidth = window.innerWidth;
  const nextFramesToShow = screenWidth >= 1024 ? 5 : screenWidth >= 768 ? 4 : 2;
  return {
    framesToShow: nextFramesToShow,
    framesToScroll: Math.max(nextFramesToShow - 1, 1),
  };
}

function applyLayout(layout: CdrFilmstripLayout): void {
  framesToShow.value = layout.framesToShow;
  framesToScroll.value = layout.framesToScroll;
}

/**
 * Applies an adapter or Cedar policy first, then exposes the legacy mutable
 * refs so existing `resize` handlers can override the resulting frame counts.
 */
const onResize = useDebounceFn((entries: ResizeObserverEntry[] = []) => {
  const resizeStrategy = filmstripConfig.value.resizeStrategy;
  const containerWidth =
    entries[0]?.contentRect.width ??
    CdrFilmstripContainer.value?.getBoundingClientRect().width ??
    0;

  if (resizeStrategy) {
    applyLayout(
      resizeStrategy({
        containerWidth,
        model: props.model,
        viewportWidth: window.innerWidth,
      }),
    );
  } else if (useDefaultResizeStrategy.value) {
    applyLayout(defaultResizeStrategy());
  }

  emit('resize', {
    model: props.model as Record<string, unknown>,
    framesToShow,
    framesToScroll,
  } satisfies CdrFilmstripResizePayload);
}, 25);

useResizeObserver(CdrFilmstripContainer, onResize);
</script>
