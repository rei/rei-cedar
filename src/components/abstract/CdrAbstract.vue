<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrAbstractProps } from '../../types/interfaces';
import type { Tag } from '../../types/other';

/**
 * CdrAbstract - Content building blocks with pre-defined, fluid styles
 *
 * Content building blocks with pre-defined, fluid styles.
 * Abstract provides a fluid, responsive text style that adapts based on container width.
 */
defineOptions({
  name: 'CdrAbstract',
});

const props = withDefaults(defineProps<CdrAbstractProps>(), {
  tag: 'p' as Tag,
});

const baseClass: string = 'cdr-abstract';
const style: Record<string, string> = useCssModule();
</script>

<template>
  <component
    :is="props.tag"
    :class="style[baseClass]"
  >
    <!-- @slot Default slot for abstract content -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrAbstract.module.scss" />
