<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrBody, { type bodyTextProps } from '../text/presets/CdrBody.vue';

/** Content component for fulfillment tile */

defineOptions({ name: 'CdrFulfillmentTileContent' });

interface CdrFulfillmentTileContentProps {
  stretch?: boolean;
  scale?: bodyTextProps['scale'];
}

const props = withDefaults(defineProps<CdrFulfillmentTileContentProps>(), {
  stretch: false,
  scale: '-2',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-content';

const rootProps = computed((): bodyTextProps => ({
  tag: 'div',
  scale: props.scale,
  class: {
    [style[baseClass]]: true,
    [style[`${baseClass}--stretch`]]: props.stretch,
  },
}));
</script>

<template>
  <CdrBody v-bind="rootProps">
    <slot />
  </CdrBody>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileContent.module.scss"></style>
