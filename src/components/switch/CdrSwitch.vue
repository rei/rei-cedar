<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import { buildBooleanClass } from '../../utils/buildClass';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

/** Permits selection from two opposing options */
defineOptions({
  name: 'CdrSwitch',
});

const props = defineProps({
  /**
   * Sets a custom ID for the switch. If this value is not set, it will be auto-generated.
  */
  id: {
    type: String,
  },
  /**
   * Sets the size of the switch
   * @demoSelectMultiple false
   * @values medium, large
  */
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => propValidator(
      value,
      ['medium', 'large'],
    ),
  },
  /**
   * Sets the label and switch to expand to the full width of its container with `space-between`
   */
  fullWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * @demoIgnore true
  */
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  /**
   * Event emitted by v-model on switch
   * @param modelValue
   */
    'update:modelValue': null,
});

const style = useCssModule();
const uniqueId = props.id ? props.id : uid();
const onClick = (modelValue: boolean) => {
  emits('update:modelValue', !modelValue);
};
const baseClass = 'cdr-switch';
const sizeClass = computed(() => (props.size
  ? `cdr-switch--${props.size}`
  : 'cdr-switch--medium'));
const fullWidthClass = computed(() => props.fullWidth
  ? buildBooleanClass(baseClass, props.fullWidth, 'full-width')
  : ''
);
</script>

<template>
  <div
    :class="mapClasses(
      style,
      baseClass,
      fullWidthClass,
      sizeClass
    )"
  >
    <div
      :id="uniqueId"
      :class="style['cdr-switch__label']"
    >
      <!-- @slot The label for the switch -->
      <slot />
    </div>
    <button
      @click="onClick(modelValue)"
      :class="style['cdr-switch__button']"
      role="switch"
      :aria-checked="modelValue"
      :aria-labelledby="uniqueId"
    >
      <icon-check-sm :class="style['cdr-switch__button-icon']" />
      <icon-x-sm :class="style['cdr-switch__button-icon']" />
      <div :class="style['cdr-switch__handle']" />
    </button>
  </div>
</template>

<style lang="scss" module src="./styles/CdrSwitch.module.scss">
</style>
