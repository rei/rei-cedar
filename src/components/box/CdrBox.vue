<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import mapClasses from '../../utils/mapClasses';
import type { SurfaceProps } from '../../types/interfaces';

/** Base component for all other components */

defineOptions({ name: 'CdrBox' });

export interface CdrBoxProps extends SurfaceProps {}

const props = withDefaults(defineProps<CdrBoxProps>(), {
  tag: 'div',
});

const style = useCssModule();
const baseClass = 'cdr-box';
const borderClass = `${baseClass}--border`;
const radiusClass = `${baseClass}--radius`;
const shadowClass = `${baseClass}--shadow`;
const surfaceClass = `${baseClass}--surface`;
const elevationClass = `${baseClass}--elevation`;
const paletteClass = `${baseClass}--palette`;

// Map of margins and padding
const marginsAndPaddingMap = {
  m: 'margin',
  mx: 'marginInline',
  my: 'marginBlock',
  ml: 'marginInlineStart',
  mr: 'marginInlineEnd',
  mt: 'marginTop',
  mb: 'marginBottom',
  p: 'padding',
  px: 'paddingInline',
  py: 'paddingBlock',
  pl: 'paddingInlineStart',
  pr: 'paddingInlineEnd',
  pt: 'paddingTop',
  pb: 'paddingBottom',
};
const marginAndPaddingKeys = Object.keys(marginsAndPaddingMap);

// Manages the props passed along to CdrBox
const computedProps = computed(() => {
  const classes = new Set<string>([baseClass]);
  const inlineStyles: CSS.Properties = {};

  // Add palette
  if (props.palette) {
    classes.add(`${paletteClass}-${props.palette}`);
    classes.add(borderClass);
    classes.add(surfaceClass);
  }

  // Add border
  if (props.withBorder) {
    if (props.borderWidth) {
      inlineStyles['--cdr-default-border-width'] = `var(--cdr-space-inset-${props.borderWidth})`;
    }

    if (props.borderColor) {
      inlineStyles['--cdr-default-border-color'] = `var(--cdr-color-border-${props.borderColor})`;
    }

    classes.add(borderClass);
  }

  // Add radius
  if (props.radius) {
    inlineStyles['--cdr-default-radius'] = `var(--cdr-radius-${props.radius})`;
    classes.add(radiusClass);
  }

  // Add shadow
  if (props.shadow) {
    inlineStyles['--cdr-default-shadow'] = `var(--cdr-prominence-${props.shadow})`;
    classes.add(shadowClass);
  }

  // Add surface
  if (props.surface) {
    inlineStyles['--cdr-default-surface'] = `var(--cdr-color-background-${props.surface})`;
    classes.add(surfaceClass);
  }

  // Add elevation
  if (props.elevation) {
    if (props.elevation) {
      inlineStyles['--cdr-default-elevation'] = `var(--cdr-elevation-${props.elevation})`;
    }

    if (props.position) {
      inlineStyles['--cdr-default-position'] = props.position;
    }

    classes.add(elevationClass);
  }

  // Add margin and padding
  if (marginAndPaddingKeys.find((key) => props[key])) {
    marginAndPaddingKeys.forEach((key) => {
      if (props[key]) {
        inlineStyles[marginsAndPaddingMap[key]] = `var(--cdr-space-scale-${props[key]})`;
      }
    });
  }

  return { style: inlineStyles, class: mapClasses(style, ...classes) };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="computedProps"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrBox.module.scss"></style>
