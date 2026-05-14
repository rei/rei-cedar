<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrFormErrorProps } from './types';
import IconErrorStroke from '../icon/comps/error-stroke.vue';

/**
 * CdrFormError - Displays error messages for form inputs
 *
 * Form errors provide feedback to users when input validation fails.
 * Use form errors to clearly communicate what went wrong and how to fix it.
 * Always pair error messages with visual indicators.
 */

defineOptions({
  name: 'CdrFormError',
});

defineProps<CdrFormErrorProps>();

defineSlots<{
  'error'(props: Record<string, never>): any;
}>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-form-error';
const iconClass: string = 'cdr-form-error__icon';
const activeErrorClass = 'cdr-form-error--active';
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
        <slot name="error">
          {{ error }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrFormError.module.scss" />
