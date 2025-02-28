<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';

/** Component for positioning content in 9 different positions relative to a container */

defineOptions({ name: 'CdrObjectOverlay' });

interface ObjectOverlayProps {
  /** Position of the content relative to the container */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left'
    | 'center'
    | 'right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /** Margin space around the positioned content */
  margin?: string;
  /** Sets the HTML tag for the container element */
  tag?: string;
}

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center',
  margin: '0',
  tag: 'div',
});

const style = useCssModule();

const positionClass = computed(() => `cdr-object-overlay--${props.position}`);
const containerStyle = computed(() => ({
  '--cdr-object-overlay-margin': props.margin,
}));
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, 'cdr-object-overlay', positionClass)"
    :style="containerStyle"
  >
    <div :class="style['cdr-object-overlay__container']">
      <!-- @slot Container content that the overlay will be positioned relative to -->
      <slot name="container" />
    </div>
    <div :class="style['cdr-object-overlay__content']">
      <!-- @slot Content to be positioned -->
      <slot name="content" />
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrObjectOverlay.module.scss" />