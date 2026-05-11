<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';
import type { TypeScale } from '../../../types/other';

defineOptions({
  name: 'CdrSubheadingSans',
});

interface SubheadingSansTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values scale-minus-1, scale-0, scale-1, scale-2
   */
  scale?: Extract<TypeScale, 'scale-minus-1' | 'scale-0' | 'scale-1' | 'scale-2'>;
}

const props = withDefaults(defineProps<SubheadingSansTextProps>(), {
  tag: 'p',
  scale: 'scale-1',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  const lineHeightSuffix = props.scale === 'scale-minus-1' ? '0' : suffix;
  return {
    '--cdr-subheading-sans-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-subheading-sans-line-height': `var(--cdr-line-height-ratio-subheading-sans-${lineHeightSuffix})`,
  };
});

const baseClass = 'cdr-subheading-sans';
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

<style module src="./styles/CdrSubheadingSans.module.scss" lang="scss"></style>
