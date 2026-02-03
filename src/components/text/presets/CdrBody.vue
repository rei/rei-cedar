<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { ScaleValue } from '../../../types/other';

defineOptions({
  name: 'CdrBody',
});

export interface BodyTextProps extends BaseTextProps {
  /**
   * Sets the type scale
   * @type scaleValue
   * @values -2, -1, 0, 1
   */
  scale?: ScaleValue;
  /** Toggles the strong variant */
  strong?: boolean;
}

const props = withDefaults(defineProps<BodyTextProps>(), {
  tag: 'p',
  scale: '0',
  strong: false,
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  return {
    '--cdr-body-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-body-line-height': `var(--cdr-line-height-ratio-body-${props.scale})`,
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
