<script setup lang="ts">
import CdrSurface from '../CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { CdrSurfaceProps } from '../../../types/interfaces';

defineOptions({ name: 'Surface' });

export interface Example {
  label: string;
  props: CdrSurfaceProps;
}

const boxes: Example[] = [
  {
    label: 'This is a blank Surface',
    props: {},
  },
  {
    label: 'This surface is styled like a card',
    props: {
      radius: 'soft',
      background: 'secondary',
      shadow: 'floating',
      class: 'example__card',
    },
  },
  {
    label: 'This surface is styled like a chip or pill',
    props: {
      radius: 'round',
      withBorder: true,
      borderColor: 'primary',
      background: 'secondary',
      class: 'example__pill',
    },
  },
  {
    label: 'This surface uses the primary modifier to apply a background and border color',
    props: {
      modifier: 'primary',
      radius: 'soft',
      withBorder: true,
      class: 'example__card',
    },
  },
  {
    label: 'This surface uses the secondary modifier to apply a background and border color',
    props: {
      modifier: 'secondary',
      radius: 'soft',
      withBorder: true,
      borderStyle: 'dashed',
      class: 'example__card',
    },
  },
];
</script>

<template>
  <div class="example">
    <h2>Surface</h2>
    <template
      v-for="{ label, props } in boxes"
      :key="label"
    >
      <hr class="example__hr" />
      <CdrSurface v-bind="props">
        <CdrText>{{ label }}</CdrText>
      </CdrSurface>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__card {
    display: inline-block;
    padding: $cdr-space-two-x;
  }

  &__pill {
    display: inline-block;
    padding: $cdr-space-half-x $cdr-space-one-x;
  }
}
</style>
