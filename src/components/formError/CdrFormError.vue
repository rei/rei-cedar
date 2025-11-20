<script setup lang="ts">
import { useCssModule } from 'vue';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

defineOptions({
  name: 'CdrFormError',
});

defineProps<{
  error: boolean | string;
}>();

const style = useCssModule();
const baseClass = 'cdr-form-error';
const iconClass = 'cdr-form-error__icon';
</script>

<template>
  <div :class="style[baseClass]">
    <span
      :style="{ display: error ? 'inline' : 'none' }"
      :class="style[iconClass]"
    >
      <icon-error-stroke
        size="small"
        inherit-color
      />
    </span>
    <div
      aria-atomic="true"
      aria-relevant="all"
      role="status"
      style="display: inline-block"
    >
      <span v-if="error">
        <slot name="error">{{ error }}</slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFormError.module.scss"></style>
