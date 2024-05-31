<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { SurfaceProps, InlineCss } from '../../types/interfaces';

/** Base component for all other components */

defineOptions({ name: 'CdrSurface' });

export interface CdrSurfaceProps extends SurfaceProps {}

const props = withDefaults(defineProps<CdrSurfaceProps>(), {
  tag: 'div',
});

const style = useCssModule();
const baseClass = 'cdr-surface';
const borderClass = `${baseClass}--border`;
const radiusClass = `${baseClass}--radius`;
const shadowClass = `${baseClass}--shadow`;
const backgroundClass = `${baseClass}--background`;
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

// Manages the props passed along to CdrSurface
const computedProps = computed(() => {
  const classes = [];
  const inlineStyles: InlineCss = {};

  // Add display
  if (props.display) {
    inlineStyles['display'] = props.display;
  }

  // Add palette
  if (props.palette) {
    classes.push(`${paletteClass}-${props.palette}`);
  }

  // Add border
  if (props.withBorder) {
    if (props.borderWidth) {
      inlineStyles['--cdr-border-width-default'] = `var(--cdr-space-inset-${props.borderWidth})`;
    }

    if (props.borderColor) {
      inlineStyles['--cdr-border-color-default'] = `var(--cdr-color-border-${props.borderColor})`;
    }

    classes.push(borderClass);
  }

  // Add radius
  if (props.radius) {
    inlineStyles['--cdr-radius-default'] = `var(--cdr-radius-${props.radius})`;
    classes.push(radiusClass);
  }

  // Add shadow
  if (props.shadow) {
    inlineStyles['--cdr-shadow-default'] = `var(--cdr-prominence-${props.shadow})`;
    classes.push(shadowClass);
  }

  // Add background
  if (props.background) {
    inlineStyles['--cdr-background-default'] = `var(--cdr-color-background-${props.background})`;
    classes.push(backgroundClass);
  }

  // Add elevation
  if (props.elevation) {
    if (props.elevation) {
      inlineStyles['--cdr-elevation-default'] = `var(--cdr-elevation-${props.elevation})`;
    }

    if (props.position) {
      inlineStyles['--cdr-position-default'] = props.position;
    }

    classes.push(elevationClass);
  }

  // Add margin and padding
  if (marginAndPaddingKeys.find((key) => props[key])) {
    marginAndPaddingKeys.forEach((key) => {
      if (props[key]) {
        const cssProperty = marginsAndPaddingMap[key];
        inlineStyles[cssProperty] = `var(--cdr-space-${props.fixed ? '' : 'scale-'}${props[key]})`;
      }
    });
  }

  return { style: inlineStyles, class: mapClasses(style, ...classes) || undefined };
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

<style lang="scss" module src="./styles/CdrSurface.module.scss"></style>
