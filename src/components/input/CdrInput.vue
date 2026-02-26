<script setup lang="ts">
import { useCssModule, computed, shallowRef, useSlots, useAttrs } from 'vue';
import type { InputHTMLAttributes } from 'vue';
import CdrLabelStandalone from '../labelStandalone/CdrLabelStandalone.vue';
import CdrFormError from '../formError/CdrFormError.vue';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';
import type { CdrInputProps } from './types';

/** Allows for data entry, editing, and search */
defineOptions({
  name: 'CdrInput',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CdrInputProps>(), {
  type: 'text',
  numeric: false,
  rows: 1,
  errorRole: 'status',
  error: false,
});

defineSlots<{
  /** Helper text above the input field */
  'helper-text-top'(props: Record<string, never>): any;
  /** Link or icon to the right above the input field. */
  'info'(props: Record<string, never>): any;
  /** Icon preceding text within the input field */
  'pre-icon'(props: Record<string, never>): any;
  /** Icon after text within the input field */
  'post-icon'(props: Record<string, never>): any;
  'info-action'(props: Record<string, never>): any;
  /** Helper text below the input field */
  'helper-text-bottom'(props: Record<string, never>): any;
  /** Error messaging text that is displayed when the `error` prop is true. */
  'error'(props: Record<string, never>): any;
}>();

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
const isFocused = shallowRef(false);
const hasHelperTop = computed(() => !!slots['helper-text-top']);
const hasHelperBottom = computed(() => !!slots['helper-text-bottom']);
const hasPreIcon = computed(() => !!slots['pre-icon']);
const hasPostIcon = computed(() => !!slots['post-icon']);
const hasPostIcons = computed(() =>
  slots['post-icon'] ? slots['post-icon']({}).length > 1 : false,
);
const hasInfo = computed(() => !!slots.info);
const hasInfoAction = computed(() => !!slots['info-action']);

const uniqueId = props.id ? props.id : uid();
const multilineClass = computed(() => (props.rows > 1 ? 'cdr-input--multiline' : ''));
const preIconClass = computed(() => (hasPreIcon.value ? 'cdr-input--preicon' : ''));
const postIconClass = computed(() => (hasPostIcon.value ? 'cdr-input--posticon' : ''));
const postIconsClass = computed(() => (hasPostIcons.value ? 'cdr-input--posticons' : ''));
const errorClass = computed(() => (props.error ? 'cdr-input--error' : ''));
const backgroundClass = computed(() => `cdr-input--${props.background}`);
const sizeClass = computed(() => (props.size ? `${baseClass}--${props.size}` : ''));
const focusedClass = computed(() => (isFocused.value ? 'cdr-input--focus' : ''));

const describedby = computed(() => {
  const helperText = [
    slots['helper-text-top'] ? `${uniqueId}-helper-text-top` : '',
    slots['helper-text-bottom'] ? `${uniqueId}-helper-text-bottom` : '',
    attrs['aria-describedby'],
  ]
    .filter((x) => x)
    .join(' ');

  if (props.error) {
    return `${uniqueId}-error`;
  }

  return helperText;
});

// Defining an interface for the inputAttrs object because Vue doesn't correctly infer inputmode type
interface InputAttrsObject extends InputHTMLAttributes {
  id: string;
}

const inputAttrs = computed<InputAttrsObject>(() => {
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
    :class="inputContainerClass"
    :label-class="labelClass"
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
        :class="
          mapClasses(
            style,
            baseClass,
            multilineClass,
            preIconClass,
            postIconClass,
            postIconsClass,
            errorClass,
            backgroundClass,
            sizeClass,
          )
        "
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
        :class="
          mapClasses(
            style,
            baseClass,
            preIconClass,
            postIconClass,
            postIconsClass,
            errorClass,
            backgroundClass,
            sizeClass,
          )
        "
        :disabled="disabled"
        :aria-required="required || undefined"
        :aria-invalid="!!error || undefined"
        :aria-errormessage="(!!error && `${uniqueId}-error`) || undefined"
        v-bind="inputAttrs"
        :aria-describedby="describedby || undefined"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputModel"
      />
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

    <template #error>
      <cdr-form-error
        :error="error"
        :id="`${uniqueId}-error`"
        :role="errorRole"
      >
        <template #error>
          <!-- @slot Error messaging text that is displayed when the `error` prop is true. -->
          <slot name="error" />
        </template>
      </cdr-form-error>
    </template>
  </cdr-label-standalone>
</template>

<style lang="scss" module src="./styles/CdrInput.module.scss" />
