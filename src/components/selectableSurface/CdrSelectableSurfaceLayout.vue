<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { selectableSurfaceLayout } from '../../types/interfaces';

/** Component for layout of a surface selection */

defineOptions({ name: 'CdrSelectableSurfaceLayout' });

const props = withDefaults(defineProps<selectableSurfaceLayout>(), {
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
    <!-- @slot Where all default content should be placed.
      Elements are placed within a flex box. -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrSelectableSurfaceLayout.module.scss"></style>
