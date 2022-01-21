<script setup>
import { useCssModule, useSlots } from 'vue';

const slots = useSlots();
const baseClass = 'cdr-chip';
const style = useCssModule();
const hasIconLeft = slots['icon-left'];
const hasIconRight = slots['icon-right'];
</script>

<template>
  <button
    :class="style[baseClass]"
  >
    <span
      v-if="hasIconLeft"
      :class="style['cdr-chip__icon-left']"
    >
      <slot name="icon-left" />
    </span>
    <span
      v-if="hasIconRight"
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
