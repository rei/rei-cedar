<script>
import {
  defineComponent, useCssModule, provide, toRef,
} from 'vue';

export default defineComponent({
  name: 'CdrSkeleton',
  props: {
    /**
     * Toggle animation on/off.
     * When `true`, animated gradient will be used while loading.
     * When `false` a static background color will be used.
     * Automatically disabled if `prefers-reduced-motion` is set by user.
     */
    motion: { type: Boolean, default: true },
  },
  setup(props) {
    const baseClass = 'cdr-skeleton';
    const motionSetting = toRef(props, 'motion');
    provide('motionToggle', motionSetting);
    return {
      baseClass,
      style: useCssModule(),
    };
  },
});
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
