<script>
import { defineComponent, useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrGrid',
  props: {
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
  },

  setup(props) {
    const baseClass = 'cdr-grid';
    const gutterClass = computed(() => (props.gutter
      ? responsiveModifyClass(baseClass, 'gutter-', props.gutter)
      : null));
    return {
      style: useCssModule(),
      baseClass,
      gutterClass,
      mapClasses,
    };
  },
});
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
