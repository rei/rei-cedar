<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import CdrStatusIcon from '../statusIcon/CdrStatusIcon.vue';
import { Status } from '../../types/other';

/** Provides contextual feedback messages for typical user actions */

defineOptions({ name: 'CdrBanner' });

export interface CdrStatusIconProps {
  /**
   * Sets the banner style.
   * @demoSelectMultiple false
   * @values info, warning, success, error, default
   */
  type?: Status;
}

const props = withDefaults(defineProps<CdrStatusIconProps>(), {
  type: 'default',
});

const slots = useSlots();
const style = useCssModule();
const baseClass = 'cdr-banner';
const typeClass = computed(() => `${baseClass}--${props.type}`);
const prominenceClass = computed(() =>
  slots['message-body'] ? `${baseClass}__wrapper--prominence` : '',
);
const hasIconLeft = slots['icon-left'];
const hasIconRight = slots['icon-right'];
const hasMessageBody = slots['message-body'];
const hasInfoAction = slots['info-action'];
</script>

<template>
  <div :class="[style[baseClass], style[typeClass]]">
    <div :class="[style['cdr-banner__wrapper'], style[prominenceClass]]">
      <div :class="[style['cdr-banner__main']]">
        <CdrStatusIcon
          v-if="hasIconLeft"
          :type="type"
          :class="[style['cdr-banner__icon-left']]"
        >
          <!-- @slot Icon matching banner type -->
          <slot name="icon-left" />
        </CdrStatusIcon>
        <span :class="[style['cdr-banner__message']]">
          <!-- @slot Primary message content -->
          <slot />
        </span>
        <CdrStatusIcon
          v-if="hasIconRight"
          :class="[style['cdr-banner__icon-right']]"
        >
          <!-- @slot Additional icon -->
          <slot name="icon-right" />
        </CdrStatusIcon>
      </div>
      <div
        v-if="hasMessageBody"
        :class="[style['cdr-banner__message-body']]"
      >
        <!-- @slot Additional content about the message -->
        <slot name="message-body" />
      </div>
    </div>
    <div
      v-if="hasInfoAction"
      :class="[style['cdr-banner__info-action']]"
    >
      <!-- @slot Action-wrapped icon -->
      <slot name="info-action" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrBanner.module.scss"></style>
