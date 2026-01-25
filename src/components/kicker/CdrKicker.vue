<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrKickerProps } from '../../types/interfaces';

/**
 * Content building blocks with pre-defined, fluid styles.
 * Used for small text that appears above larger content.
 */
defineOptions({
  name: 'CdrKicker',
});

withDefaults(defineProps<CdrKickerProps>(), {
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

<style lang="scss" module src="./styles/CdrKicker.module.scss" />
