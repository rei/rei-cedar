<script setup lang="ts">
import {
  useCssModule, computed, ref, useSlots, useAttrs
} from 'vue';
import type { InputHTMLAttributes } from 'vue'
import propValidator from '../../utils/propValidator';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import sizeProps from '../../props/size';
import backgroundProps from '../../props/background';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

/** Allows for data entry, editing, and search */
defineOptions({
  name: 'CdrInput',
  inheritAttrs: false,
  customOptions: {},
});

const props = defineProps({
  /**
   * Custom ID that is mapped to the label ‘for’ attribute. If this value is not set, it will be randomly generated.
   */
  id: {
    type: String,
  },
  /**
   *  'type' attribute for the input as defined by w3c.
   *  Only supporting text|email|number|password|search|url|date|datetime-local.
   *  The increment/decrement webkit psuedo element is hidden for number.
   *  @demoSelectMultiple false
   *  @values text, email, number, password, search, url, tel, date, datetime-local
  */
  type: {
    type: [String],
    default: 'text',
    validator: (value: string) => propValidator(
      value,
      ['text', 'email', 'number', 'password', 'search', 'url', 'tel', 'date', 'datetime-local'],
    ),
  },
  /**
   * Sets the text value for the input label. Required for a11y compliance. Use ‘hideLabel’ if the label display is not desired. Required.
  */
  label: {
    type: String,
    required: true,
  },
  /**
   * Sets default attributes for an input that should launch a numeric keyboard but is not strictly a 'number' (credit card, security code, postal code, etc.). Should be used in conjunction with the default text type input. An `input` listener can be used to fully restrict input values to numerical characters only
   */
  numeric: {
    type: Boolean,
    default: false,
  },
  /**
   * Removes the label element but sets the input `aria-label` to `label` text for a11y.
  */
  hideLabel: Boolean,
  /**
   * Number of rows for input. Converts component to text-area if rows greater than 1.
  */
  rows: {
    type: Number,
    default: 1,
  },
  /**
   * Sets the background color the input is rendered on
   * @values primary, secondary
   */
  background: backgroundProps,
  /**
   * Sets the input field size
  * @demoSelectMultiple false
  * @values medium, large
  */
  size: sizeProps,

  /**
   * Sets the `role` attribute for the embedded error state messaging.
   */
  errorRole: {
    type: String,
    required: false,
    default: 'status',
  },
  /** Sets the input to an error state, displays the `error` slot if one is present. */
  error: {
    type: [Boolean, String],
    default: false,
  },
  /**
   * Sets the disabled state for the input field and label styling. Also, restricts user input.
   */
  disabled: Boolean,
  /**
   * Sets aria-required on the input field and displays an asterisk next to the input label.
   */
  required: Boolean,
  /**
   * Displays '(optional)' text next to the input label.
   */
  optional: Boolean,
  /** @ignore */
  modelValue: {
    type: [String, Number],
  },
  /** Adds a custom class to the cdr-label-standalone wrapping div */
  labelClass: String,
});

const emits = defineEmits({
      /**
     * Event emitted by v-model on the <input> element
     * @param modelValue
     */
     'update:modelValue': null,
});

const slots = useSlots();
const attrs = useAttrs();
const style = useCssModule();

const baseClass = 'cdr-input';
const isFocused = ref(false);
const hasHelperTop = slots['helper-text-top'];
const hasHelperBottom = slots['helper-text-bottom'];
const hasPreIcon = slots['pre-icon'];
const hasPostIcon = slots['post-icon'];
const hasPostIcons = slots['post-icon'] ? slots['post-icon']().length > 1 : false;
const hasInfo = slots.info;
const hasInfoAction = slots['info-action'];

