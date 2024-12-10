<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { MediaObject, NameValuePair, HtmlAttributes } from '../../types/interfaces';
import type { Breakpoint } from '../../types/other';
import { modifyClassName } from '../../utils/buildClass';
import { getLayoutStyling } from '../../utils/mediaObject';
import CdrLayout from '../layout/CdrLayout.vue';
import { breakpoints, spacing } from '../../utils/other';

/** Component for buttons that have a checked state. */

defineOptions({ name: 'CdrMediaObject' });

const props = withDefaults(defineProps<MediaObject>(), {
  align: 'start',
  mediaPosition: 'left',
  mediaWidth: '1fr',
  mediaHeight: 'auto',
  mediaCover: false,
  overlay: false,
  overlayRowAlign: 'start',
  overlayColumnAlign: 'start',
  contentPadding: 'zero',
});

const style = useCssModule();

const rootProps = computed(() => {
  const baseClass = 'cdr-media-object';
  const classes = [baseClass];
  const inlineStyles: NameValuePair = {};
  const {
    align,
    mediaPosition,
    mediaWidth,
    mediaHeight,
    mediaCover,
    overlay,
    overlayRowAlign,
    overlayColumnAlign,
    contentPadding,
    ...otherProps
  } = props;
  const additionalProps: HtmlAttributes = { ...otherProps };

  if (contentPadding !== 'zero') {
    if (typeof contentPadding === 'string') {
      inlineStyles['--cdr-media-object-content-padding'] = spacing[contentPadding];
    } else {
      classes.push(modifyClassName(baseClass, 'content-padding-cq'));

      breakpoints.forEach((breakpoint: Breakpoint) => {
        // Add in padding styles for various breakpoints
        inlineStyles[`--cdr-media-object-content-padding-${breakpoint}`] =
          spacing[contentPadding[breakpoint]];
      });
    }
  }

  // Enter overlay mode, which does not use these props, because they are not relevant:
  // mediaPosition, mediaWidth, mediaHeight, mediaCover, align
  if (overlay) {
    classes.push(modifyClassName(baseClass, 'overlay'));
    Object.assign(additionalProps, { rows: 'auto', columns: 'auto' });
    inlineStyles['--cdr-media-object-row-align'] = overlayRowAlign;
    inlineStyles['--cdr-media-object-column-align'] = overlayColumnAlign;
  } else {
    // Get layout related props and inline styles based on media measurements and
    // content position, both of which can be dynamic
    const layoutStyling = getLayoutStyling(mediaPosition, mediaWidth, mediaHeight);
    Object.assign(inlineStyles, layoutStyling.inlineStyles);
    Object.assign(additionalProps, layoutStyling.props);

    // Add in class for allowing dynamic content positioning
    if (typeof mediaPosition !== 'string') {
      classes.push(modifyClassName(baseClass, 'media-position-cq'));
    }

    // Add align class and inline styles for allowing dynamic align values
    // or set the static value
    if (typeof align !== 'string') {
      classes.push(modifyClassName(baseClass, 'align-cq'));

      breakpoints.forEach((breakpoint: Breakpoint) => {
        // Add in media position styles for various breakpoints
        inlineStyles[`--cdr-media-object-align-${breakpoint}`] = align[breakpoint];
      });
    } else {
      inlineStyles['--cdr-media-object-align'] = align;
    }

    // Add cover class
    if (mediaCover) {
      classes.push(modifyClassName(baseClass, 'cover'));
    }
  }

  return {
    ...additionalProps,
    class: mapClasses(style, ...classes) || undefined,
    style: inlineStyles,
  };
});
</script>

<template>
  <CdrLayout v-bind="rootProps">
    <div :class="style['cdr-media-object__media']">
      <!-- @slot Where the media should be placed. Should be a single node. -->
      <slot name="media" />
    </div>
    <div :class="style['cdr-media-object__content']">
      <!-- @slot Where all content should be placed. Can be multiple nodes. -->
      <slot name="content" />
    </div>
  </CdrLayout>
</template>

<style lang="scss" module src="./styles/CdrMediaObject.module.scss"></style>
