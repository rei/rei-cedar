<script>
import { defineComponent, useCssModule, computed } from 'vue';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import sizeProps from '../../props/size';
import propValidator from '../../utils/propValidator';
import backgroundProps from '../../props/background';

/** Allows selecting one or more items from a list */
export default defineComponent({
  name: 'CdrCheckbox',
  components: { CdrLabelWrapper },
  directives: {
    indeterminate: {
      mounted(el, binding) {
        if (binding.value) {
          el.setAttribute('indeterminate', binding.value);
          return;
        }
        el.removeAttribute('indeterminate');
      },
      updated(el, binding) {
        if (binding.value) {
          el.setAttribute('indeterminate', binding.value);
          return;
        }
        el.removeAttribute('indeterminate');
      },
    },
  },
  inheritAttrs: false,
  customOptions: {},
  props: {
    /**
     * Passes a CSS class to the label for custom styles
     */
    labelClass: String,
    /**
     * Passes a CSS class to the input for custom styles
     */
    inputClass: String,
    /**
     * Passes a CSS class to the slot wrapper for custom styles
     */
    contentClass: String,
    /**
     * Show checkbox in indeterminate state. (NOTE: this is a visual-only state and there is no logic for when to show it)
     */
    indeterminate: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * The value when checked.
     */
    trueValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: true,
    },
    /**
     * The value when unchecked.
     */
    falseValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: false,
    },
    /**
     * The value when used in a checkbox group. Replaces `trueValue` and `falseValue`.
     */
    customValue: [String, Number, Boolean, Object, Array, Symbol, Function],
    /**
     * Sets the background color the input is rendered on
     * @values primary, secondary
     */
    background: backgroundProps,
    /**
     * @demoSelectMultiple false
     * @values small, medium, large
    */
    size: sizeProps,
    /**
     * Use `hide-figure` to hide the checkbox, which leaves the text label as the clickable element.
     * Add appropriate custom styles to convey selected and unselected states.
     * @values hide-figure
     */
    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'hide-figure']),
    },
    /** @ignore */
    modelValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
    },
  },
  emits: {
    /**
     * Event emitted by v-model on the <input> element
     * @param modelValue
     */
    'update:modelValue': null,
  },

  setup(props, ctx) {
    const baseClass = 'cdr-checkbox';

    const checkboxModel = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue);
      },
    });

    return {
      style: useCssModule(),
      baseClass,
      checkboxModel,
    };
  },
});
</script>

<template>
  <cdr-label-wrapper
    :class="style[baseClass]"
    :size="size"
    :modifier="modifier"
    :label-class="labelClass"
    :content-class="contentClass"
    :background="background"
    :disabled="$attrs.disabled"
  >
    <template #input>
      <input
        :class="[style['cdr-checkbox__input'], inputClass]"
        type="checkbox"
        v-bind="$attrs"
        :true-value="customValue ? null : trueValue"
        :false-value="customValue ? null : falseValue"
        :value="customValue"
        v-indeterminate="indeterminate"
        v-model="checkboxModel"
      >
    </template>
    <!-- @slot Readable text for the label element -->
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrCheckbox.module.scss">
</style>
