<template>
  <CdrContainer class="showcase">
    <CdrText
      class="showcase__heading"
      tag="h2"
    >
      Surface Scroll showcase
    </CdrText>
    <div>
      <CdrText
        class="showcase__subheading"
        tag="h2"
      >
        Basic Card Scroll
      </CdrText>
      <BasicCardScroll />
    </div>
    <div>
      <CdrText
        class="showcase__subheading"
        tag="h2"
      >
        Text Content Scroll
      </CdrText>
      <TextContentScroll />
    </div>
  </CdrContainer>
</template>

<script setup lang="ts">
import { CdrContainer, CdrText } from '../../../lib';
import BasicCardScroll from './BasicCard/Example.vue';
import TextContentScroll from './TextContent/Example.vue';
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