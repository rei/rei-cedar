<script setup lang="ts">
import { useCssModule } from 'vue';

defineOptions({
  name: 'CdrKicker',
});

const style = useCssModule();
const baseClass = 'cdr-kicker';
</script>

<template>
  <span :class="style[baseClass]">
    <slot />
  </span>
</template>

<style lang="scss" module src="./styles/CdrKicker.module.scss">
</style>
