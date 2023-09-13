<script setup lang="ts">
import {
  useCssModule, computed, ref, onMounted,
} from 'vue';

defineOptions({
  name: 'CdrChipGroup',
});

const props = defineProps({
 /**
     * Sets a label that describes the chip group and what it is selecting. By default this label is visually hidden and only made available to screen readers.
     */
     label: {
      type: String,
      required: true,
    },
    /**
     * Visually hides the chip group label but makes it accessible to screen readers.
     */
    hideLabel: {
      type: Boolean,
      default: true,
    },
});

const style = useCssModule();
const baseClass = 'cdr-chip-group';
const chipsEl = ref<HTMLElement | null>(null);
const chips = ref<HTMLElement[]>([]);
const currentIdx = ref(0);
const nextIdx = computed(() => {
  const idx = currentIdx.value + 1;
  return idx >= chips.value.length ? 0 : idx;
});
const prevIdx = computed(() => {
  const idx = currentIdx.value - 1;
  return idx <= -1 ? (chips.value.length - 1) : idx;
});
const legendClass = computed(() => (props.hideLabel
  ? 'cdr-chip-group__legend--hidden'
  : 'cdr-chip-group__legend'
));

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

const handleKeyDown = (e: KeyboardEvent) => {
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
    default: break;
  }
};
    const handleFocusIn = (e: Event) => {
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

<style lang="scss" module src="./styles/CdrChipGroup.module.scss">
</style>
