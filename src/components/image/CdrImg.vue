<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { CdrRadiusSoft, CdrRadiusRound, CdrRadiusSofter } from '@rei/cdr-tokens';
import { baseImageProps } from '../../types/interfaces';

/** Media for capturing attention and communicating messages */
defineOptions({
  name: 'CdrImg',
});

const props = withDefaults(defineProps<baseImageProps>(), {
  alt: '',
});

/** Maps prop input to relevant CdrToken */
const radiusTokens = 
  new Map
    <string | undefined, typeof CdrRadiusSoft | typeof CdrRadiusSofter | typeof CdrRadiusRound>
      ([
        ['soft', CdrRadiusSoft],
        ['softer', CdrRadiusSofter],
        ['round', CdrRadiusRound]
      ]); 

/** Checks prop against radiusTokens map for token shorthand and returns if found.
 *  Otherwise passes value to CSS property */      
const getRadius = computed(() => radiusTokens.get(props.radius)
  ? `${radiusTokens.get(props.radius)}rem`
  : props.radius
);

const imageProperties = computed(() => {
  return {
    '--cdr-img-aspect-ratio': props.ratio,
    '--cdr-img-object-position': props.position,
    '--cdr-img-object-fit': props.fit,
    '--cdr-img-border-radius': getRadius.value,
  }
});

const baseClass = 'cdr-image';
const style = useCssModule();

</script>

<template>
  <img
    :class="style[baseClass]"
    :style="imageProperties"
    :src="src"
    :alt="alt"
    :srcset="srcset"
    :sizes="sizes"
    :loading="loading"
    :decoding="decoding"
    :fetchpriority="fetchpriority"
  >
</template>

<style lang="scss" module src="./styles/CdrImg.module.scss">
</style>
