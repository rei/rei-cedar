<script setup lang="ts">
import { ref } from 'vue';
import { CdrGrid, CdrButton, CdrContainer, IconPlusFill, IconMinusFill, CdrUtilitySans } from '../../../../lib';
import FluidHeadingCard from './fluidHeadingCard.vue';

const count = ref(4);

</script>

<template>
  <CdrContainer modifier="fluid">
    <CdrUtilitySans>Change number of cards</CdrUtilitySans>
    <div class="buttons">
      <CdrButton :icon-only="true" @click="count -= 1">
        <IconMinusFill />
      </CdrButton>
      <CdrButton :icon-only="true" @click="count += 1">
        <IconPlusFill />
      </CdrButton>
    </div>
    <CdrGrid class="filmstrip">
      <FluidHeadingCard v-for="n in count" :key="n"/>
    </CdrGrid>
  </CdrContainer>

</template>

<style>
.buttons {
  margin-bottom: 6rem;
}
.filmstrip {
  grid-auto-flow: column;
}
</style>