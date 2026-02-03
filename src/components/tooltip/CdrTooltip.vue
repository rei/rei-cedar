<script setup lang="ts">
import { useCssModule, ref, onMounted, watch, useSlots } from 'vue';
import type { CdrTooltipProps } from './types';
import mapClasses from '../../utils/mapClasses';
import CdrPopup from '../popup/CdrPopup.vue';
import uid from '../../utils/uid';

/** Floating label used to clarify interface actions */
defineOptions({
  name: 'CdrTooltip',
});

const props = withDefaults(defineProps<CdrTooltipProps>(), {
  position: 'top',
  autoPosition: true,
  open: false,
});

defineSlots<{
  /** Slot for the element that triggers the tooltip.
        Element should be a button and must be the first and only child of this slot.
        Event handlers are bound to this element automatically. */
  'trigger'(props: Record<string, never>): any;
  /** CdrTooltip content */
  'default'(props: Record<string, never>): any;
}>();

const emits = defineEmits({
  /** Emits when tooltip is opened */
  opened: null,
  /** Emits when tooltip is closed */
  closed: null,
});

const uniqueId = props.id ? props.id : uid();

const style = useCssModule();
const slots = useSlots();

const isOpen = ref(false);
let timeout: ReturnType<typeof setTimeout>;
const popupEl = ref<InstanceType<typeof CdrPopup> | null>(null);
const triggerEl = ref<HTMLDivElement | null>(null);
const hasTrigger = slots.trigger;

const openTooltip = (e?: Event) => {
  if (timeout) clearTimeout(timeout);
  isOpen.value = true;
  emits('opened', e);
};
const closeTooltip = (e?: Event) => {
  timeout = setTimeout(() => {
    isOpen.value = false;
    emits('closed', e);
  }, 250);
};
const addHandlers = () => {
  const triggerElement = triggerEl.value?.children[0];
  if (triggerElement) {
    triggerElement.addEventListener('mouseover', openTooltip);
    triggerElement.addEventListener('focus', openTooltip);

    triggerElement.addEventListener('mouseleave', closeTooltip);
    triggerElement.addEventListener('blur', closeTooltip);

    popupEl.value?.$el?.addEventListener('mouseover', openTooltip);
    popupEl.value?.$el?.addEventListener('mouseleave', closeTooltip);
  }
};

watch(
  () => props.open,
  () => (props.open ? openTooltip() : closeTooltip()),
);

onMounted(() => {
  addHandlers();
  const trigger = triggerEl.value?.children[0];
  if (trigger) trigger.setAttribute('aria-describedby', uniqueId);
});
</script>

<template>
  <div
    :class="mapClasses(style, 'cdr-tooltip--wrapper', hasTrigger ? 'cdr-tooltip--position' : '')"
  >
    <div ref="triggerEl">
      <!-- @slot  Slot for the element that triggers the tooltip.
        Element should be a button and must be the first and only child of this slot.
        Event handlers are bound to this element automatically.-->
      <slot name="trigger" />
    </div>
    <cdr-popup
      :content-class="contentClass"
      role="tooltip"
      ref="popupEl"
      :position="position"
      :auto-position="autoPosition"
      :opened="isOpen"
      :id="uniqueId"
      @closed="closeTooltip"
    >
      <!-- @slot CdrTooltip content -->
      <slot />
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrTooltip.module.scss" />
