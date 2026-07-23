<template>
  <div
    :id="id"
    ref="containerRef"
    :data-ui="dataUi"
    :style="computedCSSVars"
    :class="classObj[BASE_CLASS]"
    @focusin="handleFocusIn"
  >
    <CdrSurfaceScroll
      ref="surfaceScrollRef"
      :viewport-props="{
        'aria-label': description || `${frames.length} items`,
        tabindex: viewportTabindex,
      }"
      :scrollbar-props="{
        orientation: 'horizontal',
      }"
    >
      <ul
        :id="`${id}-frames`"
        :class="[
          mapClasses(classObj, `${BASE_CLASS}__frames`),
          classAttr && `${classAttr}__frames`,
        ]"
        :data-ui="`${BASE_CLASS}__frames`"
      >
        <li
          v-for="(frame, index) in frames"
          :key="frame.key"
          ref="framesItemsRef"
          :class="[
            mapClasses(classObj, `${BASE_CLASS}__frame`),
            classAttr ? `${classAttr}__frame` : null,
          ]"
          @keydown.right="(e) => onShiftFocus(e, 'right')"
          @keydown.left="(e) => onShiftFocus(e, 'left')"
        >
          <!-- @slot Renders one frame with adapter props and managed focus state. -->
          <slot
            name="frame"
            :index="index"
            v-bind="frame.props"
            :tabindex="index === focusIndex ? '0' : '-1'"
          />
        </li>
      </ul>
    </CdrSurfaceScroll>
    <template v-for="{ direction, attributes, icon } in arrows">
      <!-- @slot Replaces a built-in navigation arrow while preserving its behavior. -->
      <slot
        name="arrow"
        v-bind="{ attributes, direction, icon }"
        :on-click="(e: Event) => onArrowClick(e, direction)"
      >
        <CdrButton
          v-if="isContainerHovered && props.isShowingArrows"
          :key="direction"
          :icon-only="true"
          :with-background="true"
          v-bind="attributes"
          @click.prevent="(e: Event) => onArrowClick(e, direction)"
        >
          <template #icon>
            <component :is="icon" />
          </template>
        </CdrButton>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useAttrs, useCssModule, watch } from 'vue';
import type { Component } from 'vue';
import { useResizeObserver, useElementHover, useDebounceFn } from '@vueuse/core';

import mapClasses from '../../utils/mapClasses';
import CdrButton from '../button/CdrButton.vue';
import { IconCaretLeft, IconCaretRight } from '../icon';
import CdrSurfaceScroll from '../surfaceScroll/CdrSurfaceScroll.vue';
import type {
  CdrFilmstripEngine,
  CdrFilmstripArrow,
  CdrFilmstripArrowClickPayload,
  CdrFilmstripScrollPayload,
} from './interfaces';

const classObj = useCssModule();
const BASE_CLASS = 'cdr-filmstrip';

/**
 * Low-level layout and interaction engine for a horizontal frame list.
 *
 * The engine calculates frame widths, bounds arrow navigation to complete
 * visible sets, manages a roving tabindex across frame content, and reports
 * visible-frame changes for assistive technology.
 *
 * @uses CdrSurfaceScroll for the scrollable viewport
 * @uses CdrButton for built-in navigation controls
 */
defineOptions({ name: 'CdrFilmstripEngine' });

const props = withDefaults(defineProps<CdrFilmstripEngine>(), {
  id: '',
  frames: () => [],
  description: '',
  dataUi: BASE_CLASS,
  isShowingArrows: true,
  framesToShow: 5,
  framesToScroll: 4,
  framesGap: 0,
  frameExtra: 0.25,
  focusSelector: ':first-child',
  viewportTabindex: '-1',
});

defineSlots<{
  /** Renders one frame with adapter props, its index, and managed tabindex. */
  'frame'(props: { index: number; tabindex: string; [key: string]: any }): any;
  /** Replaces the built-in arrow while preserving its state and click handler. */
  'arrow'?(props: {
    attributes: Record<string, any>;
    direction: CdrFilmstripArrow['direction'];
    icon: Component;
    onClick: (e: Event) => void;
  }): any;
}>();

const attrs = useAttrs();
const classAttr = attrs.class || '';

const emit = defineEmits<{
  /** Fires after a built-in or slotted navigation arrow is activated. */
  (e: 'arrowClick', payload: CdrFilmstripArrowClickPayload): void;
  /** Fires during direct viewport scrolling with the nearest frame index. */
  (e: 'scrollNavigate', payload: CdrFilmstripScrollPayload): void;
  /** Reports visible-frame status for a consumer-owned live region. */
  (e: 'ariaMessage', message: string): void;
}>();

const surfaceScrollRef = ref<typeof CdrSurfaceScroll | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const viewportRef = computed(() => surfaceScrollRef.value?.viewportRef);
const framesItemsRef = ref<Array<HTMLElement> | null>(null);
const containerWidth = ref(0);
const currentIndex = ref(0);
const focusIndex = ref(0);
const isContainerHovered = useElementHover(containerRef);
/** Suppresses the native scroll event produced by arrow navigation. */
const isProgrammaticScroll = ref(false);
/** Last index that can begin a complete visible set. */
const lastFrameStartIndex = computed(() => Math.max(props.frames.length - props.framesToShow, 0));

watch([lastFrameStartIndex, () => props.frames.length], ([lastStartIndex, frameCount]) => {
  currentIndex.value = Math.min(currentIndex.value, lastStartIndex);
  focusIndex.value = Math.min(focusIndex.value, Math.max(frameCount - 1, 0));
});

