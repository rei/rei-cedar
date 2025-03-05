<script setup lang="ts">
import CdrFulfillmentTile from '../CdrFulfillmentTile.vue';
import CdrFulfillmentTileIcon from '../CdrFulfillmentTileIcon.vue';
import { IconCheckFill, IconErrorFill } from '../../icon';

defineOptions({ name: 'FulfillmentTile' });
</script>

<template>
  <h2>FulfillmentTile</h2>
  <div class="example">
    <CdrFulfillmentTile class="example__tile" :disabled="true">
      <template #header>
        Pick up
      </template>
      <template #icon-right>
        <CdrFulfillmentTileIcon>
          <IconErrorFill inherit-color />
        </CdrFulfillmentTileIcon>
      </template>
      <template #body>
        Not offered
      </template>
    </CdrFulfillmentTile>
    <CdrFulfillmentTile class="example__tile">
      <template #header>
        Ship to address
      </template>
      <template #body>
        Today after 2pm
      </template>
      <template #footer>
        <strong>FREE</strong>
        - $60 minimum
      </template>
    </CdrFulfillmentTile>
    <CdrFulfillmentTile class="example__tile" :checked="true">
      <template #header>
        Another option with really long text
      </template>
      <template #icon-right>
        <CdrFulfillmentTileIcon type="success">
          <IconCheckFill inherit-color />
        </CdrFulfillmentTileIcon>
      </template>
      <template #footer>
        Footer
        <strong>content</strong>
      </template>
    </CdrFulfillmentTile>
    <CdrFulfillmentTile class="example__tile" :loading="true">
      <template #header>
        Loading option
      </template>
    </CdrFulfillmentTile>
  </div>
</template>

<style lang="scss" scoped>
.example {
  display: flex;
  gap: var(--cdr-space-one-x);
}

.example__tile {
  height: 108px;
  width: 230px;
}
</style>
