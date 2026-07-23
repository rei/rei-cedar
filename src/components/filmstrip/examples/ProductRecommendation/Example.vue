<template>
  <CdrFilmstrip
    class="product-recommendation-filmstrip"
    :model="ProductRecommendationModelData"
    :adapter="ProductRecommendationAdapter"
    @frame-click="onFrameClick"
    @arrow-click="onArrowClick"
    @aria-message="onAriaMessage"
    @scroll-navigate="onScrollNavigate"
  />
  <p
    class="product-recommendation-filmstrip__announcement"
    aria-live="polite"
    aria-atomic="true"
  >
    {{ announcement }}
  </p>
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import ProductRecommendationModel from './mock.json';
import { ref } from 'vue';
import { onFrameClick, onArrowClick, onScrollNavigate } from './handlers';
import ProductRecommendationAdapter from './adapter';

const ProductRecommendationModelData = ProductRecommendationModel as Record<string, unknown>;
const announcement = ref('');

const onAriaMessage = (message: unknown) => {
  if (typeof message === 'string') {
    announcement.value = message;
  }
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.product-recommendation-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }

  &__announcement {
    @include cdr-display-sr-only;
  }
}
</style>
