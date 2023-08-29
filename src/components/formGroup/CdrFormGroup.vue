<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrFormError from '../formError/CdrFormError.vue';
import uid from '../../utils/uid';

/** Groups related input elements together */
defineOptions({
  name: 'CdrFormGroup',
});

const props = defineProps({
  /**
   * Custom ID that is mapped to the form error. If this value is not set, it will be randomly generated.
   * @demoIgnore true
   */
  id: String,
  /**
   * Sets the label/legend for the form group. Applies default text styles to this label.
   * To override that default text style or apply other customization, use the `label` slot.
   * @demoIgnore true
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * Sets the form group to an error state, displays the `error` slot if one is present.
   */
  error: {
    type: [Boolean, String],
    default: false,
  },
  /** Adds required label to the form group. */
  required: Boolean,
  /** Adds optional label to the form group. */
  optional: Boolean,
  /** Renders form group in a disabled state. */
  disabled: { type: Boolean, default: undefined },
});

const uniqueId = props.id ? props.id : uid();
const style = useCssModule();
const baseClass = 'cdr-form-group';
const errorClass = computed(() => props.error ? 'cdr-form-group--error' : '');
const disabledClass = computed(() => props.disabled ? 'cdr-form-group--disabled' : '');

</script>

<template>
  <fieldset
    :class="mapClasses(style, baseClass, disabledClass)"
    :disabled="disabled"
    :aria-invalid="!!error"
    :aria-errormessage="!!error ? `${uniqueId}-error` : undefined"
    :aria-describedby="!!error ? `${uniqueId}-error` : undefined"
  >
    <legend>
      <!-- @slot Overrides CdrFormGroup label/legend. Should be a text element -->
      <slot name="label">
        {{ label }}
      </slot>
      <span
        v-if="required"
        aria-label="required"
      > *</span>
      <span
        v-if="optional && !required"
        :class="style['cdr-form-group__optional']"
      > (optional)</span>
    </legend>
    <div :class="mapClasses(style, 'cdr-form-group__wrapper', errorClass)">
      <!-- @slot CdrFormGroup content (form elements) -->
      <slot />
    </div>
    <cdr-form-error
      :error="error"
      v-if="error"
      :id="`${uniqueId}-error`"
    >
      <!-- @slot Error messaging template content that is displayed when `error` prop is true  -->
      <template #error>
        <slot name="error" />
      </template>
    </cdr-form-error>
  </fieldset>
</template>

<style lang="scss" module src="./styles/CdrFormGroup.module.scss">
</style>
