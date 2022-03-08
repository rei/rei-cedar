<template>
  <div :class="style[baseClass]" role="status" tabindex="0">
    <span :class="style[iconClass]">
      <icon-error-stroke size="small" inherit-color />
    </span>
    <slot name="error">
      <span>{{error}}</span>
    </slot>
  </div>
</template>

<script setup>
import { useCssModule } from 'vue';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

const props = defineProps({
  error: [Boolean, String],
})

const style = useCssModule();
const baseClass = 'cdr-form-error';
const iconClass = 'cdr-form-error__icon';
</script>

<style lang="scss" module src="./styles/CdrFormError.module.scss">
</style>
