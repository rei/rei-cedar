<template>
  <fieldset
    :class="mapClasses(style, baseClass, disabledClass)"
    :disabled="disabled"
    :aria-invalid="!!error"
    :aria-errormessage="!!error && `${id}-error`"
  >
    <legend>
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
      <slot />
    </div>
    <cdr-form-error
      :error="error"
      v-if="error"
      :id="`${id}-error`"
    >
      <template #error>
        <slot name="error" />
      </template>
    </cdr-form-error>
  </fieldset>
</template>
<script setup>
import {useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrFormError from '../formError/CdrFormError';

const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    // Set error styling
    error: {
      type: [Boolean, String],
      default: false,
    },
    required: Boolean,
    optional: Boolean,
    disabled: Boolean,
  })

  const baseClass = 'cdr-form-group';
  const errorClass = computed(() => props.error && 'cdr-form-group--error');
  const disabledClass = computed(() => props.disabled && 'cdr-form-group--disabled');
  const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrFormGroup.module.scss">
</style>