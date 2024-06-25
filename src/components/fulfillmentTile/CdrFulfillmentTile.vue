<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { CdrFulfillmentTileProps, HtmlAttributes } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';
import CdrFulfillmentTileHeader from './CdrFulfillmentTileHeader.vue';
import CdrFulfillmentTileContent from './CdrFulfillmentTileContent.vue';

/** Tile component for displaying a button with optional icon in the header */

defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<CdrFulfillmentTileProps>(), {
  tag: 'button',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { checked } = props;
  const { inlineStyles, classes } = getSurfaceProps(props, baseClass);
  const additionalProps: HtmlAttributes = {};

  // Add checked
  additionalProps['aria-checked'] = checked;

  return {
    ...additionalProps,
    style: inlineStyles,
    class: mapClasses(style, ...classes) || undefined,
  };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <CdrFulfillmentTileHeader>
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
    <template v-if="$slots['body']">
      <CdrFulfillmentTileContent>
        <slot name="body" />
      </CdrFulfillmentTileContent>
    </template>
    <template v-if="$slots['footer']">
      <CdrFulfillmentTileContent :stretch="true">
        <slot name="footer" />
      </CdrFulfillmentTileContent>
    </template>
  </component>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTile.module.scss"></style>
