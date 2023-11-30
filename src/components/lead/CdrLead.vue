<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrImg } from '../../lib';
import CdrHeadingSubheadingBlock from './CdrHeadingSubheadingBlock.vue';

/** Static presentation used for page leads */
defineOptions({
  name: 'CdrLead'
});

defineProps({
  /** Sets the lead's image source  */
  imgSrc: { type: String, default: undefined },
  /** Sets the lead's image alt  */
  imgAlt: { type: String, default: '' },
  /** Sets the lead's heading  */
  heading: { type: String, default: undefined },
  /** Sets the lead's subheading  */
  subheading: { type: String, default: undefined }
});

const style = useCssModule();
const baseClass = 'cdr-lead'
</script>

<template>
  <div :class="style[baseClass]">
    <div :class="style[`${baseClass}__top`]" />
    <div
      v-if="imgSrc"
      :class="style[`${baseClass}__image-container`]"
    >
      <CdrImg 
        :src="imgSrc"
        :alt="imgAlt"
        :class="style[`${baseClass}__image`]"
      />
    </div>
    <div :class="style[`${baseClass}__lower`]">
      <!-- @slot Override content section -->
      <slot name="content">
        <CdrHeadingSubheadingBlock :class="style[`${baseClass}__copy-block`]">
          {{ heading }}
          <template #subheading>
            {{ subheading }}
          </template>
        </CdrHeadingSubheadingBlock>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLead.module.scss">
</style>
