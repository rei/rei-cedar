<template>
  <CdrLink
    class="product-recommendation"
    :href="href"
    @click.once.prevent="onSlideClick"
  >
    <div class="product-recommendation__image-container">
      <CdrImg
        :src="imageSrc"
        :alt="formattedTitle"
        fit="contain"
        ratio="1/1"
        class="product-recommendation__image"
        loading="lazy"
      />
    </div>
    <div class="product-recommendation__details">
      <CdrText
        class="product-recommendation__brand"
        tag="span"
      >
        {{ brand }}
      </CdrText>
      <CdrText
        class="product-recommendation__name"
        tag="span"
      >
        {{ formattedTitle }}
      </CdrText>
      <CdrRating
        v-if="rating"
        :compact="true"
        :rating="rating.average"
        :count="rating.count"
        size="small"
        class="product-recommendation__rating-stars"
      />
      <ProductRecommendationPrice v-bind="price" />
    </div>
  </CdrLink>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { CdrRating, CdrImg, CdrText, CdrLink } from '../../../../../lib';
import ProductRecommendationPrice from './ProductRecommendationPrice.vue';
import type { ProductRecommendationSlide, ProductRecommendationSlideClickPayload } from '..';

import type { CdrScrollCarouselEventEmitter } from '../../../interfaces';
import { CdrScrollCarouselEventKey } from '../../../../../types/symbols';

const props = defineProps<ProductRecommendationSlide>();

const formattedTitle = computed(() => props.name?.replace('&quot;', '"'));
const imageSrc = computed(() => `https://rei.com/media/product/${props.id}?size=300`);

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
  } as ProductRecommendationSlideClickPayload);
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.product-recommendation {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  outline: none;
  padding: $cdr-space-half-x;
  border-radius: $cdr-radius-softer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px $cdr-space-eighth-x #2e2e2b;
  }

  &:hover .product-recommendation__name {
    text-decoration: underline;
  }

  &__brand,
  &__name {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
  }

  &__brand {
    line-clamp: 1;
    -webkit-line-clamp: 1;
    font-weight: 500;
  }

  &__name {
    line-clamp: 2;
    -webkit-line-clamp: 2;
  }

  &__image-container {
    background-color: #fbfaf9;
    border-radius: $cdr-radius-softer;
    margin-bottom: $cdr-space-three-quarter-x;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  &__image {
    width: 100%;
    max-height: var(--product-recommendation-size, 168px);
    max-width: var(--product-recommendation-size, 168px);
    mix-blend-mode: multiply;
    padding: $cdr-space-inset-three-quarter-x;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $cdr-space-half-x;
    padding-right: $cdr-space-one-and-a-half-x;
  }

  &__rating-stars {
    margin-left: -3px;
  }
}
</style>
