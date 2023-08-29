<script setup lang="ts">
import { useCssModule } from 'vue';

/** Provides context and credit for an asset such as an image, video, or chart */
defineOptions({
  name: 'CdrCaption',
});

defineProps({
  /**
   * Sets the string content for the description body of the caption.
   * @demoIgnore true
   */
  summary: {
    type: String,
  },
  /**
   * Sets the string content for attribution.
   * @demoIgnore true
   */
  credit: {
    type: String,
  },
});

const style = useCssModule();
const baseClass = 'cdr-caption';
const summaryClass = 'cdr-caption__summary';
const citeClass = 'cdr-caption__cite';

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

<style lang="scss" module src="./styles/CdrCaption.module.scss">
</style>
