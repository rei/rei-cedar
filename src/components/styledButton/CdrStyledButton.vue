<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import mapClasses from '../../utils/mapClasses';
import CdrUnstyledButton, {
  type CdrUnstyledButtonProps,
} from '../unstyledButton/CdrUnstyledButton.vue';

/** Base component for styled buttons */

defineOptions({ name: 'CdrStyledButton' });

export interface CdrStyledButtonProps extends CdrUnstyledButtonProps {
  modifier?: 'primary' | 'secondary' | 'sale' | 'dark' | 'link';
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<CdrStyledButtonProps>(), {
  modifier: 'primary',
  size: 'medium',
});

const style = useCssModule();
const baseClass = 'cdr-styled-button';

// Manages the props passed along to CdrBox
const computedProps = computed(() => {
  const classes = new Set([baseClass]);
  const inlineStyles: CSS.Properties = {};

  // Add modifier
  if (props.modifier) {
    classes.add(`${baseClass}--${props.modifier}`);
  }

  return { ...props, style: inlineStyles, class: mapClasses(style, ...classes) };
});
</script>

<template>
  <CdrUnstyledButton v-bind="computedProps">
    <slot />
  </CdrUnstyledButton>
</template>

<style lang="scss" module src="./styles/CdrStyledButton.module.scss"></style>
