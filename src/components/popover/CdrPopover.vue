<script setup lang="ts">
import { useCssModule, ref, computed, watch, onMounted, onUnmounted, useSlots } from 'vue';
import { tabbable } from 'tabbable';
import IconXSm from '../icon/comps/x-sm.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrPopup from '../popup/CdrPopup.vue';
import mapClasses from '../../utils/mapClasses';
import type { CdrPopoverProps } from './types';

/**
 * Small overlay used to display contextual information
 * @uses CdrButton, CdrIcon
 **/
defineOptions({
  name: 'CdrPopover',
});

const props = withDefaults(defineProps<CdrPopoverProps>(), {
  position: 'top',
  autoPosition: true,
  open: false,
});

defineSlots<{
  /** Slot for the element that triggers the popover.
        Element should be a button and must be the first and only child of this slot.
        Event handlers are bound to this element automatically. */
  'trigger'(props: Record<string, never>): any;
  /** Sets the title for the popover. Can also be set with `label` prop */
  'title'(props: Record<string, never>): any;
  'default'(props: Record<string, never>): any;
  'icon'(props: Record<string, never>): any;
}>();

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
let focusTimeoutId: ReturnType<typeof setTimeout> | undefined;

const triggerEl = ref<HTMLDivElement | null>(null);
const popupEl = ref<InstanceType<typeof CdrPopup> | null>(null);

const hasTrigger = computed(() => !!slots.trigger);
const hasTitle = computed(() => !!slots.title || !!props.label);

const openPopover = (e?: Event) => {
  if (isOpen.value === true) {
    return;
  }
  const { activeElement } = document;

  lastActive = activeElement;
  isOpen.value = true;
  emits('opened', e);
  focusTimeoutId = setTimeout(() => {
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

const removeHandlers = () => {
  const triggerElement = triggerEl.value?.children[0];
  if (triggerElement) {
    triggerElement.removeEventListener('click', openPopover);
  }
};

watch(
  () => props.open,
  () => {
    if (props.open) {
      openPopover();
    } else {
      closePopover();
    }
  },
  { immediate: true },
);

onMounted(() => {
  addHandlers();

  const trigger = triggerEl.value?.children[0];
  if (trigger) {
    trigger.setAttribute('aria-controls', props.id);
    trigger.setAttribute('aria-haspopup', 'dialog');
  }
});

onUnmounted(() => {
  removeHandlers();
  if (focusTimeoutId) clearTimeout(focusTimeoutId);
});
</script>

<template>
  <div
    :class="mapClasses(style, 'cdr-popover--wrapper', hasTrigger ? 'cdr-popover--position' : '')"
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
            <icon-x-sm inherit-color />
            <!-- CdrPopover content -->
          </slot>
        </cdr-button>
      </div>
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrPopover.module.scss" />
