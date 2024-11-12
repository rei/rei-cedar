<script setup lang="ts">
import {
  useCssModule, computed, ref, onMounted, provide,
} from 'vue';
import { debounce } from '../../utils/debounce';
import propValidator from '../../utils/propValidator';
import getCurrentBreakpoint from '../../mixins/breakpoints';
import { unwrappedKey } from '../../types/symbols'; 

defineOptions({
  name: 'CdrAccordionGroup',
});

const props = defineProps({
  /**
   * A prop that will present accordion content as unwrapped. All content is expanded at the provided breakpoints.
   * @values @xs, @sm, @md, @lg, true
   */
    unwrap: {
      type: [String, Boolean],
      default: false,
      validator: (value: string) => {
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
});
const style = useCssModule();
const baseClass = 'cdr-accordion-group';
const currentIdx = ref(0);
const accordionButtons = ref<NodeListOf<HTMLElement>>();
const accordionGroupEl = ref<HTMLUListElement | null>(null);
const unwrapped = ref(!!props.unwrap);
provide(unwrappedKey, unwrapped);
const getAccordionButtonArray = computed(() => {
  if (accordionButtons.value) {
    return [...accordionButtons.value];
  }
  return [];
});
const nextIdx = computed(() => {
  const idx = currentIdx.value + 1;
  return idx >= getAccordionButtonArray.value?.length ? 0 : idx;
});
const prevIdx = computed(() => {
  const idx = currentIdx.value - 1;
  return idx <= -1 ? getAccordionButtonArray.value.length - 1 : idx;
});
const handleKeyDown = (e: KeyboardEvent) => {
  // something besides the button is focused
  if (currentIdx.value === -1) return;

  const { key } = e;
  switch (key) {
    case 'Home':
      e.preventDefault();
      getAccordionButtonArray.value[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      getAccordionButtonArray.value[getAccordionButtonArray.value.length - 1].focus();
      break;
    case 'ArrowDown':
    case 'Down':
      e.preventDefault();
      getAccordionButtonArray.value[nextIdx.value].focus();
      break;
    case 'ArrowUp':
    case 'Up':
      e.preventDefault();
      getAccordionButtonArray.value[prevIdx.value].focus();
      break;
    default: break;
  }
};
const focusin = (e: Event) => {
  // find out which, if any, button is focused
  currentIdx.value = Array.prototype.indexOf.call(getAccordionButtonArray.value, e.target);
};

onMounted(() => {
  accordionButtons.value = accordionGroupEl.value?.querySelectorAll('.js-cdr-accordion-button');
  if (typeof props.unwrap === 'string') {
    unwrapped.value = props.unwrap.indexOf(getCurrentBreakpoint()) !== -1;
    window.addEventListener('resize', debounce(() => {
      unwrapped.value = (props.unwrap as string).indexOf(getCurrentBreakpoint()) !== -1;
    }, 300));
  }
});

</script>

<template>
  <div
    :class="style[baseClass]"
    ref="accordionGroupEl"
    @focusin="focusin"
    @keydown="handleKeyDown"
  >
    <!-- @slot CdrAccordionGroup content (i.e. CdrAccordion components) -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrAccordionGroup.module.scss">
</style>
