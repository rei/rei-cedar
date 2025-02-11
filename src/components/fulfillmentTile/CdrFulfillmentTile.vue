<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelection } from '../../types/interfaces';
import { getSurfaceSelectionProps, getDefaultLayout } from '../../utils/surface';
import CdrLayout from '../layout/CdrLayout.vue';
import CdrFulfillmentTileHeader from './CdrFulfillmentTileHeader.vue';
import CdrFulfillmentTileContent from './CdrFulfillmentTileContent.vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';

/** Displays a composed selection option and provides feedback with optional icons */

defineOptions({ name: 'CdrFulfillmentTile' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  tag: 'button',
  role: 'radio',
  modifier: 'default',
  checked: false,
  disabled: false,
  loading: false,
  layout: () => getDefaultLayout({ flow: 'row' }),
});

const style = useCssModule();
const baseClass = 'cdr-fulfillment-tile';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { classes, ...additionalProps } = getSurfaceSelectionProps(props, baseClass);
  return { ...additionalProps, class: mapClasses(style, ...classes) || undefined };
});

// Merge layout props
const layoutProps = computed(() =>
  Object.assign(getDefaultLayout({ flow: 'row', rows: [1] }), props.layout),
);
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <CdrLayout
      :rows="['auto', 1]"
      :class="style['cdr-fulfillment-tile__inner']"
    >
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
        <CdrLayout
          v-bind="layoutProps"
          :class="style['cdr-fulfillment-tile__layout']"
        >
          <CdrFulfillmentTileContent>
            <!-- @slot Default font size is a step down. Placed just below the header. -->
            <slot name="body" />
          </CdrFulfillmentTileContent>
          <template v-if="$slots['footer']">
            <CdrFulfillmentTileContent scale="-1">
              <!-- @slot Footer content will be at the bottom of the component. -->
              <slot name="footer" />
            </CdrFulfillmentTileContent>
          </template>
        </CdrLayout>
        <div :class="style['cdr-fulfillment-tile__loading']">
          <!-- @slot Custom content when component is loading. -->
          <slot name="loading">
            <CdrSkeleton>
              <CdrSkeletonBone type="line" />
            </CdrSkeleton>
          </slot>
        </div>
      </div>
    </CdrLayout>
  </component>
</template>

<style lang="scss" module src="./styles/CdrFulfillmentTile.module.scss"></style>
