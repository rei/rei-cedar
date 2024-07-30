<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { Orientation } from '../../types/other';

/** Component for layout of a surface selection */

defineOptions({ name: 'CdrSurfaceSelectionLayout' });

interface CdrSurfaceSelectionLayoutProps {
  orientation?: Orientation;
}

const props = withDefaults(defineProps<CdrSurfaceSelectionLayoutProps>(), {
  orientation: 'horizontal',
});

const style = useCssModule();
const baseClass = 'cdr-surface-selection-layout';

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

<style lang="scss" module src="./styles/CdrSurfaceSelectionLayout.module.scss"></style>
