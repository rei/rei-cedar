<script setup lang="ts">
import {
  useCssModule, ref, watch, onMounted, useSlots
} from 'vue';
import tabbable from 'tabbable';
import IconXSm from '../icon/comps/x-sm.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrPopup from '../popup/CdrPopup.vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

/** Small overlay used to display contextual information */
defineOptions({
  name: 'CdrPopover'
});

const props = defineProps({
  /**
   * Sets the position where the popover will render relative to the trigger element.
   * @demoSelectMultiple false
   * @values top, bottom, left, right
   */
    position: {
    type: String,
    required: false,
    default: 'top',
    validator: (value: string) => propValidator(
      value,
      ['top', 'bottom', 'left', 'right'],
    ),
  },
  /**
   * If set to `true`, popover will attempt to dynamically set it's position to
   * ensure it renders within the visible browser window.
   * If `false` the popover will always render in the provided `position`.
   */
  autoPosition: {
    type: Boolean,
    required: false,
    default: true,
  },
  /** Sets the title for the popover content. Can also be provided via the `title` slot. */
  label: {
    type: String,
    required: false,
  },
  /** ID for the popover element, required for accessibility */
  id: {
    type: String,
    required: true,
  },
  /** Add custom class to the popover content wrapper. Allows for overriding size, styling, etc. */
  contentClass: {
    type: String,
    required: false,
  },
  /**
   * Used to programmatically control the popover state. Does not need to be set if you are using the `trigger` slot.
   * @demoIgnore true
   */
  open: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emits = defineEmits({
  /** Emits when popover is opened */
  opened: null,
  /** Emits when popover is closed */
  closed: null, 
});
const slots = useSlots();
const style = useCssModule();

const isOpen = ref(false);
let lastActive: Element | null;

const triggerEl = ref<HTMLDivElement | null>(null);
const popupEl = ref<InstanceType<typeof CdrPopup> | null>(null);

const hasTrigger = slots.trigger;
const hasTitle = slots.title || props.label;

const openPopover = (e?: Event) => {
  if (isOpen.value === true) {
    return;
  }
  const { activeElement } = document;

  lastActive = activeElement;
  isOpen.value = true;
  emits('opened', e);
  setTimeout(() => {
    const tabbables = tabbable(popupEl.value?.$el);
    if (tabbables[0]) tabbables[0].focus();
  }, 50);
};

const closePopover = (e?: Event) => {
  isOpen.value = false;
  emits('closed', e);
  if (lastActive) (lastActive as HTMLElement).focus();
};

const addHandlers = () => {
  const triggerElement = triggerEl.value?.children[0];
  if (triggerElement) {
    triggerElement.addEventListener('click', openPopover);
  }
};

watch(() => props.open, () => {
  // eslint-disable-next-line no-unused-expressions
  props.open ? openPopover() : closePopover();
});

onMounted(() => {
  addHandlers();

  const trigger = triggerEl.value?.children[0];
  if (trigger) {
    trigger.setAttribute('aria-controls', props.id);
    trigger.setAttribute('aria-haspopup', 'dialog');
  }
});

</script>

<template>
  <div
    :class="mapClasses(
      style,
      'cdr-popover--wrapper',
      hasTrigger ? 'cdr-popover--position' : '',
    )"
  >
    <div ref="triggerEl">
      <!-- @slot  Slot for the element that triggers the popover.
        Element should be a button and must be the first and only child of this slot.
        Event handlers are bound to this element automatically.-->
      <slot name="trigger" />
    </div>
    <cdr-popup
      role="dialog"
      ref="popupEl"
      @closed="closePopover"
      :position="position"
      :auto-position="autoPosition"
      :opened="isOpen"
      :aria-expanded="`${isOpen}`"
      :id="id"
      :content-class="contentClass"
    >
      <div :class="style['cdr-popover__container']">
        <div :class="style['cdr-popover__content']">
          <div
            v-if="hasTitle"
            :class="style['cdr-popover__title']"
          >
            <!-- @slot Sets the title for the popover. Can also be set with `label` prop -->
            <slot name="title">
              {{ label }}
            </slot>
          </div>
          <slot />
        </div>
        <cdr-button
          :class="style['cdr-popover__close-button']"
          icon-only
          @click="closePopover"
          aria-label="Close"
          size="small"
        >
          <slot name="icon">
            <icon-x-sm
              inherit-color
            />
            <!-- CdrPopover content -->
          </slot>
        </cdr-button>
      </div>
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrPopover.module.scss">
</style>
