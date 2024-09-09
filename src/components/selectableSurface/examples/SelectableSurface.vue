<script setup lang="ts">
import { ref, computed } from 'vue';
import CdrSelectableSurface from '../CdrSelectableSurface.vue';
import type { selectableSurface } from '../../../types/interfaces';
import CdrSwitch from '../../switch/CdrSwitch.vue';

defineOptions({ name: 'SelectableSurface' });

const loading = ref(false);

const examples = computed(
  () =>
    <selectableSurface[]>[
      { checked: false, role: 'checkbox', loading: loading.value },
      { checked: true, role: 'checkbox', loading: loading.value },
      { checked: false, role: 'checkbox', loading: !loading.value },
      {
        checked: false,
        role: 'checkbox',
        loading: loading.value,
        disabled: true,
      },
      { checked: false, role: 'checkbox', loading: loading.value },
      { checked: false, role: 'checkbox', loading: loading.value },
      {
        checked: false,
        loading: loading.value,
        role: 'checkbox',
        class: 'example__wide',
      },
      {
        checked: false,
        loading: loading.value,
        role: 'checkbox',
        orientation: 'vertical',
      },
    ],
);
</script>

<template>
  <div class="example">
    <h2>SelectableSurface</h2>
    <hr class="example__hr" />
    <div class="example__options">
      <CdrSwitch
        id="loading"
        v-model="loading"
      >
        Toggle loading
      </CdrSwitch>
    </div>
    <hr class="example__hr" />
    <div class="example__demos">
      <CdrSelectableSurface v-bind="examples[0]">This is default</CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[1]">This is checked</CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[2]">This is loading</CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[3]">This is disabled</CdrSelectableSurface>
    </div>
    <hr class="example__hr" />
    <div class="example__demos2">
      <CdrSelectableSurface v-bind="examples[4]">
        Custom loading
        <template #loading>...</template>
      </CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[5]">
        <div>Auto</div>
        <div>Auto</div>
      </CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[6]">
        <div>Auto</div>
        <div class="example__100">100%</div>
      </CdrSelectableSurface>
      <CdrSelectableSurface v-bind="examples[7]">
        <div>orientation</div>
        <div>vertical</div>
      </CdrSelectableSurface>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__options {
    gap: $cdr-space-one-x;
    display: flex;
  }

  &__demos {
    gap: $cdr-space-one-x;
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }

  &__demos2 {
    gap: $cdr-space-one-x;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__wide {
    width: 200px;
  }

  &__100 {
    width: 100%;
    background: black;
    color: white;
    text-align: center;
  }
}
</style>
