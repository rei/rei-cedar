<script>
import { useCssModule, defineComponent } from 'vue';

export default defineComponent({
  name: 'CdrText',
  props: {
    /** Sets the HTML tag (p, span, h1, h2, etc) */
    tag: {
      type: String,
      default: 'p',
    },
  },
  setup() {
    return {
      style: useCssModule(),
    };
  },
});
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
