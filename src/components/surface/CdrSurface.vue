<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { CdrSurfaceProps } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Base component for all other components */

defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<CdrSurfaceProps>(), {
  tag: 'div',
});

const style = useCssModule();

const computedProps = computed(() => {
  const { inlineStyles, classes } = getSurfaceProps(props, 'cdr-surface');
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
