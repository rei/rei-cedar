<script setup lang="ts">
import { useCssModule, computed, type PropType } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrUtilitySans',
});


type scaleValue = '-1'|'0'|'1'|'2'|'3';
const props = defineProps({
  /** 
   * Sets the type scale
   * @type scaleValue
   * @values '-1','0','1','2','3'
   */ 
  scale: { type: String as PropType<scaleValue>, default: '1' },
  /** Toggles the strong variant */
  strong: { type: Boolean, default: false }
});

const typeProperties = computed(() => {
  return {
    '--cdr-utility-sans-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-utility-sans-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-utility-sans-line-height-ratio))`,
    '--cdr-utility-sans-font-weight': props.strong ? '600' : '400',

  }
});

const baseClass = 'cdr-utility-sans';
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
@import "./styles/CdrPresets.module.scss";
@import "../../../styles/fluid.css";

.cdr-utility-sans {
  @include cdr-text-base-mixin;
  @include cdr-text-utility-sans-800;
  font-size: var(--cdr-utility-sans-font-size);
  line-height: var(--cdr-utility-sans-line-height);
  font-weight: var(--cdr-utility-sans-font-weight);
}
</style>  