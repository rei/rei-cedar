<script>
import {
  defineComponent, useCssModule, computed,
} from 'vue';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

/** Communicates meaning through graphics representing simple and complex ideas
 * @demoComponentNames icon-account-profile, icon-camera
 */

export default defineComponent({
  name: 'CdrIcon',
  props: {
    /**
     * Only on CdrIcon. Sets the href attribute for use with SVG symbol sprite (see @rei/cedar-icons).
     */
    use: String,
    /**
     * Sets icon fill to "inherit" so as to use parent/ancestor fill color.
     */
    inheritColor: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => propValidator(
        value,
        ['small', 'medium', 'large'],
      ),
    },
  },

  setup(props, ctx) {
    const baseClass = 'cdr-icon';
    const hideSr = !ctx.attrs['aria-label'] && !ctx.attrs['aria-labelledby'];
    const inheritColorClass = computed(() => props.inheritColor
      && `${baseClass}--inherit-color`);
    const sizeClass = computed(() => props.size
      && responsiveModifyClass(baseClass, '', props.size));
    const dataObj = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
    };
    if (hideSr) dataObj['aria-hidden'] = true;
    const hrefAttrs = {
      href: props.use,
      'xlink:href': props.use,
    };
    return {
      style: useCssModule(),
      baseClass,
      inheritColorClass,
      sizeClass,
      dataObj,
      hrefAttrs,
      mapClasses,
    };
  },
});
</script>

<template>
  <svg
    v-bind="dataObj"
    :class="mapClasses(style, baseClass, sizeClass, inheritColorClass)"
  >
    <slot />
    <use
      v-if="use"
      v-bind="hrefAttrs"
    />
  </svg>
</template>

<style lang="scss" module src="./styles/CdrIcon.module.scss">
</style>
