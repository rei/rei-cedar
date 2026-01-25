<script setup lang="ts">
import { useCssModule, computed, useSlots } from 'vue';
import type { CdrBannerProps } from '../../types/interfaces';

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
          <!-- @slot Icon matching banner type -->
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-banner__message']]">
          <!-- @slot Primary message content -->
          <slot />
        </span>
        <div
          v-if="hasIconRight"
          :class="[style['cdr-banner__icon-right']]"
        >
          <!-- @slot Additional icon -->
          <slot name="icon-right" />
        </div>
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

<style lang="scss" module src="./styles/CdrBanner.module.scss" />
