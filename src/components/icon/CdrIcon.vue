<script setup lang="ts">
import { useCssModule, computed, useAttrs, type SVGAttributes } from 'vue';
import type { CdrIconProps } from '../../types/interfaces';
import mapClasses from '../../utils/mapClasses';
import { responsiveModifyClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

/**
 * CdrIcon - Communicates meaning through graphics representing simple and complex ideas
 *
 * Icons are visual symbols that represent actions, objects, or concepts.
 * Use icons to enhance usability and provide visual cues. Always ensure icons
 * have appropriate accessible labels when used without accompanying text.
 */

defineOptions({
  name: 'CdrIcon',
});

const props = withDefaults(defineProps<CdrIconProps>(), {
  inheritColor: false,
});

const style: Record<string, string> = useCssModule();
const attrs = useAttrs();
const baseClass: string = 'cdr-icon';

/** Check if aria-label or aria-labelledby is present, hide from screen readers if not */
const hideSr: boolean = !attrs['aria-label'] && !attrs['aria-labelledby'];

/** Computed class for inheriting parent color */
const inheritColorClass = computed<string>(() =>
  props.inheritColor ? `${baseClass}--inherit-color` : '',
);

/** Computed size class with responsive support */
const sizeClass = computed<string>(() =>
  props.size ? responsiveModifyClass(baseClass, '', props.size) : '',
);

/** SVG data attributes for accessibility */
const dataObj: SVGAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': undefined,
};
if (hideSr) dataObj['aria-hidden'] = 'true';

/** Attributes for the use element when using SVG sprite */
const hrefAttrs = {
  href: props.use,
  'xlink:href': props.use,
};
</script>

<template>
  <svg
    v-bind="dataObj"
    :class="mapClasses(style, baseClass, sizeClass, inheritColorClass)"
  >
    <slot />
    <use
      v-if="use"
      v-bind="hrefAttrs"
    />
  </svg>
</template>

<style lang="scss" module src="./styles/CdrIcon.module.scss" />
