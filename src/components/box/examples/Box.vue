<script setup lang="ts">
import CdrBox, { type CdrBoxProps } from '../CdrBox.vue';
import CdrText from '../../text/CdrText.vue';

defineOptions({ name: 'Box' });

export interface Example {
  description: string;
  props: CdrBoxProps;
}

const boxes: Example[] = [
  {
    description: 'This is a box without any specific props',
    props: { 'data-id': 'test' },
  },
  {
    description:
      'This is a box with radius, shadow, borderColor, surface, elevation, position, margin, and padding props applied.',
    props: {
      radius: 'round',
      shadow: 'elevated',
      borderColor: 'secondary',
      surface: 'secondary',
      elevation: 'modal',
      position: 'relative',
      m: 'one-x',
      p: 'one-x',
    },
  },
  {
    description: 'This is a box with the palette prop applied.',
    props: {
      palette: 'sale',
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
        <CdrText>
          <span v-html="description" />
        </CdrText>
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
