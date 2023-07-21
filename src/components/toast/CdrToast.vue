<script setup lang="ts">
import {
  useCssModule, computed, ref, watch, onUpdated, useSlots,
} from 'vue';
import propValidator from '../../utils/propValidator';
import IconXSm from '../icon/comps/x-sm.vue';
import CdrButton from '../button/CdrButton.vue';

/** Non-modal dialog used to communicate the status of a task or process */
defineOptions({
  name: 'CdrToast',
});

const props = defineProps({
  /**
   * Sets the toast type.
   * @demoSelectMultiple false
   * @values info, success, warning, error, default
  */
  type: {
    type: String,
    validator: (value: string) => propValidator(
      value,
      ['info', 'warning', 'success', 'error', 'default'],
    ),
    default: 'default',
  },
  /**
   * Used to programmatically control the toast open/close state.
   * @demoIgnore true
  */
  open: {
    type: Boolean,
    default: false,
  },
  /** Set to `false` to disable automatic closing after the `dismissDelay`. */
  autoDismiss: {
    type: Boolean,
    default: true,
  },
  /** Sets the interval (in milliseconds) before the toast automatically closes. */
  dismissDelay: {
    type: Number,
    default: 5000,
  },
});

const emits = defineEmits({
  /** Emits when toast opens */
  open: null,
  /** Emits when toast closes */
  closed: null,
});

const style = useCssModule();
const slots = useSlots();

const baseClass = 'cdr-toast';
const hasIconLeft = slots['icon-left'];
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
  removeHandlers();
  opened.value = false;
  emits('closed', e);
};

const closeToastWithDelay = (e?: Event) => {
  timeout = setTimeout(() => {
    removeHandlers();
    opened.value = false;
    emits('closed', e);
  }, props.dismissDelay);
};

const addHandlers = () => {
  toastElement = toastEl.value;
  if (toastElement) {
    toastElement.addEventListener('mouseover', openToast);
    toastElement.addEventListener('mouseleave', closeToastWithDelay);
  }
};

const removeHandlers = () => {
  if (toastElement) {
    toastElement.removeEventListener('mouseover', openToast);
    toastElement.removeEventListener('mouseleave', closeToastWithDelay);
  }
};

watch(() => props.open, () => {
  if (props.open) openToast();
});

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
            <icon-x-sm
              inherit-color
            />
          </slot>
        </cdr-button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" module src="./styles/CdrToast.module.scss">
</style>
