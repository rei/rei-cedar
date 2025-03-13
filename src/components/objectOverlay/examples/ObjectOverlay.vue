<script setup lang="ts">
import CdrObjectOverlay from '../CdrObjectOverlay.vue';

defineOptions({ name: 'ObjectOverlay' });
</script>

<template>
  <CdrObjectOverlay position="top-right" margin="half-x" gradient="to-top">
    <template #container>
      <img src="https://placehold.co/600x400" width="100%" height="100%" alt="Background image" :style="{ display: 'block' }" />
    </template>
    <template #content>
      <div class="overlay-content" :style="{ backgroundColor: '#fff', padding: '20px' }">
        Positioned Content
      </div>
    </template>
  </CdrObjectOverlay>

  <hr />

  <CdrObjectOverlay :position="{ xs: 'center-center', lg: 'bottom-center', md: 'bottom-left' }" :margin="['zero', 'eighth-x']">
    <template #container>
      <img src="https://placehold.co/600x400" width="100%" height="100%" alt="Background image" :style="{ display: 'block' }"/>
    </template>
    <template #content>
      <div class="overlay-content" :style="{ backgroundColor: '#fff', padding: '20px' }">
        Positioned Content
      </div>
    </template>
  </CdrObjectOverlay>

  <hr />

  <CdrObjectOverlay position="bottom-left" :margin="{ xs: 'zero', lg: ['half-x', 'four-x'] }" :gradient="{ xs: 'to-top', lg: 'to-right' }">
    <template #container>
      <img src="https://placehold.co/600x400" width="100%" height="100%" alt="Background image" :style="{ display: 'block' }"/>
    </template>
    <template #content>
      <div class="overlay-content" :style="{ backgroundColor: '#fff', padding: '20px' }">
        Positioned Content
      </div>
    </template>
  </CdrObjectOverlay>
</template>
