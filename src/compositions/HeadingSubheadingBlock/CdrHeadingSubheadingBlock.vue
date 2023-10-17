<script setup lang="ts">
import { useCssModule } from 'vue';
import PresetHeadingDisplay4 from '../../components/text/presets/PresetHeadingDisplay4.vue';
import PresetSubheadingSans from '../../components/text/presets/PresetSubheadingSans.vue';

defineProps({
  headingTag: { type: String, default: 'h1' },
});

const baseClass = 'cdr-heading-subheading-block'
const style = useCssModule();
</script>

<template>
  <header :class="style[baseClass]">
    <PresetHeadingDisplay4
      :tag="headingTag"
      :class="style[`${baseClass}__heading`]"
    >
      <slot />
    </PresetHeadingDisplay4>
    <PresetSubheadingSans :class="style[`${baseClass}__subheading`]">
      <slot name="subheading" />
    </PresetSubheadingSans>
  </header>

</template>

<style lang="scss" module src="./styles/CdrHeadingSubheadingBlock.module.scss" />