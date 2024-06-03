<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type * as CSS from 'csstype';
import mapClasses from '../../utils/mapClasses';
import CdrSurfaceSelection from '../surfaceSelection/CdrSurfaceSelection.vue';
import CdrFulfillmentTileHeader from './CdrFulfillmentTileHeader.vue';
import CdrUtilitySans, { type utilitySansTextProps } from '../text/presets/CdrUtilitySans.vue';
import { CdrFulfillmentTileProps } from '../../types/interfaces'

/** Tile component for displaying a button with optional icon at the top right */

defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<CdrFulfillmentTileProps>(), {
  typeScale: '0',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile';

// Manages the props passed along to CdrGenericButton
const rootProps = computed(() => {
  const classes = [baseClass];
  const inlineStyles: CSS.Properties = {};

  return {
    ...props,
    style: inlineStyles,
    class: mapClasses(style, ...classes),
  };
});

const headerProps = computed(() => ({
  typeScale: props.typeScale,
  class: style[`${baseClass}__header`],
}));

const bodyProps = computed<utilitySansTextProps>(() => ({
  scale: '-1',
  tag: 'div',
  class: {
    [style[`${baseClass}__content`]]: true,
    [style[`${baseClass}__content--body`]]: true,
  },
}));

const footerProps = computed<utilitySansTextProps>(() => ({
  scale: '-1',
  tag: 'div',
  class: {
    [style[`${baseClass}__content`]]: true,
    [style[`${baseClass}__content--footer`]]: true,
  },
}));
</script>

<template>
  <CdrSurfaceSelection v-bind="rootProps">
    <CdrFulfillmentTileHeader
      v-if="$slots.label"
      v-bind="headerProps"
    >
      <template
        v-if="$slots['icon-left']"
        #icon-left
      >
        <slot name="icon-left" />
      </template>
      <template #label>
        <slot name="label" />
      </template>
      <template
        v-if="$slots['icon-right']"
        #icon-right
      >
        <slot name="icon-right" />
      </template>
    </CdrFulfillmentTileHeader>
    <CdrUtilitySans
      v-if="$slots.body"
      v-bind="bodyProps"
    >
      <slot name="body" />
    </CdrUtilitySans>
    <CdrUtilitySans
      v-if="$slots.footer"
      v-bind="footerProps"
    >
      <slot name="footer" />
    </CdrUtilitySans>
  </CdrSurfaceSelection>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTile.module.scss"></style>
