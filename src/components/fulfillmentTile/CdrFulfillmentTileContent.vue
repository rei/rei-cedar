<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrBody, { type bodyTextProps } from '../text/presets/CdrBody.vue';
import { fulfillmentTileContent } from '../../types/interfaces';

/** Content component with scale option for fulfillment tile */

defineOptions({ name: 'CdrFulfillmentTileContent' });

const props = withDefaults(defineProps<fulfillmentTileContent>(), {
  scale: '-2',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-content';

const rootProps = computed(
  (): bodyTextProps => ({
    tag: 'div',
    scale: props.scale,
  }),
);
</script>

<template>
  <CdrBody
    v-bind="rootProps"
    :class="[style[baseClass]]"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </CdrBody>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileContent.module.scss"></style>
