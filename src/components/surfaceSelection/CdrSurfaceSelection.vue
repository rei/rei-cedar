<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { CdrSurfaceSelectionProps, HtmlAttributes } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Component for buttons that have a checked state */

defineOptions({ name: 'CdrSurfaceSelection' });

const props = withDefaults(defineProps<CdrSurfaceSelectionProps>(), {
  tag: 'button',
  modifier: 'primary',
});

const style = useCssModule();

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { checked } = props;
  const { inlineStyles, classes } = getSurfaceProps(props, 'cdr-surface-selection');
  const additionalProps: HtmlAttributes = {};

  // Add checked
  additionalProps['aria-checked'] = checked;

  return {
    ...additionalProps,
    style: inlineStyles,
    class: mapClasses(style, ...classes) || undefined,
  };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurfaceSelection.module.scss"></style>
