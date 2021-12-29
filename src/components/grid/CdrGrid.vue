<script setup>
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

const props = defineProps({
  /**
   * Defines gutter size.
   * Possible values: {none, small, medium, large}.
   * Also accepts responsive values with `@breakpoint`: "none@md"
   */
  gutter: {
    type: String,
    validator: (value) => propValidator(
      value,
      ['none', 'small', 'medium', 'large'],
    ),
    default: 'medium@xs medium@sm large@md large@lg',
  },
  tag: {
    type: String,
    default: 'div',
  },
});

const baseClass = 'cdr-grid';
const style = useCssModule();

/************************  Computed properties *************************/
const gutterClass = computed(() => props.gutter
  ? responsiveModifyClass(baseClass, 'gutter-', props.gutter)
  : null);

</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, gutterClass)"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrGrid.module.scss">
</style>
