<script setup lang="ts">
import { useCssModule } from 'vue';
import { CdrImg, CdrHeadingSubheadingBlock } from '../../lib';


defineOptions({
  name: 'CdrLead'
});

defineProps({
  /** Sets the lead's image source  */
  imgSrc: { type: String, default: undefined },
  imgAlt: { type: String, default: '' },
  heading: { type: String, default: undefined },
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
      <!-- <header :class="style[`${baseClass}__copy-block`]">
        <h1
          :class="style[`${baseClass}__copy-block--heading`]"
          tag="h1"
        >
          {{ heading }}
        </h1>
        <p
          :class="style[`${baseClass}__copy-block--subheading`]"  
          role="doc-subtitle"
        >
          {{ subheading }}
        </p>
      </header> -->
      <CdrHeadingSubheadingBlock>
        {{ heading }}
        <template #subheading>
          {{ subheading }}
        </template>
      </CdrHeadingSubheadingBlock>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrLead.scss">
</style>
