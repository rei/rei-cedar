<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { surfaceNavigation } from '../../types/interfaces';
import { getSurfaceNavigationProps } from '../../utils/surface';

/** Navigation-specific container for creating interactive link surfaces */

defineOptions({ name: 'CdrSurfaceNavigation' });

const props = withDefaults(defineProps<surfaceNavigation>(), {
  background: () => ({
    rest: 'primary',
  }),
  borderColor: () => ({
    rest: undefined
  }),
  borderStyle: () => ({
    rest: undefined
  }),
  borderWidth: () => ({
    rest: undefined
  }),
  modifier: 'default',
  radius: () => ({
    rest: "sharp"
  }),
  shadow: () => ({
    rest: 'flat'
  }),
  tag: 'div',
  withBorder: () => ({
    rest: false
  }),
  palette: 'default',
});

const style = useCssModule();

const rootProps = computed(() => {
  const { classes } = getSurfaceNavigationProps(props, 'cdr-surface-navigation');
  const { palette } = props;

  return {
    class: mapClasses(style, ...classes) || undefined,
    'data-palette': palette || undefined,
  };
});
</script>

<template>
  <component
    :is="props.tag"
    v-bind="rootProps"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurfaceNavigation.module.scss" />
