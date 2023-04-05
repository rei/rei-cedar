<script>
import { defineComponent, useCssModule } from 'vue';

/** Provides context and credit for an asset such as an image, video, or chart */
export default defineComponent({
  name: 'CdrCaption',
  props: {
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
  },

  setup() {
    return {
      style: useCssModule(),
      baseClass: 'cdr-caption',
      summaryClass: 'cdr-caption__summary',
      citeClass: 'cdr-caption__cite',
    };
  },
});
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
