<template>
  <CdrContainer class="showcase">
    <CdrHeadingSerif
      class="showcase__heading"
      tag="h2"
      scale="4"
    >
      Filmstrip showcase
    </CdrHeadingSerif>
    <div>
      <CdrSubheadingSans
        class="showcase__subheading"
        tag="h2"
      >
        Lifestyle
      </CdrSubheadingSans>
      <LifestyleFilmstrip />
    </div>
    <div>
      <CdrSubheadingSans
        class="showcase__subheading"
        tag="h2"
      >
        Product recommendations
      </CdrSubheadingSans>
      <ProductRecommendationFilmstrip />
    </div>
  </CdrContainer>
</template>

<script setup lang="ts">
import { CdrContainer, CdrHeadingSerif, CdrSubheadingSans } from '../../../lib';
import LifestyleFilmstrip from './Lifestyle/Example.vue';
import ProductRecommendationFilmstrip from './ProductRecommendation/Example.vue';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.showcase {
  div:not(:last-child) {
    margin-bottom: $cdr-space-one-x;
  }

  &__heading {
    margin-top: $cdr-space-three-x;
    margin-bottom: $cdr-space-one-x;
  }

  &__subheading {
    margin-bottom: $cdr-space-one-x;
  }
}
</style>
