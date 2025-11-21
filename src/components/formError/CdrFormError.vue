<script setup lang="ts">
import { useCssModule } from 'vue';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

defineOptions({
  name: 'CdrFormError',
});

defineProps<{
  error: boolean | string;
  role?: string;
}>();

const style = useCssModule();
const baseClass = 'cdr-form-error';
const activeErrorClass = '--active-error';
const iconClass = 'cdr-form-error__icon';
</script>

<template>
  <div :class="[style[baseClass], error && style[activeErrorClass]]">
    <span
      :class="style[iconClass]"
      v-show="error"
    >
      <icon-error-stroke
        size="small"
        inherit-color
      />
    </span>
    <div
      :role="role || 'status'"
      aria-atomic="true"
      aria-relevant="all"
      style="display: inline-block"
    >
      <div v-if="error">
        <slot name="error">{{ error }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFormError.module.scss"></style>
