<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import CdrSurfaceSelection from '../surfaceSelection/CdrSurfaceSelection.vue';
import CdrFulfillmentTileHeader from './CdrFulfillmentTileHeader.vue';
import CdrUtilitySans, { type utilitySansTextProps } from '../text/presets/CdrUtilitySans.vue';
import { CdrFulfillmentTileProps } from '../../types/interfaces';

/** Tile component for displaying a button with optional icon in the header */

defineOptions({ name: 'CdrFulfillmentTileContent' });

interface CdrFulfillmentTileProps {
  stretch: boolean;
}

const props = withDefaults(defineProps<CdrFulfillmentTileProps>(), {
  stretch: false,
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile-content';

// Manages the props passed along to CdrSurfaceSelection
const rootProps = computed(() => {
  const classes = [baseClass];
    baseClass,
    [style[`${baseClass}__content`]]: true,
    [style[`${baseClass}__content--stretch`]]: props.stretch,
  };

  if(props.stretch) {
    classes.push(`${baseClass}--stretch`);
  }

  return {
    tag: 'div',
    scale: '-1',
    class: mapClasses(style, ...classes) || undefined,
  };
});

const headerProps = computed(() => ({ class: style[`${baseClass}__header`] }));

const contentProps = computed<utilitySansTextProps>(() => ({}));

const footerProps = computed<utilitySansTextProps>(() => ({
  tag: 'div',
  scale: '-1',
  class: { [style[`${baseClass}__content`]]: true },
}));
</script>

<template>
  <CdrSurfaceSelection v-bind="rootProps">
    <CdrFulfillmentTileHeader v-bind="headerProps">
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
