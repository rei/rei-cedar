<script setup lang="ts">
import { ref, computed } from 'vue';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';
import type { surfaceSelection } from '../../../types/interfaces';
import type { Modifier } from '../../../types/other';
import CdrSwitch from '../../switch/CdrSwitch.vue';
import CdrSelect from '../../select/CdrSelect.vue';

defineOptions({ name: 'SurfaceSelection' });

const loading = ref(false);
const modifier = ref<Modifier>('primary');

const examples = computed(
  () =>
    <surfaceSelection[]>[
      { checked: false, modifier: modifier.value, role: 'checkbox', loading: loading.value },
      { checked: true, modifier: modifier.value, role: 'checkbox', loading: loading.value },
      { checked: false, modifier: modifier.value, role: 'checkbox', loading: !loading.value },
      {
        checked: false,
        modifier: modifier.value,
        role: 'checkbox',
        loading: loading.value,
        disabled: true,
      },
      { checked: false, modifier: modifier.value, role: 'checkbox', loading: loading.value },
      { checked: false, modifier: modifier.value, role: 'checkbox', loading: loading.value },
      {
        checked: false,
        modifier: modifier.value,
        loading: loading.value,
        role: 'checkbox',
        class: 'example__wide',
      },
      {
        checked: false,
        modifier: modifier.value,
        loading: loading.value,
        role: 'checkbox',
        orientation: 'vertical',
      },
    ],
);
</script>

<template>
  <div class="example">
    <h2>SurfaceSelection</h2>
    <hr class="example__hr" />
    <div class="example__options">
      <CdrSwitch
        id="loading"
        v-model="loading"
      >
        Toggle loading
      </CdrSwitch>
      <CdrSelect
        id="modifier"
        v-model="modifier"
        label="Modifier"
        :options="['primary', 'secondary']"
      >
        Modifier
      </CdrSelect>
    </div>
    <hr class="example__hr" />
    <div class="example__demos">
      <CdrSurfaceSelection v-bind="examples[0]">This is default</CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[1]">This is checked</CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[2]">This is loading</CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[3]">This is disabled</CdrSurfaceSelection>
    </div>
    <hr class="example__hr" />
    <div class="example__demos2">
      <CdrSurfaceSelection v-bind="examples[4]">
        Custom loading
        <template #loading>...</template>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[5]">
        <div>Auto</div>
        <div>Auto</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[6]">
        <div>Auto</div>
        <div class="example__100">100%</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[7]">
        <div>orientation</div>
        <div>vertical</div>
      </CdrSurfaceSelection>
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
