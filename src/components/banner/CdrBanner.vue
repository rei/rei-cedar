/* eslint-disable no-unused-vars */
<template>
  <div :class="[style[baseClass], style[typeClass]]">
    <div :class="[style['cdr-banner__wrapper'], style[prominenceClass]]">
      <div :class="[style['cdr-banner__main']]">
        <div
          v-if="hasIconLeft"
          :class="[style['cdr-banner__icon-left']]"
        >
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-banner__message']]">
          <slot />
        </span>
        <div
          v-if="hasIconRight"
          :class="[style['cdr-banner__icon-right']]"
        >
          <slot name="icon-right" />
        </div>
      </div>
      <div
        v-if="hasMessageBody"
        :class="[style['cdr-banner__message-body']]"
      >
        <slot name="message-body" />
      </div>
    </div>
    <div
      v-if="hasInfoAction"
      :class="[style['cdr-banner__info-action']]"
    >
      <slot name="info-action" />
    </div>
  </div>
</template>

<script setup>
import {
  defineProps, useCssModule, computed, useSlots,
} from 'vue';
import propValidator from '../../utils/propValidator';
import { buildClass } from '../../utils/buildClass';

const slots = useSlots();
const props = defineProps({
  type: {
    type: String,
    validator: (value) => propValidator(
      value,
      ['info', 'warning', 'success', 'error', 'default'],
    ),
    default: 'default',
  },
});
const baseClass = 'cdr-banner';
const style = useCssModule();
const typeClass = computed(() => props.type && buildClass(baseClass, props.type));
const prominenceClass = computed(() => (slots['message-body']
  ? buildClass(`${baseClass}__wrapper`, 'prominence')
  : undefined));
const hasIconLeft = slots['icon-left'];
const hasIconRight = slots['icon-right'];
const hasMessageBody = slots['message-body'];
const hasInfoAction = slots['info-action'];

</script>

<style lang="scss" module src="./styles/CdrBanner.module.scss">
</style>
