<script setup lang="ts">
import { useCssModule, computed, ref, watch, onUpdated, useSlots } from 'vue';
import { useEventListener } from '@vueuse/core';
import type { CdrToastProps } from './types';
import IconXSm from '../icon/comps/x-sm.vue';
import CdrButton from '../button/CdrButton.vue';

/**
 * Non-modal dialog used to communicate the status of a task or process
 * @uses CdrButton, CdrIcon
 **/
defineOptions({
  name: 'CdrToast',
});

const props = withDefaults(defineProps<CdrToastProps>(), {
  type: 'default',
  open: false,
  autoDismiss: true,
  dismissDelay: 5000,
});

defineSlots<{
  /** Icon matching toast messaging type */
  'icon-left'(props: Record<string, never>): any;
  /** CdrToast content */
  'default'(props: Record<string, never>): any;
  'icon'(props: Record<string, never>): any;
}>();

const emits = defineEmits({
  /** Emits when toast opens */
  open: null,
  /** Emits when toast closes */
  closed: null,
});

const style = useCssModule();
const slots: ReturnType<typeof useSlots> = useSlots();

const baseClass = 'cdr-toast';
const hasIconLeft = !!slots['icon-left'];
const opened = ref(false);
const toastEl = ref<HTMLDivElement | null>(null);
let timeout: ReturnType<typeof setTimeout>;
let toastElement: HTMLDivElement | null;

const typeClass = computed(() => props.type && `${baseClass}--${props.type}`);

const openToast = (e?: Event) => {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    emits('open', e);
  }
  opened.value = true;
  if (props.autoDismiss && !e) {
    closeToastWithDelay();
  }
};

const closeToast = (e?: Event) => {
  opened.value = false;
  emits('closed', e);
};

const closeToastWithDelay = (e?: Event) => {
  timeout = setTimeout(() => {
    opened.value = false;
    emits('closed', e);
  }, props.dismissDelay);
};

const addHandlers = () => {
  toastElement = toastEl.value;
  if (toastElement) {
    useEventListener(toastElement, 'mouseover', openToast);
    useEventListener(toastElement, 'mouseleave', closeToastWithDelay);
  }
};

watch(
  () => props.open,
  () => {
    if (props.open) openToast();
  },
);

onUpdated(() => {
  if (props.autoDismiss) addHandlers();
});
</script>

<template>
  <transition
    :enter-from-class="style['cdr-toast__transition--toast-enter-from']"
    :enter-active-class="style['cdr-toast__transition--toast-enter-active']"
    :leave-to-class="style['cdr-toast__transition--toast-leave-to']"
    :leave-active-class="style['cdr-toast__transition--toast-leave-active']"
  >
    <div
      v-if="opened"
      :class="[style[baseClass], style[typeClass]]"
      role="status"
      ref="toastEl"
    >
      <div :class="[style['cdr-toast__main']]">
        <div
          v-if="hasIconLeft"
          :class="[style['cdr-toast__icon-left']]"
        >
          <!-- @slot Icon matching toast messaging type -->
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-toast__message']]">
          <!-- @slot CdrToast content -->
          <slot name="default" />
        </span>
        <cdr-button
          :class="[style['cdr-toast__close-button']]"
          icon-only
          @click="closeToast"
          aria-label="Close"
          size="small"
        >
          <slot name="icon">
            <icon-x-sm inherit-color />
          </slot>
        </cdr-button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" module src="./styles/CdrToast.module.scss" />
