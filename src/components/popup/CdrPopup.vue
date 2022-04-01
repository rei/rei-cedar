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
      :class="mapClasses(style, 'cdr-popup__content', contentClass)"
      ref="popupEl"
    >
      <slot />
    </div>
    <div :class="style['cdr-popup__arrow']" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
import {
 useCssModule, computed, ref, watch, nextTick, onMounted, onUnmounted,
} from 'vue';
import debounce from 'lodash/debounce';
import propValidator from '../../utils/propValidator.js';
import calculatePlacement from './calculatePlacement.js';
import mapClasses from '../../utils/mapClasses.js';
const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    required: false,
    default: 'top',
    validator: (value) => propValidator(
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
})

const emit = defineEmits(['closed'])
  const baseClass = 'cdr-popup';

  // const keyHandler = ref(undefined);
  // const clickHandler = ref(undefined);
  // const resizeHandler = ref(undefined); // NOT NEEDED?
  const pos = ref(props.position);
  const corner = ref(undefined);
  const exiting = ref(false);
  const popupRect = ref(undefined); // DOES this have to be a ref?
  const closed = ref(!props.opened);
  const popupEl = ref(null);
  const rootEl = ref(null);

  const positionClass = computed(() => (props.opened || exiting.value ? `cdr-popup--${pos.value}` : undefined));
  const cornerClass = computed(() => (corner.value ? `cdr-popup--corner-${corner.value}` : undefined));
  const openClass = computed(() => (props.opened ? 'cdr-popup--open' : undefined));
  const closedClass = computed(() => (closed.value && !exiting.value ? 'cdr-popup--closed' : undefined));
  const exitingClass = computed(() => (exiting.value ? 'cdr-popup--exit' : undefined));

  const closePopup = (e) => {
    emit('closed', e);
  };

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
      case 'Esc':
        closePopup(e);
        break;
      default: break;
    }
  };

  const handleClick = (e) => {
    nextTick(() => {
      if (e.target !== popupEl.value && !popupEl.value.contains(e.target)) {
        closePopup(e);
      }
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

  const measurePopup = () => {
    closed.value = false;
    nextTick(() => {
      popupRect.value = popupEl.value.getBoundingClientRect();
      closed.value = true;
    });
  };

  const handleOpened = () => {
    pos.value = props.position;
    corner.value = undefined;

    if (props.autoPosition) {
      nextTick(() => {
        const triggerRect = rootEl.value.parentElement.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        const calculated = calculatePlacement(triggerRect, popupRect.value, innerWidth, innerHeight, props.position);
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

  watch(() => props.position, () => pos.value = props.position);
  watch(() => props.opened, () => {
    // if (!!newValue === !!oldValue) return;
    // TODO: watch doesnt run unless it changes???? might need to use `watch`
    if (props.opened) {
      handleOpened();
    } else {
      handleClosed();
    }
  });

  onMounted(() => {
    measurePopup();
    // resizeHandler = handleResize.bind(this); TODO: bind this?
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClick);
    window.removeEventListener('resize', handleResize);
  });
const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrPopup.module.scss">
</style>
