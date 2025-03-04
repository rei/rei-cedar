<template>
  <picture class="base-picture" data-ui="base-picture" :style="cssVars">
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
      ref="img"
      :alt="alt"
      :src="imageLg"
      :loading="loading"
      :fetchpriority="computedFetchPriority"
      class="base-picture__image"
      :aria-hidden="ariaHidden"
    />
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Defines available image sizes for different breakpoints.
 */
const sizes = {
  xs: [350, 550, 700, 800, 900],
  sm: [350, 550, 700, 800, 900, 1200, 2000],
  md: [350, 550, 700, 800, 900, 1200, 2000],
  lg: [350, 550, 700, 800, 900, 1200, 2000, 3000, 4000],
};

/**
 * Generates a `srcset` string for responsive images.
 *
 * @param {number[]} sizes - Array of sizes for the `srcset`.
 * @param {string} [src] - Base image source URL.
 * @param {boolean} [isLowDensity=false] - Whether to generate a low-density variant.
 * @returns {string} - The generated `srcset` attribute value.
 */
const generateResizeSrcSet = (
  sizes: number[],
  src?: string,
  isLowDensity = false,
) =>
  sizes.reduce(
    (acc, size) =>
      `${acc}${src}?im=Resize,width=${size}${isLowDensity ? '&density=1x' : ''} ${size}w,`,
    '',
  );

/**
 * Represents an image rendition with specific dimensions.
 */
export interface Rendition {
  /** The source URL of the image rendition */
  src: string;
  /** The width of the image rendition */
  width: number;
  /** The height of the image rendition */
  height: number;
}

/**
 * Represents various image renditions for different orientations.
 */
export interface Renditions {
  /** Wide (landscape) rendition */
  wide?: Rendition;
  /** Vertical (portrait) rendition */
  vertical?: Rendition;
  /** Original rendition (default fallback) */
  original: Rendition;
}

/**
 * Represents an image with multiple renditions and optional metadata.
 */
export interface Image {
  /** The alternative text for accessibility */
  alt: string;
  /** The image caption */
  caption?: string;
  /** Image attribution details */
  attribution?: string;
  /** Renditions available for this image */
  renditions: Renditions;
}

/**
 * Represents images for different breakpoints.
 */
export interface Images {
  /** Image for extra-small screens */
  xs: Image;
  /** Image for small screens (optional) */
  sm?: Image;
  /** Image for medium screens (optional) */
  md?: Image;
  /** Image for large screens (optional) */
  lg?: Image;
}

/**
 * Defines the rendered sizes for mobile and desktop views.
 */
export interface RenderedSizes {
  /** The `sizes` attribute for mobile screens */
  mobile: string;
  /** The `sizes` attribute for desktop screens */
  desktop: string;
}

/**
 * Props for the `BasePicture` component.
 */
export interface BasePictureProps {
  /** Set of images for different breakpoints */
  images: Images;
  /** Whether to use banner cropping for images */
  useBannerCrop?: boolean;
  /** Aspect ratio of the image (CSS `aspect-ratio` value) */
  ratio?: string;
  /** Border radius of the image (CSS `border-radius` value) */
  radius?: string;
  /** Alternative text for the image */
  alt?: string;
  /** Custom rendered sizes for responsive behavior */
  renderedSizes?: RenderedSizes;
  /** Whether to lazy-load the image */
  lazyLoad?: boolean;
  /** Fetch priority for the image (e.g., `high`, `low`, `auto`) */
  fetchPriority?: string;
  /** Additional CSS classes for styling */
  customClasses?: string;
  /** Whether the image should be hidden from assistive technologies */
  ariaHidden?: boolean;
  /** The `object-fit` property for the image */
  objectFit?: string;
  /** Whether to use resizing-based image generation */
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
  customClasses: '',
  ariaHidden: false,
  objectFit: 'cover',
  useResizing: true,
});

/**
 * Generates CSS variables for styling.
 */
const cssVars = computed(() => ({
  '--ratio': props.ratio,
  '--object-fit': props.objectFit,
  '--radius': props.radius,
}));

const loading = computed(() => (props.lazyLoad ? 'lazy' : undefined));
const computedFetchPriority = computed(() =>
  props.fetchPriority?.length ? props.fetchPriority : null,
);

/**
 * Retrieves the appropriate image source based on `useBannerCrop` preference.
 *
 * @param {keyof Images} size - The image size key (e.g., 'xs', 'sm').
 * @returns {string | undefined} - The selected image URL.
 */
const getImage = (size: keyof Images) => {
  const { wide, vertical, original } = props.images?.[size]?.renditions || {};
  return props.useBannerCrop ? wide?.src || vertical?.src : original?.src;
};

const imageXs = computed(() => getImage('xs'));
const imageSm = computed(() => getImage('sm'));
const imageMd = computed(() => getImage('md'));
const imageLg = computed(() => getImage('lg'));

const xsSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.xs, imageXs.value)
    : imageXs.value,
);
const smSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.sm, imageSm.value)
    : imageSm.value,
);
const mdSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.md, imageMd.value)
    : imageMd.value,
);
const lgSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.lg, imageLg.value)
    : imageLg.value,
);

const lowDensitySmSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.sm, imageSm.value, true)
    : imageSm.value,
);
const lowDensityMdSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.md, imageMd.value, true)
    : imageMd.value,
);
const lowDensityLgSrcSet = computed(() =>
  props.useResizing
    ? generateResizeSrcSet(sizes.lg, imageLg.value, true)
    : imageLg.value,
);

const renderedSizeMobile = computed(
  () => props.renderedSizes?.mobile || '100vw',
);
const renderedSizeDesktop = computed(
  () => props.renderedSizes?.desktop || '100vw',
);
const dprQuery = computed(() =>
  props.useResizing ? ' and (-webkit-min-device-pixel-ratio: 1.5)' : '',
);

defineExpose({ computedFetchPriority });
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
