<template>
  <CdrScrollCarousel
    class="lifestyle-scroll-carousel"
    :model="lifestyleModelData"
    :adapter="LifestyleAdapter"
    @slide-click="onSlideClick"
    @arrow-click="onArrowClick"
    @resize="onResize"
  />
</template>

<script setup lang="ts">
import CdrScrollCarousel from '../../CdrScrollCarousel.vue';
import type { Lifestyle } from './index';
import lifestyleModel from './mock.json';

const lifestyleModelData = lifestyleModel as Lifestyle;
import { onSlideClick, onArrowClick, onResize } from './handlers';
import LifestyleAdapter from './adapter';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.lifestyle-scroll-carousel {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
