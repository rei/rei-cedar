<script setup lang="ts">
import { debounce } from '../../utils/debounce'
import tabbable from 'tabbable';
import {
  useCssModule, computed, ref, watch, onMounted, nextTick, onUnmounted, useAttrs,
} from 'vue';
import {
  CdrBreakpointSm, CdrSpaceOneX, CdrSpaceTwoX,
} from '@rei/cdr-tokens/dist/rei-dot-com/js/cdr-tokens.mjs';
import onTransitionEnd from './onTransitionEnd';
import CdrButton from '../button/CdrButton.vue';
import IconXLg from '../icon/comps/x-lg.vue';
import mapClasses from '../../utils/mapClasses';

/** Disruptive, action-blocking overlays used to display important information */
defineOptions({
  name: 'CdrModal'
});
const props = defineProps({
  /**
   * Toggles the state of the modal
   * @demoIgnore true
   */
    opened: {
    type: Boolean,
    required: true,
  },
  /**
   * Sets `aria-label` and modal title text. Can also use title slot to set title.
   */
  label: {
    type: String,
    required: true,
  },
  /**
   * Toggles the modal title text, which comes from `label` prop or `title` slot.
   */
  showTitle: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * Text for aria-describedby attribute. Applied to modal content element
   */
  ariaDescribedby: {
    type: String,
    required: false,
    default: null,
  },
  /**
   * Sets the `role` attribute on the modal content element
   * @values dialog, alertDialog
   */
  role: {
    type: String,
    required: false,
    default: 'dialog',
  },
  /**
   * Sets unique `id` for modal
   */
  id: {
    type: String,
    required: false,
    default: null,
  },
  /** Adds custom class to the `cdr-modal__overlay` div */
  overlayClass: String,
  /** Adds custom class to the `cdr-modal__outerWrap` div */
  wrapperClass: String,
  /** Adds custom class to the `cdr-modal__innerWrap` div */
  contentClass: String,
  /** Sets duration for modal's close animation */
  animationDuration: {
    type: Number,
    default: 300,
  },
});

const emits = defineEmits({
  /** Fires when modal is closed */
  closed: null,  
});

const attrs = useAttrs();
const style = useCssModule();

const baseClass = 'cdr-modal';
let unsubscribe: (() => void) | undefined;
let lastActive: Element | null;
const modalClosed = ref(!props.opened);
const isOpening = ref(false);

interface offsetValues {
  x: number | undefined,
  y: number | undefined,
} 
const offset = ref<offsetValues>({ x: undefined, y: undefined});
const headerHeight = ref(0);
const totalHeight = ref(0);
const scrollHeight = ref(0);
const offsetHeight = ref(0);
const offsetWidth = ref(0);
const clientWidth = ref(0);
const fullscreen = ref(false);

const modalEl = ref<HTMLDivElement | Element | null>(null);
const wrapperEl = ref<HTMLDivElement | null>(null);
const contentEl = ref<HTMLDivElement | null>(null);
const headerEl = ref<HTMLDivElement | null>(null);

const measureContent = () => {
  nextTick(() => {
    totalHeight.value = window.innerHeight;
    fullscreen.value = window.innerWidth < +CdrBreakpointSm;
    headerHeight.value = headerEl.value?.offsetHeight || 0;
    scrollHeight.value = contentEl.value?.scrollHeight || 0;
    offsetHeight.value = contentEl.value?.offsetHeight || 0;
    offsetWidth.value = contentEl.value?.offsetWidth || 0;
    clientWidth.value = contentEl.value?.clientWidth || 0;
  });
};

const onClick = (e?: Event) => {
  emits('closed', e);
};

const handleKeyDown = ({ key }: { key: string}) => {
  switch (key) {
    case 'Escape':
    case 'Esc':
      onClick();
      break;
    default: break;
  }
};
const handleFocus = (e: Event) => {
  const { documentElement } = document;
  if (modalEl.value?.contains(e.target as HTMLElement) || !documentElement) return;

  const tabbables = tabbable(documentElement);
  const these = tabbable(modalEl.value as Element);
  const nextIx = tabbables.indexOf(e.target as HTMLElement);
  const firstModalIx = tabbables.indexOf(these[0]);
  const nextRef = nextIx < firstModalIx ? these[these.length - 1] : these[0];
  if (nextRef) nextRef.focus();
};

const handleResize = debounce(() => {
  measureContent();
}, 300);

const addNoScroll = () => {
  const { documentElement, body } = document;
  offset.value = {
    x: window.scrollX
  || (documentElement || {}).scrollLeft
  || (body || {}).scrollLeft
  || 0,
    y: window.scrollY
  || (documentElement || {}).scrollTop
  || (body || {}).scrollTop
  || 0,
  };

  if (documentElement) {
    documentElement.classList.add('cdr-modal__noscroll');
    // keep current scroll position manually
    documentElement.style.top = `-${offset.value.y}px`;
    documentElement.style.left = `-${offset.value.x}px`;
  }

  if (body) {
    body.classList.add('cdr-modal__noscroll');
  }
};

const removeNoScroll = () => {
  const { documentElement, body } = document;

  if (body) {
    body.classList.remove('cdr-modal__noscroll');
  }

  if (documentElement) {
    documentElement.classList.remove('cdr-modal__noscroll');
    documentElement.style.top = '';
    documentElement.style.left = '';
  }
};

const addHandlers = () => {
  document.addEventListener('focusin', handleFocus, true);
  document.addEventListener('keydown', handleKeyDown);
};

