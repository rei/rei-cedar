<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrUtilitySans',
});

export interface utilitySansTextProps extends baseTextProps {
   /** 
   * Sets the type scale
   * @type scaleValue
   * @values -1,0,1,2,3
   */
  scale?: '-1'|'0'|'1'|'2'|'3',
  /** Toggles the strong variant */
  strong?: boolean,
}

const props = withDefaults(defineProps<utilitySansTextProps>(), {
  tag: 'p',
  scale: '1',
  strong: false,
});

const typeProperties = computed(() => {
  return {
    '--cdr-utility-sans-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-utility-sans-line-height': `var(--cdr-line-height-ratio-utility-${props.scale})`,
    '--cdr-utility-sans-font-weight': props.strong ? '600' : '400',

  }
});

const baseClass = 'cdr-utility-sans';
const style = useCssModule();
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
    :style="typeProperties"
  >
    <slot />
  </component>
</template>

<style module src="./styles/CdrUtilitySans.module.scss" lang="scss">
</style>  