const uniqueId = props.id ? props.id : uid();
const multilineClass = computed(() => props.rows > 1 ? 'cdr-input--multiline' : '');
const preIconClass = computed(() => hasPreIcon ? 'cdr-input--preicon' : '');
const postIconClass = computed(() => hasPostIcon ? 'cdr-input--posticon' : '');
const postIconsClass = computed(() => hasPostIcons ? 'cdr-input--posticons' : '');
const errorClass = computed(() => props.error ? 'cdr-input--error' : '');
const backgroundClass = computed(() => `cdr-input--${props.background}`);
const sizeClass = computed(() => props.size ? `${baseClass}--${props.size}` : '');
const focusedClass = computed(() => isFocused.value ? 'cdr-input--focus': '');

const describedby = computed(() => {
  const helperText = [
    slots['helper-text-top'] ? `${uniqueId}-helper-text-top` : '',
    slots['helper-text-bottom'] ? `${uniqueId}-helper-text-bottom` : '',
    attrs['aria-describedby'],
  ].filter((x) => x).join(' ');

  if (props.error) {
    return `${uniqueId}-error`;
  }

  return helperText;
});

// Defining an interface for the inputAttrs object because Vue doesn't correctly infer inputmode type
interface inputAttrsObject extends InputHTMLAttributes {
  id: string,
}

const inputAttrs = computed<inputAttrsObject>(() => {
  const isNum = props.numeric || props.type === 'number';
  return {
    id: uniqueId,
    autocomplete: 'off',
    pattern: isNum ? '[0-9]*' : undefined,
    inputmode: isNum ? 'numeric' : undefined,
    ...attrs,
  };
});
const inputModel = computed({
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
    :class="labelClass"
  >
    <template
      #helper
      v-if="hasHelperTop"
    >
      <!-- @slot Helper text above the input field -->
      <slot name="helper-text-top" />
    </template>
    <template
      #info
      v-if="hasInfo"
    >
      <!-- @slot Link or icon to the right above the input field.  -->
      <slot name="info" />
    </template>

    <div :class="mapClasses(style, 'cdr-input-wrap', focusedClass)">
      <textarea
        v-if="rows && rows > 1"
        :rows="rows"
        :class="mapClasses(style,
                           baseClass,
                           multilineClass,
                           preIconClass,
                           postIconClass,
                           postIconsClass,
                           errorClass,
                           backgroundClass,
                           sizeClass,
        )"
        :id="uniqueId"
        :disabled="disabled"
        :aria-required="required || undefined"
        :aria-invalid="!!error || undefined"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || undefined"
        :aria-describedby="describedby || undefined"
        v-bind="$attrs"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputModel"
      />
      <input
        v-else
        :type="type"
        :class="mapClasses(style,
                           baseClass,
                           preIconClass,
                           postIconClass,
                           postIconsClass,
                           errorClass,
                           backgroundClass,
                           sizeClass,
        )"
        :disabled="disabled"
        :aria-required="required || undefined"
        :aria-invalid="!!error || undefined"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || undefined"
        v-bind="inputAttrs"
        :aria-describedby="describedby || undefined"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputModel"
      >
      <span
        v-if="hasPreIcon"
        :class="style['cdr-input__pre-icon']"
      >
        <!-- @slot Icon preceding text within the input field -->
        <slot name="pre-icon" />
      </span>

      <span
        v-if="hasPostIcon"
        :class="style['cdr-input__post-icon']"
      >
        <!-- @slot Icon after text within the input field -->
        <slot name="post-icon" />
      </span>
    </div>

    <template
      #info-action
      v-if="hasInfoAction"
    >
      <!-- @slot Action-wrapped icon within the input field (precedes post-icon) -->
      <slot name="info-action" />
    </template>

    <template
      #helper-text-bottom
      v-if="hasHelperBottom && !error"
    >
      <span
        :id="`${uniqueId}-helper-text-bottom`"
        :class="style['cdr-input__helper-text']"
      >
        <!-- @slot Helper text below the input field -->
        <slot name="helper-text-bottom" />
      </span>
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

<style lang="scss" module src="./styles/CdrInput.module.scss">
</style>
