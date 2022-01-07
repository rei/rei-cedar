<template>
  <div :class="style['cdr-label-wrapper__container']">
    <label
      :class="mapClasses(style,
                         'cdr-label-wrapper',
                         `cdr-label-wrapper--${background}`,
                         disabledClass,
                         modifierClass,
                         sizeClass,
      ).concat(` ${labelClass || ''}`)"
    >
      <slot name="input" />
      <span :class="style['cdr-label-wrapper__figure']" />
      <div :class="mapClasses(style, 'cdr-label-wrapper__content', contentClass)">
        <slot />
      </div>
    </label>
  </div>
</template>
<script>
import { defineComponent, useCssModule, computed } from 'vue';
import { responsiveModifyClass } from '../../utils/buildClass';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';

export default defineComponent({
  name: 'CdrLabelWrapper',
  props: {
    labelClass: String,
    contentClass: String,
    background: backgroundProps,
    disabled: Boolean,
    modifier: String,
    size: String,
  },
  setup(props) {
    const baseClass = 'cdr-label-wrapper';
    const modifierClass = computed(() => props.modifier && `${baseClass}--${props.modifier}`);
    const sizeClass = computed(() => props.size && responsiveModifyClass(baseClass, '', props.size));
    const disabledClass = computed(() => props.disabled && `${baseClass}--disabled`); // TODO: this works right?
    return {
      style: useCssModule(),
      mapClasses,
      baseClass,
      modifierClass,
      sizeClass,
      disabledClass,
    };
  },
});
</script>

<style lang="scss" module src="./styles/CdrLabelWrapper.module.scss">
</style>
