<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';
import mapClasses from '../../utils/mapClasses';
import { surfaceSelection } from '../../types/interfaces';
import { getSurfaceSelectionProps, getDefaultLayout } from '../../utils/surface';
import CdrLayout from '../layout/CdrLayout.vue';

/** Base component for user selections that have a checked state */

defineOptions({ name: 'CdrSurfaceSelection' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  shadow: undefined,
  tag: 'button',
  role: 'radio',
  modifier: 'default',
  checked: false,
  disabled: false,
  loading: false,
  layout: () => getDefaultLayout(),
});

const style = useCssModule();
const baseClass = 'cdr-surface-selection';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { classes, ...additionalProps } = getSurfaceSelectionProps(props, baseClass);
  console.log(classes);
  
  return { ...additionalProps, class: mapClasses(style, ...classes) || undefined };
});

// Merge layout props
const layoutProps = computed(() => Object.assign(getDefaultLayout(), props.layout));
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <div :class="style['cdr-surface-selection__inner']">
      <CdrLayout
        v-bind="layoutProps"
        :class="style['cdr-surface-selection__layout']"
      >
        <!-- @slot Where all default content should be placed. -->
        <slot />
      </CdrLayout>
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
