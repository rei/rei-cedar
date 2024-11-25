<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Foundational container for creating structured layouts */

defineOptions({ name: 'CdrSurface' });

const props = withDefaults(defineProps<surface>(), {
    /**
   * sets the background color 
   * @values primary, secondary, brand-spruce, sale,
   */
  background: 'primary',
   /**
   * If the withBorder prop is true this prop specifies a border color based on the token options within Cedar.  
   * @values primary, secondary, success, warning, error, info
   */
  borderColor: 'primary',
  /**
   * If the withBorder prop is true this prop will set the surface borders style 
   * @values zero, sixteenth-x, eighth-x, three-sixteenth-x, quarter-x'
   */
  borderStyle: 'solid',
   /**
   * If the withBorder prop is true this prop will set the surface borders width
   * @values zero, sixteenth-x, eighth-x, three-sixteenth-x, quarter-x'
   */
  borderWidth: 'sixteenth-x',
  /**
   * sets background color and border color to undefined 
   * @values default
   */
  modifier: 'default',
  /**
   * Sets border radius. 
   * @values sharp, soft, softer, softest, round
   */
  radius: 'sharp',
  /**
   * Sets Adds a box-shadow based on the token options within Cedar. 
   * @values flat, raised, elevated, floating, lifted
   */
  shadow: 'flat',
  /**
   * Sets valid HTML element tag
   */
  tag: 'div',
  /**
   * Surface will display with border.  default color, width, and style.
   */
  withBorder: false,
  /**
   * Alters the palette context to a new or provided palette.
   *  @values default, membership-subtle, membership-vibrant, sandstone
   */
  palette: 'default',
});

const style = useCssModule();

const rootProps = computed(() => {
  const { classes } = getSurfaceProps(props, 'cdr-surface');
  const { palette } = props; // Assuming 'palette' is a prop passed to your component
  return {
    class: mapClasses(style, ...classes) || undefined,
    'data-palette': palette || undefined,
  };
});

</script>

<template>
  <component
    :is="props.tag"
    v-bind="rootProps"
  >
    <!-- @slot Where all default content should be placed. -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurface.module.scss"></style>
