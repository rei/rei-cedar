<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrImg, CdrSplitSurface } from '.././../lib';
import CdrHeadingSubheadingBlock from './components/CdrHeadingSubheadingBlock.vue';

/** 
 * Opinionated expression of a lead intended for use on landing pages
 * @preview true
 * @uses CdrImg, CdrSplitSurface, CdrHeadingDisplay, CdrSubheadingSans
 **/
defineOptions({
  name: 'CdrLandingLead'
});

defineProps({
  /** Sets the landing lead's image source  */
  imgSrc: { type: String, required: true },
  /** Comma-separated list of img srcsets */
  imgSrcset: { type: String, default: undefined },
  /** Sets the landing lead's image alt  */
  imgAlt: { type: String, default: '' },
  /** Sets the landing lead's heading  */
  heading: { type: String, required: true },
  /** Sets the landing lead's subheading  */
  subheading: { type: String, default: undefined }
});

const style = useCssModule();
const baseClass = 'cdr-landing-lead'
</script>

<template>
  <CdrSplitSurface :class="style[baseClass]">
    <template #top>
      <CdrImg 
        :src="imgSrc"
        :srcset="imgSrcset"
        :alt="imgAlt"
        :class="style[`${baseClass}__image`]"
      />
    </template>
    <template #bottom>
      <CdrHeadingSubheadingBlock :class="style[`${baseClass}__copy-block`]">
        {{ heading }}
        <template #subheading>
          {{ subheading }}
        </template>
      </CdrHeadingSubheadingBlock>
    </template>
  </CdrSplitSurface>
</template>

<style lang="scss" module src="./styles/CdrLandingLead.module.scss">
</style>
