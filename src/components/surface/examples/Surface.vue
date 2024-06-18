<script setup lang="ts">
import CdrSurface from '../CdrSurface.vue';
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
      display: 'inline-block',
      radius: 'soft',
      background: 'secondary',
      shadow: 'floating',
      p: 'two-x',
    },
  },
  {
    label: 'This surface is styled like a chip or pill',
    props: {
      display: 'inline-block',
      radius: 'round',
      withBorder: true,
      borderWidth: 'sixteenth-x',
      borderColor: 'primary',
      background: 'secondary',
      px: 'one-x',
      py: 'three-quarter-x',
      fixed: true,
    },
  },
  {
    label: 'This surface uses the primary variant to apply a background and border color',
    props: {
      variant: 'primary',
      display: 'inline-block',
      radius: 'soft',
      p: 'one-x',
      withBorder: true,
      borderWidth: 'sixteenth-x',
    },
  },
  {
    label: 'This surface uses the secondary variant to apply a background and border color',
    props: {
      variant: 'secondary',
      display: 'inline-block',
      radius: 'soft',
      p: 'one-x',
      withBorder: true,
      borderWidth: 'sixteenth-x',
    },
  },
];
</script>

<template>
  <div class="example">
    <h2>Surface</h2>
    <template v-for="({ label, props }) in boxes" :key="label">
      <hr class="example__hr" />
      <CdrSurface v-bind="props">
        {{ label }}
      </CdrSurface>
    </template>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}
</style>
