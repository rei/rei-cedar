<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Base component for all other components */

defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<surface>(), {
  tag: 'div',
});

const style = useCssModule();

const rootProps = computed(() => {
  const { classes } = getSurfaceProps(props, 'cdr-surface');
  return { class: mapClasses(style, ...classes) || undefined };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurface.module.scss"></style>
