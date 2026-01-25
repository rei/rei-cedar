<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { FulfillmentTileIcon } from '../../types/interfaces';

/**
 * CdrFulfillmentTileIcon - Stylized icon to display a status for fulfillment tile
 *
 * Fulfillment tile icons provide visual indicators for delivery or pickup options.
 * Use these icons to communicate status, availability, or selection state.
 */

defineOptions({ name: 'CdrFulfillmentTileIcon' });

const props = withDefaults(defineProps<FulfillmentTileIcon>(), {
  type: 'default',
});

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-fulfillment-tile-icon';

/** Computed type class for the icon variant */
const typeClass = computed<string>(() => `${baseClass}--${props.type}`);
</script>

<template>
  <span :class="[style[baseClass], style[typeClass]]">
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </span>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileIcon.module.scss" />
