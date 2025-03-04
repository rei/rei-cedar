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
        ref="slidesRef"
        :class="mapClasses(classObj, `${BASE_CLASS}__viewport`)"
        :aria-label="description || `${slides.length} items`"
        :tabindex="viewportTabindex"
      >
        <ul
          :id="`${id}-slides`"
          :class="mapClasses(classObj, `${BASE_CLASS}__slides`)"
          :data-ui="`${BASE_CLASS}__slides`"
        >
          <li
            v-for="(slide, index) in slides"
            :key="slide.key"
            ref="slidesItemsRef"
            :class="mapClasses(classObj, `${BASE_CLASS}__slide`)"
          >
            <slot
              name="slide"
              :index="index"
              v-bind="slide.props"
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
          v-if="true"
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
  CdrBaseCarouselArrowClickPayload,
  CdrBaseCarousel,
  CdrBaseCarouselArrow,
} from './interfaces';
import { computed, onMounted, onUnmounted, ref, useCssModule } from 'vue';

const classObj = useCssModule();
const BASE_CLASS = 'cdr-base-carousel';

defineOptions({ name: 'CdrBaseCarousel' });

const props = withDefaults(defineProps<CdrBaseCarousel>(), {
  id: '',
  slides: () => [],
  description: '',
  dataUi: BASE_CLASS,
  isShowingArrows: true,
  slidesToShow: 5,
  slidesToScroll: 4,
  slidesGap: 0,
  slideExtra: 0.25,
  focusSelector: ':first-child',
  viewportTabindex: '-1',
});

const emit = defineEmits<{
  (e: 'arrowClick', payload: CdrBaseCarouselArrowClickPayload): void;
}>();

const ariaMessage = ref(''); // Live region message for screen readers
const containerRef = ref<HTMLElement | null>(null); // Carousel container
const slidesRef = ref<typeof ScrollAreaViewport | null>(null); // Scrollable viewport
const slidesItemsRef = ref<Array<HTMLElement> | null>(null); // List of slide elements

const containerWidth = ref(0); // Width of the carousel container
const currentIndex = ref(0); // Current visible slide index
const focusIndex = ref(0); // Currently focused slide index
const hasScrolled = ref(false); // Tracks if the carousel has been scrolled
const isContainerHovered = useElementHover(containerRef); // Hover state for the container

/**
 * Calculates the width of each slide based on the container size, gap, and extra width.
 * This is used for determining how much space each slide occupies in the viewport.
 */
const slideWidth = computed(() => {
  const totalGaps = props.slidesToShow * props.slidesGap;
  const availableWidth = containerWidth.value - totalGaps;
  return availableWidth / (props.slidesToShow + props.slideExtra);
});

/**
 * Generates the CSS variables for the scrollable viewport.
 */
const computedCSSVars = computed(() => ({
  '--slides-gap': props.slidesGap,
  '--slide-width': slideWidth.value,
  '--slide-extra': props.slideExtra,
}));

/**
 * Generates the properties and states for navigation arrows.
 * Calculates whether the left or right arrow should be enabled or disabled based on the current slide index.
 */
const arrows = computed(() => {
  const isAtLeftBoundary = currentIndex.value === 0;
  const isAtRightBoundary = currentIndex.value >= props.slides.length - props.slidesToShow;

  return ['left', 'right'].map((direction) => {
    // const isEnabled = direction === 'left' ? !isAtLeftBoundary : !isAtRightBoundary;
    const isEnabled = true;
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
        'aria-label': `${direction === 'right' ? 'Next' : 'Previous'} Slide`,
        'aria-controls': `${props.id}-slides`,
        tabindex: 0,
        size: 'large',
        disabled: !isEnabled,
      },
    } as CdrBaseCarouselArrow;
  });
});

/**
 * Calculates the scroll position for a given slide index.
 * @param index - Index of the slide to scroll to
 * @returns The calculated scroll position in pixels
 */
const calculateScrollPosition = (index: number) => {
  const slidesOffset = slideWidth.value * index;
  const gapsOffset = props.slidesGap * index;
  return slidesOffset + gapsOffset;
};

/**
 * Smoothly scrolls to the specified slide index.
 * @param newIndex - The target slide index
 */
const scrollToIndex = (newIndex: number) => {
  const newLeft = calculateScrollPosition(newIndex);
  const currentLeft = slidesRef.value?.viewportElement.scrollLeft ?? 0;
  slidesRef.value?.viewportElement.scrollBy({
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
  const arrowClickPayload: CdrBaseCarouselArrowClickPayload = { event, direction };
  emit('arrowClick', arrowClickPayload);
  const delta = direction === 'left' ? -props.slidesToScroll : props.slidesToScroll;
  const proposedIndex = currentIndex.value + delta;

  currentIndex.value = Math.max(0, Math.min(proposedIndex, props.slides.length - 1));
  scrollToIndex(currentIndex.value);
};

/**
 * Announces the visible slides for screen readers. The message is debounced to avoid excessive announcements.
 */
const announceSlides = useDebounceFn(() => {
  const start = currentIndex.value + 1;
  const end = Math.min(props.slides.length, start + props.slidesToShow - 1);

  ariaMessage.value =
    props.slidesToShow === 1
      ? `Now showing slide ${start}`
      : `Now showing slides ${start} through ${end}`;
}, 1000);

/**
 * Provides initial accessibility announcement when focus enters the carousel.
 * @param e - The focus event
 */
const handleFocusIn = (e: FocusEvent) => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (!currentTarget.contains(e.relatedTarget as HTMLElement)) {
    ariaMessage.value = `Showing ${props.slides.length} items. Currently on item ${
      currentIndex.value + 1
    }. Use left and right arrow keys to navigate.`;
  }
};

/**
 * Debounced scroll handler that updates the current index based on the scroll position.
 * @param e - The scroll event
 */
const debouncedHandleScroll = useDebounceFn((e: Event) => {
  const scrollLeft = (e.target as HTMLElement).scrollLeft;
  const positions = props.slides.map((_, index) => calculateScrollPosition(index));
  const closestIndex = positions.findIndex(
    (pos) =>
      Math.abs(pos - scrollLeft) ===
      Math.min(...positions.map((pos) => Math.abs(pos - scrollLeft))),
  );

  if (closestIndex !== currentIndex.value) {
    currentIndex.value = closestIndex;
    announceSlides();
  }

  if (!hasScrolled.value) hasScrolled.value = true;
}, 100);

onMounted(() => {
  useEventListener(slidesRef.value?.viewportElement, 'scroll', debouncedHandleScroll);

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

<style lang="scss" module src="./styles/CdrBaseCarousel.module.scss"></style>
