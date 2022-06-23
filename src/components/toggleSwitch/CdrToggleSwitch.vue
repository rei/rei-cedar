<template>
  <div :class="style['cdr-toggle-switch']">
    <span :id="id" :class="style['cdr-toggle-switch__label']">{{ label }}</span>
    <button @click="(e) => emit('update:modelValue', e)"
 :class="style['cdr-toggle-switch__button']" role="switch" :aria-checked="modelValue" :aria-labelledby="id">
      <span>
        <icon-check-sm :class="style['cdr-toggle-switch__button-icon']" />
      </span>
      <span>
        <icon-x-sm :class="style['cdr-toggle-switch__button-icon']" />
      </span>
      <div :class="style['cdr-toggle-switch__slider']"></div>
    </button>
  </div>
</template>

<script setup>
import { useCssModule, computed } from 'vue';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
const onClick = (e) => {
  props.checked = !props.checked
  emit('switch', e);
}
const style = useCssModule();
const baseClass = 'cdr-toggle-switch';
</script>

<style lang="scss" module src="./styles/CdrToggleSwitch.scss">
</style>
