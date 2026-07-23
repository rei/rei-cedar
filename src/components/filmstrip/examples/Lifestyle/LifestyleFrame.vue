<template>
  <div
    class="lifestyle-frame"
    :class="frameStyle"
  >
    <template v-if="media">
      <BasePicture
        v-if="!isLegacyMedia"
        :images="images as Images"
        class="lifestyle-frame__image"
      />
      <cdr-img
        v-else
        :alt="(media as LegacyMedia).alt"
        :src="(media as LegacyMedia).src"
        class="lifestyle-frame__image"
        loading="lazy"
      />
    </template>

    <template v-if="cta?.text">
      <div
        v-if="isLifestylePortrait"
        class="lifestyle-frame__button-container"
      >
        <cdr-button
          class="lifestyle-frame__cta"
          :href="cta.target"
          tag="a"
          modifier="secondary"
          data-focus
          :size="buttonSize"
          :tabindex="-1"
          @click.once.prevent="onFrameClick"
        >
          {{ cta.text }}
        </cdr-button>
      </div>

      <cdr-link
        v-if="isLifestyleSquare"
        :href="cta.target"
        :tabindex="-1"
        modifier="standalone"
        class="lifestyle-frame__link"
        data-focus
      >
        {{ cta.text }}
      </cdr-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CdrButton, CdrLink, CdrImg } from '../../../../lib';
import BasePicture from './BasePicture.vue';
import type {
  Cta,
  Images,
  LegacyMedia,
  LifestyleFrameClickPayload,
  LifestyleFrameExtended,
  Media,
} from '.';
import { CdrFilmstripEventKey } from '../../../../types/symbols';
import { computed, inject } from 'vue';

const isMedia = (media: Media | LegacyMedia): media is Media => 'images' in media;

/** Props produced by the lifestyle adapter for one frame. */
const props = withDefaults(defineProps<LifestyleFrameExtended>(), {
  cta: () => ({}) as Cta,
  media: () => ({}) as Media | LegacyMedia,
  frameStyle: 'lifestyle-portrait',
});

const isLifestylePortrait = computed(() => props.frameStyle.startsWith('lifestyle-portrait'));
const isLifestyleSquare = computed(() => props.frameStyle === 'lifestyle-square');
const isLegacyMedia = computed(() => !isMedia(props.media));
const buttonSize = computed(() =>
  props.frameStyle === 'lifestyle-portrait-sm' ? 'small@xs small@sm small@md' : 'medium',
);
const images = computed(() => (props.media as Media).images);
const emitEvent = inject(CdrFilmstripEventKey);
/** Publishes a frame-specific event without coupling the frame to its wrapper. */
const onFrameClick = (event: Event) => {
  emitEvent?.('frameClick', {
    event,
    item: props,
  } satisfies LifestyleFrameClickPayload);
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.lifestyle-frame {
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
    .lifestyle-frame__button-container {
      padding: $cdr-space-three-quarter-x;

      @include cdr-lg-mq-up {
        padding: $cdr-space-one-x;
      }
    }
  }

  &.lifestyle-square {
    border-radius: 4px;

    .lifestyle-frame__image,
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
