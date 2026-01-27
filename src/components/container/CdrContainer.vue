<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { CdrContainerProps } from '../../types/interfaces';
import type { Tag } from '../../types/other';
import mapClasses from '../../utils/mapClasses';

/**
 * CdrContainer - Provides base margins and responsive layout logic for pages
 *
 * Containers define the maximum width of page content and provide consistent
 * horizontal spacing. Use containers to create well-structured, responsive
 * layouts that adapt to different screen sizes.
 */

defineOptions({
  name: 'CdrContainer',
});

const props = withDefaults(defineProps<CdrContainerProps>(), {
  tag: 'div' as Tag,
  modifier: 'static',
});

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-container';

/** Computed modifier class for container variant */
const modifierClass = computed<string>(() => `${baseClass}--${props.modifier}`);
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass)"
  >
    <!-- @slot CdrContainer content  -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrContainer.module.scss" />
