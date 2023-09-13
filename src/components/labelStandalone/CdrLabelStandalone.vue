<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import mapClasses from '../../utils/mapClasses';

defineOptions({
  name: 'CdrLabelStandalone',
});

const props = defineProps({
  forId: {
      type: String,
      required: true,
    },
    label: String,
    disabled: Boolean,
    required: Boolean,
    optional: Boolean,
    hideLabel: Boolean,
});
const slots = useSlots();
const style = useCssModule();

const baseClass = 'cdr-label-standalone';
const hasHelper = slots.helper;
const hasInfo = slots.info;
const hasInfoAction = slots['info-action'];
const disabledLabelClass = computed(() => props.disabled
  ? 'cdr-label-standalone__label--disabled'
  : '');
const srOnlyLabelClass = computed(() => props.hideLabel
  ? 'cdr-label-standalone__label--sr-only'
  : '');
const inputSpacingClass = computed(() => (!props.hideLabel || hasHelper || hasInfo)
  ? 'cdr-label-standalone__input-spacing'
  : '');

</script>

<template>
  <div :class="style[baseClass]">
    <div :class="style['cdr-label-standalone__label-wrapper']">
      <label
        :class="mapClasses(style,
                           'cdr-label-standalone__label',
                           disabledLabelClass,
                           srOnlyLabelClass)"
        :for="forId"
      >
        {{ label }}{{ required || optional ? '' : '' }}
        <span
          v-if="required"
          aria-hidden="true"
        >*</span>

        <span
          v-else-if="optional"
          :class="style['cdr-label-standalone__optional']"
        >(optional)</span>
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
    <div
      :class="mapClasses(style,
                         'cdr-label-standalone__input-wrap',
                         inputSpacingClass)"
    >
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

<style lang="scss" module src="./styles/CdrLabelStandalone.module.scss">
</style>
