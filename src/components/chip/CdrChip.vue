<script setup lang="ts">
import { useCssModule } from 'vue';

/** Allows people to make selections, filter content, or trigger actions */
defineOptions({
  name: 'CdrChip',
});

const style = useCssModule();
const baseClass = 'cdr-chip';
</script>

<template>
  <button
    :class="style[baseClass]"
  >
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-chip__icon-left']"
    >
      <!-- @slot Icon to the left of the content -->
      <slot name="icon-left" />
    </span>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-chip__icon-right']"
    >
      <!-- @slot Icon to the right of the content -->
      <slot name="icon-right" />
    </span>
    <span :class="style['cdr-chip__content']">
      <!-- @slot Primary CdrChip content -->
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module src="./styles/CdrChip.module.scss">
</style>
