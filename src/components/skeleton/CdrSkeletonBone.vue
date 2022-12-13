<script>
import {
  defineComponent, useCssModule, computed, inject,
} from 'vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

export default defineComponent({
  name: 'CdrSkeletonBone',
  props: {
    type: {
      type: String,
      required: false,
      default: 'default',
      validator: (value) => propValidator(
        value,
        [
          'default',
          'heading',
          'line',
          'rectangle',
          'square',
        ],
      ),
    },
  },
  setup(props) {
    const baseClass = 'cdr-skeleton-bone';
    const motionToggle = inject('motionToggle');
    const typeClass = computed(() => `${baseClass}--${props.type}`);
    const motionClass = computed(() => (motionToggle.value ? `${baseClass}__shimmer` : null));
    return {
      style: useCssModule(),
      baseClass,
      typeClass,
      motionToggle,
      motionClass,
      mapClasses,
    };
  },
});
</script>

<template>
  <div :class="mapClasses(style, baseClass, typeClass, motionClass)" />
</template>

<style lang="scss" module src="./styles/CdrSkeletonBone.module.scss">
</style>
