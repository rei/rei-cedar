<script setup lang="ts">
import CdrBox from '../../box copy/CdrBox.vue';
import CdrText from '../../text/CdrText.vue';
import CdrUnstyledButton, { type CdrUnstyledButtonProps } from '../CdrUnstyledButton.vue';

defineOptions({ name: 'UnstyledButton' });

export interface Example {
  description: string;
  props: CdrUnstyledButtonProps;
  events?: {
    click?: Function;
  };
}

const boxes: Example[] = [
  {
    description: 'This is an unstyled button',
    props: { 'data-id': 'test' },
    events: { click: () => alert('Clicked!') },
  },
  {
    description: 'This button is a link',
    props: { tag: 'a', href: 'https://www.rei.com/' },
  },
  {
    description:
      'This button has padding, surface, shadow, and radius applied. It inherits all props from CdrBox',
    props: { p: 'one-x', surface: 'primary', radius: 'softer', shadow: 'elevated' },
    events: { click: () => alert('Clicked!') },
  },
];
</script>

<template>
  <div class="unstyled-buttons-demo">
    <h2>UnstyledButton</h2>
    <template
      v-for="{ description, props, events = {} } in boxes"
      :key="description"
    >
      <hr class="unstyled-buttons-demo__hr" />
      <CdrUnstyledButton
        v-bind="props"
        v-on="events"
      >
        <span v-html="description" />
      </CdrUnstyledButton>
    </template>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.unstyled-buttons-demo {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}
</style>
