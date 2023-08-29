<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';

/** Short excerpt used to emphasize content or break up a large body of text */
defineOptions({
  name: 'CdrQuote',
});

const props = defineProps({
  /**
   * Sets the semantic HTML element for the quote.
   * @values blockquote, aside, q, div
   */
    tag: {
    type: String,
    default: 'blockquote',
    validator: (value: string) => propValidator(value, ['blockquote', 'aside', 'q', 'div']),
  },
  /**
   * Modifies the style variant for the quote
   * @demoSelectMultiple true
   * @values pull
   */
  modifier: {
    type: String,
    default: '',
    validator: (value: string) => propValidator(value, ['', 'pull']),
  },
  /** Sets the quote body text. */
  summary: String,
  /** Sets the quote attribution text. */
  citation: String,
});

const style = useCssModule()
const baseClass = 'cdr-quote';
const summaryClass = 'cdr-quote__summary';
const citationClass = 'cdr-quote__citation';
const modifierClass = computed(() => props.modifier ? `${baseClass}--${props.modifier}` : '');

</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass)"
  >
    <p
      :class="style[summaryClass]"
      v-if="summary"
    >
      {{ summary }}
    </p>
    <slot />
    <cite
      v-if="citation"
      :class="style[citationClass]"
      tag="cite"
    >
      {{ citation }}
    </cite>
  </component>
</template>

<style lang="scss" module src="./styles/CdrQuote.module.scss">
</style>
