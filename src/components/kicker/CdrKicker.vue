<script setup lang="ts">
import { useCssModule } from 'vue';
import { baseTextProps } from '../../types/interfaces';

/** 
 * Content building blocks with pre-defined, fluid styles
 * @preview true
 **/
defineOptions({
  name: 'CdrKicker',
});

withDefaults(defineProps<baseTextProps>(), {
  tag: 'span',
});

const style = useCssModule();
const baseClass = 'cdr-kicker';
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrKicker.module.scss">
</style>
