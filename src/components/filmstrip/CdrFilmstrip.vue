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
      :responsive-frames="responsiveFrames"
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
    <!-- Width changes drive layout; frame height changes must not re-trigger it. -->
    <div
      ref="resizeMeasureRef"
      aria-hidden="true"
      style="width: 100%; height: 0; overflow: hidden"
    />
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
  CdrFilmstripResponsiveFrames,
  CdrFilmstripScrollPayload,
} from './interfaces';
import { computed, h, provide, ref, useAttrs, useId, watch } from 'vue';
import { CdrBreakpointLg, CdrBreakpointMd, CdrBreakpointSm } from '@rei/cdr-tokens/tokens';
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
   * Fires when the filmstrip's available width changes.
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
/** A zero-height target keeps content height changes out of resize delivery. */
const resizeMeasureRef = ref<HTMLElement | null>(null);
let measuredContainerWidth = 0;
const FRAMES_TO_SHOW_DEFAULT = 6;
const filmstripUniqueId = useId();
const filmstripConfig = computed<CdrFilmstripConfig<FrameProps, Model>>(() =>
  props.adapter(props.model),
);
const responsiveFrames = computed<Required<CdrFilmstripResponsiveFrames> | undefined>(() => {
  const config = filmstripConfig.value;
  if (config.resizeStrategy) return undefined;
  const frames =
    config.responsiveFrames ??
    (config.useDefaultResizeStrategy ? { xs: 2, sm: 4, md: 5 } : undefined);
  if (!frames) return undefined;
  const sm = frames.sm ?? frames.xs;
  const md = frames.md ?? sm;
  return {
    xs: frames.xs,
    sm,
    md,
    lg: frames.lg ?? md,
  };
});
function initialFrameCounts(
  config: CdrFilmstripConfig<FrameProps, Model>,
  counts?: Required<CdrFilmstripResponsiveFrames>,
): CdrFilmstripLayout {
  const framesToShow = config.framesToShow ?? counts?.xs ?? FRAMES_TO_SHOW_DEFAULT;
  return {
    framesToShow,
    framesToScroll:
      config.framesToScroll ?? (counts ? Math.max(framesToShow - 1, 1) : framesToShow),
  };
}
/** Mutable layout values initialized from the adapter and updated on resize. */
const initialCounts = initialFrameCounts(filmstripConfig.value, responsiveFrames.value);
const framesToShow = ref(initialCounts.framesToShow);
const framesToScroll = ref(initialCounts.framesToScroll);
const frames = computed(() => filmstripConfig.value.frames as CdrFilmstripFrame<never>[]);
const hasFilmstripFrames = computed(() => frames.value.length > 0);
const filmstripId = computed(() => `${filmstripConfig.value.filmstripId}-${filmstripUniqueId}`);
const description = computed(() => filmstripConfig.value.description);
const framesGap = computed(() => filmstripConfig.value.framesGap ?? 0);
const frameExtra = computed(() => filmstripConfig.value.frameExtra ?? 0.25);
const isShowingArrows = computed(() => filmstripConfig.value.isShowingArrows ?? true);
const focusSelector = computed(() => filmstripConfig.value.focusSelector ?? ':first-child');
const viewportTabindex = computed(() => filmstripConfig.value.viewportTabindex ?? '-1');
const dataAttributes = computed(() => filmstripConfig.value.dataAttributes ?? {});

watch(filmstripConfig, (config) => {
  applyLayout(initialFrameCounts(config, responsiveFrames.value));
  if (responsiveFrames.value && measuredContainerWidth) {
    applyLayout(responsiveLayout(measuredContainerWidth, responsiveFrames.value));
  }
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

/** Select the same container breakpoint that CSS uses before hydration. */
function responsiveLayout(
  containerWidth: number,
  counts: Required<CdrFilmstripResponsiveFrames>,
): CdrFilmstripLayout {
  let nextFramesToShow = counts.xs;
  if (containerWidth >= Number(CdrBreakpointLg)) nextFramesToShow = counts.lg;
  else if (containerWidth >= Number(CdrBreakpointMd)) nextFramesToShow = counts.md;
  else if (containerWidth >= Number(CdrBreakpointSm)) nextFramesToShow = counts.sm;
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
  measuredContainerWidth = containerWidth;

  if (resizeStrategy) {
    applyLayout(
      resizeStrategy({
        containerWidth,
        model: props.model,
        viewportWidth: window.innerWidth,
      }),
    );
  } else if (responsiveFrames.value) {
    applyLayout(responsiveLayout(containerWidth, responsiveFrames.value));
  }

  emit('resize', {
    model: props.model as Record<string, unknown>,
    framesToShow,
    framesToScroll,
  } satisfies CdrFilmstripResizePayload);
}, 25);

useResizeObserver(resizeMeasureRef, onResize);
</script>
