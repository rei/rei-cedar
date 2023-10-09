<script setup lang="ts">
import {
  useCssModule, computed, watch, onMounted, ref, inject,
} from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import { modifyClassName } from '../../utils/buildClass';
import mapClasses from '../../utils/mapClasses';
import { unwrappedKey } from '../../types/symbols'; 

/** Vertically-stacked list that allows users to expand and collapse additional content */

defineOptions({
  name: 'CdrAccordion',
});

const props = defineProps({
  /**
   * The unique id of an accordion.
   * @demoIgnore true
   */
    id: {
    type: String,
    required: true,
  },
  /**
   * Toggle this value to open/close the accordion.
   * @demoIgnore true
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
   * @demoIgnore true
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
  /**
   * Sets the readable text on CdrAccordion button (also can be slotted)
   * @demoIgnore true
   */
  label: {
    type: String,
  },
});

const emits = defineEmits({
  /**
  * Emits on accordion open/close
  */
  'accordion-toggle': null,
});

const style = useCssModule();
const unwrap = inject(unwrappedKey, ref(false));
const accordionContentEl = ref<HTMLInputElement | null>(null);
const focused = ref(false);
const maxHeight = ref(props.opened
  ? 'none'
  : '0px');
const headingTag = `h${props.level}`;
const labelClass = 'cdr-accordion__label';
const baseClass = 'cdr-accordion';
const iconClass = 'cdr-accordion__icon';
const containerClass = 'cdr-accordion__content-container';
const contentClass = 'cdr-accordion__content';
const headingContent = computed(() => (unwrap.value
  ? 'div'
  : 'button'));
const headingContentStyle = computed(() => (unwrap.value
  ? 'js-cdr-accordion-button'
  : [style['cdr-accordion__button'], 'js-cdr-accordion-button']));
const headingClass = computed(() => (unwrap.value
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
  : ''));
const unwrapClass = computed(() => (unwrap.value
  ? modifyClassName(baseClass, 'unwrap')
  : ''));
const noSpacingClass = computed(() => (!props.contentSpacing
  ? modifyClassName(baseClass, 'no-spacing')
  : ''));

const isOpenClass = computed(() => (props.opened || unwrap.value
  ? 'cdr-accordion--open'
  : 'cdr-accordion--closed'));

const onClick = (event: Event) => {
  emits('accordion-toggle', event);
};
const onFocus = () => {
  focused.value = true;
};
const onBlur = () => {
  focused.value = false;
};

const listeners = computed(() => (unwrap.value
  ? {}
  : {
    click: onClick,
    focus: onFocus,
    blur: onBlur,
  }));
watch(() => props.opened, (opened) => {
  maxHeight.value = !opened ? `${accordionContentEl.value?.clientHeight}px` : '0px';
  // nextTick is not sufficient here, must wait for CSS to re-paint
  setTimeout(() => {
    // on next frame, set maxHeight to new value
    maxHeight.value = opened ? `${accordionContentEl.value?.clientHeight}px` : '0px';
    setTimeout(() => {
      // after animation is complete, remove max-height so content can reflow
      maxHeight.value = opened ? 'none' : '0px';
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
  <div
    :class="!unwrap
      ? mapClasses(style, baseClass, compactClass, borderAlignedClass, focusedClass, noSpacingClass)
      : null"
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

<style lang="scss" module src="./styles/CdrAccordion.module.scss">
</style>
