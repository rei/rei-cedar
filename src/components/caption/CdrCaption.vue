<script setup lang="ts">
import { useCssModule } from 'vue';
import type { CdrCaptionProps } from '../../types/interfaces';

/**
 * CdrCaption - Provides context and credit for an asset such as an image, video, or chart
 *
 * Captions provide descriptive information and attribution for media content.
 * Use captions to give credit to photographers, provide context for images,
 * or describe chart data.
 */

defineOptions({
  name: 'CdrCaption',
});

defineProps<CdrCaptionProps>();

const style: Record<string, string> = useCssModule();
const baseClass: string = 'cdr-caption';
const summaryClass: string = 'cdr-caption__summary';
const citeClass: string = 'cdr-caption__cite';
</script>

<template>
  <div :class="style[baseClass]">
    <p
      v-if="summary"
      :class="style[summaryClass]"
    >
      {{ summary }}
    </p>
    <cite
      v-if="credit"
      :class="style[citeClass]"
    >
      {{ credit }}
    </cite>
  </div>
</template>

<style lang="scss" module src="./styles/CdrCaption.module.scss" />
