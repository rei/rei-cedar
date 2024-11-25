<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrSubheadingSans from '../text/presets/CdrSubheadingSans.vue';

/** Header component with icon slot for fulfillment tile */

defineOptions({ name: 'CdrFulfillmentTileHeader' });

const style = useCssModule();
</script>

<template>
  <div :class="[style['cdr-fulfillment-tile-header']]">
    <span
      v-if="$slots['icon-left']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <!-- @slot Place an icon to the left of the header content -->
      <slot name="icon-left" />
    </span>
    <CdrSubheadingSans
      :strong="true"
      scale="-1"
      tag="span"
      :class="style['cdr-fulfillment-tile-header__label']"
    >
      <!-- @slot Header content that is still visible during loading. -->
      <slot name="header" />
    </CdrSubheadingSans>
    <span
      v-if="$slots['icon-right']"
      :class="style['cdr-fulfillment-tile-header__icon']"
    >
      <!-- @slot Place an icon to the right of the header content -->
      <slot name="icon-right" />
    </span>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileHeader.module.scss"></style>
