<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';

defineOptions({
  name: 'CdrSubheadingSans',
});

interface SubheadingSansTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values -1, 0, 1, 2
   */
  scale?: '-1' | '0' | '1' | '2';
}

const props = withDefaults(defineProps<SubheadingSansTextProps>(), {
  tag: 'p',
  scale: '1',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  const lineHeightSuffix = props.scale === '-1' ? '0' : suffix;
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
