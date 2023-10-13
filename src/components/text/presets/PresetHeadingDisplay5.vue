<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrText from '../CdrText.vue'

const baseClass = 'cdr-heading-display-5';
const style = useCssModule();
</script>

<template>
  <CdrText :class="style[baseClass]">
    <slot />
  </CdrText>
</template>

<style module lang="scss">
@import "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss";
:root {
  --cdr-type-scale--1: clamp(1.28rem, 0.24cqw + 1.2rem, 1.5rem);
  --cdr-type-scale-0: clamp(1.6rem, 0.44cqw + 1.46rem, 2rem);
  --cdr-type-scale-1: clamp(2rem, 0.73cwq + 1.77rem, 2.67rem);
  --cdr-type-scale-2: clamp(2.5rem, 1.16cqw + 2.13rem, 3.55rem);
  --cdr-type-scale-3: clamp(3.13rem, 1.77cqw + 2.56rem, 4.74rem);
  --cdr-type-scale-4: clamp(3.91rem, 2.64cqw + 3.06rem, 6.31rem);
  --cdr-type-scale-5: clamp(4.88rem, 3.88cqw + 3.64rem, 8.42rem);

  --cdr-line-height-scale: 1.07
}
.cdr-heading-display-5 {
  @include cdr-text-heading-display-1600;
  font-size: var(--cdr-type-scale-5);
  line-height: calc(var(--cdr-type-scale-5) * var(--cdr-line-height-scale));
}
</style>  