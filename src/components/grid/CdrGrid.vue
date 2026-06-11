<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrGridProps } from './types';
import type { Tag } from '../../types/componentOptions';
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
  /**
   * CdrGrid content (grid child elements).
   *
   * Examples:
   * - Card grid: <div class="card">...</div>
   * - Product tiles: <article>...</article>
   * - List layout (when tag="ul"): <li>...</li>
   */
  'default'(): any;
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
    <!-- @slot CdrGrid content (grid child elements). Pass repeated layout children like <div> cards, <article> tiles, or <li> when tag="ul". -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrGrid.module.scss" />
