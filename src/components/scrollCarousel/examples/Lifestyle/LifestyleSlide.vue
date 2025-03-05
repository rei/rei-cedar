<template>
  <div
    class="lifestyle-slide"
    :class="[slideStyle, { 'lifestyle-slide--last': lastSlide }]"
  >
    <template v-if="media">
      <BasePicture
        v-if="!isLegacyMedia"
        :images="images as Images"
        class="lifestyle-slide__image"
      />
      <cdr-img
        v-else
        :alt="(media as LegacyMedia).alt"
        :src="(media as LegacyMedia).src"
        class="lifestyle-slide__image"
        loading="lazy"
      />
    </template>

    <template v-if="cta?.text">
      <div
        v-if="isLifestylePortrait"
        class="lifestyle-slide__button-container"
      >
        <cdr-button
          class="lifestyle-slide__cta"
          :href="cta.target"
          tag="a"
          modifier="secondary"
          data-focus
          :size="buttonSize"
          :tabindex="-1"
          @click.once.prevent="onSlideClick"
        >
          {{ cta.text }}
        </cdr-button>
      </div>

      <cdr-link
        v-if="isLifestyleSquare"
        :href="cta.target"
        :tabindex="-1"
        modifier="standalone"
        class="lifestyle-slide__link"
        data-focus
      >
        {{ cta.text }}
      </cdr-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CdrButton, CdrLink, CdrImg } from '../../../../lib';
import BasePicture, { type Images } from './BasePicture.vue';
import type {
  Cta,
  LegacyMedia,
  LifestyleSlideClickPayload,
  LifestyleSlideExtended,
  Media,
} from '.';
import type { CdrScrollCarouselEventEmitter } from '../../interfaces';
import { CdrScrollCarouselEventKey } from '../../../../types/symbols';
import { computed, inject } from 'vue';

/**
 * Type Guard to check if `media` is of type `Media`.
 */
const isMedia = (media: Media | LegacyMedia): media is Media => {
  return 'images' in media;
};

/**
 * Props for the LifestyleSlide component.
 */
const props = withDefaults(defineProps<LifestyleSlideExtended>(), {
  cta: () => ({}) as Cta,
  media: () => ({}) as Media | LegacyMedia,
  slideStyle: 'lifestyle-portrait',
  lastSlide: false,
});

/**
 * Determines if the slide style is a lifestyle portrait (large or small).
 */
const isLifestylePortrait = computed(() => props.slideStyle.startsWith('lifestyle-portrait'));

/**
 * Determines if the slide style is a lifestyle square.
 */
const isLifestyleSquare = computed(() => props.slideStyle === 'lifestyle-square');

/**
 * Checks if the media format is legacy (non-responsive image format).
 */
const isLegacyMedia = computed(() => !isMedia(props.media));

/**
 * Determines the button size based on slide style.
 */
const buttonSize = computed(() =>
  props.slideStyle === 'lifestyle-portrait-sm' ? 'small@xs small@sm small@md' : 'medium',
);

/**
 * Computes the images object from the media object.
 */
const images = computed(() => (props.media as Media).images);

const emitEvent = inject(CdrScrollCarouselEventKey) as CdrScrollCarouselEventEmitter;

/**
 * Handles the click event on a slide, emitting a 'slideClick' event with the event details and the slide item.
 *
 * @param {Event} event - The click event that triggered this function.
 * @return {void}
 */
const onSlideClick = (event: Event) => {
  emitEvent?.('slideClick', {
    event,
    item: props,
  } as LifestyleSlideClickPayload);
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.lifestyle-slide {
  position: relative;

  &.lifestyle-portrait,
  &.lifestyle-portrait-sm {
    aspect-ratio: 3 / 4;
    border-radius: 8px;
    overflow: hidden;

    :deep(.base-picture__image) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.lifestyle-portrait-sm {
    .lifestyle-slide__button-container {
      padding: $cdr-space-three-quarter-x;

      @include cdr-lg-mq-up {
        padding: $cdr-space-one-x;
      }
    }
  }

  &.lifestyle-square {
    border-radius: 4px;

    .lifestyle-slide__image,
    .base-picture {
      display: block;
      aspect-ratio: 1;
      border-radius: 4px;
    }

    img {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1;
      border-radius: 4px;
    }
  }

  &.lifestyle-slide--last {
    margin-right: 0;
  }

  &__button-container {
    position: absolute;
    display: flex;
    align-items: flex-end;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: $cdr-space-one-x;
    background: transparent;

    @include cdr-md-mq-up {
      padding: $cdr-space-one-and-a-half-x;
    }
  }

  &__cta {
    height: fit-content;
  }

  &__cta::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    z-index: 1;
  }

  &__link {
    @include cdr-text-heading-sans-400;
    color: $cdr-color-text-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    width: 100%;

    &:hover,
    &:focus,
    &:active {
      color: $cdr-color-text-primary;

      & ~ .filmstrip-carousel__slide-inner {
        box-shadow: inset 0 0 80px #ece6db;

        img {
          transform: scale(1.07);
        }
      }
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: transparent;
      z-index: 1;
    }
  }
}
</style>
