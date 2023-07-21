<script setup lang="ts">
import {
  useCssModule, computed, ref, watch, nextTick, onMounted, onUnmounted,
} from 'vue';
import { debounce } from '../../utils/debounce';
import propValidator from '../../utils/propValidator';
import calculatePlacement from './calculatePlacement';
import mapClasses from '../../utils/mapClasses';

/** An internal helper component used by Popover and Tooltip */
defineOptions({
  name: 'CdrPopup',
  inheritAttrs: false,
  customOptions: {},
});

const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    required: false,
    default: 'top',
    validator: (value: string) => propValidator(
      value,
      ['top', 'bottom', 'left', 'right'],
    ),
  },
  autoPosition: {
    type: Boolean,
    default: true,
  },
  contentClass: {
    type: String,
  },
});

const emits = defineEmits({
  closed: null,
});

const style = useCssModule();

const baseClass = 'cdr-popup';

const pos = ref(props.position);
const corner = ref<string | undefined>(undefined);
const exiting = ref(false);
const popupRect = ref<DOMRect | undefined>(undefined);
const closed = ref(!props.opened);
const popupEl = ref<HTMLDivElement | null>(null);
const rootEl = ref<HTMLDivElement | null>(null);

const positionClass = computed(() => (props.opened || exiting.value
  ? `cdr-popup--${pos.value}`
  : ''));
const cornerClass = computed(() => (corner.value
  ? `cdr-popup--corner-${corner.value}`
  : ''));
const openClass = computed(() => (props.opened
  ? 'cdr-popup--open'
  : ''));
const closedClass = computed(() => (closed.value && !exiting.value
  ? 'cdr-popup--closed'
  : ''));
const exitingClass = computed(() => (exiting.value
  ? 'cdr-popup--exit'
  : ''));

const closePopup = (e: Event) => {
  emits('closed', e);
};

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Escape':
    case 'Esc':
      closePopup(e);
      break;
    default: break;
  }
};

const handleClick = (e: MouseEvent) => {
  nextTick(() => {
    if (e.target !== popupEl.value && !popupEl.value?.contains(e.target as Node)) {
      closePopup(e);
    }
  });
};

const measurePopup = () => {
  closed.value = false;
  nextTick(() => {
    popupRect.value = popupEl.value?.getBoundingClientRect();
    closed.value = true;
  });
};

const handleResize = () => {
  debounce(() => {
    measurePopup();
  }, 300);
};

const addHandlers = () => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClick);
};

const handleOpened = () => {
  pos.value = props.position;
  corner.value = undefined;

  if (props.autoPosition) {
    nextTick(() => {
      const triggerRect = rootEl.value?.parentElement?.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;
      const calculated = calculatePlacement(
        triggerRect,
        popupRect.value,
        innerWidth,
        innerHeight,
        props.position,
      );
      pos.value = calculated.pos;
      corner.value = calculated.corner;
    });
  }

  closed.value = false;

  setTimeout(() => {
    addHandlers();
  }, 1);
};

const handleClosed = () => {
  closed.value = true;
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClick);
  exiting.value = true;
  setTimeout(() => {
    exiting.value = false;
  }, 200); // $cdr-duration-2;
};

// eslint-disable-next-line no-return-assign
watch(() => props.position, () => pos.value = props.position);
watch(() => props.opened, () => {
  if (props.opened) {
    handleOpened();
  } else {
    handleClosed();
  }
});

onMounted(() => {
  measurePopup();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClick);
  window.removeEventListener('resize', handleResize);
});

</script>
<template>
  <div
    ref="rootEl"
    :class="mapClasses(
      style,
      baseClass,
      openClass,
      exitingClass,
      positionClass,
      cornerClass,
      closedClass,
    )"
  >
    <div
      v-bind="$attrs"
      :class="[style['cdr-popup__content'], contentClass]"
      ref="popupEl"
    >
      <slot />
    </div>
    <div :class="style['cdr-popup__arrow']" />
  </div>
</template>

<style lang="scss" module src="./styles/CdrPopup.module.scss">
</style>
