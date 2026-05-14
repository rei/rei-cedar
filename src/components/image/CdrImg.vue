<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { CdrRadiusSoft, CdrRadiusRound, CdrRadiusSofter } from '@rei/cdr-tokens/tokens';
import type { BaseImageProps } from './types';

/**
 * CdrImg - Media for capturing attention and communicating messages
 *
 * Images enhance content and convey information visually.
 * Use images to support your message, showcase products, or illustrate concepts.
 * Always provide meaningful alt text for accessibility.
 */

defineOptions({
  name: 'CdrImg',
});

const props = withDefaults(defineProps<BaseImageProps>(), {
  alt: '',
});

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-image';

/** Maps prop input to relevant CdrToken for border radius */
const radiusTokens = new Map<
  string | undefined,
  typeof CdrRadiusSoft | typeof CdrRadiusSofter | typeof CdrRadiusRound
>([
  ['soft', CdrRadiusSoft],
  ['softer', CdrRadiusSofter],
  ['round', CdrRadiusRound],
]);

/**
 * Checks prop against radiusTokens map for token shorthand and returns if found.
 * Otherwise passes value to CSS property
 */
const getRadius = computed<string | undefined>(() =>
  radiusTokens.get(props.radius) ? `${radiusTokens.get(props.radius)}rem` : props.radius,
);

/** Computed CSS custom properties for image styling */
const imageProperties = computed<Record<string, string | undefined>>(() => {
  return {
    '--cdr-img-aspect-ratio': props.ratio,
    '--cdr-img-object-position': props.position,
    '--cdr-img-object-fit': props.fit,
    '--cdr-img-border-radius': getRadius.value,
  };
});
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
  />
</template>

<style lang="scss" module src="./styles/CdrImg.module.scss" />
