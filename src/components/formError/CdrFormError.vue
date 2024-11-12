
<script setup lang="ts">
import { useCssModule } from 'vue';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

defineOptions({
  name: 'CdrFormError',
});

defineProps({
  error: [Boolean, String],
});
const style = useCssModule();
const baseClass = 'cdr-form-error';
const iconClass = 'cdr-form-error__icon';
</script>

<template>
  <div
    :class="style[baseClass]"
    role="status"
  >
    <span :class="style[iconClass]">
      <icon-error-stroke
        size="small"
        inherit-color
      />
    </span>
    <slot name="error">
      <span>{{ error }}</span>
    </slot>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFormError.module.scss">
</style>
