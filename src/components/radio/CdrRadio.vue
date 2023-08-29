<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';

/** Permits the selection of only one option from a list of two or more */
defineOptions({
  name: 'CdrRadio',
  inheritAttrs: false,
  customOptions: {},
});

const props = defineProps({
  /**
   * Adds CSS class to the label for custom styles.
   */
    labelClass: String,
  /**
   * Adds CSS class to the input for custom styles.
   */
  inputClass: String,
  /**
   * Adds CSS class to the slot wrapper for custom styles.
   */
  contentClass: String,
  /** Disables the radio */
  disabled: Boolean,
  /**
   * Sets the name of the radio button.
  */
  name: {
    type: String,
    required: true,
  },
  /**
   * Modifies the style variants for this component
   * @demoSelectMultiple true
   * @values hide-figure
  */
  modifier: {
    type: String,
    default: '',
    validator: (value: string) => propValidator(value, ['', 'hide-figure']),
  },
  /**
   * Sets the radio size; values can target responsive breakpoints. Example `small@lg`
   * @demoSelectMultiple false
   * @values small, medium, large
  */
  size: sizeProps,

  /**
   * Sets the background color the radio button is rendered on
   * @values primary, secondary
   */
  background: backgroundProps,

  /**
   * Sets the value of the radio.
  */
  customValue: {
    type: [String, Number, Boolean, Object, Array, Symbol, Function],
  },

  /** @ignore v-model binding */
  modelValue: {
    type: [String, Number, Boolean, Object, Array, Symbol, Function],
  },
});

const emits = defineEmits({
  /**
   * Event emitted by v-model on the radio's <input> element
   * @param modelValue
   */
    'update:modelValue': null,
});

const style = useCssModule();

const baseClass = 'cdr-radio';
const radioModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
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
    :disabled="disabled"
  >
    <template #input>
      <input
        :class="[style['cdr-radio__input'], inputClass]"
        type="radio"
        :name="name"
        :value="customValue"
        v-bind="$attrs"
        :disabled="disabled"
        v-model="radioModel"
      >
    </template>
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrRadio.module.scss">
</style>
