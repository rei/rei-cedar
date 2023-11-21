<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrHeadingDisplay, CdrSubheadingSans } from '../../lib';

defineProps({
  headingTag: { type: String, default: 'h1' },
});

const baseClass = 'cdr-heading-subheading-block'
const style = useCssModule();
</script>

<template>
  <header :class="style[baseClass]">
    <CdrHeadingDisplay
      :tag="headingTag"
      scale="4"
      :class="style[`${baseClass}__heading`]"
    >
      <slot />
    </CdrHeadingDisplay>
    <CdrSubheadingSans :class="style[`${baseClass}__subheading`]">
      <slot name="subheading" />
    </CdrSubheadingSans>
  </header>

</template>

<style lang="scss" module src="./styles/CdrHeadingSubheadingBlock.module.scss" />