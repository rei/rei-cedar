<script setup lang="ts">
import { ref } from 'vue';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';
import CdrSurface from '../../surface/CdrSurface.vue';

defineOptions({ name: 'SurfaceSelection' });

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
const chipsValue = ref(1);

const toggle = {
  count: 2,
  props: {
    p: 'one-x',
    radius: 'softer',
    borderWidth: 'zero',
    withBorder: true,
    class: 'example__toggle-button',
  },
};

const toggleValue = ref(1);
</script>

<template>
  <div class="example">
    <h2>SurfaceSelection</h2>
    <hr class="example__hr" />
    <CdrSurfaceSelection v-bind="{ checked: false }">
      This is a blank SurfaceSelection which uses the primary (default) modifier
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <CdrSurfaceSelection
      v-bind="{
        p: 'one-x',
        modifier: 'primary',
        withBorder: true,
        borderWidth: 'sixteenth-x',
        checked: false,
      }"
    >
      This surface uses the primary modifier and has a border
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <CdrSurfaceSelection
      v-bind="{
        p: 'one-x',
        modifier: 'secondary',
        withBorder: true,
        borderWidth: 'sixteenth-x',
        checked: false,
      }"
    >
      This surface uses the secondary modifier and has a border
    </CdrSurfaceSelection>
    <hr class="example__hr" />
    <h3 class="example__h3">Chips</h3>
    <div class="example__chips">
      <CdrSurfaceSelection
        v-for="index in chips.count"
        :key="index"
        v-bind="chips.props"
        :checked="index === chipsValue"
        :disabled="index === 2"
        @click="chipsValue = index"
      >
        Chip {{ index }}
      </CdrSurfaceSelection>
    </div>
    <hr class="example__hr" />
    <h3 class="example__h3">Toggle</h3>
    <CdrSurface
      class="example__toggle"
      :with-border="true"
      border-width="sixteenth-x"
      p="quarter-x"
      radius="softer"
      modifier="secondary"
    >
      <CdrSurfaceSelection
        v-for="index in toggle.count"
        :key="index"
        v-bind="toggle.props"
        :checked="index === toggleValue"
        @click="toggleValue = index"
      >
        Toggle {{ index }}
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
    --cdr-surface-selection-primary-background-color: var(--cdr-color-border-transparent);
    --cdr-surface-selection-primary-background-color-hover: #e3e0d8;
    --cdr-surface-selection-primary-background-color-active: var(--cdr-color-background-primary);
    --cdr-surface-selection-primary-background-color-checked: var(--cdr-color-background-primary);
  }
}
</style>
