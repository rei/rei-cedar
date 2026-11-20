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

// Step 1: Define your data model
// This is the data structure your application uses
// It could come from an API, database, or be hardcoded like this example
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

// Step 2: Create the adapter
// The adapter translates your data into Cedar's format
// We wrap the base adapter to add the frame component
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
