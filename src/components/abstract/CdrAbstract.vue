<script setup lang="ts">
import { useCssModule } from 'vue';

defineOptions({
  name: 'CdrAbstract',
});

defineProps({
    /** Sets the HTML tag (p, span, h1, h2, etc) */
    tag: {
      type: String,
      default: 'p',
    },
});

const baseClass = 'cdr-abstract';
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

<style lang="scss" module src="./styles/CdrAbstract.module.scss">
</style>
