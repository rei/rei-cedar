<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelectionLayout } from '../../types/interfaces';

/** Configurable layout for fulfillment tile */

defineOptions({ name: 'CdrFulfillmentTileLayout' });

const props = withDefaults(defineProps<surfaceSelectionLayout>(), {
  orientation: 'horizontal',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-layout';

// Manages the props passed along to root
const rootProps = computed(() => {
  const { orientation } = props;
  const classes = [baseClass];

  // Add orientation
  classes.push(`${baseClass}--${orientation}`);

  return { class: mapClasses(style, ...classes) };
});
</script>

<template>
  <div v-bind="rootProps">
    <!-- @slot Place elements in the default slot. -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileLayout.module.scss"></style>
