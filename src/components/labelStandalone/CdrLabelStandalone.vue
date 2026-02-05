<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import type { CdrLabelStandaloneProps } from './types';
import mapClasses from '../../utils/mapClasses';

/**
 * Standalone label component for form elements.
 * Provides accessible labeling with support for helper text, required/optional indicators, and error states.
 */
defineOptions({
  name: 'CdrLabelStandalone',
});

const props = withDefaults(defineProps<CdrLabelStandaloneProps>(), {
  labelClass: '',
});

defineSlots<{
  'helper'(props: Record<string, never>): any;
  'default'(props: Record<string, never>): any;
  'info-action'(props: Record<string, never>): any;
  'info'(props: Record<string, never>): any;
  'helper-text-bottom'(props: Record<string, never>): any;
  'error'(props: Record<string, never>): any;
}>();
const slots = useSlots();
const style = useCssModule();

const baseClass = 'cdr-label-standalone';
const hasHelper = computed(() => !!slots.helper);
const hasInfo = computed(() => !!slots.info);
const hasInfoAction = computed(() => !!slots['info-action']);
const disabledLabelClass = computed(() =>
  props.disabled ? 'cdr-label-standalone__label--disabled' : '',
);
const srOnlyLabelClass = computed(() =>
  props.hideLabel ? 'cdr-label-standalone__label--sr-only' : '',
);
const inputSpacingClass = computed(() =>
  !props.hideLabel || hasHelper.value || hasInfo.value ? 'cdr-label-standalone__input-spacing' : '',
);
</script>

<template>
  <div :class="style[baseClass]">
    <div :class="style['cdr-label-standalone__label-wrapper']">
      <label
        :class="
          mapClasses(
            style,
            'cdr-label-standalone__label',
            disabledLabelClass,
            srOnlyLabelClass,
          ).concat(` ${labelClass}`)
        "
        :for="forId"
      >
        {{ label }}{{ required || optional ? '' : '' }}
        <span
          v-if="required"
          aria-hidden="true"
        >
          *
        </span>

        <span
          v-else-if="optional"
          :class="style['cdr-label-standalone__optional']"
        >
          (optional)
        </span>
      </label>

      <br v-if="!hideLabel && hasHelper">
      <span
        :class="style['cdr-label-standalone__helper']"
        :id="`${forId}-helper-text-top`"
        v-if="hasHelper"
      >
        <slot name="helper" />
      </span>
    </div>
    <div :class="mapClasses(style, 'cdr-label-standalone__input-wrap', inputSpacingClass)">
      <slot />
      <div
        v-if="hasInfoAction"
        :class="style['cdr-label-standalone__info-action']"
      >
        <slot name="info-action" />
      </div>
    </div>

    <span
      v-if="hasInfo"
      :class="style['cdr-label-standalone__info']"
    >
      <slot name="info" />
    </span>

    <div :class="style['cdr-label-standalone__post-content']">
      <slot name="helper-text-bottom" />
      <slot name="error" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLabelStandalone.module.scss" />
