<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrCardProps } from './types';
import type { Tag } from '../../types/componentOptions';

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

withDefaults(defineProps<CdrCardProps>(), {
  tag: 'article' as Tag,
});

defineSlots<{
  /** CdrCard content */
  'default'(props: Record<string, never>): any;
}>();

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
