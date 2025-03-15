<template>
  <div
    :id="id"
    ref="containerRef"
    :data-ui="dataUi"
    :style="computedCSSVars"
    :class="classObj[BASE_CLASS]"
    @focusin="handleFocusIn"
  >
    <ScrollAreaRoot
      type="auto"
      :class="mapClasses(classObj, `${BASE_CLASS}__root`)"
    >
      <ScrollAreaViewport
        ref="framesRef"
        :class="mapClasses(classObj, `${BASE_CLASS}__viewport`)"
        :aria-label="description || `${frames.length} items`"
        :tabindex="viewportTabindex"
      >
        <ul
          :id="`${id}-frames`"
          :class="mapClasses(classObj, `${BASE_CLASS}__frames`)"
          :data-ui="`${BASE_CLASS}__frames`"
        >
          <li
            v-for="(frame, index) in frames"
            :key="frame.key"
            ref="framesItemsRef"
            :class="mapClasses(classObj, `${BASE_CLASS}__frame`)"
          >
            <slot
              name="frame"
              :index="index"
              v-bind="frame.props"
              :tabindex="index === focusIndex ? '0' : '-1'"
            />
          </li>
        </ul>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        :class="mapClasses(classObj, `${BASE_CLASS}__bar`, `${BASE_CLASS}__bar--horizontal`)"
        orientation="horizontal"
      >
        <ScrollAreaThumb :class="mapClasses(classObj, `${BASE_CLASS}__thumb`)" />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
    <template v-for="{ direction, attributes, icon } in arrows">
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
import mapClasses from '../../utils/mapClasses';
import { useResizeObserver, useElementHover, useDebounceFn, useEventListener } from '@vueuse/core';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'radix-vue';
import CdrButton from '../button/CdrButton.vue';
import { IconCaretLeft, IconCaretRight } from '../icon';

import type {
  CdrFilmstripArrowClickPayload,
  CdrFilmstripEngine,
  CdrFilmstripArrow,
} from './interfaces';
import { computed, onMounted, onUnmounted, ref, useCssModule } from 'vue';

const classObj = useCssModule();
const BASE_CLASS = 'cdr-filmstrip';

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

const emit = defineEmits<{
  (e: 'arrowClick', payload: CdrFilmstripArrowClickPayload): void;
  (e: 'ariaMessage', message: string): void;
}>();

const ariaMessage = ref(''); // Live region message for screen readers
const containerRef = ref<HTMLElement | null>(null); // filmstrip container
const framesRef = ref<typeof ScrollAreaViewport | null>(null); // Scrollable viewport
const framesItemsRef = ref<Array<HTMLElement> | null>(null); // List of frame elements

const containerWidth = ref(0); // Width of the filmstrip container
const currentIndex = ref(0); // Current visible frame index
const focusIndex = ref(0); // Currently focused frame index
const hasScrolled = ref(false); // Tracks if the filmstrip has been scrolled
const isContainerHovered = useElementHover(containerRef); // Hover state for the container

/**
 * Calculates the width of each frame based on the container size, gap, and extra width.
 * This is used for determining how much space each frame occupies in the viewport.
 */
const frameWidth = computed(() => {
  const totalGaps = props.framesToShow * props.framesGap;
  const availableWidth = containerWidth.value - totalGaps;
  return availableWidth / (props.framesToShow + props.frameExtra);
});

/**
 * Generates the CSS variables for the scrollable viewport.
 */
const computedCSSVars = computed(() => ({
  '--frames-gap': props.framesGap,
  '--frame-width': frameWidth.value,
  '--frame-extra': props.frameExtra,
}));

/**
 * Generates the properties and states for navigation arrows.
 * Calculates whether the left or right arrow should be enabled or disabled based on the current frame index.
 */
const arrows = computed(() => {
  const isAtLeftBoundary = currentIndex.value === 0;
  const isAtRightBoundary = currentIndex.value >= props.frames.length - props.framesToShow;

  return ['left', 'right'].map((direction) => {
    const isEnabled = direction === 'left' ? !isAtLeftBoundary : !isAtRightBoundary;
    return {
      direction,
      icon: direction === 'left' ? IconCaretLeft : IconCaretRight,
      attributes: {
        'data-ui': `${BASE_CLASS}__arrow--${direction}`,
        class: mapClasses(
          classObj,
          `${BASE_CLASS}__arrow`,
          `${BASE_CLASS}__arrow--${direction}`,
          isEnabled ? '' : `${BASE_CLASS}__arrow--disabled`,
        ),
        'aria-label': `${direction === 'right' ? 'Next' : 'Previous'} Frame`,
        'aria-controls': `${props.id}-frames`,
        tabindex: 0,
        size: 'large',
        disabled: !isEnabled,
      },
    } as CdrFilmstripArrow;
  });
});

