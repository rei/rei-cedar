<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrText from '../CdrText.vue'

const baseClass = 'cdr-utility-sans';
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

.cdr-utility-sans {
  @include cdr-text-utility-sans-500;
  font-size: var(--cdr-type-scale-0);
  line-height: calc(var(--cdr-type-scale-1) * var(--cdr-utility-sans-line-height-scale));
}
</style>  