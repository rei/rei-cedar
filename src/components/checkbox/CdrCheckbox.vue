<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { Directive } from 'vue';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import type { CdrCheckboxProps } from './types';

/** Allows selecting one or more items from a list */
defineOptions({
  name: 'CdrCheckbox',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CdrCheckboxProps>(), {
  indeterminate: false,
  trueValue: true,
  falseValue: false,
  background: 'primary',
  modifier: '',
});

defineSlots<{
  /** Readable text for the label element */
  'default'(props: Record<string, never>): any;
}>();
const emits = defineEmits({
  /**
   * Event emitted by v-model on the <input> element
   * @param modelValue
   */
  'update:modelValue': null,
});
/**
 * Custom directive to manage indeterminate state on checkbox input
 */
const vIndeterminate: Directive<HTMLElement> = {
  mounted(el, binding) {
    if (binding.value) {
      el.setAttribute('indeterminate', binding.value);
      return;
    }
    el.removeAttribute('indeterminate');
  },
  updated(el, binding) {
    if (binding.value) {
      el.setAttribute('indeterminate', binding.value);
      return;
    }
    el.removeAttribute('indeterminate');
  },
};

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-checkbox';

/** Computed two-way binding for checkbox value */
const checkboxModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits('update:modelValue', newValue);
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
    :disabled="disabled"
  >
    <template #input>
      <input
        :class="[style['cdr-checkbox__input'], inputClass]"
        :disabled="disabled"
        type="checkbox"
        v-bind="$attrs"
        :true-value="customValue ? null : trueValue"
        :false-value="customValue ? null : falseValue"
        :value="customValue"
        v-indeterminate="indeterminate"
        v-model.lazy="checkboxModel"
      />
    </template>
    <template #svgs>
      <div :class="style['cdr-checkbox__svg-box']">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            role="presentation"
            d="M9.673 18.669h.001L19.766 6.644a1 1 0 10-1.532-1.286l-9.3
            11.085-3.169-3.776a1 1 0 10-1.532 1.286l3.875 4.618a.999.999 0 001.565.099z"
          />
        </svg>
      </div>
    </template>
    <!-- @slot Readable text for the label element -->
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrCheckbox.module.scss" />
