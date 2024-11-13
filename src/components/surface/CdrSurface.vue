<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Foundational container for creating structured layouts */

defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<surface>(), {
  background: 'primary',
  borderColor: 'primary',
  borderStyle: 'solid',
  borderWidth: 'sixteenth-x',
  modifier: 'default',
  radius: 'sharp',
  shadow: 'flat',
  tag: 'div',
  withBorder: false,
  palette: 'default',
});

const style = useCssModule();

const rootProps = computed(() => {
  const { classes } = getSurfaceProps(props, 'cdr-surface');
  const paletteClass = `palette-${props.palette}`;
  return {
    class: mapClasses(style, ...classes, paletteClass) || undefined,
  };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
    :data-palette="props.palette"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurface.module.scss"></style>
