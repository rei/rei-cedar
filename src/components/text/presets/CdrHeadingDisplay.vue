<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrHeadingDisplay',
});

interface headingDisplayTextProps extends baseTextProps {
   /** 
   * Sets the type scale
   * @type scaleValue
   * @values 2,3,4,5,6,7
   */
  scale?: '2'|'3'|'4'|'5'|'6'|'7',

}

const props = withDefaults(defineProps<headingDisplayTextProps>(), {
  tag: 'h1',
  scale: '7',
});

const typeProperties = computed(() => {
  return {
    '--cdr-heading-display-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-heading-display-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-heading-display-line-height-ratio))`
  }
});

const baseClass = 'cdr-heading-display';
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

<style module lang="scss">
@import "./styles/CdrPresets.module.scss";

.cdr-heading-display {
  @include cdr-text-base-mixin;
  @include cdr-text-heading-display-1600;
  font-size: var(--cdr-heading-display-font-size);
  line-height: var(--cdr-heading-display-line-height);
}
</style>  