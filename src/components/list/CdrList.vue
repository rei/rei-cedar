<script>
import { defineComponent, useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrList',
  props: {
    /**
     * Tag accepts a user defined element and expects either: 'ul' = Unordered List or 'ol' = Ordered List.
     */
    tag: {
      type: String,
      default: 'ul',
      validator: (value) => propValidator(value, ['ul', 'ol']),
    },
    /**
     * Modifies the style variant for this component
     * @demoSelectMultiple true
     * @values ordered, unordered, compact, inline
     */
    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'ordered', 'unordered', 'compact', 'inline']),
    },
  },

  setup(props) {
    const baseClass = 'cdr-list';
    const style = useCssModule();
    const modifierClasses = computed(() => {
      const modifiers = props.modifier.split(' ');
      return modifiers.map((mod) => style[`${baseClass}--${mod}`]);
    });
    return {
      style,
      baseClass,
      modifierClasses,
    };
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="[style[baseClass], modifierClasses]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrList.module.scss">
</style>
