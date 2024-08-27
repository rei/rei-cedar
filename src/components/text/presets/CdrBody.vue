<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';
import { ScaleValue } from '../../../types/other';

defineOptions({
  name: 'CdrBody',
});

export interface bodyTextProps extends baseTextProps {
  /**
   * Sets the type scale
   * @type scaleValue
   * @values -2, -1, 0, 1
   */
  scale?: ScaleValue;
  /** Toggles the strong variant */
  strong?: boolean;
}

const props = withDefaults(defineProps<bodyTextProps>(), {
  tag: 'p',
  scale: '0',
  strong: false,
});

const typeProperties = computed(() => {
  return {
    '--cdr-body-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-body-line-height':
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-body-line-height-ratio))`,
    '--cdr-body-font-weight': props.strong ? '600' : '400',
  };
});

const baseClass = 'cdr-body';
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

<style module src="./styles/CdrBody.module.scss" lang="scss"></style>
