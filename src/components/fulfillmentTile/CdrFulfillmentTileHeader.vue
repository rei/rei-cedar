<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrUtilitySans from '../text/presets/CdrUtilitySans.vue';

/** Tile header component */

defineOptions({ name: 'CdrFulfillmentTileHeader' });

export interface CdrFulfillmentTileHeaderProps {
  typeScale?: '-1' | '0' | '1' | '2' | '3';
}

withDefaults(defineProps<CdrFulfillmentTileHeaderProps>(), {
  typeScale: '0',
});

const style = useCssModule();
</script>

<template>
  <div :class="style['cdr-fulfillment-tile-header']">
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <slot name="icon-left" />
    </span>
    <CdrUtilitySans
      :strong="true"
      :scale="typeScale"
      tag="span"
      :class="style['cdr-fulfillment-tile-header__label']"
    >
      <slot name="label" />
    </CdrUtilitySans>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <slot name="icon-right" />
    </span>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileHeader.module.scss"></style>
