<script setup lang="ts">
import { ref } from 'vue';
import CdrSurfaceSelection from '../CdrSurfaceSelection.vue';
import CdrSwitch from '../../switch/CdrSwitch.vue';
import CdrSelect from '../../select/CdrSelect.vue';

defineOptions({ name: 'SurfaceSelection' });

const loading = ref(false);
const modifier = ref('primary');
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
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, role: 'checkbox', loading}">
        This is default
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: true, modifier, role: 'checkbox', loading }">
        This is checked
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, role: 'checkbox', loading: !loading }">
        This is loading
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, role: 'checkbox', loading, disabled: true }">
        This is disabled
      </CdrSurfaceSelection>
    </div>
    <hr class="example__hr" />
    <div class="example__demos2">
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, role: 'checkbox', loading }">
        Custom loading
        <template #loading>...</template>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, role: 'checkbox', loading }">
        <div>Auto</div>
        <div>Auto</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, loading, role: 'checkbox', class: 'example__wide' }">
        <div>Auto</div>
        <div class="example__100">100%</div>
      </CdrSurfaceSelection>
      <CdrSurfaceSelection v-bind="{ checked: false, modifier, loading, role: 'checkbox', orientation: 'vertical' }">
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
