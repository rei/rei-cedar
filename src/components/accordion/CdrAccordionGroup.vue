<script setup lang="ts">
import { useCssModule, computed, ref, onMounted, onBeforeUnmount, provide } from 'vue';
import type { Ref } from 'vue';
import { debounce } from '../../utils/debounce';
import propValidator from '../../utils/propValidator';
import getCurrentBreakpoint from '../../mixins/breakpoints';
import { unwrappedKey } from '../../types/symbols';

interface CdrAccordionGroupProps {
  /**
   * A prop that will present accordion content as unwrapped.
   * All content is expanded at the provided breakpoints.
   */
  unwrap?: string | boolean;
}

defineOptions({
  name: 'CdrAccordionGroup',
});

const props = withDefaults(defineProps<CdrAccordionGroupProps>(), {
  unwrap: false,
});

// Validate unwrap prop
if (
  typeof props.unwrap === 'string' &&
  !propValidator(props.unwrap, ['@xs', '@sm', '@md', '@lg'], false)
) {
  console.warn('CdrAccordionGroup: unwrap prop must be one of: @xs, @sm, @md, @lg, or a boolean');
}

const style = useCssModule();

/** Base CSS class name */
const baseClass = 'cdr-accordion-group';

/** Current index of the focused accordion button */
const currentIdx = ref<number>(0);

/** NodeList of all accordion buttons in the group */
const accordionButtons = ref<NodeListOf<HTMLElement>>();

/** Reference to the accordion group container element */
const accordionGroupEl = ref<HTMLDivElement | null>(null);

/** Whether accordions should be unwrapped (always expanded) */
const unwrapped = ref<boolean>(!!props.unwrap);

/** Debounced resize handler for responsive unwrap behavior */
const resizeHandler = ref<(() => void) | null>(null);

provide<Ref<boolean>>(unwrappedKey, unwrapped);

/** Returns array of accordion buttons from NodeList */
const getAccordionButtonArray = computed<HTMLElement[]>(() => {
  if (accordionButtons.value) {
    return [...accordionButtons.value];
  }
  return [];
});

/** Calculates the index of the next accordion button (wraps to 0) */
const nextIdx = computed<number>(() => {
  const idx = currentIdx.value + 1;
  return idx >= getAccordionButtonArray.value.length ? 0 : idx;
});

/** Calculates the index of the previous accordion button (wraps to last) */
const prevIdx = computed<number>(() => {
  const idx = currentIdx.value - 1;
  return idx <= -1 ? getAccordionButtonArray.value.length - 1 : idx;
});

/**
 * Handles keyboard navigation for accordion buttons
 * Supports Home, End, ArrowUp/Up, and ArrowDown/Down keys
 * @param e - The keyboard event
 */
const handleKeyDown = (e: KeyboardEvent): void => {
  // something besides the button is focused
  if (currentIdx.value === -1) return;

  const { key } = e;
  const buttons = getAccordionButtonArray.value;

  switch (key) {
    case 'Home':
      e.preventDefault();
      buttons[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      buttons[buttons.length - 1]?.focus();
      break;
    case 'ArrowDown':
    case 'Down':
      e.preventDefault();
      buttons[nextIdx.value]?.focus();
      break;
    case 'ArrowUp':
    case 'Up':
      e.preventDefault();
      buttons[prevIdx.value]?.focus();
      break;
    default:
      break;
  }
};

/**
 * Handles focus events to track which accordion button is currently focused
 * @param e - The focus event
 */
const focusin = (e: FocusEvent): void => {
  // find out which, if any, button is focused
  currentIdx.value = getAccordionButtonArray.value.indexOf(e.target as HTMLElement);
};

onMounted(() => {
  accordionButtons.value = accordionGroupEl.value?.querySelectorAll('.js-cdr-accordion-button');

  if (typeof props.unwrap === 'string') {
    unwrapped.value = props.unwrap.indexOf(getCurrentBreakpoint()) !== -1;

    resizeHandler.value = debounce(() => {
      if (typeof props.unwrap === 'string') {
        unwrapped.value = props.unwrap.indexOf(getCurrentBreakpoint()) !== -1;
      }
    }, 300);

    window.addEventListener('resize', resizeHandler.value);
  }
});

onBeforeUnmount(() => {
  // Clean up resize listener
  if (resizeHandler.value) {
    window.removeEventListener('resize', resizeHandler.value);
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

<style lang="scss" module src="./styles/CdrAccordionGroup.module.scss"></style>
