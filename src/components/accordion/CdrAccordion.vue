<script>
import {
  defineComponent, useCssModule, computed, watch, onMounted, ref, inject,
} from 'vue';
import IconCaretDown from '../icon/comps/caret-down.vue';
import { modifyClassName } from '../../utils/buildClass';
import mapClasses from '../../utils/mapClasses';
/** Vertically-stacked list that allows users to expand and collapse additional content */
export default defineComponent({
  name: 'CdrAccordion',
  components: {
    IconCaretDown,
  },
  props: {
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
  },
  emits: {
    /**
    * Emits on accordion open/close
    */
    'accordion-toggle': null,
  },

  setup(props, ctx) {
    const unwrap = inject('unwrap', false);
    const isGrouped = inject('grouped', false) ? 'li' : 'div';
    const style = useCssModule();
    const accordionContentEl = ref(null);
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
    const unwrapClass = computed(() => (isUnwrapped.value
      ? modifyClassName(baseClass, 'unwrap')
      : null));
    const noSpacingClass = computed(() => (!props.contentSpacing
      ? modifyClassName(baseClass, 'no-spacing')
      : null));

    const isOpenClass = computed(() => (props.opened || isUnwrapped.value
      ? 'cdr-accordion--open'
      : 'cdr-accordion--closed'));

    const onClick = (event) => {
      ctx.emit('accordion-toggle', event);
    };
    const onFocus = () => {
      focused.value = true;
    };
    const onBlur = () => {
      focused.value = false;
    };

    const listeners = computed(() => (isUnwrapped.value
      ? {}
      : {
        click: onClick,
        focus: onFocus,
        blur: onBlur,
      }));
    watch(() => props.opened, (opened) => {
      maxHeight.value = !opened ? `${accordionContentEl.value.clientHeight}px` : '0px';
      // nextTick is not sufficient here, must wait for CSS to re-paint
      setTimeout(() => {
        // on next frame, set maxHeight to new value
        maxHeight.value = opened ? `${accordionContentEl.value.clientHeight}px` : '0px';
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
    return {
      style: useCssModule(),
      headingTag,
      headingClass,
      headingContent,
      headingContentStyle,
      isGrouped,
      unwrap,
      accordionContentEl,
      focused,
      maxHeight,
      baseClass,
      labelClass,
      compactClass,
      borderAlignedClass,
      focusedClass,
      iconClass,
      containerClass,
      isOpenClass,
      contentClass,
      noSpacingClass,
      listeners,
      unwrapClass,
      isUnwrapped,
      mapClasses,
    };
  },
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
      <!--
        Triggered on accordion open/close
        @event accordion-toggle
      -->
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
          <!-- @slot  Sets the readable text on the CdrAccordion button -->
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
        <!-- @slot CdrAccordion content -->
        <slot />
      </div>
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrAccordion.module.scss">
</style>
