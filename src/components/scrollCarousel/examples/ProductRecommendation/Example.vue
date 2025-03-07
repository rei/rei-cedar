<template>
  <CdrScrollCarousel
    class="product-recommendation-scroll-carousel"
    :model="ProductRecommendationModelData"
    :adapter="ProductRecommendationAdapter"
    @slide-click="onSlideClick"
    @arrow-click="onArrowClick"
  />
</template>

<script setup lang="ts">
import CdrScrollCarousel from '../../CdrScrollCarousel.vue';
import type { ProductRecommendation } from './index';
import ProductRecommendationModel from './mock.json';

const ProductRecommendationModelData = ProductRecommendationModel as ProductRecommendation;
import { onSlideClick, onArrowClick } from './handlers';
import ProductRecommendationAdapter from './adapter';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.product-recommendation-scroll-carousel {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
