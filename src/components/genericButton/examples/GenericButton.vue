<script setup lang="ts">
import { ref } from 'vue';
import CdrGenericButton, { type CdrGenericButtonProps } from '../CdrGenericButton.vue';
import CdrBox from '../../box/CdrBox.vue';

defineOptions({ name: 'StyledButton' });

export interface Example {
  name?: string;
  props: CdrGenericButtonProps;
  events?: {
    click?: Function;
  };
}

const boxes: Example[] = [
  {
    props: { 'data-id': 'test' },
  },
  {
    props: {
      surface: 'secondary',
      p: 'one-x',
      borderWidth: 'eighth-x',
      borderColor: 'secondary',
      withBorder: true,
    },
  },
  {
    props: {
      palette: 'secondary',
      p: 'one-x',
      borderWidth: 'eighth-x',
      withBorder: true,
    },
  },
];

const chips = {
  count: 4,
  props: {
    withBorder: true,
    borderWidth: 'eighth-x',
    px: 'one-x',
    py: 'half-x',
    radius: 'round',
  },
};
const chipsValue = ref(0);

const toggle = {
  count: 2,
  props: {
    p: 'one-x',
    radius: 'soft',
    borderWidth: 'zero',
  },
};

const toggleValue = ref(0);

const cards = [
  {
    props: {
      class: 'generic-buttons-demo__card',
      shadow: 'elevated',
      radius: 'softer',
      tag: 'a',
      href: 'https://rei.com/',
      surface: 'secondary',
    },
  },
  {
    props: {
      class: 'generic-buttons-demo__card',
      shadow: 'elevated',
      radius: 'softer',
      button: 'a',
      surface: 'secondary',
    },
  },
];

const getDescription = (someProps) =>
  Object.keys(someProps)
    .map((key) => `${key}=${someProps[key]}`)
    .join(', ');
</script>

<template>
  <div class="generic-buttons-demo">
    <h2>GenericButton</h2>
    <template
      v-for="({ name, props, events = {} }, index) in boxes"
      :key="index"
    >
      <hr class="generic-buttons-demo__hr" />
      <CdrGenericButton
        v-bind="props"
        v-on="events"
      >
        <span v-if="name">{{ name }}: {{ ' ' }}</span>
        {{ getDescription(props) }}
      </CdrGenericButton>
    </template>
    <h3 class="generic-buttons-demo__h3">Chips</h3>
    <div class="generic-buttons-demo__chips">
      <CdrGenericButton
        v-for="(x, index) in new Array(chips.count)"
        :key="index"
        v-bind="chips.props"
        :checked="index === chipsValue"
        :disabled="index === 2"
        @click="chipsValue = index"
      >
        Chip {{ index + 1 }}
      </CdrGenericButton>
    </div>
    <h3 class="generic-buttons-demo__h3">Toggle</h3>
    <CdrBox
      class="generic-buttons-demo__toggle"
      :with-border="true"
      border-width="sixteenth-x"
      p="eighth-x"
      radius="softer"
    >
      <CdrGenericButton
        v-for="(x, index) in new Array(toggle.count)"
        :key="index"
        v-bind="toggle.props"
        :checked="index === toggleValue"
        @click="toggleValue = index"
      >
        Toggle {{ index + 1 }}
      </CdrGenericButton>
    </CdrBox>
    <h3 class="generic-buttons-demo__h3">Cards</h3>
    <div class="generic-buttons-demo__cards">
      <CdrGenericButton
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card.props"
      >
        <img
          src="https://www.rei.com/dam/18516466_gear-up-camp-hikie-homepage-lead-lg_web_lg.jpeg?im=Resize,width=400"
        />
        <CdrBox
          p="two-x"
          class="generic-buttons-demo__card-content"
        >
          Some content
        </CdrBox>
      </CdrGenericButton>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.generic-buttons-demo {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__h3 {
    margin: $cdr-space-two-x 0 $cdr-space-one-x 0;
  }

  &__chips {
    display: inline-flex;
    gap: $cdr-space-quarter-x;
  }

  &__toggle {
    display: inline-flex;
    gap: $cdr-space-quarter-x;
  }

  &__cards {
    display: flex;
    gap: $cdr-space-two-x;
  }

  &__card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 300px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__card-content {
  }
}
</style>
