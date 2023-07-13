<script setup lang="ts">
import { useCssModule } from 'vue';

/** Text container used for any text element such as paragraphs, headings, and lists */
defineOptions({
  name: 'CdrText',
});

defineProps({
    /** Sets the HTML tag (p, span, h1, h2, etc) */
    tag: {
      type: String,
      default: 'p',
    },
});

const style = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="style['cdr-text']"
  >
    <!-- @slot CdrText content -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrText.module.scss">
</style>
