<template>
  <CdrFilmstrip
    class="product-recommendation-filmstrip"
    :model="ProductRecommendationModelData"
    :adapter="ProductRecommendationAdapter"
    @frameClick="onFrameClick"
    @arrowClick="onArrowClick"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import type { ProductRecommendation } from './index';
import ProductRecommendationModel from './mock.json';

const ProductRecommendationModelData = ProductRecommendationModel as ProductRecommendation;
import { onFrameClick, onArrowClick } from './handlers';
import ProductRecommendationAdapter from './adapter';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.product-recommendation-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
