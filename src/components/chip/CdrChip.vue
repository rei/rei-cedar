<script>
import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  name: 'CdrChip',
  setup() {
    return {
      style: useCssModule(),
      baseClass: 'cdr-chip',
    };
  },
});
</script>

<template>
  <button
    :class="style[baseClass]"
  >
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-chip__icon-left']"
    >
      <slot name="icon-left" />
    </span>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-chip__icon-right']"
    >
      <slot name="icon-right" />
    </span>
    <span :class="style['cdr-chip__content']">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module src="./styles/CdrChip.module.scss">
</style>
