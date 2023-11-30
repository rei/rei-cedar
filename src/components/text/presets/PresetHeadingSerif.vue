<script setup lang="ts">
import { useCssModule, computed, type PropType } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrHeadingSerif',
});

type scaleValue = '1'|'2'|'3'|'4'|'5';

const props = defineProps({
  /** 
   * Sets the type scale
   * @type scaleValue
   * @values '1', '2', '3', '4', '5'
   */ 
  scale: { type: String as PropType<scaleValue>, default: '5' },
  /** Toggles the strong variant */
  strong: { type: Boolean, default: false }
});

const typeProperties = computed(() => {
  return {
    '--cdr-heading-serif-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-heading-serif-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-heading-serif-line-height-ratio))`,
    '--cdr-heading-serif-font-weight': props.strong ? '600' : '400',

  }
});

const baseClass = 'cdr-heading-serif';
const style = useCssModule();
</script>

<template>
  <CdrText
    :class="style[baseClass]"
    :style="typeProperties"
  >
    <slot />
  </CdrText>


</template>

<style module lang="scss">
@import "@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss";
@import "../../../styles/fluid.css";

.cdr-heading-serif {
  @include cdr-text-heading-serif-1200;
  font-size: var(--cdr-heading-serif-font-size);
  line-height: var(--cdr-heading-serif-line-height);
  font-weight: var(--cdr-heading-serif-font-weight);
}
</style>  