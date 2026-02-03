<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrLandingLeadProps } from './types';
import { CdrImg, CdrSplitSurface } from '../../lib';
import CdrHeadingSubheadingBlock from './components/CdrHeadingSubheadingBlock.vue';

/**
 * Displays a full-width image and heading at the top of a page.
 * Combines a hero image with heading and subheading text using CdrSplitSurface layout.
 */
defineOptions({
  name: 'CdrLandingLead',
});

withDefaults(defineProps<CdrLandingLeadProps>(), {
  imgAlt: '',
});

const style = useCssModule();
const baseClass = 'cdr-landing-lead';
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

<style lang="scss" module src="./styles/CdrLandingLead.module.scss" />
