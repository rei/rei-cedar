<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';

/** Media for capturing attention and communicating messages */
defineOptions({
  name: 'CdrImg',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Image source url.
   */
    src: {
    type: String,
    required: true,
  },
  /**
   * Image alt text. Defaults to an empty string
   */
  alt: {
    type: String,
    default: '',
  },
  /**
   * Aspect ratio of the media container
  * @demoSelectMultiple false
  * @values auto, square, 1-2, 2-3, 3-4, 9-16, 2-1, 3-2, 4-3, 16-9
  */
  ratio: {
    type: String,
    default: undefined,
    validator: (value: string) => ([
      'auto',
      'square',
      '1-2',
      '2-3',
      '3-4',
      '9-16',
      '2-1',
      '3-2',
      '4-3',
      '16-9'].indexOf(value) >= 0) || false,
  },
  /**
 * Requires a `ratio`. Area to crop the image overflow to. {left, center, right} {top, center, bottom}
 * @demoSelectMultiple false
 * @values left, x-center, right, top, y-center, bottom
 */
  crop: {
    type: String,
  },
  /**
 * Requires a `ratio`. Scale the image to be as large as possible to fill the area (background-position: cover;)
 */
  cover: {
    type: Boolean,
  },
  /**
 * Adds a custom class to the cdr-img__ratio container div
 */
  containerClass: String,
  /**
 * Sets a border radius to an element {square, top, right, bottom, left}
 * @demoSelectMultiple false
 * @values circle, rounded
 */
  radius: {
    type: String,
    validator: (value: string) => ([
      'circle',
      'rounded'].indexOf(value) >= 0) || false,
  },
  /**
   * Modifies the style variant for this component.
   * @demoSelectMultiple false
   * @values responsive
   */
  modifier: {
    type: String,
    default: '',
    validator: (value: string) => propValidator(value, ['', 'responsive']),
  },
});
const style = useCssModule();
const baseClass = 'cdr-image';
const ratioClass = 'cdr-image-ratio';
const coverWrapperClass = 'cdr-image-ratio__cover';
const modifierClass = computed(() => props.modifier ? `${baseClass}--${props.modifier}` : '');
const radiusClass = computed(() => props.radius ? `${baseClass}--${props.radius}` : '');
const cropObject = computed(() => ({ objectPosition: props.crop }));
const ratioObject = computed(() => {
  let ratioPct;
  if (props.ratio === 'square') {
    ratioPct = '100%';
  } else if (props.ratio === 'auto') {
    ratioPct = '0';
  } else {
    if (props.ratio) {
      const [x, y] = props.ratio.split('-');
      ratioPct = `${(+y / +x) * 100}%`;
    }
  }
  return { '--ratio': ratioPct };
});
const cropClass = computed(() => props.crop ? `${coverWrapperClass}--crop` : '');
const coverClass = computed(() => props.cover ? `${coverWrapperClass}--cover`: '');
</script>

<template>
  <div
    v-if="ratio"
    :style="ratioObject"
    :class="[style[ratioClass], containerClass]"
  >
    <img
      :style="cropObject"
      :class="mapClasses(style,
                         baseClass,
                         modifierClass,
                         radiusClass,
                         coverWrapperClass,
                         cropClass,
                         coverClass,
      )"
      :src="src"
      :alt="alt"
      v-bind="$attrs"
    >
  </div>
  <img
    v-else
    :class="mapClasses(style,
                       baseClass,
                       modifierClass,
                       radiusClass,
    )"
    :src="src"
    :alt="alt"
    v-bind="$attrs"
  >
</template>

<style lang="scss" module src="./styles/CdrImg.module.scss">
</style>
