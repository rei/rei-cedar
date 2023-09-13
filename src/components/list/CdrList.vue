<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';

/** Groups related content items together either vertically or horizontally */
defineOptions({
  name: 'CdrList'
});

const props = defineProps({
  /**
   * Sets list type and HTML element as "unordered" or "ordered"
   * @values ul, ol
   */
    tag: {
    type: String,
    default: 'ul',
    validator: (value: string) => propValidator(value, ['ul', 'ol']),
  },
  /**
   * Modifies the style variant for this component
   * @demoSelectMultiple true
   * @values ordered, unordered, compact, inline
   */
  modifier: {
    type: String,
    default: '',
    validator: (value: string) => propValidator(
      value,
      ['', 'ordered', 'unordered', 'compact', 'inline']
    ),
  },
});

const style = useCssModule();

const baseClass = 'cdr-list';
const modifierClasses = computed(() => {
  const modifiers = props.modifier.split(' ');
  return modifiers.map((mod) => style[`${baseClass}--${mod}`]);
});

</script>

<template>
  <component
    :is="tag"
    :class="[style[baseClass], modifierClasses]"
  >
    <!-- @slot CdrList content (list-items) -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrList.module.scss">
</style>
