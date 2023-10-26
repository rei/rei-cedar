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
@import "../../../../public/cdr-fluid-type.css";

.cdr-heading-display-5 {
  @include cdr-text-heading-display-1600;
  font-size: var(--cdr-type-scale-5);
  line-height: calc(var(--cdr-type-scale-5) * var(--cdr-heading-display-line-height-scale));
}
</style>  