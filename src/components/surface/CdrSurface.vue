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
  const { palette } = props; // Assuming 'palette' is a prop passed to your component
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

<style lang="scss" module src="./styles/CdrSurface.module.scss"></style>
