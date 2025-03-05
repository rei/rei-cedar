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
      <LifestyleScrollCarousel />
    </div>
    <div>
      <CdrSubheadingSans
        class="showcase__subheading"
        tag="h2"
      >
        Product recommendations
      </CdrSubheadingSans>
      <!-- <LifestyleScrollCarousel /> -->
    </div>
  </CdrContainer>
</template>

<script setup lang="ts">
import { CdrContainer, CdrHeadingSerif, CdrSubheadingSans } from '../../../lib';
import LifestyleScrollCarousel from './Lifestyle/Example.vue';
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
