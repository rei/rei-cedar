<script setup lang="ts">
import { useCssModule, provide, toRef } from 'vue';
import type { CdrSkeletonProps } from './types';
import { motionKey } from '../../types/symbols';

/** Visually communicates content is in the process of loading */
defineOptions({
  name: 'CdrSkeleton',
});

const props = withDefaults(defineProps<CdrSkeletonProps>(), {
  motion: true,
});

defineSlots<{
  /** CdrSkeleton content (CdrSkeletonBone components) */
  'default'(props: Record<string, never>): any;
}>();

const baseClass = 'cdr-skeleton';
const style = useCssModule();

const motionSetting = toRef(props, 'motion');
provide(motionKey, motionSetting);
</script>

<template>
  <div
    :class="style[baseClass]"
    aria-live="polite"
    aria-busy="true"
  >
    <!-- @slot CdrSkeleton content (CdrSkeletonBone components) -->
    <slot />
  </div>
</template>

<style lang="scss" module src="./styles/CdrSkeleton.module.scss" />
