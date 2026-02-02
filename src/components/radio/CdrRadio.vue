<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrLabelWrapper from '../labelWrapper/CdrLabelWrapper.vue';
import type { CdrRadioProps } from '../../types/interfaces';

/** Permits the selection of only one option from a list of two or more */
defineOptions({
  name: 'CdrRadio',
  inheritAttrs: false,
  customOptions: {},
});

const props = withDefaults(defineProps<CdrRadioProps>(), {
  modifier: '',
});

const emits = defineEmits({
  /**
   * Event emitted by v-model on the radio's <input> element
   * @param modelValue
   */
  'update:modelValue': null,
});

const style = useCssModule();

const baseClass = 'cdr-radio';
const radioModel = computed({
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
        :class="[style['cdr-radio__input'], inputClass]"
        type="radio"
        :name="name"
        :value="customValue"
        v-bind="$attrs"
        :disabled="disabled"
        v-model="radioModel"
      >
    </template>
    <slot />
  </cdr-label-wrapper>
</template>

<style lang="scss" module src="./styles/CdrRadio.module.scss" />
