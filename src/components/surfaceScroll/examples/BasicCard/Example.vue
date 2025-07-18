<template>
  <CdrSurfaceScroll
    class="basic-card-scroll"
    :scrollbar-props="{ orientation: 'horizontal' }"
  >
    <div class="card-container">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
      >
        <CdrText tag="h3" class="card__title">{{ card.title }}</CdrText>
        <CdrText tag="p" class="card__description">{{ card.description }}</CdrText>
      </div>
    </div>
  </CdrSurfaceScroll>
</template>

<script setup lang="ts">
import CdrSurfaceScroll from '../../CdrSurfaceScroll.vue';
import CdrText from '../../../text/CdrText.vue';

const cards = [
  {
    title: 'Item 1',
    description: 'This is the first card with some sample text content to demonstrate scrolling.'
  },
  {
    title: 'Item 2',
    description: 'This is the second card showing how multiple cards can be scrolled horizontally.'
  },
  {
    title: 'Item 3',
    description: 'The third card continues the pattern with more content for demonstration.'
  },
  {
    title: 'Item 4',
    description: 'Fourth card adds more content to ensure scrolling is necessary.'
  },
  {
    title: 'Item 5',
    description: 'Fifth card provides additional content for a comprehensive scroll experience.'
  },
  {
    title: 'Item 6',
    description: 'The final card completes our horizontal scrolling demonstration.'
  }
];
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.basic-card-scroll {
  width: 100%;
}

.card-container {
  display: flex;
  gap: $cdr-space-one-x;
}

.card {
  flex: 0 0 280px;
  background: $cdr-color-background-primary;
  border: 1px solid $cdr-color-border-primary;
  border-radius: $cdr-radius-softer;
  padding: $cdr-space-one-x;
  transition: box-shadow 0.2s ease;

  &__title {
    margin-bottom: $cdr-space-half-x;
    color: $cdr-color-text-primary;
    font-weight: 600;
  }

  &__description {
    color: $cdr-color-text-secondary;
    line-height: 1.5;
  }
}
</style>
