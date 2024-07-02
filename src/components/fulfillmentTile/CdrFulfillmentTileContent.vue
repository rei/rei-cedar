<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrUtilitySans, { type utilitySansTextProps } from '../text/presets/CdrUtilitySans.vue';

/** Content component for fulfillment tile */

defineOptions({ name: 'CdrFulfillmentTileContent' });

interface CdrFulfillmentTileContentProps {
  stretch?: boolean;
}

const props = withDefaults(defineProps<CdrFulfillmentTileContentProps>(), {
  stretch: false,
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-content';

const rootProps = computed<utilitySansTextProps>(() => ({
  tag: 'div',
  scale: '-1',
  class: {
    [style[baseClass]]: true,
    [style[`${baseClass}--stretch`]]: props.stretch,
  },
}));
</script>

<template>
  <CdrUtilitySans v-bind="rootProps">
    <slot />
  </CdrUtilitySans>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileContent.module.scss"></style>
