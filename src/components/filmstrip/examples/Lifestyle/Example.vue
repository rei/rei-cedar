<template>
  <CdrFilmstrip
    class="lifestyle-filmstrip"
    :model="lifestyleModelData"
    :adapter="adapter"
    @frame-click="onFrameClick"
    @arrow-click="onArrowClick"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import lifestyleModel from './mock.json';
import type { Lifestyle } from '.';
import type { CdrFilmstripResponsiveFrames } from '../../interfaces';
import { onFrameClick, onArrowClick } from './handlers';
import LifestyleAdapter from './adapter';

const lifestyleModelData = lifestyleModel as Partial<Lifestyle>;
const props = defineProps<{ responsiveFrames?: CdrFilmstripResponsiveFrames }>();
const adapter = (model: Partial<Lifestyle>) => ({
  ...LifestyleAdapter(model),
  ...(props.responsiveFrames && { responsiveFrames: props.responsiveFrames }),
});
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.lifestyle-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
