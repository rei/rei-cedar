<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrHeadingSubheadingBlockProps } from '../types';
import { CdrHeadingDisplay, CdrSubheadingSans } from '../../../lib';

/**
 * Internal component for combining a heading and subheading.
 * Used within CdrLandingLead to structure text content.
 */
withDefaults(defineProps<CdrHeadingSubheadingBlockProps>(), {
  headingTag: 'h1',
});

defineSlots<{
  'default'(props: Record<string, never>): any;
  'subheading'(props: Record<string, never>): any;
}>();

const baseClass = 'cdr-heading-subheading-block';
const style = useCssModule();
</script>

<template>
  <header :class="style[baseClass]">
    <CdrHeadingDisplay
      :tag="headingTag as keyof HTMLElementTagNameMap"
      scale="scale-4"
      :class="style[`${baseClass}__heading`]"
    >
      <slot />
    </CdrHeadingDisplay>
    <CdrSubheadingSans
      tag="span"
      :class="style[`${baseClass}__subheading`]"
    >
      <slot name="subheading" />
    </CdrSubheadingSans>
  </header>
</template>

<style lang="scss" module src="../styles/CdrHeadingSubheadingBlock.module.scss" />
