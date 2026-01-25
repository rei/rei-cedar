<script setup lang="ts">
import { useCssModule } from 'vue';
import CdrImg from '../image/CdrImg.vue';
import type { CdrPictureProps } from '../../types/interfaces';

/**
 * Provides instructions for browsers to use alternative image versions in various scenarios
 * @uses CdrImg
 **/
defineOptions({
  name: 'CdrPicture',
});

withDefaults(defineProps<CdrPictureProps>(), {
  alt: '',
});

const baseClass = 'cdr-picture';
const style = useCssModule();
</script>

<template>
  <picture :class="style[baseClass]">
    <source
      v-for="(source, i) in sources"
      :key="`${source.media}--${i}`"
      v-bind="source"
    />
    <CdrImg
      :src="src"
      :alt="alt"
      :ratio="ratio"
      :fit="fit"
      :position="position"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :decoding="decoding"
    />
  </picture>
</template>

<style lang="scss" module src="./styles/CdrPicture.module.scss" />
