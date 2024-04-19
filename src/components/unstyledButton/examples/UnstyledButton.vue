<script setup lang="ts">
import CdrUnstyledButton, { type CdrUnstyledButtonProps } from '../CdrUnstyledButton.vue';

defineOptions({ name: 'UnstyledButton' });

export interface Example {
  description: string;
  props: CdrUnstyledButtonProps;
}

const boxes: Example[] = [
  {
    description: 'This is an unstyled button',
    props: {},
  },
  {
    description:
      'This button has padding, background, shadow, and radius applied. It inherits all props from CdrBox',
    props: { p: 'one-x', background: 'secondary', radius: 'softer', shadow: 'elevated' },
  },
];
</script>

<template>
  <div class="unstyled-buttons-demo">
    <h2>UnstyledButton</h2>
    <template
      v-for="{ description, props } in boxes"
      :key="description"
    >
      <hr class="unstyled-buttons-demo__hr" />
      <CdrUnstyledButton v-bind="props">
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
