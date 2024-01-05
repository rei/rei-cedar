<script setup lang="ts">
import { useCssModule } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrEyebrow',
});


withDefaults(defineProps<baseTextProps>(), {
  tag: 'span',
});

const baseClass = 'cdr-eyebrow';
const style = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style module lang="scss">
@import "./styles/CdrPresets.module.scss";

.cdr-eyebrow {
  @include cdr-text-base-mixin;
  @include cdr-text-eyebrow-100;
  font-size: var(--cdr-type-scale--1);
  line-height: var(--cdr-eyebrow-line-height-ratio);
}
</style>  