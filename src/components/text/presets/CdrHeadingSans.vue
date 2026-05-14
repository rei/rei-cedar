<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';
import type { TypeScale } from '../../../types/componentOptions';

defineOptions({
  name: 'CdrHeadingSans',
});

interface HeadingSansTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values scale-1, scale-2, scale-3
   */
  scale?: Extract<TypeScale, 'scale-1' | 'scale-2' | 'scale-3'>;
}

const props = withDefaults(defineProps<HeadingSansTextProps>(), {
  tag: 'h2',
  scale: 'scale-3',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  return {
    '--cdr-heading-sans-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-heading-line-height': `var(--cdr-line-height-ratio-heading-${suffix})`,
  };
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

<style module src="./styles/CdrHeadingSans.module.scss" lang="scss"></style>
