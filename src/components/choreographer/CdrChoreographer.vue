<script setup lang="ts">
import { useCssModule, type PropType } from 'vue';
import {
  CdrAbstract,
  CdrKicker,
  CdrTitle,
  CdrBody,
  CdrImg,
  CdrRating,
  CdrLink,
  CdrCard,
  CdrSurface,
  CdrMediaObject,
  CdrLayout,
  CdrPicture,
  CdrButton,
  CdrContainer,
} from '../../lib';
import { choreographerSchema } from '../../types/interfaces';

/** Choreographer is in an experimental stage and should be considered unstable */

defineOptions({
  name: 'CdrChoreographer',
});

const componentMap = {
  abstract: CdrAbstract,
  kicker: CdrKicker,
  title: CdrTitle,
  body: CdrBody,
  image: CdrImg,
  picture: CdrPicture,
  rating: CdrRating,
  link: CdrLink,
  card: CdrCard,
  surface: CdrSurface,
  mediaObject: CdrMediaObject,
  layout: CdrLayout,
  button: CdrButton,
  container: CdrContainer,
};

defineProps({
  schema: { type: Array as PropType<choreographerSchema[]>, default: () => [] },
});

const baseClass = 'cdr-choreographer';
const style = useCssModule();
</script>

<template>
  <component
    v-for="(entry, i) in schema"
    :key="`entry-${i}`"
    :is="entry.type ? componentMap[entry.type as keyof typeof componentMap] : 'div'"
    v-bind="entry?.props"
    :class="style[`${baseClass}__${entry.type}`]"
  >
    <template v-if="Array.isArray(entry?.content)">
      <CdrChoreographer :schema="entry?.content" />
    </template>
    <template v-else>
      {{ entry?.content }}
    </template>
    <template
      v-for="(value, key) in entry.slots"
      #[key]
    >
      <CdrChoreographer
        :key="key"
        :schema="[value]"
      />
    </template>
  </component>
</template>

<style lang="scss" module src="./styles/CdrChoreographer.module.scss"></style>
