<template>
  <CdrFilmstrip
    class="custom-data-filmstrip"
    :model="customModel"
    :adapter="adapter"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import customAdapter from './custom-adapter';
import CustomFrame from './CustomFrame.vue';
import type { CustomModel } from './types';

// This is your custom data model - the structure your app uses
const customModel: CustomModel = {
  title: 'Custom Data Example',
  items: [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 },
    { id: 4, name: 'Item 4', value: 400 },
    { id: 5, name: 'Item 5', value: 500 },
  ],
};

// The adapter translates your custom model into frame props
const adapter = (model: CustomModel) => ({
  ...customAdapter(model),
  component: CustomFrame,
});
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.custom-data-filmstrip {
  margin: $cdr-space-one-x 0;
}
</style>
