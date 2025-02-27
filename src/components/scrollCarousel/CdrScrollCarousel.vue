<template>
  <div
    v-if="hasCarouselSlides"
    ref="CdrScrollCarouselContainer"
    v-bind="dataAttributes"
  >
    <slot name="heading" />
    <CdrBaseCarousel
      :id="carouselId"
      :description="description"
      :slides="slides"
      :slides-gap="slidesGap"
      :slides-to-show="slidesToShow"
      :slides-to-scroll="slidesToScroll"
      :focus-selector="focusSelector"
      @arrow-click="onArrowClick"
    >
      <template #slide="{ ...slideProps }: Record<string, unknown>">
        <component
          :is="carouselConfig.component"
          v-bind="slideProps"
        />
      </template>
    </CdrBaseCarousel>
  </div>
</template>

<script setup lang="ts">
import CdrBaseCarousel from './CdrBaseCarousel.vue';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import type {
  CdrBaseCarouselSlide,
  CdrBaseCarouselArrowClickPayload,
  CdrScrollCarouselResizePayload,
  CdrScrollCarouselEventEmitter,
  CdrScrollCarouselConfig,
  CdrScrollCarousel,
} from './interfaces';
// import { CdrScrollCarouselEventKey } from './injection-key';
import { computed, h, provide, ref, useId, watch } from 'vue';
import { CdrScrollCarouselEventKey } from '../../types/symbols';
defineOptions({ name: 'CdrScrollCarousel' });

/**
 * Emits an event with a specified name and optional payload.
 */
const emit = defineEmits<{
  (e: 'arrowClick', payload: CdrBaseCarouselArrowClickPayload): void;
  (e: 'resize', payload: CdrScrollCarouselResizePayload): void;
  (e: string, payload?: unknown): void;
}>();

/**
 * Provides a centralized event emitter function for the carousel and its slides.
 */
const emitEvent: CdrScrollCarouselEventEmitter = (eventName, payload) => {
  emit(eventName, payload);
};

/**
 * Provides the event emitter function to child components.
 */
provide(CdrScrollCarouselEventKey, emitEvent);

/**
 * Defines the props for the CdrScrollCarousel component.
 */
const props = withDefaults(defineProps<CdrScrollCarousel<unknown>>(), {
  model: () => ({}),
  adapter: () => {
    console.warn(`No adapter provided for CdrScrollCarousel.`);
    const scrollCarouselConfig: CdrScrollCarouselConfig<unknown> = {
      slides: [],
      carouselId: 'empty-carousel',
      component: h('div'),
      description: 'An empty carousel',
    };
    return scrollCarouselConfig;
  },
});

// Reference to the carousel container element.
const CdrScrollCarouselContainer = ref<HTMLElement | null>(null);
const SLIDES_TO_SHOW_DEFAULT = 6;

/**
 * Resolves and transforms the carousel model.
 */
const carouselConfig = computed<CdrScrollCarouselConfig<unknown>>(() => props.adapter(props.model));

/**
 * Number of slides to display at a time.
 */
const slidesToShow = ref<number>(carouselConfig?.value?.slidesToShow ?? SLIDES_TO_SHOW_DEFAULT);

/**
 * Number of slides to scroll at a time.
 */
const slidesToScroll = ref<number>(slidesToShow.value);

/**
 * Extracts slides from the resolved carousel model.
 */
const slides = computed(() => carouselConfig.value.slides as CdrBaseCarouselSlide<never>[]);

/**
 * Checks if the carousel has slides.
 */
const hasCarouselSlides = computed(() => slides.value.length > 0);

/**
 * Retrieves carousel metadata.
 */
const carouselId = computed(() => `${carouselConfig.value.carouselId}-${useId()}`);

/**
 * Retrieves the description for the carousel.
 */
const description = computed(() => carouselConfig.value.description);

/**
 * Retrieves the gap between slides.
 */
const slidesGap = computed(() => carouselConfig?.value?.slidesGap || 0);

/**
 * Determines if the carousel should use the default resize strategy.
 */
const useDefaultResizeStrategy = ref<boolean>(
  typeof carouselConfig?.value?.useDefaultResizeStrategy === 'boolean'
    ? carouselConfig.value.useDefaultResizeStrategy
    : false,
);

/**
 * Retrieves the focus selector for the carousel.
 */
const focusSelector = computed(() => carouselConfig?.value?.focusSelector || ':first-child');

/**
 * Retrieves the data attributes for the carousel.
 */
const dataAttributes = computed(() => carouselConfig.value?.dataAttributes || {});

/**
 * Handles arrow click events.
 */
function onArrowClick({ event, direction }: CdrBaseCarouselArrowClickPayload) {
  const arrowClickPayload: CdrBaseCarouselArrowClickPayload = {
    event,
    direction,
    model: props.model as Record<string, unknown>,
  };
  emit('arrowClick', arrowClickPayload);
}

/**
 * Updates the number of slides dynamically based on screen size.
 * Used only when no `resizeStrategy` is provided in `carouselConfig`.
 */
function defaultResizeStrategy() {
  const screenWidth = window.innerWidth;
  slidesToShow.value = screenWidth >= 1024 ? 5 : screenWidth >= 768 ? 4 : 2;
  slidesToScroll.value = Math.max(slidesToShow.value - 1, 1);
}

/**
 * Handles window resize events.
 */
const onResize = useDebounceFn(() => {
  const resizePayload: CdrScrollCarouselResizePayload = {
    model: props.model as Record<string, unknown>,
    slidesToShow,
    slidesToScroll,
  };
  emit('resize', resizePayload);
  if (useDefaultResizeStrategy.value) {
    defaultResizeStrategy();
  }
}, 25);

/**
 * Sets up the resize observer for the carousel container.
 */
watch(
  () => CdrScrollCarouselContainer.value,
  (el) => {
    if (el) {
      useResizeObserver(el, onResize);
    }
  },
  { immediate: true },
);
</script>
