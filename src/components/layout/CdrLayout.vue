<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { getStructureStyles } from '../../utils/layout';
import type { Layout, NameValuePair } from '../../types/interfaces';
import type { Structure } from '../../types/other';
import { modifyClassName } from '../../utils/buildClass';

/** Foundational container for creating structured layouts */

defineOptions({ name: 'CdrLayout' });

const props = withDefaults(defineProps<Layout>(), {
  gap: 'zero',
  rowGap: 'zero',
  columnGap: 'zero',
  columns: undefined,
  rows: undefined,
  as: 'div',
  queryType: 'container',
  flow: undefined,
  flowValue: 'auto',
});

const style = useCssModule();

const rootProps = computed(() => {
  const baseClass = 'cdr-layout';
  const classes = [baseClass];
  const inlineStyles: NameValuePair = {};

  // Add gap for entire grid
  if (props.gap !== 'zero') {
    classes.push(modifyClassName(baseClass, `gap-${props.gap}`));
  }

  // Add gap for columns
  if (props.columnGap !== 'zero') {
    classes.push(modifyClassName(baseClass, `column-gap-${props.columnGap}`));
  }

  // Add gap for rows
  if (props.rowGap !== 'zero') {
    classes.push(modifyClassName(baseClass, `row-gap-${props.rowGap}`));
  }

  // Add grid-auto-flow and supporting value
  if (props.flow) {
    classes.push(modifyClassName(baseClass, `flow-${props.flow}`));
    inlineStyles['--cdr-layout-flow-value'] = props.flowValue;
  }

  // Add grid templates for columns and rows
  ['rows' as Structure, 'columns' as Structure].forEach((structure) => {
    if (!props[structure]) {
      return;
    }

    // Add class for applying inline grid styles for rows or columns
    classes.push(modifyClassName(baseClass, structure));

    // Add responsive styles if it is the type StructureObject
    if (typeof props[structure] === 'object' && !Array.isArray(props[structure])) {
      const querySuffix = props.queryType === 'container' ? 'cq' : 'mq';
      classes.push(modifyClassName(baseClass, `${structure}-${querySuffix}`));
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
    :is="props.as"
    v-bind="rootProps"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrLayout.module.scss"></style>
