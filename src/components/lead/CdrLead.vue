<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';

/** Container used for assembling leads */
defineOptions({
  name: 'CdrLead'
});

interface leadProps {
  /** 
   * Sets the orientation of the background surface
   * @demoSelectMultiple false
   * @values 'top', 'bottom'
   */
  surfaceOrientation: 'top' | 'bottom'
}

const props = withDefaults(defineProps<leadProps>(), {
  surfaceOrientation: 'bottom'
});

const baseClass = 'cdr-lead'
const surfaceClass = computed(() => `${baseClass}--${props.surfaceOrientation}`);

const style = useCssModule();
</script>

<template>
  <div :class="mapClasses(style, baseClass, surfaceClass)">
    <div :class="style[`${baseClass}__top`]">
      <!-- @slot top slot -->
      <slot name="top" />
    </div>
    <div :class="style[`${baseClass}__bottom`]">
      <!-- @slot bottom slot -->
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLead.module.scss">
</style>
