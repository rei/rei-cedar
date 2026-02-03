<script setup lang="ts">
import { computed } from 'vue';
import CdrSurface from '../surface/CdrSurface.vue';
import type { CdrSurfaceNavigationProps } from './types';
import { getSurfaceProps } from '../../utils/surface';

/** Navigation variant of CdrSurface */
defineOptions({ name: 'CdrSurfaceNavigation' });

const props = withDefaults(defineProps<CdrSurfaceNavigationProps>(), { tag: 'div' });

defineSlots<{
  'default'(props: Record<string, never>): any;
}>();

// Compute surface props
const surfaceProps = computed(() => getSurfaceProps(props));
</script>

<template>
  <CdrSurface
    v-bind="surfaceProps"
    :tag="props.tag"
  >
    <slot />
  </CdrSurface>
</template>
