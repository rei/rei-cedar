<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrSubheadingSans from '../text/presets/CdrSubheadingSans.vue';
import CdrFulfillmentTileLayout from './CdrFulfillmentTileLayout.vue';

/** Fulfillment tile header component */

defineOptions({ name: 'CdrFulfillmentTileHeader' });

const style = useCssModule();
</script>

<template>
  <CdrFulfillmentTileLayout
    orientation="horizontal"
    :class="style['cdr-fulfillment-tile-header']"
  >
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
