<script setup>
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator.js';
import mapClasses from '../../utils/mapClasses.js';

const props = defineProps({
  /** Any valid HTML tag */
  tag: {
    type: String,
    default: 'div',
  },
  modifier: {
    type: String,
    default: 'static',
    validator: (value) => propValidator(
      value,
      ['static', 'fluid'],
      false,
    ),
  },
});

const baseClass = 'cdr-container';
const style = useCssModule();

/************************  Computed properties *************************/
const modifierClass = computed(() => `${baseClass}--${props.modifier}`);

</script>

<template>
  <component :is="tag" :class="mapClasses(style, baseClass, modifierClass)">
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrContainer.module.scss">
</style>
