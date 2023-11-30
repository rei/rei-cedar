<script setup lang="ts">
import { useCssModule } from 'vue';

defineProps({
    /** Sets the HTML tag (p, span, h1, h2, etc) */
    tag: {
      type: String,
      default: 'h1',
    },
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