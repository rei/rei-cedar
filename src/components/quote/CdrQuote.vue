<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import type { CdrQuoteProps } from '../../types/interfaces';

/** Short excerpt used to emphasize content or break up a large body of text */
defineOptions({
  name: 'CdrQuote',
});

const props = withDefaults(defineProps<CdrQuoteProps>(), {
  tag: 'blockquote',
  modifier: '',
});

const style = useCssModule();
const baseClass = 'cdr-quote';
const summaryClass = 'cdr-quote__summary';
const citationClass = 'cdr-quote__citation';
const modifierClass = computed(() => (props.modifier ? `${baseClass}--${props.modifier}` : ''));
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

<style lang="scss" module src="./styles/CdrQuote.module.scss" />
