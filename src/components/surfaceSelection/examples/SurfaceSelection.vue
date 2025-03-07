<script setup lang="ts">
import { ref, computed } from 'vue';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';
import type { surfaceSelection } from '../../../types/interfaces';
import CdrSwitch from '../../switch/CdrSwitch.vue';

defineOptions({ name: 'SurfaceSelection' });

const loading = ref(false);

const commonProps = <surfaceSelection>{
  variant: 'selection',
  role: 'checkbox'
};

const examples = computed(
  () =>
    <surfaceSelection[]>[
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
      },
      {
        ...commonProps,
        checked: true,
        loading: loading.value
      },
      {
        ...commonProps,
        checked: false,
        loading: !loading.value,
      },
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
        disabled: true,
      },
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
      },
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
      },
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
        class: 'example__wide',
        layout: { columns: ['auto', 1] },
        variant: 'selection'
      },
      {
        ...commonProps,
        checked: false,
        loading: loading.value,
        layout: { flow: 'row' },
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
        <div>auto</div>
        <div>auto</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[6]">
        <div>auto</div>
        <div class="example__remaining">1fr</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="examples[7]">
        <div class="example__color-row">layout flow</div>
        <div class="example__color-row">set to "row"</div>
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
    width: 300px;
  }

  &__remaining {
    background: black;
    color: white;
    text-align: center;
  }

  &__color-row {
    padding: .2rem .8rem;
    color: white;
    background: black;
  }
}
</style>
