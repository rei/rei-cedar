<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelection } from '../../types/interfaces';
import { getSurfaceSelectionProps } from '../../utils/surface';
import CdrFulfillmentTileLayout from './CdrFulfillmentTileLayout.vue';
import CdrFulfillmentTileHeader from './CdrFulfillmentTileHeader.vue';
import CdrFulfillmentTileContent from './CdrFulfillmentTileContent.vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';

/** Tile component for displaying a button with optional icon in the header. Based on Surface selection. */

defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  tag: 'button',
  role: 'radio',
  modifier: 'primary',
  checked: false,
  disabled: false,
  loading: false,
  orientation: 'vertical',
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { classes, additionalProps } = getSurfaceSelectionProps(props, baseClass);
  return { ...additionalProps, class: mapClasses(style, ...classes) || undefined };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <div :class="style['cdr-fulfillment-tile__inner']">
      <CdrFulfillmentTileHeader>
        <template
          v-if="$slots['icon-left']"
          #icon-left
        >
          <!-- @slot Place an icon to the left of the header content -->
          <slot name="icon-left" />
        </template>
        <template #header>
          <!-- @slot Header content that is still visible during loading. -->
          <slot name="header" />
        </template>
        <template
          v-if="$slots['icon-right']"
          #icon-right
        >
          <!-- @slot Place an icon to the right of the header content -->
          <slot name="icon-right" />
        </template>
      </CdrFulfillmentTileHeader>
      <div :class="style['cdr-fulfillment-tile__main']">
        <CdrFulfillmentTileLayout
          :orientation="orientation"
          :class="style['cdr-fulfillment-tile__layout']"
        >
          <template v-if="$slots['body']">
            <CdrFulfillmentTileContent :stretch="true">
              <!-- @slot Default font size is a step down. Placed just below the header. -->
              <slot name="body" />
            </CdrFulfillmentTileContent>
          </template>
          <template v-if="$slots['footer']">
            <CdrFulfillmentTileContent scale="-1">
              <!-- @slot Footer content will be at the bottom of the component. -->
              <slot name="footer" />
            </CdrFulfillmentTileContent>
          </template>
        </CdrFulfillmentTileLayout>
        <div :class="style['cdr-fulfillment-tile__loading']">
          <!-- @slot Custom content when component is loading. -->
          <slot name="loading">
            <CdrSkeleton>
              <CdrSkeletonBone type="line" />
            </CdrSkeleton>
          </slot>
        </div>
      </div>
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTile.module.scss"></style>