const handleOpened = () => {
  const { activeElement } = document;
  addNoScroll();
  isOpening.value = true;
  modalClosed.value = false;
  lastActive = activeElement;

  nextTick(() => {
    if (modalEl.value) (modalEl.value as HTMLDivElement).focus(); // wrapped in if so testing error isn't thrown
    measureContent();
    addHandlers();

    setTimeout(() => {
      // for some reason Safari scrolls the wrapper down a bit?
      // doesn't work without setTimeout for some unknown reason
      if (wrapperEl.value) wrapperEl.value.scrollTop = 0;

      // there is a race condition for measuring overflow when modal defaults to open,
      // this seems to cover that
      measureContent();
    });
  });
};

const handleClosed = () => {
  const { documentElement } = document;
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('focusin', handleFocus, true);
  isOpening.value = false;

  unsubscribe = onTransitionEnd(
    wrapperEl.value,
    () => {
      if (isOpening.value) return;
      if (unsubscribe) unsubscribe();
      removeNoScroll();
      // unsubscribe = null;
      modalClosed.value = true;

      // handle scroll-behavior: smooth
      if (documentElement) documentElement.style.scrollBehavior = 'auto';
      // restore previous scroll position
      if (offset.value.x !== undefined && offset.value.y !== undefined) {
        window.scrollTo(offset.value.x, offset.value.y);
      }
      if (documentElement) documentElement.style.scrollBehavior = '';

      if (lastActive) (lastActive as HTMLElement).focus();
    },
    props.animationDuration + 16,
  );
};

const dialogAttrs = computed(() => ({
  ...attrs,
  'aria-describedby': props.ariaDescribedby,
  id: props.id,
}));
const verticalSpace = computed(() => {
  // contentWrap vertical padding
  const fullscreenSpace = Number(CdrSpaceTwoX);
  const windowedSpace = Number(CdrSpaceTwoX) + Number(CdrSpaceOneX);

  return fullscreen.value
    ? fullscreenSpace
    : windowedSpace + fullscreenSpace;
  // fullscreen, here, would account for outerWrap padding, which is the same CdrSpaceTwoX
});
    const scrollMaxHeight = computed(() => totalHeight.value
    - headerHeight.value
    - verticalSpace.value);

const scrollPadding = computed(() => {
  const isScrolling = scrollHeight.value > offsetHeight.value;
  const hasScrollbar = offsetWidth.value - clientWidth.value > 0;
  if (isScrolling && hasScrollbar) {
    return 4;
  } if (isScrolling) {
    return 12;
  }
  return 0;
});

watch(() => props.opened, (newValue, oldValue) => {
  if (!!newValue === !!oldValue) return;
  // eslint-disable-next-line no-unused-expressions
  newValue ? handleOpened() : handleClosed();
});

onMounted(() => {
  if (props.opened) {
    handleOpened();
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});


</script>

<template>
  <div
    :class="mapClasses(style, baseClass, !opened ? 'cdr-modal--closed' : '')"
    ref="wrapperEl"
  >
    <div
      :class="[style['cdr-modal__outerWrap'], wrapperClass]"
    >
      <div
        aria-hidden="true"
        @click="onClick"
        :class="[style['cdr-modal__overlay'], overlayClass]"
      />
      <!-- This div (and the one below) is used to avoid a screen reader "keyboard" trap where the
           content outside the modal is not properly obscured when opened using certain readers.
           Once more browsers catch up to the spec, this hack can probably be removed.
           https://a11ysupport.io/tests/apg__modal-dialog-example -->
      <div :tabIndex="opened ? '0' : undefined" />
      <div
        ref="modalEl"
        :class="mapClasses(style, 'cdr-modal__contentWrap', 'cdr-modal__dialog')"
        tabIndex="-1"
        :role="role"
        aria-modal="true"
        :aria-label="label"
        v-bind="dialogAttrs"
      >
        <!-- @slot Use to override the entire CdrModal content container.
          You must provide an explicit way to close the modal
          to meet UX and accessibility standards  -->
        <slot name="modal">
          <div
            :class="[style['cdr-modal__innerWrap'], contentClass]"
            :style="modalClosed ? {display: 'none'} : undefined"
          >
            <section>
              <div :class="style['cdr-modal__content']">
                <div
                  :class="style['cdr-modal__header']"
                  ref="headerEl"
                >
                  <div :class="style['cdr-modal__title']">
                    <!-- @slot Use to override the default title -->
                    <slot
                      name="title"
                      v-if="showTitle"
                    >
                      <h1>{{ label }}</h1>
                      <!-- @slot CdrModal content -->
                    </slot>
                  </div>
                  <cdr-button
                    :class="style['cdr-modal__close-button']"
                    icon-only
                    :with-background="true"
                    @click="onClick"
                    aria-label="Close"
                  >
                    <template #icon>
                      <icon-x-lg inherit-color />
                    </template>
                  </cdr-button>
                </div>

                <div
                  :class="style['cdr-modal__text-content']"
                  :style="{ maxHeight: `${scrollMaxHeight}px`, paddingRight: `${scrollPadding}px`}"
                  role="document"
                  ref="contentEl"
                  tabindex="0"
                >
                  <slot />
                </div>
              </div>
            </section>
          </div>

        </slot>
      </div>
      <div :tabIndex="opened ? '0' : undefined" />
    </div>
  </div>

</template>

<style lang="scss" module src="./styles/CdrModal.module.scss">
</style>
