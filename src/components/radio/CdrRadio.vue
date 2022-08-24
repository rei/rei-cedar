<script>
import {
  defineComponent, useCssModule, computed, ref,
} from 'vue';
import propValidator from '../../utils/propValidator';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';

export default defineComponent({
  name: 'CdrRadio',
  components: { CdrLabelWrapper },
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
  },

  setup(props, ctx) {
    const baseClass = 'cdr-radio';
    const radioModel = computed({
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
      radioModel,
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
