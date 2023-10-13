<script setup lang="ts">
import { useCssModule } from 'vue';
import PresentHeadingDisplay4 from '../../components/text/presets/PresetHeadingDisplay4.vue'
import PresentSubheadingSans from '../../components/text/presets/PresetSubheadingSans.vue'

const baseClass = 'cdr-heading-subheading-block'
const style = useCssModule();
</script>

<template>
  <div :class="style[baseClass]">
    <PresentHeadingDisplay4 :class="style[`${baseClass}__heading`]">
      <slot />
    </PresentHeadingDisplay4>
    <PresentSubheadingSans :class="style[`${baseClass}__subheading`]">
      <slot name="subheading" />
    </PresentSubheadingSans>
  </div>

</template>

<style lang="scss" module src="./styles/CdrHeadingSubheadingBlock.module.scss" />