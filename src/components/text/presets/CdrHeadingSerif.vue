<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { BaseTextProps } from '../types';
import { typeScaleCssSuffix } from '../../../tokens/adapters';

defineOptions({
  name: 'CdrHeadingSerif',
});

interface HeadingSerifTextProps extends BaseTextProps {
  /**
   * Sets the type scale using Cedar values derived from cdr-tokens CdrTypeKey values.
   * @type TypeScale
   * @values 1, 2, 3, 4, 5
   */
  scale?: '1' | '2' | '3' | '4' | '5';
  /** Toggles the strong variant */
  strong?: boolean;
}

const props = withDefaults(defineProps<HeadingSerifTextProps>(), {
  tag: 'h1',
  scale: '5',
  strong: false,
});

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

const typeProperties = computed(() => {
  const suffix = typeScaleCssSuffix(props.scale!);
  return {
    '--cdr-heading-serif-font-size': `var(--cdr-type-scale-${suffix})`,
    '--cdr-heading-line-height': `var(--cdr-line-height-ratio-heading-${suffix})`,
    '--cdr-heading-serif-font-weight': props.strong ? '600' : '400',
  };
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

<style module src="./styles/CdrHeadingSerif.module.scss" lang="scss"></style>
