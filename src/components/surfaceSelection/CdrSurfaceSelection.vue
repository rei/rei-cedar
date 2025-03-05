<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSurface from '../surface/CdrSurface.vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';
import CdrLayout from '../layout/CdrLayout.vue';
import type { surfaceSelection } from '../../types/interfaces';
import { getSurfaceProps, getDefaultLayout } from '../../utils/surface';

/** Selection variant of CdrSurface with additional interactive states */
defineOptions({ name: 'CdrSurfaceSelection' });

const props = withDefaults(defineProps<surfaceSelection>(), {
  tag: 'div',
  role: 'checkbox',
});

const style = useCssModule();

// Compute surface props including selection-specific attributes
const surfaceProps = computed(() => ({
  ...getSurfaceProps(props),
  'aria-checked': props.checked,
  'aria-disabled': props.disabled,
  'data-loading': props.loading,
}));

// Merge default layout with any passed layout props
const layoutProps = computed(() => ({
  ...getDefaultLayout(),
  ...props.layout,
}));
</script>

<template>
  <CdrSurface
    v-bind="surfaceProps"
    :class="style['cdr-surface-selection']"
    :tag="props.tag"
  >
    <div :class="style['cdr-surface-selection__inner']">
      <CdrLayout
        v-bind="layoutProps"
        :class="style['cdr-surface-selection__layout']"
      >
        <slot />
      </CdrLayout>
      <div :class="style['cdr-surface-selection__loading']">
        <slot name="loading">
          <CdrSkeleton>
            <CdrSkeletonBone type="line" />
          </CdrSkeleton>
        </slot>
      </div>
    </div>
  </CdrSurface>
</template>

<style lang="scss" module src="./styles/CdrSurfaceSelection.module.scss" />