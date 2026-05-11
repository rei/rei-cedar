<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';
import type { TypeScale } from '../../../types/other';

defineOptions({
  name: 'CdrHeadingDisplay',
});

interface HeadingDisplayTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values scale-2, scale-3, scale-4, scale-5, scale-6, scale-7
   */
  scale?: Extract<TypeScale, 'scale-2' | 'scale-3' | 'scale-4' | 'scale-5' | 'scale-6' | 'scale-7'>;
}

const props = withDefaults(defineProps<HeadingDisplayTextProps>(), {
  tag: 'h1',
  scale: 'scale-7',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  return {
    '--cdr-heading-display-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-heading-display-line-height': `var(--cdr-line-height-ratio-heading-display-${suffix})`,
  };
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

<style module src="./styles/CdrHeadingDisplay.module.scss" lang="scss"></style>
