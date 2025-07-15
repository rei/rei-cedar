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
        tabindex: viewportTabindex
      }"
      :scrollbar-props="{
        orientation: 'horizontal'
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
import { computed, onMounted, onUnmounted, ref, useAttrs, useCssModule } from 'vue';
import { useResizeObserver, useElementHover, useDebounceFn, useEventListener } from '@vueuse/core';

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
 * Responsive filmstrip component providing smooth, accessible scrolling through frames.
 * @uses CdrButton, CdrIcon
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

/**
 * Retrieves the component's attributes.
 */
const attrs = useAttrs();

/**
 * Extracts the class attribute from the component's attributes.
 */
const classAttr = attrs.class || '';

const emit = defineEmits<{
  (e: 'arrowClick', payload: CdrFilmstripArrowClickPayload): void;
  (e: 'scrollNavigate', payload: CdrFilmstripScrollPayload): void;
  (e: 'ariaMessage', message: string): void;
}>();

// Live region message for screen readers
const ariaMessage = ref('');

// Surface scroll reference
const surfaceScrollRef = ref<typeof CdrSurfaceScroll | null>(null);

// Filmstrip container reference element
const containerRef = ref<HTMLElement | null>(null);

// Scrollable viewport reference - computed to access the exposed viewportRef
const viewportRef = computed(() => surfaceScrollRef.value?.viewportRef);

// List of frame elements (each frame rendered as an <li>)
const framesItemsRef = ref<Array<HTMLElement> | null>(null);

// Width of the filmstrip container in pixels
const containerWidth = ref(0);

// Current visible frame index in the filmstrip
const currentIndex = ref(0);

// Currently focused frame index for keyboard navigation
const focusIndex = ref(0);

// Reactive state to determine if the container is hovered
const isContainerHovered = useElementHover(containerRef);

// Flag to track if scroll is programmatic to avoid emitting events unnecessarily
const isProgrammaticScroll = ref(false);

/**
 * Calculates the width of each frame based on the container's width,
 * the gap between frames, and any extra width defined.
 *
 * @returns {number} The computed width for a single frame in pixels.
 */
const frameWidth = computed(() => {
  const totalGaps = props.framesToShow * props.framesGap;
  const availableWidth = containerWidth.value - totalGaps;
  return availableWidth / (props.framesToShow + props.frameExtra);
});

/**
 * Generates an object of CSS variables that can be applied to the filmstrip.
 * These variables control the gap between frames, the width of each frame,
 * and any additional width to be added.
 *
 * @returns {Record<string, number|string>} An object mapping CSS variable names to values.
 */
const computedCSSVars = computed(() => ({
  '--frames-gap': props.framesGap,
  '--frame-width': frameWidth.value,
  '--frame-extra': props.frameExtra,
}));

/**
 * Generates properties and state information for navigation arrows (left/right).
 * Determines whether each arrow should be enabled based on the current frame index.
 *
 * @returns {CdrFilmstripArrow[]} Array of arrow configuration objects containing
 * direction, icon, and accessibility attributes.
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
        class: [
          mapClasses(
            classObj,
            `${BASE_CLASS}__arrow`,
            `${BASE_CLASS}__arrow--${direction}`,
            isEnabled ? '' : `${BASE_CLASS}__arrow--disabled`,
          ),
          classAttr ? `${classAttr}__arrow` : null,
          classAttr ? `${classAttr}__arrow--${direction}` : null,
          isEnabled ? '' : classAttr && `${BASE_CLASS}__arrow--disabled`,
        ]
          .filter(Boolean)
          .join(' '),
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
 * Calculates the horizontal scroll position (in pixels) for a given frame index.
 *
 * @param {number} index - The target frame index to scroll to.
 * @returns {number} The calculated scroll position in pixels.
 */
const calculateScrollPosition = (index: number): number => {
  const framesOffset = frameWidth.value * index;
  const gapsOffset = props.framesGap * index;
  return framesOffset + gapsOffset;
};

/**
 * Smoothly scrolls the viewport to display the frame at the specified index.
 *
 * @param {number} newIndex - The target frame index to scroll into view.
 */
const scrollToIndex = (newIndex: number): void => {
  const newLeft = calculateScrollPosition(newIndex);
  const currentLeft = viewportRef.value?.viewportElement.scrollLeft ?? 0;
  viewportRef.value?.viewportElement.scrollBy({
    left: newLeft - currentLeft,
    behavior: 'smooth',
  });
};

/**
 * Handles clicks on the navigation arrows. It calculates the new frame index
 * based on the direction clicked, updates the current index, scrolls the viewport,
 * and emits an 'arrowClick' event with the relevant payload.
 *
 * @param {Event} event - The click event triggered by the arrow.
 * @param {'left' | 'right'} direction - The direction of the arrow clicked.
 */
