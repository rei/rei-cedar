<template>
  <div :class="mapClasses(
    style,
    baseClass,
    fullWidthClass,
    sizeClass
  )">
    <div :id="uniqueId" :class="style['cdr-switch__label']">
      <slot />
    </div>
    <button @click="onClick(modelValue)" :class="style['cdr-switch__button']" role="switch" :aria-checked="modelValue"
      :aria-labelledby="uniqueId">
      <icon-check-sm :class="style['cdr-switch__button-icon']" />
      <icon-x-sm :class="style['cdr-switch__button-icon']" />
      <div :class="style['cdr-switch__handle']"></div>
    </button>
  </div>
</template>

<script setup>
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator.js';
import { buildBooleanClass } from '../../utils/buildClass.js';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
import mapClasses from '../../utils/mapClasses.js';
import uid from '../../utils/uid.js';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: {
    type: String,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => propValidator(
      value,
      ['medium', 'large'],
    ),
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const uniqueId = props.id ? props.id : uid();
const onClick = (modelValue) => {
  emit('update:modelValue', !modelValue);
}
const style = useCssModule();
const baseClass = 'cdr-switch';
const sizeClass = computed(() => props.size ? `cdr-switch--${props.size}` : "cdr-switch--medium")
const fullWidthClass = computed(() => props.fullWidth
  && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));
</script>

<style lang="scss" module src="./styles/CdrSwitch.module.scss">
</style>
