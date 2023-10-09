<script setup lang="ts">
import { useCssModule, provide, toRef } from 'vue';
import { motionKey } from '../../types/symbols';

/** Visually communicates content is in the process of loading */
defineOptions({
  name: 'CdrSkeleton',
});

const props = defineProps({
  /**
     * Toggle animation on/off.
     * When `true`, animated gradient will be used while loading.
     * When `false` a static background color will be used.
     * Automatically disabled if `prefers-reduced-motion` is set by user.
  */
  motion: { type: Boolean, default: true },
});

const baseClass = 'cdr-skeleton';
const style = useCssModule();

const motionSetting = toRef(props, 'motion');
provide(motionKey, motionSetting);

</script>

<template>
  <div
    :class="style[baseClass]"
    aria-live="polite"
    aria-busy="true"
  >
    <!-- @slot CdrSkeleton content (CdrSkeletonBone components) -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrSkeleton.module.scss">
</style>
