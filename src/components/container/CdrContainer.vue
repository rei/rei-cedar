<script>
import { defineComponent, useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

export default defineComponent({
  name: 'CdrContainer',
  props: {
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
  },

  setup(props) {
    const baseClass = 'cdr-container';
    const modifierClass = computed(() => `${baseClass}--${props.modifier}`);

    return {
      style: useCssModule(),
      baseClass,
      modifierClass,
      mapClasses,
    };
  },
});

</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass)"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrContainer.module.scss">
</style>
