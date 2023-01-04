<script>
import {
  defineComponent, useCssModule, provide, toRef,
} from 'vue';

export default defineComponent({
  name: 'CdrSkeleton',
  props: {
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
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrSkeleton.module.scss">
</style>
