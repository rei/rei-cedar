<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrImg, CdrSplitSurface } from '.././../lib';
import CdrHeadingSubheadingBlock from './components/CdrHeadingSubheadingBlock.vue';
import CdrCta from './components/CdrCta.vue';
/** 
 * Displays a full-width image and heading at the top of a page
 * @preview true
 * @uses CdrSplitSurface, CdrImg, CdrHeadingDisplay, CdrSubheadingSans
 **/
defineOptions({
  name: 'CdrCtaLead'
});

defineProps({
  /** Sets the cta lead's image source  */
  imgSrc: { type: String, required: true },
  /** Comma-separated list of img srcsets */
  imgSrcset: { type: String, default: undefined },
  /** Sets the cta lead's image alt  */
  imgAlt: { type: String, default: '' },
  /** Sets the cta lead's heading  */
  heading: { type: String, required: true },
  /** Sets the cta lead's subheading  */
  subheading: { type: String, default: undefined },
  /** Sets the name for the CTA */
  cta: { type: String, default: undefined }
});

const style = useCssModule();
const baseClass = 'cdr-cta-lead'
</script>

<template>
  <CdrSplitSurface 
    :class="style[baseClass]" 
    surface="top"
  >
    <template #top>
      <CdrHeadingSubheadingBlock :class="style[`${baseClass}__copy-block`]">
        {{ heading }}
        <template #subheading>
          {{ subheading }}
        </template>
      </CdrHeadingSubheadingBlock>
    </template>
    <template #bottom>
      <CdrCta> 
        {{ cta }}
      </CdrCta>
      <CdrImg 
        :src="imgSrc"
        :srcset="imgSrcset"
        :alt="imgAlt"
        :class="style[`${baseClass}__image`]"
      />
    </template>
  </CdrSplitSurface>
</template>

<style lang="scss" module src="./styles/CdrCtaLead.module.scss">
</style>