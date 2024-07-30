<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { Orientation } from '../../types/other';

/** Component for layout of a surface selection */

defineOptions({ name: 'CdrFulfillmentTileLayout' });

interface CdrFulfillmentTileLayoutProps {
  orientation?: Orientation;
}

const props = withDefaults(defineProps<CdrFulfillmentTileLayoutProps>(), {
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
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTileLayout.module.scss"></style>
