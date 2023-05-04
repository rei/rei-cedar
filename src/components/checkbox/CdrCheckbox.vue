<script>
import { defineComponent, useCssModule, computed } from 'vue';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import sizeProps from '../../props/size';
import propValidator from '../../utils/propValidator';
import backgroundProps from '../../props/background';

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
   * Class that is added to the label for custom styles
   */
    labelClass: String,
    /**
   * Class that is added to the input for custom styles
   */
    inputClass: String,
    /**
   * Class that is added to the slot wrapper for custom styles
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
    // Set which background type the input renders on
    background: backgroundProps,
    size: sizeProps,

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
  emits: ['update:modelValue'],

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
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrCheckbox.module.scss">
</style>
