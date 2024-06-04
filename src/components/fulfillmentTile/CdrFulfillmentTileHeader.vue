<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrUtilitySans from '../text/presets/CdrUtilitySans.vue';

/** Fulfillment tile header component */

defineOptions({ name: 'CdrFulfillmentTileHeader' });

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
      scale="-1"
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
