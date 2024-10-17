<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { getStructureStyles } from '../../utils/layout';
import type { Layout, NameValuePair } from '../../types/interfaces';
import type { Structure } from '../../types/other';
import CdrSurface from '../../components/surface/CdrSurface.vue';

/** Foundational container for creating structured layouts */

defineOptions({ name: 'CdrLayout' });

const props = withDefaults(defineProps<Layout>(), {
  gap: 'zero',
  columns: undefined,
  rows: undefined,
  as: CdrSurface,
});

const style = useCssModule();

const rootProps = computed(() => {
  const baseClass = 'cdr-layout';
  const classes = [baseClass];
  const inlineStyles: NameValuePair = {};

  // Add gap for all grid cells
  if (props.gap) {
    classes.push(`${baseClass}--gap-${props.gap}`);
  }

  // Add grid-auto-flow
  if (props.flow) {
    classes.push(`${baseClass}--flow-${props.flow}`);
  }

  // Add grid templates for columns and rows
  (['rows', 'columns'] as Structure[]).forEach((structure) => {
    if (!props[structure]) {
      return;
    }

    // Add class for applying inline grid styles for rows or columns
    classes.push(`${baseClass}--${structure}`);

    // Add responsive styles if it is the type StructureObject
    if (typeof props[structure] === 'object' && !Array.isArray(props[structure])) {
      classes.push(`${baseClass}--${structure}-responsive`);
    }

    // Add inline styles that will be picked up by classes
    const structureStyles = getStructureStyles({ props, structure });
    Object.assign(inlineStyles, structureStyles);
  });

  return { class: mapClasses(style, ...classes) || undefined, style: inlineStyles };
});
</script>

<template>
  <component
    :is="as"
    v-bind="rootProps"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrLayout.module.scss"></style>
