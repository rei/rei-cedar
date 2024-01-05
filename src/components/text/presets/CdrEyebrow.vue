<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrEyebrow',
});


const baseClass = 'cdr-eyebrow';
const style = useCssModule();
</script>

<template>
  <CdrText
    :class="style[baseClass]"
  >
    <slot />
  </CdrText>


</template>

<style module lang="scss">
@import "./styles/CdrPresets.module.scss";
@import "../../../styles/fluid.css";


.cdr-eyebrow {
  @include cdr-text-base-mixin;
  @include cdr-text-eyebrow-100;
  font-size: var(--cdr-type-scale--1);
  line-height: var(--cdr-eyebrow-line-height-ratio);
}
</style>  