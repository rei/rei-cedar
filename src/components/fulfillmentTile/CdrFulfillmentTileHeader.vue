<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSubheadingSans from '../text/presets/CdrSubheadingSans.vue';
import CdrFulfillmentTileLayout from './CdrFulfillmentTileLayout.vue';
import type { CdrFulfillmentTileLayoutProps } from './CdrFulfillmentTileLayout.vue';

/** Fulfillment tile header component */

defineOptions({ name: 'CdrFulfillmentTileHeader' });

export interface CdrFulfillmentTileHeaderProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<CdrFulfillmentTileHeaderProps>(), {
  disabled: false,
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-header';

const rootProps = computed(
  (): CdrFulfillmentTileLayoutProps => ({
    orientation: 'horizontal',
    class: {
      [style[baseClass]]: true,
      [style[`${baseClass}--disabled`]]: props.disabled,
    },
  }),
);
</script>

<template>
  <CdrFulfillmentTileLayout v-bind="rootProps">
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <slot name="icon-left" />
    </span>
    <CdrSubheadingSans
      :strong="true"
      scale="-1"
      tag="span"
      :class="style['cdr-fulfillment-tile-header__label']"
    >
      <slot name="label" />
    </CdrSubheadingSans>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <slot name="icon-right" />
    </span>
  </CdrFulfillmentTileLayout>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileHeader.module.scss"></style>
