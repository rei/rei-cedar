<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { StatusType } from '../../types/other';

/** Provides stylized icons for typical notifications */

defineOptions({ name: 'CdrFulfillmentTileIcon' });

export interface CdrFulfillmentTileIconProps {
  type?: StatusType;
}

const props = withDefaults(defineProps<CdrFulfillmentTileIconProps>(), {
  type: 'default',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-icon';
const typeClass = computed(() => `${baseClass}--${props.type}`);
</script>

<template>
  <span :class="[style[baseClass], style[typeClass]]">
    <slot />
  </span>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileIcon.module.scss"></style>
