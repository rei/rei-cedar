<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrUtilitySerif',
});

interface utilitySerifTextProps extends baseTextProps {
   /** 
   * Sets the type scale
   * @type scaleValue
   * @values -1,0,1,2,3
   */
  scale?: '-1'|'0'|'1'|'2'|'3',
  /** Toggles the strong variant */
  strong?: boolean,
}

const props = withDefaults(defineProps<utilitySerifTextProps>(), {
  tag: 'p',
  scale: '1',
  strong: false,
});

const typeProperties = computed(() => {
  return {
    '--cdr-utility-serif-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-utility-serif-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-utility-serif-line-height-ratio))`,
    '--cdr-utility-serif-font-weight': props.strong ? '600' : '400',

  }
});

const baseClass = 'cdr-utility-serif';
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

.cdr-utility-serif {
  @include cdr-text-base-mixin;
  @include cdr-text-utility-serif-800;
  font-size: var(--cdr-utility-serif-font-size);
  line-height: var(--cdr-utility-serif-line-height);
  font-weight: var(--cdr-utility-serif-font-weight);
}
</style>  