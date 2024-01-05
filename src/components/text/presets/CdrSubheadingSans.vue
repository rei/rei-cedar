<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { baseTextProps } from '../../../types/interfaces';

defineOptions({
  name: 'CdrSubheadingSans',
});

interface subheadingSansTextProps extends baseTextProps {
   /** 
     * Sets the type scale
     * @type scaleValue
     * @values 0,1,2
   */
  scale?: '0'|'1'|'2',
}

const props = withDefaults(defineProps<subheadingSansTextProps>(), {
  tag: 'p',
  scale: '1',
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

.cdr-subheading-sans {
  @include cdr-text-base-mixin;
  @include cdr-text-subheading-sans-600;
  font-size: var(--cdr-subheading-sans-font-size);
  line-height: var(--cdr-subheading-sans-line-height);
}
</style>  