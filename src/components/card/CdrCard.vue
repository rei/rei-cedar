<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrCardProps } from '../../types/interfaces';
import type { Tag } from '../../types/other';

/**
 * CdrCard - Related, interactive containers linking to a single subject or destination
 *
 * Cards are flexible containers for grouping related content and actions.
 * They serve as an entry point to more detailed information and can contain
 * various types of content including images, text, links, and buttons.
 */

defineOptions({
  name: 'CdrCard',
});

const props = withDefaults(defineProps<CdrCardProps>(), {
  tag: 'article' as Tag,
});

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-card';
</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <!-- @slot CdrCard content -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrCard.module.scss" />
