<script>
import { defineComponent, useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrFormError from '../formError/CdrFormError.vue';
import uid from '../../utils/uid';

/** Groups related input elements together */
export default defineComponent({
  name: 'CdrFormGroup',
  components: {
    CdrFormError,
  },
  props: {
    id: {
      type: String,
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
  },

  setup(props) {
    const uniqueId = props.id ? props.id : uid();
    const baseClass = 'cdr-form-group';
    const errorClass = computed(() => props.error && 'cdr-form-group--error');
    const disabledClass = computed(() => props.disabled && 'cdr-form-group--disabled');
    return {
      style: useCssModule(),
      uniqueId,
      baseClass,
      errorClass,
      disabledClass,
      mapClasses,
    };
  },
});
</script>

<template>
  <fieldset
    :class="mapClasses(style, baseClass, disabledClass)"
    :disabled="disabled"
    :aria-invalid="!!error"
    :aria-errormessage="!!error && `${uniqueId}-error`"
    :aria-describedby="!!error && `${uniqueId}-error`"
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
      :id="`${uniqueId}-error`"
    >
      <template #error>
        <slot name="error" />
      </template>
    </cdr-form-error>
  </fieldset>
</template>

<style lang="scss" module src="./styles/CdrFormGroup.module.scss">
</style>
