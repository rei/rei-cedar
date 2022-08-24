<script>
import { useCssModule, defineComponent, defineEmits, useSlots, ref, onMounted, watch } from 'vue';
import mapClasses from '../../utils/mapClasses.js';
import CdrPopup from '../popup/CdrPopup.vue';
import propValidator from '../../utils/propValidator.js';
export default defineComponent({
  name: 'CdrTooltip',
  components: {
    CdrPopup,
  },
  props: {
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
  },
  setup(props, ctx) {
    const slots = useSlots();
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
      ctx.emit('opened', e);
    };
    const closeTooltip = (e) => {
      timeout = setTimeout(() => {
        isOpen.value = false;
        ctx.emit('closed', e);
      }, 250);
    };
    const addHandlers = () => {
      const triggerElement = triggerEl.value.children[0];
      popupElement = popupEl.value?.$el;
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

    return {
      slots,
      style,
      isOpen,
      popupElement,
      popupEl,
      triggerEl,
      hasTrigger,
      openTooltip,
      closeTooltip,
      addHandlers,
      mapClasses
    }
  }
})
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
      <slot />
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrTooltip.module.scss">
</style>
