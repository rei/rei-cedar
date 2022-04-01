<script>
  export default {
    inheritAttrs: false,
    customOptions: {}
  }
</script>
<script setup>
import { useCssModule, computed, ref, defineEmits } from 'vue';

import propValidator from '../../utils/propValidator.js';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import sizeProps from '../../props/size.js';
import backgroundProps from '../../props/background.js';

const props = defineProps({
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
     * Sets the name of the radio. Required.
    */
    name: {
      type: String,
      required: true,
    },

    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'hide-figure']),
    },

    size: sizeProps,

    // Set which background type the input renders on
    background: backgroundProps,

    /**
     * Sets the value of the radio. Required.
    */
    customValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
    },

    /** @ignore v-model binding */
    modelValue: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
    },
})
const emit = defineEmits(['update:modelValue']);

const baseClass = 'cdr-radio';
const newValue = ref(props.modelValue);
const radioModel = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
const style = useCssModule();
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
        :class="[style['cdr-radio__input'], inputClass]"
        type="radio"
        :name="name"
        :value="customValue"
        v-bind="$attrs"
        v-model="radioModel"
      >
    </template>
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrRadio.module.scss">
</style>
