<script>
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
import { useCssModule, useSlots, useAttrs, computed } from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import sizeProps from '../../props/size.js';
import backgroundProps from '../../props/background.js';
import mapClasses from '../../utils/mapClasses.js';
import uid from '../../utils/uid.js';
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  /**
   * `id` for the select that is mapped to the label `for` attribute. If one is not provided, it will be generated.
  */
  id: {
    type: String,
  },
  /**
   * Label text. This is required for a11y even if hiding the label with `hideLabel`.
  */
  label: {
    type: String,
    required: true,
  },
  /**
   * Removes the label element but sets the select `aria-label` to `label` text for a11y.
  */
  hideLabel: {
    type: Boolean,
    default: false,
  },
  /**
   * Adds an option that is disabled and selected by default to serve as a `placeholder` for the select.
  */
  prompt: String,
  /**
   * Build options programatically with data. Array of objects [{ text: String, value: String}] to give greater control. Array of strings ['String'] for simpler setup (value and text will be the same).
  */
  options: {
    type: Array,
  },
  // Set which background type the select renders on
  background: backgroundProps,
  size: sizeProps,
  // Set error styling
  error: {
    type: [Boolean, String],
    default: false,
  },
  /**
  * Override the error message role, default is `status`.
  */
  errorRole: {
    type: String,
    required: false,
    default: 'status',
  },
  modelValue: {
    type: [String, Number, Boolean, Object, Array, Symbol, Function],
  },
  disabled: Boolean,
  required: Boolean,
  optional: Boolean,
  multiple: Boolean,
  multipleSize: Number,
})
const slots = useSlots();
const attrs = useAttrs();
const baseClass = 'cdr-select';
const hasHelper = slots['helper-text'];
const hasInfo = slots.info;
const hasInfoAction = slots['info-action'];
const hasPreIcon = slots['pre-icon'];
const uniqueId = props.id ? props.id : uid();


const multipleClass = computed(() => props.multiple && 'cdr-select--multiple');
const promptClass = computed(() => !props.modelValue && 'cdr-select__prompt');
const preIconClass = computed(() => hasPreIcon && 'cdr-select--preicon');
const errorClass = computed(() => props.error && 'cdr-select--error');
const backgroundClass = computed(() => `cdr-select--${props.background}`);
const sizeClass = computed(() => props.size && `${baseClass}--${props.size}`);
const caretDisabledClass = computed(() => props.disabled && 'cdr-select__caret--disabled');

const describedby = computed(() => {
  return [
    slots['helper-text'] ? `${uniqueId}-helper-text-top` : '',
    attrs['aria-describedby'],
  ].filter((x) => x).join(' ');
})

// TODO: refactor, would be much clearer as a 1-2 liner
const computedOpts = computed(() => {
  const optsArr = [];
  if (props.options) {
    props.options.forEach((o) => {
      const optObj = {};
      let text = '';
      let val = '';
      if (typeof o === 'string') {
        text = o;
        val = o;
      } else {
        const { text: t, value: v } = o;
        text = t;
        val = v;
      }
      optObj.text = text;
      optObj.value = val;
      optsArr.push(optObj);
    });
  }
  return optsArr;
});

const selectModel = computed({
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
  <cdr-label-standalone
    :for-id="uniqueId"
    :label="label"
    :hide-label="hideLabel"
    :required="required"
    :optional="optional"
    :disabled="disabled"
  >
    <template
      #helper
      v-if="hasHelper"
    >
      <slot name="helper-text" />
    </template>
    <template
      #info
      v-if="hasInfo"
    >
      <slot name="info" />
    </template>

    <!-- default slot -->
    <div :class="style['cdr-select-wrap']">
      <span
        v-if="hasPreIcon"
        :class="style['cdr-select__pre-icon']"
      >
        <slot name="pre-icon" />
      </span>

      <select
        :id="uniqueId"
        :class="mapClasses(style,
          baseClass,
          sizeClass,
          promptClass,
          multipleClass,
          backgroundClass,
          errorClass,
          preIconClass,
        )"
        :multiple="multiple"
        :size="multipleSize"
        :disabled="disabled"
        :aria-required="required || null"

        :aria-invalid="!!error || null"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || null"
        v-bind="$attrs"
        :aria-describedby="describedby || null"
        :value="modelValue"
        v-model="selectModel"
      >
        <option
          v-if="prompt"
          :class="style['cdr-select__prompt']"
          value=""
          disabled
        >
          {{ prompt }}
        </option>
        <option
          v-for="option in computedOpts"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
        <slot />
      </select>

      <icon-caret-down :class="mapClasses(style, 'cdr-select__caret', caretDisabledClass)" />
    </div>

    <template #info-action v-if="hasInfoAction">
      <slot name="info-action" />
    </template>

    <template #error v-if="error">
      <cdr-form-error
        :error="error"
        :role="errorRole"
        :id="`${uniqueId}-error`"
        v-if="error"
      >
        <template #error>
          <slot name="error" />
        </template>
      </cdr-form-error>
    </template>
  </cdr-label-standalone>
</template>

<style lang="scss" module src="./styles/CdrSelect.module.scss">
</style>
