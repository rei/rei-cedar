<script setup lang="ts">
import CdrSurfaceNavigation from '../CdrSurfaceNavigation.vue';
import CdrLink from '../../link/CdrLink.vue';
import CdrUtilitySans from '../../text/presets/CdrUtilitySans.vue';
import CdrSubheadingSans from '../../text/presets/CdrSubheadingSans.vue';
import CdrMediaObject from '../../mediaObject/CdrMediaObject.vue';
import CdrImg from '../../image/CdrImg.vue';
import CdrRating from '../../rating/CdrRating.vue';
import type { surface, HtmlAttributes, MediaObject } from '../../../types/interfaces';

import tileImage from '../../../dev/static/tile-image.jpg';

defineOptions({ name: 'Surface' });

export interface Example {
  exampleName: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  label: string;
  title: string;
  price: string;
  ratingProps: {
    rating: number;
    count: number;
    compact: boolean;
    size: string;
  };
  props: surface | HtmlAttributes;
  mediaObjectProps: MediaObject;
}

const boxes: Example[] = [
  {
    exampleName: 'Product Tile',
    image: {
      src: tileImage,
      alt: 'placeholder image',
      width: 150,
      height: 150
    },
    label: 'Arc\'teryx',
    title: 'Beta SL Jacket - Men\'s',
    price: '$299.00',
    props: {
      background: {
        rest: 'primary',
        hover: 'secondary'
      },
      borderColor: {
        rest: 'primary'
      },
      borderStyle: {
        rest: 'solid'
      },
      borderWidth: {
        rest: 'sixteenth-x'
      },
      boxShadow: {
        rest: 'flat',
        hover: 'elevated',
      }
    },
    ratingProps: {
      rating: 4.5,
      count: 100,
      compact: true,
      size: 'small',
    },
    mediaObjectProps: {
      contentPadding: 'one-x',
      mediaPosition: 'top',
    }
  }
];
</script>

<template>
  <div class="example">
    <h2>Surface Navigation</h2>
    <template
      v-for="{ exampleName, label, title, image, props, ratingProps, price, mediaObjectProps } in boxes"
      :key="label"
    >
      <hr class="example__hr" />
      <h3>
        {{ exampleName }}
      </h3>
      <CdrSurfaceNavigation v-bind="props" class="card">
        <CdrMediaObject v-bind="mediaObjectProps">
          <template #media>
            <div class="card__image-wrapper">
              <CdrImg v-bind="image" class="card__image" />
            </div>
          </template>
          <template #content>
            <CdrUtilitySans>{{ label }}</CdrUtilitySans>
            <CdrLink class="card__title">
              <CdrSubheadingSans>{{ title }}</CdrSubheadingSans>
            </CdrLink>
            <CdrRating v-bind="ratingProps" />
            <CdrUtilitySans>{{ price }}</CdrUtilitySans>
          </template>
        </CdrMediaObject>
      </CdrSurfaceNavigation>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}

.card {
  max-width: 250px;

  &:hover {
    .card__title {
      text-decoration: underline;
    }
  }

  &__image-wrapper {
    background-color: $cdr-color-background-secondary;
    padding: $cdr-space-inset-one-x;
  }

  &__image {
    mix-blend-mode: multiply;
    width: 100%;
    height: 150px;
    object-fit: contain;
  }

  &__title {
    appearance: none;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
