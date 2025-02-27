<template>
  <div
    :id="id"
    ref="containerRef"
    :data-ui="dataUi"
    class="cdr-base-carousel"
    @focusin="handleFocusIn"
  >
    <ScrollAreaRoot
      type="auto"
      class="cdr-base-carousel__root"
    >
      <ScrollAreaViewport
        ref="slidesRef"
        class="cdr-base-carousel__viewport"
        :aria-label="description || `${slides.length} items`"
        :tabindex="viewportTabindex"
      >
        <ul
          :id="`${id}-slides`"
          class="cdr-base-carousel__slides"
          data-ui="cdr-base-carousel__slides"
        >
          <li
            v-for="(slide, index) in slides"
            :key="slide.key"
            ref="slidesItemsRef"
            class="cdr-base-carousel__slide"
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
        class="cdr-base-carousel__bar cdr-base-carousel__bar--horizontal"
        orientation="horizontal"
      >
        <ScrollAreaThumb class="cdr-base-carousel__thumb" />
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
import { computed, onMounted, onUnmounted, ref } from 'vue';

defineOptions({ name: 'CdrBaseCarousel' });

const props = withDefaults(defineProps<CdrBaseCarousel>(), {
  id: '',
  slides: () => [],
  description: '',
  dataUi: 'cdr-base-carousel',
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
 * Generates the properties and states for navigation arrows.
 * Calculates whether the left or right arrow should be enabled or disabled based on the current slide index.
 */
const arrows = computed(() => {
  const isAtLeftBoundary = currentIndex.value === 0;
  const isAtRightBoundary = currentIndex.value >= props.slides.length - props.slidesToShow;

  return ['left', 'right'].map((direction) => {
    const isEnabled = direction === 'left' ? !isAtLeftBoundary : !isAtRightBoundary;

    return {
      direction,
      icon: direction === 'left' ? IconCaretLeft : IconCaretRight,
      attributes: {
        'data-ui': `cdr-base-carousel__arrow--${direction}`,
        class: `cdr-base-carousel__arrow cdr-base-carousel__arrow--${direction} ${
          isEnabled ? '' : 'cdr-base-carousel__arrow--disabled'
        }`,
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

<style lang="scss">
// .cdr-base-carousel {
//   &__viewport {
//     width: 100%;
//     height: 100%;
//     scroll-behavior: auto;
//     position: relative;
//     border-radius: $cdr-radius-softer;
//     outline: none;

//     @include cdr-sm-mq-down {
//       padding: 0 $cdr-space-one-x;
//     }

//     @media (prefers-reduced-motion: no-preference) {
//       scroll-behavior: smooth;
//     }
//   }
// }
</style>

<style lang="scss" scoped>
// $prominence-02:
//   5px 12px 4px 0px rgba(75, 74, 72, 0),
//   3px 8px 3px 0px rgba(75, 74, 72, 0.02),
//   2px 4px 3px 0px rgba(75, 74, 72, 0.07),
//   1px 2px 2px 0px rgba(75, 74, 72, 0.12),
//   0px 0px 1px 0px rgba(75, 74, 72, 0.14);
// $prominence-03:
//   30px 37px 13px 0px rgba(75, 74, 72, 0),
//   19px 24px 12px 0px rgba(75, 74, 72, 0.02),
//   11px 13px 10px 0px rgba(75, 74, 72, 0.07),
//   5px 6px 8px 0px rgba(75, 74, 72, 0.12),
//   1px 1px 4px 0px rgba(75, 74, 72, 0.14);

// .cdr-base-carousel {
//   --slides-gap: v-bind(slidesGap);
//   --slide-width: v-bind(slideWidth);
//   --slide-extra: v-bind(slideExtra);
//   position: relative;

//   &__root {
//     width: 100%;
//     height: auto;
//   }

//   &__slides {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//     display: grid;
//     grid-auto-columns: calc(var(--slide-width) * 1px);
//     grid-template-rows: auto;
//     grid-auto-flow: column;
//     gap: calc(var(--slides-gap) * 1px);
//   }

//   &__slide {
//     width: 100%;
//     scroll-snap-align: start;
//   }

//   &__bar {
//     --surface-size: 2.4rem;
//     --track-size: 0.2rem;
//     --control-size: 0.4rem;
//     display: flex;
//     user-select: none;
//     touch-action: none;
//     cursor: grab;
//     position: relative !important;
//     margin-top: $cdr-space-half-x;
//     border-radius: $cdr-radius-round;

//     @include cdr-sm-mq-down {
//       margin-left: $cdr-space-one-x;
//       margin-right: $cdr-space-one-x;
//     }

//     &:active {
//       cursor: grabbing;
//     }

//     &:after {
//       background-color: #e8e0ce;
//     }

//     &--horizontal {
//       flex-direction: column;
//       justify-content: center;
//       height: var(--surface-size);

//       &:after {
//         height: var(--track-size);
//         position: absolute;
//         content: '';
//         width: 100%;
//         top: calc((var(--surface-size) / 2) - (var(--track-size) / 2));
//         left: 0;
//       }

//       .cdr-base-carousel__thumb {
//         --radix-scroll-area-thumb-height: var(--surface-size);
//         height: var(--track-size);

//         &:after {
//           width: 100%;
//           height: var(--track-size);
//         }
//       }
//     }

//     &:hover {
//       .cdr-base-carousel__thumb {
//         &:after {
//           box-shadow: $prominence-03;
//           height: var(--control-size);
//         }
//       }
//     }
//   }

//   &__thumb {
//     position: relative;
//     z-index: 1;
//     display: flex;
//     align-items: center;

//     &:after {
//       content: '';
//       background: #454441;
//       border-radius: $cdr-radius-round;
//     }
//   }

//   &__arrow {
//     #{--cdr-button-with-background-background-color-active}: #eae0cc;
//     #{--cdr-button-with-background-background-color-disabled}: #eeeae2;
//     #{--cdr-button-with-background-background-color-interaction}: #eae0cc;
//     #{--cdr-button-with-background-background-color}: #eae0cc;
//     #{--cdr-button-with-background-box-shadow-active}: #eae0cc;
//     #{--cdr-button-with-background-box-shadow-disabled}: #eeeae2;
//     #{--cdr-button-with-background-box-shadow-interaction}: #eae0cc;
//     #{--cdr-button-with-background-box-shadow}: #eae0cc;
//     #{--cdr-button-with-background-fill-active}: #454441;
//     #{--cdr-button-with-background-fill-disabled}: #b2ab9f;
//     #{--cdr-button-with-background-icon-fill-active}: #454441;
//     #{--cdr-button-with-background-icon-fill-interaction}: #454441;
//     #{--cdr-button-with-background-icon-fill}: #454441;
//     #{--cdr-color-border-button-secondary-active-inset}: #eae0cc;
//     box-shadow: $prominence-02;
//     pointer-events: all;
//     --button-half: #{$cdr-space-one-and-a-half-x};
//     position: absolute;
//     top: var(
//       --cdr-base-carousel-arrow-top,
//       calc(50% - (2 * var(--button-half)) - $cdr-space-half-x)
//     );
//     z-index: 1;

//     &:active,
//     &:focus {
//       box-shadow:
//         inset 0 0 0 $cdr-space-eighth-x #2e2e2b,
//         $prominence-02;
//     }

//     @include cdr-sm-mq-down {
//       display: none;
//     }

//     &--left {
//       left: 0;

//       @include cdr-lg-mq-up {
//         left: calc(var(--button-half) * -1);
//       }
//     }

//     &--right {
//       --extra-slide-width: calc(1px * ((var(--slide-width) * var(--slide-extra))));
//       --half-gap: calc(var(--slides-gap) / 2 * 1px);
//       right: calc(var(--extra-slide-width) + var(--half-gap) - var(--button-half));
//     }

//     &:disabled {
//       filter: none;
//       box-shadow: none;
//     }

//     &:hover:not(:disabled) {
//       box-shadow: $prominence-03;
//     }
//   }

//   &__sr-only {
//     @include cdr-display-sr-only;
//   }
// }
</style>
