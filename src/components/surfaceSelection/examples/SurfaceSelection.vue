<script setup lang="ts">
import { ref } from 'vue';
import CdrSurfaceSelection, { type CdrSurfaceSelectionProps } from '../CdrSurfaceSelection.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';

defineOptions({ name: 'SurfaceSelection' });



// const boxes: Example[] = [
//   {
//     props: { 'data-id': 'test' },
//   },
//   {
//     props: ,
//   },
//   {
//     props: {
//       palette: 'secondary',
//       p: 'one-x',
//       borderWidth: 'eighth-x',
//       withBorder: true,
//     },
//   },
// ];

const chips = {
  count: 4,
  props: {
    withBorder: true,
    borderWidth: 'eighth-x',
    px: 'one-x',
    py: 'half-x',
    radius: 'round',
    palette: 'primary',
  },
};
const chipsValue = ref(0);

const toggle = {
  count: 2,
  props: {
    p: 'one-x',
    radius: 'softer',
    palette: 'primary',
    borderWidth: 'zero',
    withBorder: true,
    class: 'example__toggle-button',
  },
};

const toggleValue = ref(0);

const card = {
  props: {
    class: 'example__card',
    shadow: 'elevated',
    radius: 'softer',
    tag: 'a',
    href: 'https://rei.com/',
    palette: 'secondary',
  },
};
</script>

<template>
  <div class="example">
    <h2>SurfaceSelection</h2>
    <hr class="example__hr" />
    <CdrSurfaceSelection>
      This is a blank SurfaceSelection
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <CdrSurfaceSelection v-bind="{ p: 'one-x', palette: 'primary', withBorder: true, borderWidth: 'sixteenth-x' }">
      This surface uses the primary palette to apply a background and border color
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <CdrSurfaceSelection v-bind="{ p: 'one-x', palette: 'secondary', withBorder: true, borderWidth: 'sixteenth-x' }">
      This surface uses the secondary palette to apply a background and border color
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <h3 class="example__h3">Chips</h3>
    <div class="example__chips">
      <CdrSurfaceSelection v-for="(x, index) in new Array(chips.count)" :key="index" v-bind="chips.props"
        :checked="index === chipsValue" :disabled="index === 2" @click="chipsValue = index">
        Chip {{ index + 1 }}
      </CdrSurfaceSelection>
    </div>
    <hr class="example__hr" />
    <h3 class="example__h3">Toggle</h3>
    <CdrSurface class="example__toggle" :with-border="true" border-width="sixteenth-x" p="quarter-x" radius="softer"
      palette="secondary">
      <CdrSurfaceSelection v-for="(x, index) in new Array(toggle.count)" :key="index" v-bind="toggle.props"
        :checked="index === toggleValue" @click="toggleValue = index">
        Toggle {{ index + 1 }}
      </CdrSurfaceSelection>
    </CdrSurface>
  </div>
</template>

<style lang="scss">
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
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

  &__toggle-button {
    --cdr-palette-background-rest: var(--cdr-color-border-transparent);
    --cdr-palette-background-hover: #e3e0d8;
    --cdr-palette-background-active: var(--cdr-color-background-primary);
    --cdr-palette-background-checked: var(--cdr-color-background-primary);
  }
}
</style>
