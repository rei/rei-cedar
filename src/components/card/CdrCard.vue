<script>

/**
 * CdrCard
 *
 * @extends CdrRenderlessCard
 *
 * @prop {String} [tag='article'] - The name of the HTML tag to be used for the card.
 * @prop {Boolean} cdrCardIsLinked - Optional. Whether the card should be linked or not.
 *
 * @slot - Slot for custom content
 */

import { ref, defineComponent, useCssModule } from 'vue';
import CdrRenderlessCard from './CdrRenderlessCard.vue';

export default defineComponent({
  name: 'CdrCard',
  extends: CdrRenderlessCard,
  props: {
    tag: {
      type: String,
      required: false,
      default: 'article',
    },
    cdrCardIsLinked: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['cdr-card-clicked'], // add the 'cdr-card-clicked' event to the 'emits' option
  setup(props) {
    const isLinked = ref(props.cdrCardIsLinked);

    return {
      style: useCssModule(),
      baseClass: isLinked.value ? 'cdr-card' : 'cdr-card--static',
      // add event listener for 'cdr-card-clicked'
      handleCardClick() {
        if (isLinked.value) {
          this.$emit('cdr-card-clicked');
        }
      },
    };
  },
});

</script>

<template>
  <component
    :is="tag"
    :class="style[baseClass]"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrCard.module.scss">
</style>
