<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelection } from '../../types/interfaces';
import { getSurfaceSelectionProps } from '../../utils/surface';
import CdrSurfaceSelectionLayout from './CdrSurfaceSelectionLayout.vue';

/** Component for buttons that have a checked state. */

defineOptions({ name: 'CdrSurfaceSelection' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  shadow: undefined,
  tag: 'button',
  role: 'radio',
  modifier: 'primary',
  checked: false,
  disabled: false,
  loading: false,
  orientation: 'horizontal',
});

const style = useCssModule();
const baseClass = 'cdr-surface-selection';

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
    <div :class="style['cdr-surface-selection__inner']">
      <CdrSurfaceSelectionLayout
        :orientation="orientation"
        :class="style['cdr-surface-selection__layout']"
      >
        <!-- @slot Where all default content should be placed. -->
        <slot />
      </CdrSurfaceSelectionLayout>
      <div :class="style['cdr-surface-selection__loading']">
        <!-- @slot This slot allows for custom loading content. -->
        <slot name="loading">
          <CdrSkeleton>
            <CdrSkeletonBone type="line" />
          </CdrSkeleton>
        </slot>
      </div>
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurfaceSelection.module.scss"></style>
