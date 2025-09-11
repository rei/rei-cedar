<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrHeadingSans',
});

interface headingSansTextProps extends baseTextProps {
   /** 
     * Sets the type scale
     * @type scaleValue
     * @values 1,2,3
   */
  scale?: '1'|'2'|'3',

}

const props = withDefaults(defineProps<headingSansTextProps>(), {
  tag: 'h2',
  scale: '3',
});

const typeProperties = computed(() => {
  return {
    '--cdr-heading-sans-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-heading-line-height': `var(--cdr-line-height-ratio-heading-${props.scale})`
  }
});

const baseClass = 'cdr-heading-sans';
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

<style module src="./styles/CdrHeadingSans.module.scss" lang="scss">
</style>  