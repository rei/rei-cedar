<script setup lang="ts">
import CdrBox, { type CdrBoxProps } from '../CdrBox.vue';

defineOptions({ name: 'Box' });

export interface BoxExample {
  props: CdrBoxProps;
}

export interface Example extends BoxExample {
  children?: BoxExample[];
}

const boxes: Example[] = [
  {
    props: { 'data-id': 'test' },
  },
  {
    props: {
      radius: 'round',
      shadow: 'elevated',
      withBorder: true,
      borderWidth: 'sixteenth-x',
      surface: 'secondary',
      elevation: 'modal',
      position: 'relative',
      m: 'one-x',
      p: 'one-x',
    },
  },
  {
    props: {
      palette: 'secondary',
      p: 'one-x',
      withBorder: true,
      borderWidth: 'sixteenth-x',
    },
    children: [
      {
        props: {
          p: 'one-x',
          withBorder: true,
          borderWidth: 'sixteenth-x',
          mt: 'two-x',
        },
      },
      {
        props: {
          palette: 'secondary',
          p: 'one-x',
          withBorder: true,
          borderWidth: 'sixteenth-x',
          mt: 'two-x',
        },
      },
      {
        props: {
          palette: 'primary',
          p: 'one-x',
          withBorder: true,
          borderWidth: 'sixteenth-x',
          mt: 'two-x',
        },
      },
    ],
  },
];

const getDescription = (someProps) => {
  const propsText = Object.keys(someProps)
    .map((key) => `${key}=${someProps[key]}`)
    .join(', ');
  return `Props: ${propsText}`;
};
</script>

<template>
  <div class="boxes-demo">
    <h2>Box</h2>
    <template
      v-for="({ props, children }, index) in boxes"
      :key="index"
    >
      <hr class="boxes-demo__hr" />
      <CdrBox v-bind="props">
        {{ getDescription(props) }}
        <CdrBox
          v-if="children"
          v-for="child in children"
          v-bind="child.props"
        >
          {{ getDescription(props) }}
        </CdrBox>
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
