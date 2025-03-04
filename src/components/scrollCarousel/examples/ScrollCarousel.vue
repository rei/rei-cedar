<template>
  <CdrContainer class="showcase">
    <CdrHeadingSerif
      class="showcase__heading"
      tag="h2"
      scale="4"
    >
      Scroll Carousel showcase
    </CdrHeadingSerif>
    <div>
      <CdrSubheadingSans
        class="showcase__subheading"
        tag="h2"
      >
        Lifestyle
      </CdrSubheadingSans>
      <CdrScrollCarousel
        class="showcase__carousel"
        :model="lifestyleModelData"
        :adapter="LifestyleAdapter"
        @slide-click="lifestyleOnSlideClick"
        @arrow-click="lifestyleOnArrowClick"
        @resize="onResize"
      />
    </div>
  </CdrContainer>
</template>

<script setup lang="ts">
import CdrScrollCarousel from '../CdrScrollCarousel.vue';

import type { LifestyleModel } from './Lifestyle/index';

import lifestyleModel from './Lifestyle/mock.json';

// Models
const lifestyleModelData = lifestyleModel as LifestyleModel;

// Handlers
import {
  onSlideClick as lifestyleOnSlideClick,
  onArrowClick as lifestyleOnArrowClick,
  onResize,
} from './Lifestyle/handlers';

// Adapters
import LifestyleAdapter from './Lifestyle/adapter';

import { CdrContainer, CdrHeadingSerif, CdrSubheadingSans } from '../../../lib';
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.showcase {
  &__heading {
    margin-top: $cdr-space-three-x;
    margin-bottom: $cdr-space-one-x;
  }

  &__subheading {
    margin-bottom: $cdr-space-one-x;
  }

  &__carousel {
    & :deep(.scroll-carousel) {
      margin-left: -$cdr-space-one-x;
      margin-right: -$cdr-space-one-x;

      @include cdr-sm-mq-up {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
