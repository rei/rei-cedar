<template>
  <picture
    class="base-picture"
    data-ui="base-picture"
    :style="cssVars"
  >
    <!-- XS (always high res) -->
    <source
      :media="`(max-width: 767px)${dprQuery}`"
      :srcset="xsSrcSet"
      :sizes="renderedSizeMobile"
    />

    <!-- LG - High res -->
    <source
      :media="`(min-width: 1232px)${dprQuery}`"
      :srcset="lgSrcSet"
      :sizes="renderedSizeDesktop"
    />

    <!-- MD -->
    <source
      :media="`(min-width: 992px)${dprQuery}`"
      :srcset="mdSrcSet"
      :sizes="renderedSizeMobile"
    />

    <!-- SM -->
    <source
      :media="`(min-width: 768px)${dprQuery}`"
      :srcset="smSrcSet"
      :sizes="renderedSizeMobile"
    />

    <!-- 1x Screen Art Direction -->
    <source
      v-if="useResizing"
      media="(min-width: 1232px) and (-webkit-device-pixel-ratio: 1)"
      :srcset="lowDensityLgSrcSet"
      :sizes="renderedSizeDesktop"
    />
    <source
      v-if="useResizing"
      media="(min-width: 992px) and (-webkit-device-pixel-ratio: 1)"
      :srcset="lowDensityMdSrcSet"
      :sizes="renderedSizeMobile"
    />
    <source
      v-if="useResizing"
      media="(-webkit-device-pixel-ratio: 1)"
      :srcset="lowDensitySmSrcSet"
      :sizes="renderedSizeMobile"
    />

    <!-- Fallback image -->
    <img
      v-if="imageLg"
      :alt="alt"
      :src="imageLg"
      :loading="lazyLoad ? 'lazy' : undefined"
      :fetchpriority="fetchPriority || undefined"
      class="base-picture__image"
      :aria-hidden="ariaHidden"
    />
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Images, RenderedSizes } from '.';

const sizes = {
  xs: [350, 550, 700, 800, 900],
  sm: [350, 550, 700, 800, 900, 1200, 2000],
  md: [350, 550, 700, 800, 900, 1200, 2000],
  lg: [350, 550, 700, 800, 900, 1200, 2000, 3000, 4000],
};

const generateResizeSrcSet = (widths: number[], src?: string, lowDensity = false) =>
  widths
    .map((width) => `${src}?im=Resize,width=${width}${lowDensity ? '&density=1x' : ''} ${width}w`)
    .join(', ');

export interface BasePictureProps {
  images: Images;
  useBannerCrop?: boolean;
  ratio?: string;
  radius?: string;
  alt?: string;
  renderedSizes?: RenderedSizes;
  lazyLoad?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto' | '';
  ariaHidden?: boolean;
  objectFit?: string;
  useResizing?: boolean;
}

const props = withDefaults(defineProps<BasePictureProps>(), {
  useBannerCrop: false,
  ratio: '',
  radius: '',
  alt: '',
  renderedSizes: () => ({ mobile: '100vw', desktop: '100vw' }),
  lazyLoad: true,
  fetchPriority: '',
  ariaHidden: false,
  objectFit: 'cover',
  useResizing: true,
});

const cssVars = computed(() => ({
  '--ratio': props.ratio,
  '--object-fit': props.objectFit,
  '--radius': props.radius,
}));

const getImage = (size: keyof Images) => {
  const { wide, vertical, original } = props.images[size]?.renditions ?? {};
  return props.useBannerCrop ? wide?.src || vertical?.src : original?.src;
};

const imageSource = (size: keyof Images) => computed(() => getImage(size));
const imageXs = imageSource('xs');
const imageSm = imageSource('sm');
const imageMd = imageSource('md');
const imageLg = imageSource('lg');

const resizeSource = (size: keyof typeof sizes, source: typeof imageXs, lowDensity = false) =>
  computed(() =>
    props.useResizing ? generateResizeSrcSet(sizes[size], source.value, lowDensity) : source.value,
  );
const xsSrcSet = resizeSource('xs', imageXs);
const smSrcSet = resizeSource('sm', imageSm);
const mdSrcSet = resizeSource('md', imageMd);
const lgSrcSet = resizeSource('lg', imageLg);
const lowDensitySmSrcSet = resizeSource('sm', imageSm, true);
const lowDensityMdSrcSet = resizeSource('md', imageMd, true);
const lowDensityLgSrcSet = resizeSource('lg', imageLg, true);

const renderedSizeMobile = computed(() => props.renderedSizes?.mobile || '100vw');
const renderedSizeDesktop = computed(() => props.renderedSizes?.desktop || '100vw');
const dprQuery = computed(() =>
  props.useResizing ? ' and (-webkit-min-device-pixel-ratio: 1.5)' : '',
);
</script>

<style lang="scss">
.base-picture {
  &__image {
    aspect-ratio: var(--ratio);
    object-fit: var(--object-fit);
    border-radius: var(--radius);
  }
}
</style>
