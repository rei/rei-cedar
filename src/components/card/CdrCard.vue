<script setup lang="ts">
import { useCssModule } from 'vue';
/** Related, interactive containers linking to a single subject or destination */

defineOptions({
  name: 'CdrCard',
});

defineProps({
  /** Sets valid HTML container element tag. */
  tag: {
    type: String,
    default: 'article',
  },
});

const style = useCssModule();
const baseClass = 'cdr-card';

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
