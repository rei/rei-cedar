<script setup lang="ts">
import { useCssModule } from 'vue';

defineOptions({
  name: 'CdrBox',
});

defineProps({
  /** Sets valid HTML container element tag. */
  tag: {
    type: String,
    default: 'div',
  },
});

const baseClass = 'cdr-box';
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

<style lang="scss" module src="./styles/CdrBox.scss">
</style>