/**
 * Calculates the scroll position for a given frame index.
 * @param index - Index of the frame to scroll to
 * @returns The calculated scroll position in pixels
 */
const calculateScrollPosition = (index: number) => {
  const framesOffset = frameWidth.value * index;
  const gapsOffset = props.framesGap * index;
  return framesOffset + gapsOffset;
};

/**
 * Smoothly scrolls to the specified frame index.
 * @param newIndex - The target frame index
 */
const scrollToIndex = (newIndex: number) => {
  const newLeft = calculateScrollPosition(newIndex);
  const currentLeft = framesRef.value?.viewportElement.scrollLeft ?? 0;
  framesRef.value?.viewportElement.scrollBy({
    left: newLeft - currentLeft,
    behavior: 'smooth',
  });
};

/**
 * Handles navigation arrow clicks and updates the current index.
 * Emits an event when the arrow is clicked.
 * @param direction - Direction of the arrow ("left" or "right")
 */
const onArrowClick = (event: Event, direction: 'left' | 'right') => {
  const arrowClickPayload: CdrFilmstripArrowClickPayload = { event, direction };
  emit('arrowClick', arrowClickPayload);
  const delta = direction === 'left' ? -props.framesToScroll : props.framesToScroll;
  const proposedIndex = currentIndex.value + delta;

  currentIndex.value = Math.max(0, Math.min(proposedIndex, props.frames.length - 1));
  scrollToIndex(currentIndex.value);
};

/**
 * Announces the visible frames for screen readers. The message is debounced to avoid excessive announcements.
 */
const announceFrames = useDebounceFn(() => {
  const totalFrames = props.frames.length;

  // Ensure `currentIndex` is within bounds
  const start = Math.max(1, currentIndex.value + 1);
  const end = Math.min(totalFrames, start + props.framesToShow - 1);

  // Generate message based on framesToShow
  ariaMessage.value =
    props.framesToShow === 1
      ? `Now showing frame ${start} of ${totalFrames}`
      : `Now showing frames ${start} through ${end} of ${totalFrames}`;

  emit('ariaMessage', ariaMessage.value);
}, 300);

/**
 * Provides initial accessibility announcement when focus enters the filmstrip.
 * @param e - The focus event
 */
const handleFocusIn = (e: FocusEvent) => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (
    !currentTarget ||
    !e.relatedTarget ||
    !currentTarget.contains(e.relatedTarget as HTMLElement)
  ) {
    const totalFrames = props.frames.length;
    const start = Math.max(1, currentIndex.value + 1);
    const end = Math.min(totalFrames, start + props.framesToShow - 1);

    ariaMessage.value =
      props.framesToShow === 1
        ? `Showing frame ${start} of ${totalFrames}. Use left and right arrow keys to navigate.`
        : `Showing frames ${start} through ${end} of ${totalFrames}. Use left and right arrow keys to navigate.`;

    emit('ariaMessage', ariaMessage.value);
  }
};

/**
 * Debounced scroll handler that updates the current index based on the scroll position.
 * @param e - The scroll event
 */
const debouncedHandleScroll = useDebounceFn((e: Event) => {
  const scrollLeft = (e.target as HTMLElement).scrollLeft;
  const positions = props.frames.map((_, index) => calculateScrollPosition(index));
  const closestIndex = positions.findIndex(
    (pos) =>
      Math.abs(pos - scrollLeft) ===
      Math.min(...positions.map((pos) => Math.abs(pos - scrollLeft))),
  );

  if (closestIndex !== currentIndex.value) {
    currentIndex.value = closestIndex;
    announceFrames();
  }

  if (!hasScrolled.value) hasScrolled.value = true;
}, 100);

onMounted(() => {
  useEventListener(framesRef.value?.viewportElement, 'scroll', debouncedHandleScroll);

  // Initialize resize observer
  const { stop } = useResizeObserver(containerRef, (entries) => {
    entries.forEach((entry) => {
      containerWidth.value = entry.contentRect.width;
    });
  });
  onUnmounted(() => {
    stop(); // Clean up the observer when the component is unmounted
  });
  // Initial container width
  containerWidth.value = containerRef.value?.offsetWidth ?? 0;
});
</script>

<style lang="scss" module src="./styles/CdrFilmstrip.module.scss"></style>
