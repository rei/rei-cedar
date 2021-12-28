<script setup>
import { useCssModule } from 'vue';

const props = defineProps({
    tag: {
      type: String,
      default: 'article',
    }
})

const baseClass = 'cdr-card';
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

<style lang="scss" module src="./styles/CdrCard.module.scss">
</style>
