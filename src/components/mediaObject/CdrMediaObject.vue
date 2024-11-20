<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { MediaObject, NameValuePair, HtmlAttributes } from '../../types/interfaces';
import { modifyClassName } from '../../utils/buildClass';
import { getLayoutStyling } from '../../utils/mediaObject';
import CdrLayout from '../layout/CdrLayout.vue';

/** Component for buttons that have a checked state. */

defineOptions({ name: 'CdrMediaObject' });
//  go back to using media height and width to set cols/rows, that way we can still use 1fr if desired. discard the opposite height/width dependong on content position
const props = withDefaults(defineProps<MediaObject>(), {
  contentPosition: 'right',
  contentAlignment: 'start',
  mediaWidth: '1fr',
  mediaHeight: 'auto',
  mediaFit: 'cover',
  mediaPosition: 'center',
});

const style = useCssModule();

const rootProps = computed(() => {
  const baseClass = 'cdr-media-object';
  const classes = [baseClass];
  const inlineStyles: NameValuePair = {};
  const {
    contentPosition,
    contentAlignment,
    mediaFit,
    mediaPosition,
    mediaWidth,
    mediaHeight,
    ...otherProps
  } = props;
  const additionalProps: HtmlAttributes = { ...otherProps };

  // Determine how the media will take up space
  inlineStyles['--cdr-media-object-media-fit'] = mediaFit;

  // Determine media position within cell
  inlineStyles['--cdr-media-object-media-position'] = mediaPosition;

  // Get layout related props and inline styles based on media measurements and
  // content position, both of which can be dynamic
  const layoutStyling = getLayoutStyling(contentPosition, mediaWidth, mediaHeight);
  Object.assign(inlineStyles, layoutStyling.inlineStyles);

  // Add in class for allowing dynamic content positioning
  if (typeof props.contentPosition !== 'string') {
    classes.push(modifyClassName(baseClass, 'content-position-cq'));
  }

  // Add content alignment
  classes.push(modifyClassName(baseClass, `content-alignment-${contentAlignment}`));

  return {
    ...additionalProps,
    ...layoutStyling.props,
    class: mapClasses(style, ...classes) || undefined,
    style: inlineStyles,
  };
});
</script>

<template>
  <CdrLayout v-bind="rootProps">
    <!-- @slot Where the media should be placed. -->
    <slot name="media" />
    <!-- @slot Where all content should be placed. -->
    <slot name="content" />
  </CdrLayout>
</template>

<style lang="scss" module src="./styles/CdrMediaObject.module.scss"></style>
