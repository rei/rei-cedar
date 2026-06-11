<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';

defineOptions({
  name: 'CdrBody',
});

export interface BodyTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values -2, -1, 0, 1
   */
  scale?: '-2' | '-1' | '0' | '1';
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
  const lineHeightSuffix = props.scale === '1' ? '1' : '0';
  const suffix = typeScaleCssSuffix(props.scale!);
  return {
    '--cdr-body-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-body-line-height': `var(--cdr-line-height-ratio-body-${lineHeightSuffix})`,
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
