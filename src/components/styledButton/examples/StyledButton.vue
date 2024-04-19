<script setup lang="ts">
import CdrStyledButton, { type CdrStyledButtonProps } from '../CdrStyledButton.vue';

defineOptions({ name: 'StyledButton' });

export interface Example {
  description: string;
  props: CdrStyledButtonProps;
}

const boxes: Example[] = [
  {
    description: 'This is a styled button',
    props: {},
  },
  {
    description:
      'This button has padding, background, shadow, and radius applied. It inherits all props from CdrUnstyledButton',
    props: {},
  },
];
</script>

<template>
  <div class="styled-buttons-demo">
    <h2>StyledButton</h2>
    <template
      v-for="{ description, props } in boxes"
      :key="description"
    >
      <hr class="styled-buttons-demo__hr" />
      <CdrStyledButton v-bind="props">
        <span v-html="description" />
      </CdrStyledButton>
    </template>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.styled-buttons-demo {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}
</style>
