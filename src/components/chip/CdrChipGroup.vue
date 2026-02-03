<script setup lang="ts">
import { useCssModule, computed, ref, onMounted } from 'vue';
import type { CdrChipGroupProps } from './types';

/**
 * CdrChipGroup - Groups multiple chips together with keyboard navigation support
 *
 * ChipGroups organize related chips and provide keyboard navigation between them.
 * Use chip groups to present a set of related options or filters that users can
 * interact with using keyboard or mouse.
 */

defineOptions({
  name: 'CdrChipGroup',
});

const props = withDefaults(defineProps<CdrChipGroupProps>(), {
  hideLabel: true,
});

defineSlots<{
  /** Override CdrChip label content with a custom element */
  'label'(props: Record<string, never>): any;
  /** CdrChipGroup content (CdrChip components) */
  'default'(props: Record<string, never>): any;
}>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-chip-group';

/** Reference to the chips container element */
const chipsEl = ref<HTMLElement | null>(null);

/** Array of chip elements for keyboard navigation */
const chips = ref<HTMLElement[]>([]);

/** Index of currently focused chip */
const currentIdx = ref<number>(0);

/** Computed index of next chip in navigation order */
const nextIdx = computed<number>(() => {
  const idx = currentIdx.value + 1;
  return idx >= chips.value.length ? 0 : idx;
});

/** Computed index of previous chip in navigation order */
const prevIdx = computed<number>(() => {
  const idx = currentIdx.value - 1;
  return idx <= -1 ? chips.value.length - 1 : idx;
});

/** Computed class for legend visibility */
const legendClass = computed<string>(() =>
  props.hideLabel ? 'cdr-chip-group__legend--hidden' : 'cdr-chip-group__legend',
);

/**
 * Initialize chips array on mount and find checked chip index
 */
onMounted(() => {
  chips.value = Array.prototype.filter.call(
    chipsEl.value?.children,
    (chip) => !(chip.getAttribute('disabled') === '' || chip.getAttribute('aria-disabled')),
  );
  currentIdx.value = Array.prototype.findIndex.call(
    chips,
    (chip) => chip.getAttribute('aria-checked') === 'true',
  );
});

/**
 * Handle keyboard navigation between chips
 */
const handleKeyDown = (e: KeyboardEvent): void => {
  // something besides the button is focused
  if (currentIdx.value === -1) return;

  const { key } = e;
  switch (key) {
    case 'Home':
      e.preventDefault();
      chips.value[0].focus();
      break;
    case 'End':
      e.preventDefault();
      chips.value[chips.value.length - 1].focus();
      break;
    case 'ArrowDown':
    case 'Down':
      e.preventDefault();
      chips.value[nextIdx.value].focus();
      break;
    case 'ArrowUp':
    case 'Up':
      e.preventDefault();
      chips.value[prevIdx.value].focus();
      break;
    default:
      break;
  }
};

/**
 * Track which chip receives focus for keyboard navigation
 */
const handleFocusIn = (e: Event): void => {
  // find out which, if any, button is focused
  currentIdx.value = Array.prototype.indexOf.call(chips.value, e.target);
};
</script>

<template>
  <fieldset
    :class="style[baseClass]"
    @focusin="handleFocusIn"
    @keydown="handleKeyDown"
  >
    <legend :class="style[legendClass]">
      <!-- @slot Override CdrChip label content with a custom element -->
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <div
      ref="chipsEl"
      :class="style['cdr-chip-group__content']"
    >
      <!-- @slot CdrChipGroup content (CdrChip components) -->
      <slot />
    </div>
  </fieldset>
</template>

<style lang="scss" module src="./styles/CdrChipGroup.module.scss" />
