<script>
import {
  defineComponent, useCssModule, computed, ref, reactive, onMounted, provide,
} from 'vue';
import { debounce } from 'lodash-es';
import propValidator from '../../utils/propValidator';
import getCurrentBreakpoint from '../../mixins/breakpoints';

export default defineComponent({
  name: 'CdrAccordionGroup',
  props: {
    unwrap: {
      type: [String, Boolean],
      default: false,
      validator: (value) => {
        if (typeof value === 'string') {
          return propValidator(
            value,
            ['@xs', '@sm', '@md', '@lg'],
            false,
          );
        }
        return typeof value === 'boolean';
      },
    },
  },

  setup(props) {
    const baseClass = 'cdr-accordion-group';
    const currentIdx = ref(0);
    const accordionButtons = ref([]);
    const accordionGroupEl = ref(null);
    const unwrapped = reactive({
      isUnwrapped: !!props.unwrap,
    });
    provide('unwrap', unwrapped);
    provide('grouped', true);

    const nextIdx = computed(() => {
      const idx = currentIdx.value + 1;
      return idx >= accordionButtons.value.length ? 0 : idx;
    });
    const prevIdx = computed(() => {
      const idx = currentIdx.value - 1;
      return idx <= -1 ? accordionButtons.value.length - 1 : idx;
    });
    const handleKeyDown = (e) => {
      // something besides the button is focused
      if (currentIdx.value === -1) return;

      const { key } = e;
      switch (key) {
        case 'Home':
          e.preventDefault();
          accordionButtons.value[0].focus();
          break;
        case 'End':
          e.preventDefault();
          accordionButtons.value[accordionButtons.value.length - 1].focus();
          break;
        case 'ArrowDown':
        case 'Down':
          e.preventDefault();
          accordionButtons.value[nextIdx.value].focus();
          break;
        case 'ArrowUp':
        case 'Up':
          e.preventDefault();
          accordionButtons.value[prevIdx.value].focus();
          break;
        default: break;
      }
    };
    const focusin = (e) => {
      // find out which, if any, button is focused
      currentIdx.value = Array.prototype.indexOf.call(accordionButtons.value, e.target);
    };

    onMounted(() => {
      accordionButtons.value = accordionGroupEl.value.querySelectorAll('.js-cdr-accordion-button');
      if (typeof props.unwrap === 'string') {
        unwrapped.isUnwrapped = props.unwrap.indexOf(getCurrentBreakpoint()) !== -1;
        window.addEventListener('resize', debounce(() => {
          unwrapped.isUnwrapped = props.unwrap.indexOf(getCurrentBreakpoint()) !== -1;
        }, 300));
      }
    });

    return {
      style: useCssModule(),
      handleKeyDown,
      focusin,
      baseClass,
      accordionGroupEl,
    };
  },
});

</script>

<template>
  <ul
    :class="style[baseClass]"
    ref="accordionGroupEl"
    @focusin="focusin"
    @keydown="handleKeyDown"
  >
    <slot />
  </ul>
</template>

<style lang="scss" module src="./styles/CdrAccordionGroup.module.scss">
</style>
