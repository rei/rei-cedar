<script setup lang="ts">
import CdrSurface from '../CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { surface } from '../../../types/interfaces';

defineOptions({ name: 'Surface' });

export interface Example {
  label: string;
  props: surface;
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
      background: 'secondary',
      class: 'example__pill',
    },
  },
  {
    label: 'This surface uses the primary modifier to apply a background but is in the membership-subtle palette ',
    props: {
      class: 'example__card',
      palette: 'membership-subtle',  // Updated to use membership-subtle palette
      background: 'primary',
    },
  },
  {
    label: 'This surface uses the secondary modifier to apply a background it is in the membership-subtle palette, however the palette had no secondary color defined thus default palette values are used ',
    props: {
      class: 'example__card',
      palette: 'membership-subtle',  // Updated to use membership-subtle palette
      background: 'secondary',
    },
  },
  {
    label: 'This surface uses the primary modifier to apply a background but is in the membership-vibrant palette ',
    props: {
      class: 'example__card',
      palette: 'membership-vibrant',  // Updated to use membership-subtle palette
      background: 'primary',
    },
  },
  {
    label: 'This surface uses the secondary modifier to apply a background it is in the membership-vibrant palette, however the palette had no secondary color defined thus default palette values are used ',
    props: {
      class: 'example__card',
      palette: 'membership-vibrant',  // Updated to use membership-subtle palette
      background: 'secondary',
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
