<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import type { HTMLAttributes } from '../../types/interfaces';
import mapClasses from '../../utils/mapClasses';
import type {
  Tag,
  Space,
  Shadow,
  Radius,
  BorderColor,
  Elevation,
  Position,
  Palette,
  Surface,
} from '../../types/other';

/** Base component for all other components */

defineOptions({ name: 'CdrBox' });

export interface CdrBoxProps extends HTMLAttributes {
  tag?: Tag;
  shadow?: Shadow;
  radius?: Radius;
  surface?: Surface;
  borderWidth?: Space;
  borderColor?: BorderColor;
  elevation?: Elevation;
  position?: Position;
  palette?: Palette;
  m?: Space;
  mx?: Space;
  my?: Space;
  ml?: Space;
  mr?: Space;
  mt?: Space;
  mb?: Space;
  p?: Space;
  px?: Space;
  py?: Space;
  pl?: Space;
  pr?: Space;
  pt?: Space;
  pb?: Space;
}

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
  px: 'marginInline',
  py: 'paddingBlock',
  pl: 'paddingInlineStart',
  pr: 'paddingInlineEnd',
  pt: 'paddingTop',
  pb: 'paddingBottom',
};
const marginAndPaddingKeys = Object.keys(marginsAndPaddingMap);

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
