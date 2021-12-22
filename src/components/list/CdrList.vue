<script setup>
import { useCssModule, computed } from 'vue';

import propValidator from '../../utils/propValidator';

const props = defineProps({
  /**
     * Tag accepts a user defined element and expects either: 'ul' = Unordered List or 'ol' = Ordered List.
     */
  tag: {
    type: String,
    default: 'ul',
    validator: (value) => propValidator(value, ['ul', 'ol']),
  },
  modifier: {
    type: String,
    default: '',
    validator: (value) => propValidator(value, ['', 'ordered', 'unordered', 'compact', 'inline']),
  },
});
const baseClass = 'cdr-list';
const style = useCssModule();
const modifierClasses = computed(() => {
  const modifiers = props.modifier.split(' ');
  return modifiers.map((mod) => style[`${baseClass}--${mod}`]);
});
</script>

<template>
  <component
    :is="props.tag"
    :class="[style[baseClass], modifierClasses]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrList.module.scss">
</style>
