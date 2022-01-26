<script setup>
import { useCssModule, useSlots, ref, onMounted, watch } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrPopup from '../popup/CdrPopup';
import propValidator from '../../utils/propValidator';

const props = defineProps({
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
  id: {
    type: String,
    required: true,
  },
  contentClass: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    default: false,
  },
});
const slots = useSlots();
const emit = defineEmits(['opened', 'closed']);
const style = useCssModule();

const isOpen = ref(false);
let timeout;
let popupElement;
const popupEl = ref(null);
const triggerEl = ref(null);
const hasTrigger = slots['trigger'];

const openTooltip = (e) => {
  if (timeout) clearTimeout(timeout);
  isOpen.value = true;
  emit('opened', e);
};
const closeTooltip = (e) => {
  timeout = setTimeout(() => {
    isOpen.value = false;
    emit('closed', e);
  }, 250);
};
const addHandlers = () => {
  const triggerElement = triggerEl.value.children[0];
  popupElement = popupEl.value?.rootEl;
  if (triggerElement) {
    triggerElement.addEventListener('mouseover', openTooltip);
    triggerElement.addEventListener('focus', openTooltip);

    triggerElement.addEventListener('mouseleave', closeTooltip);
    triggerElement.addEventListener('blur', closeTooltip);

    popupElement.addEventListener('mouseover', openTooltip);
    popupElement.addEventListener('mouseleave', closeTooltip);
  }
};

watch(() => props.open, () => (props.open ? openTooltip() : closeTooltip()));

onMounted(() => {
  addHandlers();
  const trigger = triggerEl.value.children[0];
  if (trigger) trigger.setAttribute('aria-describedby', props.id);
});
</script>

<template>
  <div :class="mapClasses(
    style, 'cdr-tooltip--wrapper', hasTrigger && 'cdr-tooltip--position'
  )">
    <div ref="triggerEl">
      <slot name="trigger" />
    </div>
    <cdr-popup
      :content-class="contentClass"
      role="tooltip"
      ref="popupEl"
      :position="position"
      :auto-position="autoPosition"
      :opened="isOpen"
      :id="id"
      @closed="closeTooltip"
    >
      <slot ref="popupEl"/>
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrTooltip.module.scss">
</style>
