<script>
import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  name: 'CdrCard',
  props: {
    /**
     * Sets valid HTML container element tag.
     */
    tag: {
      type: String,
      default: 'article',
    },
  },

  setup() {
    return {
      style: useCssModule(),
      baseClass: 'cdr-card',
    };
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <!-- @slot CdrCard content -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrCard.module.scss">
</style>
