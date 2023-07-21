<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

/** Provides base margins and responsive layout logic for pages */
defineOptions({
  name: 'CdrContainer',
});

const props = defineProps({
  /** Sets the HTML tag for the container element */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * Controls whether container is static or fluid width.
   * @demoSelectMultiple false
   * @values static, fluid
 */
  modifier: {
    type: String,
    default: 'static',
    validator: (value: string) => propValidator(
      value,
      ['static', 'fluid'],
      false,
    ),
  },
});

const style = useCssModule();
const baseClass = 'cdr-container';
const modifierClass = computed(() => `${baseClass}--${props.modifier}`);
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass)"
  >
    <!-- @slot CdrContainer content  -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrContainer.module.scss">
</style>
