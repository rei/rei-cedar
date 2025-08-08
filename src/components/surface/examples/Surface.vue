<script setup lang="ts">
import CdrSurface from '../CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import CdrTitle from '../../title/CdrTitle.vue';
import CdrButton from '../../button/CdrButton.vue';
import type { surface, HtmlAttributes } from '../../../types/interfaces';

defineOptions({ name: 'Surface' });

export interface Example {
  label: string;
  title: string;
  props: surface | HtmlAttributes;
}

const boxes: Example[] = [
  {
    label: 'This is a blank Surface',
    title: 'container title',
    props: {},
  },
  {
    label: 'This surface is styled like a card',
    title: 'secondary background',
    props: {
      borderRadius: 'soft',
      background: 'secondary',
      boxShadow: 'floating',
      class: 'example__card',
    },
  },
  {
    label: 'This surface is styled like a chip or pill',
    title: '',
    props: {
      borderRadius: 'round',
      background: 'secondary',
      class: 'example__pill',
    },
  },
  {
    label: 'This surface uses the primary modifier to apply a background but is in the membership-subtle palette ',
    title: 'membership-subtle palette',
    props: {
      class: 'example__card',
      palette: 'membership-subtle',  // Updated to use membership-subtle palette
      background: 'primary',
    },
  },
  {
    label: 'This surface uses the secondary modifier to apply a background it is in the membership-subtle palette, however the palette had no secondary color defined thus default palette values are used ',
    title: 'membership-subtle palette',
    props: {
      class: 'example__card',
      palette: 'membership-subtle',  // Updated to use membership-subtle palette
      background: 'secondary',
    },
  },
  {
    label: 'This surface uses the primary modifier to apply a background but is in the membership-vibrant palette ',
    title: 'membership-vibrant palette',
    props: {
      class: 'example__card',
      palette: 'membership-vibrant',  // Updated to use membership-subtle palette
      background: 'primary',
    },
  },
  {
    label: 'This surface uses the secondary modifier to apply a background it is in the membership-vibrant palette, however the palette had no secondary color defined thus default palette values are used ',
    title: 'membership-vibrant palette',
    props: {
      class: 'example__card',
      palette: 'membership-vibrant',  // Updated to use membership-subtle palette
      background: 'secondary',
      borderWidth: 'quarter-x',
      borderStyle: 'solid',
      borderColor: 'primary',
    },
  },
];
</script>

<template>
  <div class="example">
    <h2>Surface</h2>
    <template
      v-for="{ label, title, props } in boxes"
      :key="label"
    >
      <hr class="example__hr" />
      <CdrSurface v-bind="props">
        <CdrTitle>{{ title }}</CdrTitle>
        <CdrText>{{ label }}</CdrText>
        <CdrButton>Primary button</CdrButton> <cdrLink>and link</cdrLink>
      </CdrSurface>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens' as tokens;

.example {
  &__hr {
    margin: tokens.$cdr-space-two-x 0;
  }

  &__card {
    display: inline-block;
    padding: tokens.$cdr-space-two-x;
  }

  &__pill {
    display: inline-block;
    padding: tokens.$cdr-space-half-x tokens.$cdr-space-one-x;
  }
}
</style>