const onArrowClick = (event: Event, direction: 'left' | 'right'): void => {
  const arrowClickPayload: CdrFilmstripArrowClickPayload = { event, direction };
  emit('arrowClick', arrowClickPayload);
  const delta = direction === 'left' ? -props.framesToScroll : props.framesToScroll;
  const proposedIndex = currentIndex.value + delta;

  currentIndex.value = Math.max(0, Math.min(proposedIndex, props.frames.length - 1));
  isProgrammaticScroll.value = true;
  scrollToIndex(currentIndex.value);
};

/**
 * Announces the currently visible frames for accessibility purposes.
 * This debounced function generates a message that indicates which frames are
 * visible and emits an 'ariaMessage' event to update screen reader users.
 *
 * @returns {void}
 */
const announceFrames = useDebounceFn((): void => {
  const totalFrames = props.frames.length;
  const start = Math.max(1, currentIndex.value + 1);
  const end = Math.min(totalFrames, start + props.framesToShow - 1);

  ariaMessage.value =
    props.framesToShow === 1
      ? `Now showing frame ${start} of ${totalFrames}`
      : `Now showing frames ${start} through ${end} of ${totalFrames}`;

  emit('ariaMessage', ariaMessage.value);
}, 300);

/**
 * Handles the focusin event on the filmstrip container.
 * When focus enters the filmstrip (and not from within an already focused child),
 * this function emits an initial accessibility message indicating the visible frames
 * and instructs the user on navigation.
 *
 * @param {FocusEvent} e - The focus event object.
 */
const handleFocusIn = (e: FocusEvent): void => {
  const currentTarget = e.currentTarget as HTMLElement;

  if (
    !currentTarget ||
    !e.relatedTarget ||
    !currentTarget.contains(e.relatedTarget as HTMLElement)
  ) {
    const totalFrames = props.frames.length;
    const start = Math.max(1, currentIndex.value + 1);
    const end = Math.min(totalFrames, start + props.framesToShow - 1);

    if (props.framesToShow === 1) {
      ariaMessage.value =
        `Showing frame ${start} of ${totalFrames}. ` + `Use left and right arrow keys to navigate.`;
    } else {
      ariaMessage.value =
        `Showing frames ${start} through ${end} of ${totalFrames}. ` +
        `Use left and right arrow keys to navigate.`;
    }

    emit('ariaMessage', ariaMessage.value);
  }
};

/**
 * Handles left and right arrow key presses on the filmstrip container
 * to focus on the previous or next frame. This function is used
 * to implement keyboard navigation for the filmstrip.
 * @param {Event} e - The keyboard event object.
 * @param {string} direction - The direction of the arrow key press ('left' or 'right').
 */
function onShiftFocus(e: Event, direction: string): void {
  e.preventDefault();

  isProgrammaticScroll.value = true;

  if (direction === 'left') {
    focusIndex.value = focusIndex.value <= 0 ? props.frames.length - 1 : focusIndex.value - 1;
  } else {
    focusIndex.value = focusIndex.value >= props.frames.length - 1 ? 0 : focusIndex.value + 1;
  }

  if (framesItemsRef.value) {
    const liEl = framesItemsRef.value[focusIndex.value];
    const focusEl = liEl.querySelector(props.focusSelector) as HTMLElement;

    if (focusEl) {
      focusEl.focus();
    }
  }
}

/**
 * Debounced scroll handler that updates the current frame index based on the viewport's scroll position.
 * It determines the nearest frame index to the current scroll position, updates the internal state,
 * and triggers an accessibility announcement if the index has changed.
 *
 * @param {Event} e - The scroll event object from the viewport.
 */
const debouncedHandleScroll = useDebounceFn((e: Event): void => {
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

  if (!isProgrammaticScroll.value) {
    emit('scrollNavigate', {
      event: e,
      index: currentIndex.value,
    });
  }
  isProgrammaticScroll.value = false;
}, 100);

onMounted(() => {
  // Listen for scroll events on the viewport and handle them using the debounced scroll handler.
  useEventListener(viewportRef.value?.viewportElement, 'scroll', debouncedHandleScroll);

  // Initialize a resize observer to update the container width dynamically.
  const { stop } = useResizeObserver(containerRef, (entries) => {
    entries.forEach((entry) => {
      containerWidth.value = entry.contentRect.width;
    });
  });
  onUnmounted(() => {
    // Clean up the resize observer when the component is unmounted.
    stop();
  });
  // Set the initial container width.
  containerWidth.value = containerRef.value?.offsetWidth ?? 0;
});
</script>

<style lang="scss" module src="./styles/CdrFilmstrip.module.scss"></style>
