<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

/** Simple wrapper for working with CSS grid */
defineOptions({
  name: 'CdrGrid',
});

const props = defineProps({
  /**
   * Defines gutter size. Also accepts responsive values with `@breakpoint`: "none@md"
   * @demoSelectMultiple false
   * @values none, small, medium, large
   */
   gutter: {
    type: String,
    validator: (value: string) => propValidator(
      value,
      ['none', 'small', 'medium', 'large'],
    ),
    default: 'medium@xs medium@sm large@md large@lg',
  },
  /** Sets the HTML tag for the grid element */
  tag: {
    type: String,
    default: 'div',
  },
});

const style = useCssModule();
const baseClass = 'cdr-grid';
const gutterClass = computed(() => (props.gutter
  ? responsiveModifyClass(baseClass, 'gutter-', props.gutter)
  : ''));
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

<style lang="scss" module src="./styles/CdrGrid.module.scss">
</style>
