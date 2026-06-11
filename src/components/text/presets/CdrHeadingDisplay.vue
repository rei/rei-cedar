<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';

defineOptions({
  name: 'CdrHeadingDisplay',
});

interface HeadingDisplayTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values 2, 3, 4, 5, 6, 7
   */
  scale?: '2' | '3' | '4' | '5' | '6' | '7';
}

const props = withDefaults(defineProps<HeadingDisplayTextProps>(), {
  tag: 'h1',
  scale: '7',
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
