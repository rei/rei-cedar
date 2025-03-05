<template>
  <CdrScrollCarousel
    class="lifestyle-scroll-carousel"
    :model="lifestyleModelData"
    :adapter="LifestyleAdapter"
    @slide-click="lifestyleOnSlideClick"
    @arrow-click="lifestyleOnArrowClick"
    @resize="onResize"
  />
</template>

<script setup lang="ts">
import CdrScrollCarousel from '../../CdrScrollCarousel.vue';

import type { LifestyleModel } from './index';

import lifestyleModel from './mock.json';

// Models
const lifestyleModelData = lifestyleModel as LifestyleModel;

// Handlers
import {
  onSlideClick as lifestyleOnSlideClick,
  onArrowClick as lifestyleOnArrowClick,
  onResize,
} from './handlers';

// Adapters
import LifestyleAdapter from './adapter';
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.lifestyle-scroll-carousel {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
