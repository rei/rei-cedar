<script setup lang="ts">
import { computed } from 'vue';
import type * as CSS from 'csstype';
import type { StylingProps } from '../../types/other';
import stylesMap from './stylesMap.mjs';

/** Base component for all other components */

defineOptions({ name: 'CdrBox' });

export interface CdrBoxProps extends StylingProps {
  tag?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<CdrBoxProps>(), {
  tag: 'div',
});

const styles = computed(() => {
  const styles: CSS.Properties = {};

  const propsToProcess = { ...props };

  // If shadow is present without background, apply a primary background
  if (props.shadow && !props.background) {
    propsToProcess.background = 'primary';
  }

  // Check props for styles that can be applied
  Object.keys(propsToProcess).forEach((key) => {
    const mapValue = stylesMap[key];

    if (props[key] && mapValue) {
      styles[mapValue.property] = mapValue.converter
        ? stylesMap[key].converter(props[key])
        : props[key];
    }
  });

  // Add border as box-shadow, which only requires a borderColor to be set for ease
  if (props.borderColor) {
    const borderWidth = `var(--cdr-space-inset-${props.borderWidth || 'eighth-x'})`;
    const borderColor = `var(--cdr-color-border-${props.borderColor})`;
    const borderAsBoxShadow = `inset 0 0 0 ${borderWidth} ${borderColor}`;
    styles.boxShadow = `${styles.boxShadow ? `${styles.boxShadow}, ` : ''}${borderAsBoxShadow}`;
  }

  return styles;
});
</script>

<template>
  <component
    :is="tag"
    :style="styles"
  >
    <slot />
  </component>
</template>
