<script>
import {
  defineComponent, useCssModule, computed,
} from 'vue';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass, buildBooleanClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrButton',
  props: {
    /**
     * Renders CdrButton as a <button> or <a> element. When using the value of <a>, this element renders as an anchor link.
     * @demoIgnore true
     * @values button, a
     */
    tag: {
      type: String,
      default: 'button',
      validator: (value) => propValidator(value, ['button', 'a']),
    },
    /**
     * Sets the button type
     * @demoIgnore true
     * @values button, submit, reset
     */
    type: {
      type: String,
      default: 'button',
      validator: (value) => propValidator(value, ['button', 'submit', 'reset']),
    },
    /**
     * Modifies the style variant for this component
     * @demoSelectMultiple false
     * @values primary, secondary, sale, dark, link
     */
    modifier: {
      type: String,
      default: 'primary',
      validator: (value) => propValidator(value, ['primary', 'secondary', 'sale', 'dark', 'link']),
    },
    /**
     * Sets the button size; values can target responsive breakpoints. Example: `large@sm`.
     * @demoSelectMultiple false
     * @values small, medium, large
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => propValidator(
        value,
        ['small', 'medium', 'large'],
      ),
    },
    /**
     * Sets button width to 100%. Setting this value to true will set the button width to 100% of the parent container. Use the 'fullWidth' prop with the 'size' prop to control top and bottom padding.
     */
    fullWidth: {
      type: [String, Boolean],
      default: false,
      validator: (value) => {
        if (typeof value === 'string') {
          return propValidator(
            value,
            ['@xs', '@sm', '@md', '@lg'],
            false,
          );
        }
        return typeof value === 'boolean';
      },
    },
    /**
     * Renders an 'icon-only' button. When this value is true, it will override the size and 'responsiveSize' props. Can be used in conjunction with 'with-background'
     */
    iconOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Renders an 'icon-only' button with a background color and border. Must be used in conjunction with the 'iconOnly' prop.
     */
    withBackground: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    const baseClass = 'cdr-button';
    const buttonType = computed(() => (props.tag === 'button' ? props.type : null));
    const modifierClass = computed(() => `${baseClass}--${props.modifier}`);
    const fullWidthClass = computed(() => !props.iconOnly && props.fullWidth
      && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
    const sizeClass = computed(() => (!props.iconOnly
      ? responsiveModifyClass(baseClass, '', props.size)
      : `cdr-button--icon-only-${props.size}`));
    const iconLeftClass = computed(() => ctx.slots['icon-left'] && ctx.slots.default
      && `${baseClass}--has-icon-left`);
    const iconRightClass = computed(() => ctx.slots['icon-right'] && ctx.slots.default
      && `${baseClass}--has-icon-right`);
    const iconOnlyClass = computed(() => props.iconOnly && `${baseClass}--icon-only`);
    const withBackgroundClass = computed(() => props.iconOnly
      && props.withBackground && `${baseClass}--with-background`);

    return {
      style: useCssModule(),
      mapClasses,
      baseClass,
      buttonType,
      modifierClass,
      fullWidthClass,
      sizeClass,
      iconLeftClass,
      iconRightClass,
      iconOnlyClass,
      withBackgroundClass,
    };
  },
});

</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style,
                       baseClass,
                       modifierClass,
                       sizeClass,
                       fullWidthClass,
                       iconOnlyClass,
                       iconLeftClass,
                       iconRightClass,
                       withBackgroundClass,
    )"
    :type="buttonType"
  >
    <!-- @slot Icon to the left of text content -->
    <slot name="icon-left" />
    <!-- @slot Icon for icon-only button -->
    <slot name="icon" />
    <!-- @slot Readable text of the button. Leave empty if icon-only -->
    <slot />
    <!-- @slot Icon to the right of text content -->
    <slot name="icon-right" />
  </component>
</template>

<style lang="scss" module src="./styles/CdrButton.module.scss">
</style>
