<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import type { CdrBannerProps } from './types';

/**
 * CdrBanner - Provides contextual feedback messages for typical user actions
 *
 * Displays informational, warning, success, error, or default messages with optional
 * icons and action elements. Supports primary messages with expandable message bodies.
 */
defineOptions({
  name: 'CdrBanner',
});

const props = withDefaults(defineProps<CdrBannerProps>(), {
  type: 'default',
});

defineSlots<{
  /** Icon matching banner type (typically an inline SVG). Example: warning or info icon. */
  'icon-left'(): any;
  /** Primary message content. Example: `Your order has shipped.` */
  'default'(): any;
  /** Additional icon/action element. Example: close icon button. */
  'icon-right'(): any;
  /** Additional details under the main message. Example: remediation text or policy details. */
  'message-body'(): any;
  /** Secondary action area. Example: `More info` icon button. */
  'info-action'(): any;
}>();

const slots = useSlots();
const style = useCssModule();

/** Base CSS class for the banner component */
const baseClass = 'cdr-banner' as const;

/**
 * Computed class name for the banner type variant
 * @returns CSS class string for the current banner type
 */
const typeClass = computed<string>(() => `${baseClass}--${props.type}`);

/**
 * Computed class name for prominence styling when message body is present
 * @returns CSS class string for prominence styling or empty string
 */
const prominenceClass = computed<string>(() =>
  slots['message-body'] ? `${baseClass}__wrapper--prominence` : '',
);

/** Indicates if the icon-left slot has content */
const hasIconLeft = computed<boolean>(() => !!slots['icon-left']);

/** Indicates if the icon-right slot has content */
const hasIconRight = computed<boolean>(() => !!slots['icon-right']);

/** Indicates if the message-body slot has content */
const hasMessageBody = computed<boolean>(() => !!slots['message-body']);

/** Indicates if the info-action slot has content */
const hasInfoAction = computed<boolean>(() => !!slots['info-action']);
</script>

<template>
  <div :class="[style[baseClass], style[typeClass]]">
    <div :class="[style['cdr-banner__wrapper'], style[prominenceClass]]">
      <div :class="[style['cdr-banner__main']]">
        <div
          v-if="hasIconLeft"
          :class="[style['cdr-banner__icon-left']]"
        >
          <!-- @slot Icon matching banner type (typically inline SVG). -->
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-banner__message']]">
          <!-- @slot Primary message content. Example: `Your order has shipped.` -->
          <slot />
        </span>
        <div
          v-if="hasIconRight"
          :class="[style['cdr-banner__icon-right']]"
        >
          <!-- @slot Additional icon/action element. Example: close icon button. -->
          <slot name="icon-right" />
        </div>
      </div>
      <div
        v-if="hasMessageBody"
        :class="[style['cdr-banner__message-body']]"
      >
        <!-- @slot Additional details under the main message. -->
        <slot name="message-body" />
      </div>
    </div>
    <div
      v-if="hasInfoAction"
      :class="[style['cdr-banner__info-action']]"
    >
      <!-- @slot Secondary action area (for example, `More info` icon button). -->
      <slot name="info-action" />
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrBanner.module.scss" />
