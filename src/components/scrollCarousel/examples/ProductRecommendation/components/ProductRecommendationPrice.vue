<template>
  <CdrText class="product-recommendation__price">
    <span>
      <!-- Handle price range -->
      <span v-if="isRange">
        <span class="sr-only">Prices range from</span>
        <span :class="getSalePriceClass(formatted.min)">{{ formatted.min }}</span>
        <span class="sr-only">to</span>
        <span aria-hidden="true">&ndash;</span>
        <span>{{ formatted.max }}</span>
      </span>

      <!-- Handle single price -->
      <span v-else>
        <span :class="getSalePriceClass(formatted.base)">{{ formatted.base }}</span>
      </span>
    </span>

    <!-- Compare price -->
    <span
      v-if="formatted.compare"
      class="product-recommendation__price--compare"
    >
      <span class="sr-only">compared to</span>
      {{ formatted.compare }}
    </span>
  </CdrText>
</template>

<script setup lang="ts">
import { CdrText } from '../../../../../lib';
import type { Price } from '..';
import { computed } from 'vue';

const props = defineProps<Price>();

// Currency formatter
const formatPrice = (price?: number) =>
  price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
    : '';

// Determine if price is on sale (e.g., ends in .3 or .9)
const hasSalePricing = (price: string) => price?.endsWith('3') || price?.endsWith('9');

// Computed formatted prices
const formatted = computed(() => ({
  base: formatPrice(props.base),
  min: formatPrice(props.min),
  max: formatPrice(props.max),
  compare: formatPrice(props.compare),
}));

// Check if this is a price range
const isRange = computed(() => props.min !== undefined && props.max !== undefined);

// Get sale price class
const getSalePriceClass = (price: string) =>
  hasSalePricing(price) ? 'product-recommendation__price--sale' : '';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.product-recommendation__price {
  @include cdr-text-utility-sans-200;

  &--sale {
    color: $cdr-color-text-sale;
  }

  &--compare {
    text-decoration: line-through;
    margin-inline-start: 1ch;
  }
}

.sr-only {
  @include cdr-display-sr-only;
}
</style>
