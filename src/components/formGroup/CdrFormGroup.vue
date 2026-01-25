<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrFormGroupProps } from '../../types/interfaces';
import mapClasses from '../../utils/mapClasses';
import CdrFormError from '../formError/CdrFormError.vue';
import uid from '../../utils/uid';

/**
 * CdrFormGroup - Groups related input elements together
 *
 * Form groups organize related form controls and provide a shared label.
 * Use form groups to collect related information and show validation errors
 * that apply to the entire group.
 */

defineOptions({
  name: 'CdrFormGroup',
});

const props = withDefaults(defineProps<CdrFormGroupProps>(), {
  label: '',
  error: false,
  required: false,
  optional: false,
});

/** Unique identifier for the form group, generated if not provided */
const uniqueId: string = props.id ? props.id : uid();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-form-group';

/** Computed class for error state */
const errorClass = computed<string>(() => (props.error ? 'cdr-form-group--error' : ''));

/** Computed class for disabled state */
const disabledClass = computed<string>(() => (props.disabled ? 'cdr-form-group--disabled' : ''));
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
      >
        *
      </span>
      <span
        v-if="optional && !required"
        :class="style['cdr-form-group__optional']"
      >
        (optional)
      </span>
    </legend>
    <div :class="mapClasses(style, 'cdr-form-group__wrapper', errorClass)">
      <!-- @slot CdrFormGroup content (form elements) -->
      <slot />
    </div>
    <cdr-form-error
      :error="error"
      v-if="error"
      :id="`${uniqueId}-error`"
      aria-live="polite"
    >
      <!-- @slot Error messaging template content that is displayed when `error` prop is true  -->
      <template #error>
        <slot name="error" />
      </template>
    </cdr-form-error>
  </fieldset>
</template>

<style lang="scss" module src="./styles/CdrFormGroup.module.scss" />
