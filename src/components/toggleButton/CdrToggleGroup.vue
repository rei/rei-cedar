<script setup lang="ts">
import { ref, watch, onMounted, provide, computed, useCssModule } from 'vue';
import type { CdrToggleGroupProps } from './types';
import mapClasses from '../../utils/mapClasses';
import { selectedToggleKey } from '../../types/symbols';

defineOptions({
  name: 'CdrToggleGroup',
});

const props = withDefaults(defineProps<CdrToggleGroupProps>(), {
  size: 'medium',
});

defineSlots<{
  /** CdrToggleGroup content (CdrToggleButton components) */
  'default'(props: Record<string, never>): any;
}>();

const emits = defineEmits({
  /**
   * Event emitted by v-model
   * @param modelValue
   */
  'update:modelValue': null,
});

const style = useCssModule();

const baseClass = 'cdr-toggle-group';
const toggleGroup = ref<HTMLUListElement | null>(null);
const selectedToggleValue = ref(props.modelValue);
provide(selectedToggleKey, selectedToggleValue);

const sizeClass = computed(() =>
  props.size ? `cdr-toggle-group--${props.size}` : 'cdr-toggle-group--medium',
);

let toggleButtonElements: HTMLButtonElement[];

onMounted(() => {
  if (toggleGroup.value) {
    toggleButtonElements = Array.from(toggleGroup.value.querySelectorAll('button'));
  }
});

watch(
  () => props.modelValue,
  (value) => {
    selectedToggleValue.value = value;
  },
);

const selectToggleButton = (e: Event) => {
  if (!(e.target as HTMLElement)?.closest('button')) {
    return;
  }
  const button = (e.target as HTMLElement).closest('button');
  if (button) {
    selectedToggleValue.value = button.value;
    emits('update:modelValue', button.value);
    button.focus();
  }
};

const focusNext = (e: KeyboardEvent) => {
  const currentButton = e.target as HTMLButtonElement;
  const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
  const isLastButton = currentButtonIndex === toggleButtonElements.length - 1;

  if (isLastButton) {
    return;
  }

  const nextButton = toggleButtonElements[currentButtonIndex + 1];
  nextButton.focus();
};

const focusPrev = (e: KeyboardEvent) => {
  const currentButton = e.target as HTMLButtonElement;
  const currentButtonIndex = toggleButtonElements.indexOf(currentButton);
  const isFirstButton = currentButtonIndex === 0;

  if (isFirstButton) {
    return;
  }

  const nextButton = toggleButtonElements[currentButtonIndex - 1];
  nextButton.focus();
};
</script>

<template>
  <ul
    ref="toggleGroup"
    role="radiogroup"
    v-bind="$attrs"
    :class="mapClasses(style, baseClass, sizeClass)"
    @click.prevent="selectToggleButton"
    @keyup.right.prevent="focusNext"
    @keyup.left.prevent="focusPrev"
  >
    <!-- @slot CdrToggleGroup content (CdrToggleButton components) -->
    <slot />
  </ul>
</template>

<style lang="scss" module src="./styles/CdrToggleGroup.module.scss" />
