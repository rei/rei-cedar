<script setup lang="ts">
import CdrBox, { type CdrBoxProps } from '../CdrBox.vue';

defineOptions({ name: 'Box' });

export interface Example {
  description: string;
  props: CdrBoxProps;
}

const boxes: Example[] = [
  {
    description: 'This is a box without any props',
    props: {},
  },
  {
    description:
      'This box is styled like a card. This box has padding, background, radius, and shadow props applied.',
    props: { p: 'one-x', background: 'secondary', radius: 'softer', shadow: 'elevated' },
  },
  {
    description:
      'This box is styled like a tile. This box has padding, background, and borderColor props applied.',
    props: {
      p: 'one-x',
      radius: 'softer',
      background: 'secondary',
      borderColor: 'secondary',
    },
  },
];
</script>

<template>
  <div class="boxes-demo">
    <h2>Box</h2>
    <template
      v-for="{ description, props } in boxes"
      :key="description"
    >
      <hr class="boxes-demo__hr" />
      <CdrBox v-bind="props">
        <span v-html="description" />
      </CdrBox>
    </template>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.boxes-demo {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}
</style>
