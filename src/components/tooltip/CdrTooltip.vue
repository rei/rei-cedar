<script>
import {
  useCssModule, defineComponent, ref, onMounted, watch,
} from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrPopup from '../popup/CdrPopup.vue';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrTooltip',
  components: {
    CdrPopup,
  },
  props: {
    /**
     * Sets the position where the tooltip will render relative to the trigger element.
     * @demoSelectMultiple false
     * @values top, bottom, left, right
     */
    position: {
      type: String,
      required: false,
      default: 'top',
      validator: (value) => propValidator(
        value,
        ['top', 'bottom', 'left', 'right'],
      ),
    },
    /**
     * If set to `true`, tooltip will attempt to dynamically set it's position to
     * ensure it renders within the visible browser window.
     * If `false` the tooltip will always render in the provided `position`.
     */
    autoPosition: {
      type: Boolean,
      default: true,
    },
    /** ID for the tooltip element, required for accessibility */
    id: {
      type: String,
      required: true,
    },
    /** Add custom class to the tooltip content wrapper. Allows for overriding size, styling, etc. */
    contentClass: {
      type: String,
      required: false,
    },
    /**
     * Used to programmatically control the tooltip state. Does not need to be set if you are using the `trigger` slot.
     * @demoIgnore true
     */
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /** Emits when tooltip is opened */
    opened: null,
    /** Emits when tooltip is closed */
    closed: null,
  },
  setup(props, ctx) {
    const style = useCssModule();
    const isOpen = ref(false);
    let timeout;
    let popupElement;
    const popupEl = ref(null);
    const triggerEl = ref(null);
    const hasTrigger = ctx.slots.trigger;

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
      style,
      isOpen,
      popupElement,
      popupEl,
      triggerEl,
      hasTrigger,
      openTooltip,
      closeTooltip,
      addHandlers,
      mapClasses,
    };
  },
});
</script>

<template>
  <div
    :class="mapClasses(
      style, 'cdr-tooltip--wrapper', hasTrigger && 'cdr-tooltip--position'
    )"
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
      :id="id"
      @closed="closeTooltip"
    >
      <!-- @slot CdrTooltip content -->
      <slot />
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrTooltip.module.scss">
</style>