/** Frame width after reserving gaps and the configured next-frame preview. */
const frameWidth = computed(() => {
  const totalGaps = props.framesToShow * props.framesGap;
  return (containerWidth.value - totalGaps) / (props.framesToShow + props.frameExtra);
});

const computedCSSVars = computed(() => ({
  '--frames-gap': props.framesGap,
  '--frame-width': frameWidth.value,
  '--frame-extra': props.frameExtra,
}));

const arrowIcons = {
  left: IconCaretLeft,
  right: IconCaretRight,
} as const;

const arrows = computed<CdrFilmstripArrow[]>(() =>
  (Object.keys(arrowIcons) as CdrFilmstripArrow['direction'][]).map((direction) => {
    const isEnabled =
      direction === 'left'
        ? currentIndex.value > 0
        : currentIndex.value < lastFrameStartIndex.value;
    return {
      direction,
      icon: arrowIcons[direction],
      attributes: {
        'data-ui': `${BASE_CLASS}__arrow--${direction}`,
        class: [
          mapClasses(
            classObj,
            `${BASE_CLASS}__arrow`,
            `${BASE_CLASS}__arrow--${direction}`,
            isEnabled ? '' : `${BASE_CLASS}__arrow--disabled`,
          ),
          classAttr ? `${classAttr}__arrow` : null,
          classAttr ? `${classAttr}__arrow--${direction}` : null,
          isEnabled ? '' : classAttr && `${classAttr}__arrow--disabled`,
        ]
          .filter(Boolean)
          .join(' '),
        'aria-label': `${direction === 'right' ? 'Next' : 'Previous'} Frame`,
        'aria-controls': `${props.id}-frames`,
        tabindex: 0,
        size: 'large',
        disabled: !isEnabled,
      },
    };
  }),
);

const calculateScrollPosition = (index: number): number =>
  (frameWidth.value + props.framesGap) * index;

const scrollToIndex = (newIndex: number): void => {
  const viewport = viewportRef.value?.viewportElement;
  viewport?.scrollBy({
    left: calculateScrollPosition(newIndex) - viewport.scrollLeft,
    behavior: 'smooth',
  });
};

const onArrowClick = (event: Event, direction: 'left' | 'right'): void => {
  emit('arrowClick', { event, direction });
  const delta = direction === 'left' ? -props.framesToScroll : props.framesToScroll;
  currentIndex.value = Math.max(0, Math.min(currentIndex.value + delta, lastFrameStartIndex.value));
  isProgrammaticScroll.value = true;
  scrollToIndex(currentIndex.value);
};

function visibleFramesLabel(prefix: 'Now showing' | 'Showing'): string {
  const total = props.frames.length;
  const start = Math.max(1, currentIndex.value + 1);
  const end = Math.min(total, start + props.framesToShow - 1);
  return props.framesToShow === 1
    ? `${prefix} frame ${start} of ${total}`
    : `${prefix} frames ${start} through ${end} of ${total}`;
}

/** Announces a settled scroll position without flooding the live region. */
const announceFrames = useDebounceFn((): void => {
  emit('ariaMessage', visibleFramesLabel('Now showing'));
}, 300);

const handleFocusIn = (e: FocusEvent): void => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (!e.relatedTarget || !currentTarget?.contains(e.relatedTarget as Node)) {
    emit(
      'ariaMessage',
      `${visibleFramesLabel('Showing')}. Use left and right arrow keys to navigate.`,
    );
  }
};

/** Moves the roving tabindex between frame-owned focus targets. */
function onShiftFocus(e: Event, direction: CdrFilmstripArrow['direction']): void {
  e.preventDefault();
  isProgrammaticScroll.value = true;

  if (!props.frames.length) {
    return;
  }

  const offset = direction === 'left' ? -1 : 1;
  focusIndex.value = (focusIndex.value + offset + props.frames.length) % props.frames.length;
  framesItemsRef.value?.[focusIndex.value]
    ?.querySelector<HTMLElement>(props.focusSelector)
    ?.focus();
}

/**
 * Converts the scroll offset to the nearest valid frame and distinguishes
 * direct scrolling from the native scroll event caused by an arrow click.
 */
const debouncedHandleScroll = useDebounceFn((e: Event): void => {
  const scrollLeft = (e.target as HTMLElement).scrollLeft;
  const frameStep = frameWidth.value + props.framesGap;
  const closestIndex =
    frameStep > 0 ? Math.min(Math.round(scrollLeft / frameStep), lastFrameStartIndex.value) : 0;

  if (closestIndex !== currentIndex.value) {
    currentIndex.value = closestIndex;
    announceFrames();
  }

  if (!isProgrammaticScroll.value) {
    emit('scrollNavigate', {
      event: e,
      index: currentIndex.value,
    });
  }
  isProgrammaticScroll.value = false;
}, 100);

const { stop: stopResizeObserver } = useResizeObserver(containerRef, (entries) => {
  containerWidth.value = entries[0]?.contentRect.width ?? 0;
});

/** The Radix viewport is not available until `CdrSurfaceScroll` mounts. */
let viewportElement: HTMLElement | undefined;
onMounted(() => {
  viewportElement = viewportRef.value?.viewportElement;
  viewportElement?.addEventListener('scroll', debouncedHandleScroll);
  containerWidth.value = containerRef.value?.offsetWidth ?? 0;
});

onUnmounted(() => {
  viewportElement?.removeEventListener('scroll', debouncedHandleScroll);
  stopResizeObserver();
});
</script>

<style lang="scss" module src="./styles/CdrFilmstrip.module.scss"></style>
