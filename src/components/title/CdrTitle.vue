<script setup lang="ts">
import { useCssModule } from 'vue';
import { baseTextProps } from '../../types/interfaces';

/** 
 * Content building blocks with pre-defined, fluid styles
 * @preview true
 **/
defineOptions({
  name: 'CdrTitle'
});

withDefaults(defineProps<baseTextProps>(), {
  tag: 'h1',
});

const style = useCssModule();
const baseClass = 'cdr-title';
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrTitle.module.scss" />