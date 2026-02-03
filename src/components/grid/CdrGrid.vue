<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrGridProps } from './types';
import type { Tag } from '../../types/other';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';

/**
 * CdrGrid - Simple wrapper for working with CSS grid
 *
 * Grid provides a flexible layout system based on CSS Grid.
 * Use grid to create complex, responsive layouts with precise control
 * over spacing and alignment.
 */

defineOptions({
  name: 'CdrGrid',
});

const props = withDefaults(defineProps<CdrGridProps>(), {
  gutter: 'medium@xs medium@sm large@md large@lg',
  tag: 'div' as Tag,
});

defineSlots<{
  /** CdrGrid content (grid child elements) */
  'default'(props: Record<string, never>): any;
}>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-grid';

/** Computed gutter class with responsive breakpoint support */
const gutterClass = computed<string>(() =>
  props.gutter ? responsiveModifyClass(baseClass, 'gutter-', props.gutter) : '',
);
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, gutterClass)"
  >
    <!-- @slot CdrGrid content (grid child elements) -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrGrid.module.scss" />
