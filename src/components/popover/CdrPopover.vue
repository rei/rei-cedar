<template>
  <div :class="mapClasses(
    style,
    'cdr-popover--wrapper',
    hasTrigger && 'cdr-popover--position',
  )">
    <div ref="triggerEl">
      <slot name="trigger"/>
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
          <div v-if="hasTitle" :class="style['cdr-popover__title']">
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
          <icon-x-sm
            slot="icon"
            inherit-color
          />
        </cdr-button>
      </div>
    </cdr-popup>
  </div>
</template>

<script setup>
  import { useCssModule, useSlots, defineEmits, ref, watch, onMounted, nextTick } from 'vue';
  import tabbable from 'tabbable';
  import IconXSm from '../icon/comps/x-sm';
  import CdrButton from '../button/CdrButton';
  import CdrPopup from '../popup/CdrPopup';
  import propValidator from '../../utils/propValidator';
  import mapClasses from '../../utils/mapClasses';

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
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: false,
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
      required: false,
    },
  })

  const slots = useSlots();
  const emit = defineEmits(['opened', 'closed'])

  const isOpen = ref(false);
  let lastActive

  const triggerEl = ref(null);
  const popupEl = ref(null);

  const hasTrigger = slots.trigger;
  const hasTitle = slots.title || props.label;

  const openPopover = (e) => {
    const { activeElement } = document;

    lastActive = activeElement;
    isOpen.value = true;
    emit('opened', e);
    nextTick(() => {
      const tabbables = tabbable(popupEl.value.$el);
      if (tabbables[0]) tabbables[0].focus();
    });
  }

  const closePopover = (e) => {
    isOpen.value = false;
    emit('closed', e);
    if (lastActive) lastActive.focus();
  }

  const addHandlers = ()  =>{
    const triggerElement = triggerEl.value.children[0];
    if (triggerElement) {
      triggerElement.addEventListener('click', openPopover);
    }
  }

  watch(() => props.open, () => {
    // TODO: if eslint yells about this then eslint must go :)
    props.open ? openPopover() : closePopover();
  });

  onMounted(() => {
    addHandlers();

    const trigger = triggerEl.value.children[0];
    if (trigger) {
      trigger.setAttribute('aria-controls', props.id);
      trigger.setAttribute('aria-haspopup', 'dialog');
    }
  });
  const style = useCssModule();
</script>

<style lang="scss" module src="./styles/CdrPopover.module.scss">
</style>
