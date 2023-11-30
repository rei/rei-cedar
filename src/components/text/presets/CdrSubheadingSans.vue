<script setup lang="ts">
import { useCssModule, computed, type PropType } from 'vue';
import CdrText from '../CdrText.vue';

defineOptions({
  name: 'CdrSubheadingSans',
});

type scaleValue = '0'|'1'|'2';

const props = defineProps({
  /** 
   * Sets the type scale
   * @type scaleValue
   * @values '0', '1', '2'
   */ 
  scale: { type: String as PropType<scaleValue>, default: '1' },
});

const typeProperties = computed(() => {
  return {
    '--cdr-subheading-sans-font-size': `var(--cdr-type-scale-${props.scale})`,
    '--cdr-subheading-sans-line-height': 
      `calc(var(--cdr-type-scale-${props.scale}) * var(--cdr-subheading-sans-line-height-ratio))`,

  }
});

const baseClass = 'cdr-subheading-sans';
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

.cdr-subheading-sans {
  @include cdr-text-subheading-sans-600;
  font-size: var(--cdr-subheading-sans-font-size);
  line-height: var(--cdr-subheading-sans-line-height);
}
</style>  