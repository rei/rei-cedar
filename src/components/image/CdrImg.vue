<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { CdrRadiusSoft, CdrRadiusRound, CdrRadiusSofter } from '@rei/cdr-tokens';

/** Media for capturing attention and communicating messages */
defineOptions({
  name: 'CdrImg',
});

const props = defineProps({
  /**
   * Image source url.
   */
    src: {
    type: String,
    required: true,
  },
  /**
   * Image alt text. Defaults to an empty string
   */
  alt: {
    type: String,
    default: '',
  },
  /**
   * Aspect ratio of the image
   * @demoSelectMultiple false
   * @values Valid CSS aspect-ratio property values
   */
  ratio: {
    type: String,
    default: undefined,
  },
  /**
   * Object position of the image
   * @demoSelectMultiple false
   * @values Valid CSS object-position values
   */
  position: {
    type: String,
    default: undefined,
  },
  /**
   * Object fit of the image
   * @demoSelectMultiple false
   * @values Valid CSS object-fit values
   */
  fit: {
    type: String,
    default: undefined,
  },
  /**
   * Sets border radius
   * @demoSelectMultiple false
   * @values Accepts shorthand to use cedar radius tokens (soft, softer, round) or a custom value as a valid CSS border-radius values
   */
  radius: {
    type: String,
    default: undefined,
  }
});

const radiusTokens = 
  new Map
    <string | undefined, typeof CdrRadiusSoft | typeof CdrRadiusSofter | typeof CdrRadiusRound>
      ([
        ['soft', CdrRadiusSoft],
        ['softer', CdrRadiusSofter],
        ['round', CdrRadiusRound]
      ]); 

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
  >
</template>

<style lang="scss" module src="./styles/CdrImg.module.scss">
</style>
