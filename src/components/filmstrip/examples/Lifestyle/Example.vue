<template>
  <CdrFilmstrip
    class="lifestyle-filmstrip"
    :model="lifestyleModelData"
    :adapter="LifestyleAdapter"
    @frameClick="onFrameClick"
    @arrowClick="onArrowClick"
    @resize="onResize"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import type { Lifestyle } from './index';
import lifestyleModel from './mock.json';

const lifestyleModelData = lifestyleModel as Lifestyle;
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
