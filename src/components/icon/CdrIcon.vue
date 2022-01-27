<template>
  <svg
    v-bind="dataObj"
    :class="mapClasses(style, baseClass, sizeClass, inheritColorClass)"
  >
    <slot />
    <use
      v-if="use"
      v-bind="useAttributes"
    />
  </svg>
</template>
<script setup>
import { useCssModule, useAttrs, computed, defineProps } from 'vue';

import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../..//utils/buildClass';
import propValidator from '../../utils/propValidator';

const attrs = useAttrs();
const props = defineProps({
  /**
  * The href attribute passed to the use element. Will be prefixed with # automatically
  */
  use: String,
  /**
  * Sets icon fill to "inherit" so as to use parent/ancestor fill color.
  */
  inheritColor: Boolean,
  size: {
    type: String,
    default: 'medium',
    validator: (value) => propValidator(
      value,
      ['small', 'medium', 'large'],
    ),
  }
});

const baseClass = 'cdr-icon';
const hideSr = !attrs['aria-label'] && !attrs['aria-labelledby'];
const inheritColorClass = computed(() => props.inheritColor
  && `${baseClass}--inherit-color`);
const sizeClass = computed(() => props.size && responsiveModifyClass(baseClass, '', props.size));
const dataObj = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
};
if (hideSr) dataObj['aria-hidden'] = true;

const useAttributes = {
  href: props.use,
  'xlink:href': props.use,
};
const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrIcon.module.scss">
</style>
