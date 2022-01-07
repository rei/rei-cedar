<script setup>
import {
  useCssModule, computed, useSlots, ref, watch, onUpdated,
} from 'vue';
import propValidator from '../../utils/propValidator';
import IconXSm from '../icon/comps/x-sm';
import CdrButton from '../button/CdrButton';

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
  open: {
    type: Boolean,
    default: false,
  },
  autoDismiss: {
    type: Boolean,
    default: true,
  },
  dismissDelay: {
    type: Number,
    default: 5000,
  },
});
const emit = defineEmits(['open', 'closed']);

const baseClass = 'cdr-toast';
const style = useCssModule();
const hasIconLeft = slots['icon-left'];
const opened = ref(null);
const toastEl = ref(null);
let timeout;
let toastElement;

const typeClass = computed(() => props.type && `${baseClass}--${props.type}`);

const openToast = (e) => {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    emit('open', e);
  }
  opened.value = true;
  if (props.autoDismiss && !e) {
    closeToastWithDelay();
  }
};

const closeToast = (e) => {
  removeHandlers();
  opened.value = false;
  emit('closed', e);
};

const closeToastWithDelay = (e) => {
  timeout = setTimeout(() => {
    removeHandlers();
    opened.value = false;
    emit('closed', e);
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
          <slot name="icon-left" />
        </div>
        <span :class="[style['cdr-toast__message']]">
          <slot name="default" />
        </span>
        <cdr-button
          :class="[style['cdr-toast__close-button']]"
          icon-only
          @click="closeToast"
          aria-label="Close"
          size="small"
        >
          <icon-x-sm
            slot="icon"
            inherit-color
          />
        </cdr-button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" module src="./styles/CdrToast.module.scss">
</style>
