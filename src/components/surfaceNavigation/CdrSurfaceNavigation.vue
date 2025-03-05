<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import CdrSurface from '../surface/CdrSurface.vue';
import type { surface } from '../../types/interfaces';
import { getSurfaceProps } from '../../utils/surface';

/** Navigation variant of CdrSurface */
defineOptions({ name: 'CdrSurNavigation' });

const props = withDefaults(defineProps<surface>(), { tag: 'div' });

const style = useCssModule();

// Compute surface props
const surfaceProps = computed(() => getSurfaceProps(props));
</script>

<template>
  <CdrSurface
    v-bind="surfaceProps"
    :class="style['cdr-surface-navigation']"
    :tag="props.tag"
  >
    <slot />
  </CdrSurface>
</template>

<style lang="scss" module src="./styles/CdrSurfaceNavigation.module.scss" />