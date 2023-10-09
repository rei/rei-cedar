<script setup lang="ts">
import { useCssModule, computed, inject, ref } from 'vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';
import { motionKey } from '../../types/symbols';

defineOptions({
  name: 'CdrSkeletonBone',
});

const props = defineProps({
  /**
   * Sets the type of content placeholder
   * @demoSelectMultiple false
   * @values default, heading, line, rectangle, square
  */
  type: {
    type: String,
    default: 'default',
    validator: (value: string) => propValidator(
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
});

const baseClass = 'cdr-skeleton-bone';
const style = useCssModule();
const typeClass = computed(() => `${baseClass}--${props.type}`);

const motionToggle = inject(motionKey, ref(true));
const motionClass = computed(() => (motionToggle.value ? `${baseClass}__shimmer` : ''));

</script>

<template>
  <div :class="mapClasses(style, baseClass, typeClass, motionClass)" />
</template>

<style lang="scss" module src="./styles/CdrSkeletonBone.module.scss">
</style>
