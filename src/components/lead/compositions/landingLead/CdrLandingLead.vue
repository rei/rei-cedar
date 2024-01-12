<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrImg, CdrLead } from '../../../../lib';
import CdrHeadingSubheadingBlock from './components/CdrHeadingSubheadingBlock.vue';

/** 
 * Opinionated expression of a lead intended for use on landing pages
 * @preview true
 **/
defineOptions({
  name: 'CdrLead'
});

defineProps({
  /** Sets the lead's image source  */
  imgSrc: { type: String, default: '' },
  /** Comma-separated list of img srcsets */
  imgSrcset: { type: String, default: undefined },
  /** Sets the lead's image alt  */
  imgAlt: { type: String, default: '' },
  /** Sets the lead's heading  */
  heading: { type: String, default: undefined },
  /** Sets the lead's subheading  */
  subheading: { type: String, default: undefined }
});

const style = useCssModule();
const baseClass = 'cdr-landing-lead'
</script>

<template>
  <CdrLead>
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
  </CdrLead>
</template>

<style lang="scss" module src="./styles/CdrLandingLead.module.scss">
</style>
