<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import { responsiveModifyClass } from '../../utils/buildClass';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';

defineOptions({
  name: 'CdrLabelWrapper',
});

const props = defineProps({
  labelClass: String,
  contentClass: String,
  background: backgroundProps,
  disabled: Boolean,
  modifier: String,
  size: String,
});
const style = useCssModule();
const baseClass = 'cdr-label-wrapper';
const modifierClass = computed(() => props.modifier ? `${baseClass}--${props.modifier}` : '');
const sizeClass = computed(() => props.size
  ? responsiveModifyClass(baseClass, '', props.size)
  : '');
const disabledClass = computed(() => props.disabled ? `${baseClass}--disabled` : '');

</script>
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
      <slot name="svgs" />
      <span :class="[style['cdr-label-wrapper__content'], contentClass]">
        <slot />
      </span>
    </label>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLabelWrapper.module.scss">
</style>
