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
const activeErrorClass = '--active-error';
const iconClass = 'cdr-form-error__icon';
const activeIconClass = 'cdr-form-error__icon--active';
</script>

<template>
  <div :class="[style[baseClass], error && style[activeErrorClass]]">
    <div :class="[style[iconClass], error && style[activeIconClass]]">
      <icon-error-stroke
        size="small"
        inherit-color
      />
    </div>
    <div
      aria-atomic="true"
      aria-relevant="all"
      role="status"
      style="display: inline-block"
    >
      <div v-if="error">
        <slot name="error">{{ error }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFormError.module.scss"></style>
