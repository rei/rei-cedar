<script setup>
import {
  useCssModule, computed, watch, onMounted, ref, inject,
} from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import { modifyClassName } from '../../utils/buildClass.js';
import mapClasses from '../../utils/mapClasses.js';

const props = defineProps({
  /**
   * The unique id of an accordion.
   */
  id: {
    type: String,
    required: true,
  },
  /**
   * Toggle this value to open/close the accordion.
   */
  opened: {
    type: Boolean,
    default: false,
  },
  /**
   * Sets a compact style.
   */
  compact: {
    type: Boolean,
    default: false,
  },
  /**
   * Sets a border-aligned style.
   */
  borderAligned: {
    type: Boolean,
    default: false,
  },
  /**
   * Sets the heading level
   */
  level: {
    type: [String, Number],
    required: true,
  },
  /**
   * Toggles content spacing (padding)
   */
  contentSpacing: {
      type: Boolean,
      default: true,
    },
  label: {
    type: String,
  },
});
const emit = defineEmits(['accordion-toggle']);
const unwrap = inject('unwrap', false);
const isGrouped = inject('unwrap', false) ? 'li' : 'div';
const style = useCssModule();
const accordionContentEl = ref(null);
const focused = ref(false);
const maxHeight = ref(props.opened
  ? 'none'
  : 0);
const headingTag = `h${props.level}`;
const labelClass = 'cdr-accordion__label';
const baseClass = 'cdr-accordion';
const iconClass = 'cdr-accordion__icon';
const containerClass = 'cdr-accordion__content-container';
const contentClass = 'cdr-accordion__content';
const isUnwrapped = computed(() => unwrap && unwrap.isUnwrapped);
const headingContent = computed(() => (isUnwrapped.value
  ? 'div'
  : 'button'));
const headingContentStyle = computed(() => (isUnwrapped.value
  ? 'js-cdr-accordion-button'
  : [style['cdr-accordion__button'], 'js-cdr-accordion-button']));
const headingClass = computed(() => (isUnwrapped.value
  ? 'cdr-accordion__header--unwrapped'
  : 'cdr-accordion__header'));
const compactClass = computed(() => (props.compact
  ? modifyClassName(baseClass, 'compact')
  : ''));
const borderAlignedClass = computed(() => (props.borderAligned
  ? modifyClassName(baseClass, 'border-aligned')
  : ''));
const focusedClass = computed(() => (focused.value
  ? modifyClassName(baseClass, 'focused')
  : null));
const unwrapClass = computed(() => {
  return isUnwrapped.value
    ? modifyClassName(baseClass, 'unwrap')
    : null;
});
const noSpacingClass = computed(() => {
  return !props.contentSpacing
    ? modifyClassName(baseClass, 'no-spacing')
    : null;
});

const isOpenClass = computed(() => (props.opened || isUnwrapped.value
  ? 'cdr-accordion--open'
  : 'cdr-accordion--closed'));
const listeners = computed(() => isUnwrapped.value 
  ? {}
  : {
    click: onClick,
    focus: onFocus,
    blur: onBlur,
});

const onClick = (event) => {
  emit('accordion-toggle', event);
};
const onFocus = () => {
  focused.value = true;
};
const onBlur = () => {
  focused.value = false;
};

watch(() => props.opened, (opened) => {
  maxHeight.value = !opened ? `${accordionContentEl.value.clientHeight}px` : 0;
  // nextTick is not sufficient here, must wait for CSS to re-paint
  setTimeout(() => {
    // on next frame, set maxHeight to new value
    maxHeight.value = opened ? `${accordionContentEl.value.clientHeight}px` : 0;
    setTimeout(() => {
      // after animation is complete, remove max-height so content can reflow
      maxHeight.value = opened ? 'none' : 0;
    }, 350); // cdr-duration-3x + 50ms
  }, 50);
});

onMounted(() => {
  if (props.opened && accordionContentEl.value) {
    maxHeight.value = 'none';
  }
});
</script>

<template>
  <component
    :is="isGrouped"
    :class="!isUnwrapped
      ? mapClasses(style, baseClass, compactClass, borderAlignedClass, focusedClass, noSpacingClass)
      : null"
    :id="`${id}-accordion`"
  >
    <component
      :is="headingTag"
      :class="style[headingClass]"
    >
      <component
        :is="headingContent"
        :class="headingContentStyle"
        :id="id"
        v-on="listeners"
        :aria-expanded="!isUnwrapped ? `${opened}` : null"
        :aria-pressed="!isUnwrapped ? `${opened}` : null"
        :aria-controls="!isUnwrapped ? `${id}-collapsible` : null"
      >
        <span
          :class="style[labelClass]"
          :id="`${id}-label`"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </span>
        <icon-caret-down
          v-if="!isUnwrapped"
          :class="mapClasses(style, iconClass, isOpenClass)"
          :size="compact ? 'small' : null"
        />
      </component>
    </component>
    <div
      :class="mapClasses(style, containerClass, isOpenClass, unwrapClass)"
      :style="{ maxHeight: isUnwrapped ? 'none' : maxHeight }"
    >
      <div
        :class="mapClasses(style, contentClass, isOpenClass, unwrapClass)"
        :aria-hidden="!isUnwrapped ? `${!opened}` : null"
        :id="`${id}-collapsible`"
        ref="accordionContentEl"
      >
        <slot />
      </div>
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrAccordion.module.scss">
</style>
