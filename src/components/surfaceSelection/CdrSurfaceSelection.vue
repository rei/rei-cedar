<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrSurface from '../surface/CdrSurface.vue';
import { CdrSurfaceSelectionProps, HtmlAttributes } from '../../types/interfaces';

/** Component for buttons that may have a checked state */

defineOptions({ name: 'CdrSurfaceSelection' });

const props = withDefaults(defineProps<CdrSurfaceSelectionProps>(), {
  tag: 'button',
  background: 'transparent',
});

const style = useCssModule();
const baseClass = 'cdr-surface-selection';

// Manages the props passed along to CdrSurface
const computedProps = computed(() => {
  const { checked, ...otherProps } = props;
  const additionalProps: HtmlAttributes = {};

  // Add checked
  additionalProps['aria-checked'] = checked;

  return {
    ...otherProps,
    ...additionalProps,
    class: mapClasses(style, baseClass),
  };
});
</script>

<template>
  <CdrSurface v-bind="computedProps">
    <slot />
  </CdrSurface>
</template>

<style lang="scss" module src="./styles/CdrSurfaceSelection.module.scss"></style>
