<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import mapClasses from '../../utils/mapClasses';
import CdrHeadlessButton from '../headlessButton/CdrHeadlessButton.vue';
import type { CdrHeadlessButtonProps } from '../headlessButton/CdrHeadlessButton.vue';

/** Generic button component for buttons that may have a checked state */

defineOptions({ name: 'CdrGenericButton' });

export interface CdrGenericButtonProps extends CdrHeadlessButtonProps {
  checked?: boolean;
  modifier?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<CdrGenericButtonProps>(), {});

const style = useCssModule();
const baseClass = 'cdr-generic-button';

// Manages the props passed along to CdrBox
const computedProps = computed(() => {
  const { checked, modifier, ...otherProps } = props;
  const classes = new Set([baseClass]);
  const inlineStyles: CSS.Properties = {};
  const additionalProps: CdrHeadlessButtonProps = { withBorder: true };

  // Add checked
  if (checked) {
    additionalProps['aria-checked'] = 'true';
  }

  // If transparent, add class for hover effects
  if ((!props.surface || props.surface === 'transparent') && !props.palette) {
    classes.add(`${baseClass}--transparent`);
  }

  return {
    ...otherProps,
    ...additionalProps,
    style: inlineStyles,
    class: mapClasses(style, ...classes),
  };
});
</script>

<template>
  <CdrHeadlessButton v-bind="computedProps">
    <slot />
  </CdrHeadlessButton>
</template>

<style lang="scss" module src="./styles/CdrGenericButton.module.scss"></style>
