<script setup lang="ts">
import { useCssModule, computed, type PropType } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrBody',
});


type scaleValue = '0'|'1';

const props = defineProps({
  /** 
   * Sets the type scale
   * @type scaleValue
   * @values '0', '1'
   */
  scale: { type: String as PropType<scaleValue>, default: '0' },
  /** Toggles the strong variant */
  strong: { type: Boolean, default: false }
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

.cdr-body {
  @include cdr-text-base-mixin;
  @include cdr-text-body-400;
  font-size: var(--cdr-body-font-size);
  line-height: var(--cdr-body-line-height);
  font-weight: var(--cdr-body-font-weight);
}
</style>  