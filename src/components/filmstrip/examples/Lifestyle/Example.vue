<template>
  <CdrFilmstrip
    class="lifestyle-filmstrip"
    :model="lifestyleModelData"
    :adapter="LifestyleAdapter"
    @frame-click="onFrameClick"
    @arrow-click="onArrowClick"
    @resize="onResize"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import lifestyleModel from './mock.json';

const lifestyleModelData = lifestyleModel as Record<string, unknown>;
import { onFrameClick, onArrowClick, onResize } from './handlers';
import LifestyleAdapter from './adapter';
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as *;

.lifestyle-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
