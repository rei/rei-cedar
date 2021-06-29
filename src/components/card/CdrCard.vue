<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>
<script>

import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  name: 'CdrCard',
  props: {
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

<style lang="scss" module src="./styles/CdrCard.module.scss">
</style>
