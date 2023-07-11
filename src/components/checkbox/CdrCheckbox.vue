<script>
import { defineComponent, useCssModule, computed } from 'vue';
import { isEqual } from 'lodash-es';
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
        console.log('Setting model value:', newValue);
      },
    });

    const svgState = computed(() => {
      console.log('Checkbox Model:', checkboxModel.value);
      if (Array.isArray(checkboxModel.value)) {
        return checkboxModel.value.some(item =>
      isEqual(item, props.customValue) // lodash's _.isEqual method performs a deep comparison
    );
      }
      if (checkboxModel.value === props.trueValue) {
        return true;
      }

      if (checkboxModel.value === props.falseValue) {
        return false;
      }

      return checkboxModel;
    });

    return {
      style: useCssModule(),
      baseClass,
      checkboxModel,
      svgState,
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
      <div :class="style['cdr-checkbox__svg-checkbox']">
        <div :class="[style['cdr-checkbox__checkbox-box'], svgState ? style['checked'] : '']"></div>
        <svg v-show="svgState" xmlns="http://www.w3.org/2000/svg" viewBox="-3 -4 30 35">
          <path role="presentation" d="M9.673 18.669h.001L19.766 6.644a1 1 0 10-1.532-1.286l-9.3 11.085-3.169-3.776a1 1 0 10-1.532 1.286l3.875 4.618a.999.999 0 001.565.099z"/>
        </svg>
        <input
          :class="[style['cdr-checkbox__input'], inputClass]"
          type="checkbox"
          v-bind="$attrs"
          :true-value="customValue ? null : trueValue"
          :false-value="customValue ? null : falseValue"
          :value="customValue"
          v-indeterminate="indeterminate"
          v-model.lazy="checkboxModel"
        >
      </div>
    </template>
    <!-- @slot Readable text for the label element -->
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrCheckbox.module.scss">
</style>
