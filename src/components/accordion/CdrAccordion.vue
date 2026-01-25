<script setup lang="ts">
import {
  useCssModule,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  inject,
  nextTick,
} from 'vue';
import type { Ref } from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import { modifyClassName } from '../../utils/buildClass';
import mapClasses from '../../utils/mapClasses';
import { unwrappedKey } from '../../types/symbols';
import { CdrAccordionProps } from '../../lib';

/**
 * Vertically-stacked list that allows users to expand and collapse additional content
 */
defineOptions({
  name: 'CdrAccordion',
});

const props = withDefaults(defineProps<CdrAccordionProps>(), {
  opened: false,
  compact: false,
  borderAligned: false,
  contentSpacing: true,
});

const emits = defineEmits<{
  /** Emits on accordion open/close */
  'accordion-toggle': [event: Event];
}>();

const style = useCssModule();

/** Whether the accordion group is unwrapped (always expanded at certain breakpoints) */
const unwrap = inject<Ref<boolean>>(unwrappedKey, ref(false));

/** Reference to the accordion content element for height calculations */
const accordionContentEl = ref<HTMLDivElement | null>(null);

/** Reference to the container element for transition event handling */
const containerEl = ref<HTMLDivElement | null>(null);

/** Tracks focus state of the accordion button */
const focused = ref<boolean>(false);

/** Current max-height value for accordion animation */
const maxHeight = ref<string>(props.opened ? 'none' : '0px');

/** Indicates if the accordion is currently transitioning */
const isTransitioning = ref<boolean>(false);

/** Dynamic heading tag based on level prop */
const headingTag = `h${props.level}`;

/** CSS class names */
const labelClass = 'cdr-accordion__label';
const baseClass = 'cdr-accordion';
const iconClass = 'cdr-accordion__icon';
const containerClass = 'cdr-accordion__content-container';
const contentClass = 'cdr-accordion__content';
/** Returns button element when collapsed, div when unwrapped */
const headingContent = computed(() => (unwrap.value ? 'div' : 'button'));

/** Returns appropriate CSS classes for heading content */
const headingContentStyle = computed(() =>
  unwrap.value
    ? 'js-cdr-accordion-button'
    : [style['cdr-accordion__button'], 'js-cdr-accordion-button'],
);

/** Returns heading class based on unwrap state */
const headingClass = computed(() =>
  unwrap.value ? 'cdr-accordion__header--unwrapped' : 'cdr-accordion__header',
);

/** Returns compact modifier class if compact prop is true */
const compactClass = computed(() => (props.compact ? modifyClassName(baseClass, 'compact') : ''));

/** Returns border-aligned modifier class if borderAligned prop is true */
const borderAlignedClass = computed(() =>
  props.borderAligned ? modifyClassName(baseClass, 'border-aligned') : '',
);

/** Returns unwrap modifier class if accordion is unwrapped */
const unwrapClass = computed(() => (unwrap.value ? modifyClassName(baseClass, 'unwrap') : ''));

/** Returns no-spacing modifier class if contentSpacing is false */
const noSpacingClass = computed(() =>
  !props.contentSpacing ? modifyClassName(baseClass, 'no-spacing') : '',
);

/** Returns open or closed class based on accordion state */
const isOpenClass = computed(() =>
  props.opened || unwrap.value ? 'cdr-accordion--open' : 'cdr-accordion--closed',
);

/**
 * Handles click events on the accordion button
 * @param event - The click event
 */
const onClick = (event: Event): void => {
  emits('accordion-toggle', event);
};

/**
 * Handles focus events on the accordion button
 */
const onFocus = (): void => {
  focused.value = true;
};

/**
 * Handles blur events on the accordion button
 */
const onBlur = (): void => {
  focused.value = false;
};

/** Event listeners for the accordion button (empty when unwrapped) */
const listeners = computed(() =>
  unwrap.value
    ? {}
    : {
        click: onClick,
        focus: onFocus,
        blur: onBlur,
      },
);

/**
 * Handles the transitionend event to update accordion state after animation
 * Sets maxHeight to 'none' when open to allow content to reflow naturally
 * @param event - The transition event
 */
const handleTransitionEnd = (event: TransitionEvent): void => {
  // Only handle transitions on the max-height property of the container
  if (event.propertyName === 'max-height' && event.target === containerEl.value) {
    isTransitioning.value = false;
    // After animation completes, set to 'none' if open to allow content to reflow
    if (props.opened) {
      maxHeight.value = 'none';
    }
  }
};

watch(
  () => props.opened,
  async (opened) => {
    if (!accordionContentEl.value || unwrap.value) return;

    isTransitioning.value = true;

    if (opened) {
      // Opening: Set to current height, then animate to actual height
      maxHeight.value = '0px';
      await nextTick();
      // Force reflow
      void accordionContentEl.value.offsetHeight;
      maxHeight.value = `${accordionContentEl.value.scrollHeight}px`;
    } else {
      // Closing: Set to actual height, then animate to 0
      maxHeight.value = `${accordionContentEl.value.scrollHeight}px`;
      await nextTick();
      // Force reflow
      void accordionContentEl.value.offsetHeight;
      maxHeight.value = '0px';
    }
  },
);

onMounted(() => {
  if (props.opened && accordionContentEl.value) {
    maxHeight.value = 'none';
  }

  // Add transition end listener
  if (containerEl.value) {
    containerEl.value.addEventListener('transitionend', handleTransitionEnd);
  }
});

onBeforeUnmount(() => {
  // Clean up event listener
  if (containerEl.value) {
    containerEl.value.removeEventListener('transitionend', handleTransitionEnd);
  }
});
</script>

<template>
  <div
    :class="
      !unwrap
        ? mapClasses(style, baseClass, compactClass, borderAlignedClass, noSpacingClass)
        : null
    "
    :id="`${id}-accordion`"
  >
    <component
      :is="headingTag"
      :class="style[headingClass]"
    >
      <!--
        Triggered on accordion open/close
        @event accordion-toggle
      -->
      <component
        :is="headingContent"
        :class="headingContentStyle"
        :id="id"
        v-on="listeners"
        :aria-expanded="!unwrap ? `${opened}` : null"
        :aria-controls="!unwrap ? `${id}-collapsible` : null"
      >
        <span
          :class="style[labelClass]"
          :id="`${id}-label`"
        >
          <!-- @slot  Sets the readable text on the CdrAccordion button -->
          <slot name="label">
            {{ label }}
          </slot>
        </span>
        <icon-caret-down
          v-if="!unwrap"
          :class="mapClasses(style, iconClass, isOpenClass)"
          :size="compact ? 'small' : null"
        />
      </component>
    </component>
    <div
      ref="containerEl"
      :class="mapClasses(style, containerClass, isOpenClass, unwrapClass)"
      :style="{ maxHeight: unwrap ? 'none' : maxHeight }"
    >
      <div
        :class="mapClasses(style, contentClass, isOpenClass, unwrapClass)"
        :aria-hidden="!unwrap ? `${!opened}` : undefined"
        :id="`${id}-collapsible`"
        ref="accordionContentEl"
      >
        <!-- @slot CdrAccordion content -->
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrAccordion.module.scss" />
