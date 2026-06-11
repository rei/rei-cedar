<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';

defineOptions({
  name: 'CdrUtilitySans',
});

export interface UtilitySansTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values -1, 0, 1, 2, 3
   */
  scale?: '-1' | '0' | '1' | '2' | '3';
  /** Toggles the strong variant */
  strong?: boolean;
}

const props = withDefaults(defineProps<UtilitySansTextProps>(), {
  tag: 'p',
  scale: '1',
  strong: false,
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  return {
    '--cdr-utility-sans-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-utility-sans-line-height': `var(--cdr-line-height-ratio-utility-${suffix})`,
    '--cdr-utility-sans-font-weight': props.strong ? '600' : '400',
  };
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

<style module src="./styles/CdrUtilitySans.module.scss" lang="scss"></style>
