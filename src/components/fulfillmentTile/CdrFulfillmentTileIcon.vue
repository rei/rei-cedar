<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { fulfillmentTileIcon } from '../../types/interfaces';

/** Provides stylized icons for typical notifications */

defineOptions({ name: 'CdrFulfillmentTileIcon' });

const props = withDefaults(defineProps<fulfillmentTileIcon>(), {
  type: 'default',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-icon';
const typeClass = computed(() => `${baseClass}--${props.type}`);
</script>

<template>
  <span :class="[style[baseClass], style[typeClass]]">
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </span>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileIcon.module.scss"></style>
