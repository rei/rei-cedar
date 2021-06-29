<template>
  <div
    v-if="ratio"
    :style="ratioObject"
    :class="style[ratioClass]"
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
<script>
import { defineComponent, useCssModule, computed } from 'vue';

import mapClasses from '../../utils/mapClasses';
import { buildClass } from '../../utils/buildClass';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrImg',
  inheritAttrs: false,
  props: {
    /**
     * Required. Image source url.
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Required. Image alt text.
     */
    alt: {
      type: String,
      default: '',
    },
    /**
     * Aspect ratio of the media container. {auto, square, 1-2, 2-3, 3-4, 9-16, 2-1, 3-2, 4-3, 16-9}
     */
    ratio: {
      type: String,
      validator: (value) => ([
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
     * Sets a border radius to an element {square, top, right, bottom, left}
     */
    radius: {
      type: String,
      validator: (value) => ([
        'circle',
        'rounded'].indexOf(value) >= 0) || false,
    },

    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'responsive']),
    },
  },

  setup(props) {
    const baseClass = 'cdr-image';
    const ratioClass = 'cdr-image-ratio';
    const coverWrapperClass = 'cdr-image-ratio__cover';
    const modifierClass = computed(() => buildClass(baseClass, props.modifier));
    const radiusClass = computed(() => buildClass(baseClass, props.radius));

    const cropObject = computed(() => ({ objectPosition: props.crop }));
    const ratioObject = computed(() => {
      let ratioPct;
      if (props.ratio === 'square') {
        ratioPct = '100%';
      } else if (props.ratio === 'auto') {
        ratioPct = '0';
      } else {
        const [x, y] = props.ratio.split('-');
        ratioPct = `${(y / x) * 100}%`;
      }
      return { '--ratio': ratioPct };
    });

    const cropClass = computed(() => props.crop && buildClass(coverWrapperClass, 'crop'));
    const coverClass = computed(() => props.cover && buildClass(coverWrapperClass, 'cover'));

    return {
      style: useCssModule(),
      baseClass,
      ratioClass,
      coverWrapperClass,
      modifierClass,
      radiusClass,
      cropObject,
      ratioObject,
      cropClass,
      coverClass,
      mapClasses,
    };
  },
});
</script>

<style lang="scss" module src="./styles/CdrImg.module.scss">
</style>
