<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrSurface from '../surface/CdrSurface.vue';
import type { CdrSurfaceProps } from '../surface/CdrSurface.vue';

/** SurfaceSelection component for buttons that may have a checked state */

defineOptions({ name: 'CdrSurfaceSelection' });

export interface CdrSurfaceSelectionProps extends CdrSurfaceProps {
  type?: 'button' | 'reset' | 'submit' | undefined;
  checked?: boolean;
}

const props = withDefaults(defineProps<CdrSurfaceSelectionProps>(), {
  tag: 'button',
  background: 'transparent',
});

const style = useCssModule();
const baseClass = 'cdr-surface-selection';

// Manages the props passed along to CdrSurface
const computedProps = computed(() => {
  const { checked, ...otherProps } = props;
  const additionalProps: CdrSurfaceSelectionProps = {};

  // Add checked
  if (checked) {
    additionalProps['aria-checked'] = 'true';
  }

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
