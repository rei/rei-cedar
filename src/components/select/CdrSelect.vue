<script setup lang="ts">
import { useCssModule, computed, useSlots, useAttrs, type PropType } from 'vue';
import { selectOption } from '../../types/interfaces';
import IconCaretDown from '../icon/comps/caret-down.vue';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

/** Allows the selection of one or more options from a dropdown list */
defineOptions({
  name: 'CdrSelect',
  inheritAttrs: false,
  customOptions: {}
});


const props = defineProps({
  /**
   * Custom ID that is mapped to the label ‘for’ attribute. If this value is not set, it will be auto-generated.
  */
  id: {
    type: String,
  },
  /**
   * Sets the text value for the select label.
   * Required for accessibility compliance. Use ‘hideLabel’ to
   * visually hide the label but keep it available to screenreaders.
  */
  label: {
    type: String,
    required: true,
  },
  /**
   * Visually hides the label element, but leaves it available to screen readers for accessibility compliance.
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
   * Build options programmatically with data.
   * Provide an array of objects [{ text: String, value: String}] for greater control
   * or provide an array of strings ['String'] for simpler setup (value and text will be the same).
  */
  options: {
    type: Array as PropType<selectOption[] | string[]>,
  },
  /**
   * Sets the background color the radio button is rendered on
   * @values primary, secondary
   */
  background: backgroundProps,
  /**
   * Sets the component's size; values can target responsive breakpoints. Example `small@lg`
   * @demoSelectMultiple false
   * @values small, medium, large
  */
  size: sizeProps,
  /** Sets the select to an error state, displays the `error` slot if one is present. */
  error: {
    type: [Boolean, String],
    default: false,
  },
  /**
  * Sets the `role` attribute for the embedded error state messaging.
  */
  errorRole: {
    type: String,
    default: 'status',
  },
  /** @ignore */
  modelValue: {
    type: [String, Number, Boolean, Object, Array, Symbol, Function],
  },
  /** Disables the input and sets appropriate styling */
  disabled: Boolean,
  /** Sets aria-required on the input field and displays an asterisk next to the select label */
  required: Boolean,
  /** Displays '(optional)' text next to the select label. */
  optional: Boolean,
  /** Turns CdrSelect into a multi-select element. */
  multiple: Boolean,
  /** Sets the height of the CdrSelect when using the multiple option.
   * This number corresponds to the number of select options that will be visible without scrolling.
   */
  multipleSize: Number,
});

const emits = defineEmits({
  /**
   * Event emitted by v-model on the radio's <input> element
   * @param modelValue
   */
    'update:modelValue': null,
});

const style = useCssModule();
const slots = useSlots();
const attrs = useAttrs();

const baseClass = 'cdr-select';
const hasHelper = slots['helper-text'];
const hasInfo = slots.info;
const hasInfoAction = slots['info-action'];
const hasPreIcon = slots['pre-icon'];
const uniqueId = props.id ? props.id : uid();

const multipleClass = computed(() => props.multiple ? 'cdr-select--multiple' : '');
const promptClass = computed(() => !props.modelValue ? 'cdr-select__prompt' : '');
const preIconClass = computed(() => hasPreIcon ? 'cdr-select--preicon' : '');
const errorClass = computed(() => props.error ? 'cdr-select--error' : '');
const backgroundClass = computed(() => `cdr-select--${props.background}`);
const sizeClass = computed(() => props.size ? `${baseClass}--${props.size}` : '');
const caretDisabledClass = computed(() => props.disabled ? 'cdr-select__caret--disabled' : '');

const describedby = computed(() => {
  const helperText = [
    slots['helper-text'] ? `${props.id}-helper-text-top` : '',
    attrs['aria-describedby'],
  ].filter((x) => x).join(' ');

  if (props.error) {
    return `${props.id}-error`;
  }

  return helperText;
});

const computedOpts = computed(() => {
  const optsArr: Array<selectOption> = [];
  if (props.options) {
    props.options.forEach((o) => {
      const optObj: selectOption = { text: '', value: ''};
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
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
  },
});
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
      <!-- @slot Helper text above the select field -->
      <slot name="helper-text" />
    </template>
    <template
      #info
      v-if="hasInfo"
    >
      <!-- @slot Link or icon to the right above the select field.  -->
      <slot name="info" />
    </template>

    <div :class="style['cdr-select-wrap']">
      <span
        v-if="hasPreIcon"
        :class="style['cdr-select__pre-icon']"
      >
        <!-- @slot Icon preceding text within the select field -->
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
        :aria-required="required || undefined"

        :aria-invalid="!!error || undefined"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || undefined"
        v-bind="$attrs"
        :aria-describedby="describedby || undefined"
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
        <!-- @slot CdrSelect content (<option> tags). Leave empty if using the `options` prop. -->
        <slot />
      </select>

      <icon-caret-down :class="mapClasses(style, 'cdr-select__caret', caretDisabledClass)" />
    </div>

    <template
      #info-action
      v-if="hasInfoAction"
    >
      <!-- @slot Action-wrapped icon to the right of the select field -->
      <slot name="info-action" />
    </template>

    <template
      #error
      v-if="error"
    >
      <cdr-form-error
        :error="error"
        :role="errorRole"
        :id="`${uniqueId}-error`"
        v-if="error"
      >
        <template #error>
          <!-- @slot Error messaging text that is displayed when the `error` prop is true. -->
          <slot name="error" />
        </template>
      </cdr-form-error>
    </template>
  </cdr-label-standalone>
</template>

<style lang="scss" module src="./styles/CdrSelect.module.scss">
</style>
