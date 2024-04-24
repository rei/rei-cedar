<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import mapClasses from '../../utils/mapClasses';
import type { StylingProps } from '../../types/other';

/** Base component for all other components */

defineOptions({ name: 'CdrBox' });

export interface CdrBoxProps extends StylingProps {
  tag?: keyof HTMLElementTagNameMap;
  shadow?: 'flat' | 'raised' | 'elevated' | 'floating' | 'lifted';
  radius?: 'sharp' | 'soft' | 'softer' | 'round';
  surface?: 'primary' | 'secondary' | 'brand-spruce';
  borderWidth?:
    | 'eighth-x'
    | 'quarter-x'
    | 'half-x'
    | 'three-quarter-x'
    | 'one-x'
    | 'one-and-a-half-x'
    | 'two-x'
    | 'three-x'
    | 'four-x';
  borderColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  elevation?:
    | 'ground'
    | 'dropdown'
    | 'popover'
    | 'navigation'
    | 'sticky'
    | 'notification'
    | 'modal';
  position?: CSS.Properties['position'];
  palette?: 'primary' | 'sale';
}

const props = withDefaults(defineProps<CdrBoxProps>(), {
  tag: 'div',
  shadow: undefined,
  radius: undefined,
  surface: undefined,
  borderWidth: undefined,
  borderColor: undefined,
  elevation: undefined,
  position: undefined,
  palette: undefined,
});

const style = useCssModule();
const baseClass = 'cdr-box';
const borderClass = `${baseClass}__border`;
const radiusClass = `${baseClass}__radius`;
const shadowClass = `${baseClass}__shadow`;
const surfaceClass = `${baseClass}__surface`;
const elevationClass = `${baseClass}__elevation`;
const paletteClass = `${baseClass}__palette`;

// Map of zIndex for elevation
const elevations = {
  ground: 0,
  dropdown: 100,
  popover: 200,
  navigation: 300,
  sticky: 400,
  notification: 500,
  modal: 600,
};

// Map of palettes
const palettes = {
  primary: {
    color: 'primary',
    surface: 'primary',
  },
  sale: {
    color: 'sale',
    surface: 'primary',
  },
};

// Manages the props passed along to CdrBox
const computedProps = computed(() => {
  const classes = new Set([baseClass]);
  const inlineStyles: CSS.Properties = {};

  // Add palette
  if (props.palette) {
    const { color, surface } = palettes[props.palette];
    inlineStyles['--cdr-box-surface'] = `var(--cdr-color-background-${surface})`;
    inlineStyles['--cdr-box-text-color'] = `var(--cdr-color-text-${color})`;
    classes.add(paletteClass);
  }

  // Add border
  if (props.borderWidth || props.borderColor) {
    if (props.borderWidth) {
      inlineStyles['--cdr-box-border-width'] = `var(--cdr-space-inset-${props.borderWidth})`;
    }

    if (props.borderColor) {
      inlineStyles['--cdr-box-border-color'] = `var(--cdr-color-border-${props.borderColor})`;
    }

    classes.add(borderClass);
  }

  // Add radius
  if (props.radius) {
    inlineStyles['--cdr-box-radius'] = `var(--cdr-radius-${props.radius})`;
    classes.add(radiusClass);
  }

  // Add shadow
  if (props.shadow) {
    inlineStyles['--cdr-box-shadow'] = `var(--cdr-prominence-${props.shadow})`;
    classes.add(shadowClass);
  }

  // Add surface
  if (props.surface) {
    inlineStyles['--cdr-box-surface'] = `var(--cdr-color-background-${props.surface})`;
    classes.add(surfaceClass);
  }

  // Add elevation
  if (props.elevation) {
    if (props.elevation) {
      inlineStyles['--cdr-box-elevation'] = elevations[props.elevation];
    }

    if (props.position) {
      inlineStyles['--cdr-box-position'] = props.position;
    }

    classes.add(elevationClass);
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
