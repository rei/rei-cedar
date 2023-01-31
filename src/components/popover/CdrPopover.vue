<script>
import {
  defineComponent, useCssModule, ref, watch, onMounted,
} from 'vue';
import tabbable from 'tabbable';
import IconXSm from '../icon/comps/x-sm.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrPopup from '../popup/CdrPopup.vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';

export default defineComponent({
  name: 'CdrPopover',
  components: { IconXSm, CdrButton, CdrPopup },
  props: {
    /**
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
    /**
     * @demoIgnore true
     */
    open: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['opened', 'closed'],

  setup(props, ctx) {
    const isOpen = ref(false);
    let lastActive;

    const triggerEl = ref(null);
    const popupEl = ref(null);

    const hasTrigger = ctx.slots.trigger;
    const hasTitle = ctx.slots.title || props.label;

    const openPopover = (e) => {
      if (isOpen.value === true) {
        return;
      }
      const { activeElement } = document;

      lastActive = activeElement;
      isOpen.value = true;
      ctx.emit('opened', e);
      setTimeout(() => {
        const tabbables = tabbable(popupEl.value.$el);
        if (tabbables[0]) tabbables[0].focus();
      }, 50);
    };

    const closePopover = (e) => {
      isOpen.value = false;
      ctx.emit('closed', e);
      if (lastActive) lastActive.focus();
    };

    const addHandlers = () => {
      const triggerElement = triggerEl.value.children[0];
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

      const trigger = triggerEl.value.children[0];
      if (trigger) {
        trigger.setAttribute('aria-controls', props.id);
        trigger.setAttribute('aria-haspopup', 'dialog');
      }
    });
    return {
      style: useCssModule(),
      mapClasses,
      hasTrigger,
      triggerEl,
      popupEl,
      closePopover,
      openPopover,
      isOpen,
      hasTitle,
    };
  },
});
</script>

<template>
  <div
    :class="mapClasses(
      style,
      'cdr-popover--wrapper',
      hasTrigger && 'cdr-popover--position',
    )"
  >
    <div ref="triggerEl">
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
          </slot>
        </cdr-button>
      </div>
    </cdr-popup>
  </div>
</template>

<style lang="scss" module src="./styles/CdrPopover.module.scss">
</style>
