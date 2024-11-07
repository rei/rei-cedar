<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';

/** Introduces a layered surface for distinct content sections, smoothing the transition from one page section to another */
defineOptions({
  name: 'CdrSplitSurface'
});

interface splitSurfaceProps {
  /** 
   * Sets the orientation of the surface to the top or bottom slot
   * @demoSelectMultiple false
   * @values top, bottom
   */
  surface?: 'top' | 'bottom'
  /** Sets the HTML tag for the split-surface element */
  tag?: string
}

const props = withDefaults(defineProps<splitSurfaceProps>(), {
  surface: 'bottom',
  tag: 'div'
});

const baseClass = 'cdr-split-surface'
const surfaceClass = computed(() => `${baseClass}--${props.surface}`);

const style = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, surfaceClass)"
  >
    <div :class="style[`${baseClass}__top`]">
      <!-- @slot top slot -->
      <slot name="top" />
    </div>
    <div :class="style[`${baseClass}__bottom`]">
      <!-- @slot bottom slot -->
      <slot name="bottom" />
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrSplitSurface.module.scss">
</style>
