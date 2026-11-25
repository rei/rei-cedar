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
import type { ProductRecommendation } from '.';

const ProductRecommendationModelData = ProductRecommendationModel as Partial<ProductRecommendation>;
const announcement = ref('');

/** Connects engine status messages to the example's polite live region. */
const onAriaMessage = (message: unknown) => {
  if (typeof message === 'string') {
    announcement.value = message;
  }
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/foundations/cdr-breakpoint-mixins' as mq;
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/foundations/cdr-display-mixins' as display;

.product-recommendation-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include mq.cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }

  &__announcement {
    @include display.cdr-display-sr-only;
  }
}
</style>
