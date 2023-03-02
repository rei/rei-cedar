<script>
import { defineComponent, useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';

export default defineComponent({
  name: 'CdrQuote',
  props: {
    /**
     * Sets the semantic HTML element for the quote.
     * @values blockquote, aside, q, div
     */
    tag: {
      type: String,
      default: 'blockquote',
      validator: (value) => propValidator(value, ['blockquote', 'aside', 'q', 'div']),
    },
    /**
     * Modifies the style variant for the quote
     * @demoSelectMultiple true
     * @values pull
     */
    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'pull']),
    },
    /** Sets the quote body text. */
    summary: String,
    /** Sets the quote attribution text. */
    citation: String,
  },
  setup(props) {
    const baseClass = 'cdr-quote';
    const summaryClass = 'cdr-quote__summary';
    const citationClass = 'cdr-quote__citation';
    const modifierClass = computed(() => props.modifier && `${baseClass}--${props.modifier}`);
    return {
      style: useCssModule(),
      mapClasses,
      baseClass,
      summaryClass,
      citationClass,
      modifierClass,
    };
  },
});
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
