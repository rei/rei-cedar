<template>
  <component
    :is="props.tag"
    :class="style['cdr-text']"
  >
    <slot />
  </component>
</template>

<script setup>
import { useCssModule, defineProps } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'p',
  },
});
const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrText.module.scss">
</style>
