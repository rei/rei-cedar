<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrBody',
});

interface bodyTextProps extends baseTextProps {
   /** 
   * Sets the type scale
   * @type scaleValue
   * @values 0, 1
   */
  scale?: '0'|'1',
  /** Toggles the strong variant */
  strong?: boolean,
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
  }
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

<style module lang="scss">
@import "./styles/CdrPresets.module.scss";

.cdr-body {
  @include cdr-text-base-mixin;
  @include cdr-text-body-400;
  font-size: var(--cdr-body-font-size);
  line-height: var(--cdr-body-line-height);
  font-weight: var(--cdr-body-font-weight);
}
</style>  