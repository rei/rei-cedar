<script>
import { defineComponent, useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { buildBooleanClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrTable',
  props: {
    /** Sets row colors to alternate between darker and lighter backgrounds.
     * Striping will not apply when `border` is true
     */
    striped: {
      type: Boolean,
      default: false,
    },
    /** Adds borders between rows. Will disable `striped` if both are true */
    border: {
      type: Boolean,
      default: true,
    },
    /** Sets the width to 100%. Also accepts space separated strings for breakpoints that it should be full width: { '@xs' | '@sm' | '@md' | '@lg' } */
    fullWidth: {
      type: [Boolean, String],
      default: true,
    },
    /** Makes the table scroll horizontally when it would overflow its container */
    responsive: {
      type: Boolean,
      default: true,
    },
    /** Adds a darker background on row hover */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the table size (cell padding); values can target responsive breakpoints. Example `small@lg`.
     * @demoSelectMultiple false
     * @values small, medium, large
    */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => propValidator(
        value,
        ['small', 'medium', 'large'],
      ),
    },
  },
  setup(props) {
    const baseClass = 'cdr-table';
    const sizeClass = computed(() => props.size && `${baseClass}--${props.size}`);
    const stripedClass = computed(() => props.striped && `${baseClass}--striped`);
    const hoverClass = computed(() => props.hover && `${baseClass}--hover`);
    const borderClass = computed(() => props.border && !props.striped
      && `${baseClass}--border`);
    const fullWidthClass = computed(() => props.fullWidth
      && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
    const wrapperClass = computed(() => props.responsive && `${baseClass}--responsive`);
    const style = useCssModule();
    return {
      mapClasses,
      baseClass,
      sizeClass,
      stripedClass,
      hoverClass,
      borderClass,
      fullWidthClass,
      wrapperClass,
      style,
    };
  },
});
</script>

<template>
  <div :class="style[wrapperClass]">
    <table
      v-bind="$attrs"
      :class="mapClasses(style,
                         baseClass,
                         sizeClass,
                         stripedClass,
                         hoverClass,
                         borderClass,
                         fullWidthClass,
      )"
    >
      <!-- @slot CdrTable content (Valid table elements <th>, <tbody>, <tr>, <td>, etc.) -->
      <slot />
    </table>
  </div>

</template>

<style lang="scss" module src="./styles/CdrTable.module.scss">
</style>
