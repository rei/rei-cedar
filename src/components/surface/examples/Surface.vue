<script setup lang="ts">
import CdrSurface, { type CdrSurfaceProps } from '../CdrSurface.vue';

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
      shadow: 'elevated',
      background: 'secondary',
      p: 'three-x',
    },
  },
  {
    label: 'This surface is styled like a chip or pill',
    props: {
      display: 'inline-block',
      radius: 'round',
      withBorder: true,
      borderWidth: 'sixteenth-x',
      background: 'secondary',
      elevation: 'modal',
      position: 'relative',
      px: 'one-x',
      py: 'three-quarter-x',
      fixed: true,
    },
  },
  {
    label: 'This surface uses the primary palette to apply a background and border color',
    props: {
      palette: 'primary',
      display: 'inline-block',
      radius: 'soft',
      p: 'two-x',
      withBorder: true,
      borderWidth: 'sixteenth-x',
    },
  },
  {
    label: 'This surface uses the secondary palette to apply a background and border color',
    props: {
      palette: 'secondary',
      display: 'inline-block',
      radius: 'soft',
      p: 'two-x',
      withBorder: true,
      borderWidth: 'sixteenth-x',
    },
  },
];
</script>

<template>
  <div class="example">
    <h2>Surface</h2>
    <template v-for="({ label, props }, index) in boxes" :key="index">
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
