<script setup lang="ts">
import CdrObjectOverlay from '../CdrObjectOverlay.vue';

defineOptions({ name: 'ObjectOverlay' });
</script>

<template>
  <div>
    <h2>Default Overlay</h2>
    <CdrObjectOverlay>
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Position</h2>
    <CdrObjectOverlay position="top-right">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Responsive Position</h2>
    <CdrObjectOverlay :position="{ xs: 'top-left', md: 'center', lg: 'bottom-right' }">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Margins and Padding</h2>
    <CdrObjectOverlay margin="10px" padding="20px">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Background</h2>
    <CdrObjectOverlay background="rgba(0, 0, 0, 0.5)">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Class</h2>
    <CdrObjectOverlay customClass="custom-overlay-class">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>
  </div>
</template>

<style scoped>
.custom-overlay-class {
  border: 2px solid red;
}
</style>