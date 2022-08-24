<script>
import { useCssModule, computed, defineComponent } from 'vue';
import propValidator from '../../utils/propValidator.js';
import { buildBooleanClass } from '../../utils/buildClass.js';
import IconCheckSm from '../icon/comps/check-sm.vue';
import IconXSm from '../icon/comps/x-sm.vue';
import mapClasses from '../../utils/mapClasses.js';
import uid from '../../utils/uid.js';

export default defineComponent({
  name: 'CdrSwitch',
  components: {
    IconCheckSm,
    IconXSm
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
      default: false
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  setup(props, ctx) {
    const style = useCssModule();
    const uniqueId = props.id ? props.id : uid();
    const onClick = (modelValue) => {
      ctx.emit('update:modelValue', !modelValue);
    }
    const baseClass = 'cdr-switch';
    const sizeClass = computed(() => props.size ? `cdr-switch--${props.size}` : "cdr-switch--medium")
    const fullWidthClass = computed(() => props.fullWidth
      && buildBooleanClass(baseClass, props.fullWidth, 'full-width'));

    return {
      style,
      mapClasses,
      uniqueId,
      onClick,
      baseClass,
      sizeClass,
      fullWidthClass
    }
  }
})
</script>

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


<style lang="scss" module src="./styles/CdrSwitch.module.scss">
</style>
