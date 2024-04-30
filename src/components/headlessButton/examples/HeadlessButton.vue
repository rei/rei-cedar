<script setup lang="ts">
import CdrHeadlessButton, { type CdrHeadlessButtonProps } from '../CdrHeadlessButton.vue';

defineOptions({ name: 'HeadlessButton' });

export interface Example {
  props: CdrHeadlessButtonProps;
  events?: {
    click?: Function;
  };
}

const boxes: Example[] = [
  {
    props: { 'data-id': 'test' },
    events: { click: () => alert('Clicked!') },
  },
  {
    props: { tag: 'a', href: 'https://www.rei.com/' },
  },
  {
    props: { p: 'one-x', surface: 'secondary', radius: 'softer', shadow: 'elevated' },
  },
];

const getDescription = (someProps) => {
  const propsText = Object.keys(someProps)
    .map((key) => `${key}=${someProps[key]}`)
    .join(', ');
  return `Props: ${propsText}`;
};
</script>

<template>
  <div class="headless-buttons-demo">
    <h2>HeadlessButton</h2>
    <template
      v-for="({ props, events = {} }, index) in boxes"
      :key="index"
    >
      <hr class="headless-buttons-demo__hr" />
      <CdrHeadlessButton
        v-bind="props"
        v-on="events"
      >
        {{ getDescription(props) }}
      </CdrHeadlessButton>
    </template>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.headless-buttons-demo {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}
</style>
