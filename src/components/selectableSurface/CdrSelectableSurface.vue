<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSkeleton from '../skeleton/CdrSkeleton.vue';
import CdrSkeletonBone from '../skeleton/CdrSkeletonBone.vue';
import mapClasses from '../../utils/mapClasses';
import { selectableSurface } from '../../types/interfaces';
import { getSelectableSurfaceProps } from '../../utils/surface';
import CdrSelectableSurfaceLayout from './CdrSelectableSurfaceLayout.vue';

/** Base component for buttons that have a checked state */

defineOptions({ name: 'CdrSelectableSurface' });

const props = withDefaults(defineProps<selectableSurface>(), {
  shadow: undefined,
  tag: 'button',
  role: 'radio',
  modifier: 'default',
  checked: false,
  disabled: false,
  loading: false,
  orientation: 'horizontal',
});

const style = useCssModule();
const baseClass = 'cdr-selectable-surface';

// Manages the props passed along to CdrSurface
const rootProps = computed(() => {
  const { classes, ...additionalProps } = getSelectableSurfaceProps(props, baseClass);
  return { ...additionalProps, class: mapClasses(style, ...classes) || undefined };
});
</script>

<template>
  <component
    :is="tag"
    v-bind="rootProps"
  >
    <div :class="style['cdr-selectable-surface__inner']">
      <CdrSelectableSurfaceLayout
        :orientation="orientation"
        :class="style['cdr-selectable-surface__layout']"
      >
        <!-- @slot Where all default content should be placed. -->
        <slot />
      </CdrSelectableSurfaceLayout>
      <div :class="style['cdr-selectable-surface__loading']">
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

<style lang="scss" module src="./styles/CdrSelectableSurface.module.scss"></style>
