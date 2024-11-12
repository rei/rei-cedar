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

<style module src="./styles/CdrEyebrow.module.scss" lang="scss">
</style>  