<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrHeadingSerif',
});

interface headingSerifTextProps extends baseTextProps {
   /** 
     * Sets the type scale
     * @type scaleValue
     * @values 1,2,3,4,5
   */
  scale?: '1'|'2'|'3'|'4'|'5',
  /** Toggles the strong variant */
  strong?: boolean,
}

const props = withDefaults(defineProps<headingSerifTextProps>(), {
  tag: 'h1',
  scale: '5',
  strong: false
});

const typeProperties = computed(() => {
  return {
    '--cdr-heading-serif-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-heading-serif-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-heading-serif-line-height-ratio))`,
    '--cdr-heading-serif-font-weight': props.strong ? '600' : '400',

  }
});

const baseClass = 'cdr-heading-serif';
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
.cdr-heading-serif {
  @include cdr-text-base-mixin;
  @include cdr-text-heading-serif-1200;
  font-size: var(--cdr-heading-serif-font-size);
  line-height: var(--cdr-heading-serif-line-height);
  font-weight: var(--cdr-heading-serif-font-weight);
}
</style>  