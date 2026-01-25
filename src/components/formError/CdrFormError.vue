<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrFormErrorProps } from '../../types/interfaces';
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

const props = defineProps<CdrFormErrorProps>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-form-error';
const iconClass: string = 'cdr-form-error__icon';
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

<style lang="scss" module src="./styles/CdrFormError.module.scss" />
