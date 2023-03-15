<script>
import { useCssModule, computed, defineComponent } from 'vue';
import propValidator from '../../utils/propValidator';
import { buildBooleanClass } from '../../utils/buildClass';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
import mapClasses from '../../utils/mapClasses';
import uid from '../../utils/uid';

export default defineComponent({
  name: 'CdrSwitch',
  components: {
    IconCheckSm,
    IconXSm,
  },
  props: {
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
      default: false,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const style = useCssModule();
    const uniqueId = props.id ? props.id : uid();
    const baseClass = 'cdr-switch';
    const sizeClass = computed(() => (props.size
      ? `cdr-switch--${props.size}`
      : 'cdr-switch--medium'));
    const fullWidthClass = computed(() => props.fullWidth
      && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue);
      },
    });

    return {
      style,
      mapClasses,
      uniqueId,
      value,
      baseClass,
      sizeClass,
      fullWidthClass,
    };
  },
});
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
      <slot />
    </div>
    <label
      :class="style['cdr-switch__button']"
      role="switch"
      :aria-checked="modelValue"
      :aria-labelledby="uniqueId"
    >
      <input
        v-show="false"
        type="checkbox"
        v-model="value"
      >
      <icon-check-sm
        :class="style['cdr-switch__button-icon']"
        aria-hidden="true"
      />
      <icon-x-sm
        :class="style['cdr-switch__button-icon']"
        aria-hidden="true"
      />
      <div
        :class="style['cdr-switch__handle']"
        aria-hidden="true"
      />
    </label>
  </div>
</template>

<style lang="scss" module src="./styles/CdrSwitch.module.scss">
</style>
