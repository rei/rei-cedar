<script setup lang="ts">
import { useCssModule, computed, type PropType } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrHeadingSans',
});

type scaleValue = '1'|'2'|'3';

const props = defineProps({
  /** 
   * Sets the type scale
   * @type scaleValue
   * @values '1', '2', '3'
   */
  scale: { type: String as PropType<scaleValue>, default: '3' }
});

const typeProperties = computed(() => {
  return {
    '--cdr-heading-sans-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-heading-sans-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-heading-sans-line-height-ratio))`
  }
});

const baseClass = 'cdr-heading-sans';
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
@import "./styles/CdrPresets.module.scss";
@import "../../../styles/fluid.css";

.cdr-heading-sans {
  @include cdr-text-base-mixin;
  @include cdr-text-heading-sans-600;
  font-size: var(--cdr-heading-sans-font-size);
  line-height: var(--cdr-heading-sans-line-height);
}
</style>  