<script setup lang="ts">
import { useCssModule, type PropType } from 'vue';
import { CdrAbstract, CdrKicker, CdrTitle, CdrImg, CdrRating, CdrLink, CdrCard } from '../../lib';
import { choreographerSchema } from '../../types/interfaces';

/** Choreographer is in an experimental stage and should be considered unstable */

defineOptions({
  name: 'CdrChoreographer',
});

const componentMap = {
  abstract: CdrAbstract,
  kicker: CdrKicker,
  title: CdrTitle,
  image: CdrImg,
  rating: CdrRating,
  link: CdrLink,
  card: CdrCard,
};

defineProps({
  schema: { type: Array as PropType<choreographerSchema[]>, default: () => [] }
});

const baseClass = 'cdr-choreographer';
const style = useCssModule();


</script>

<template>
  <component
    v-for="(entry, i) in schema"
    :key="`entry-${i}`"
    :is="componentMap[entry.type as keyof typeof componentMap]"
    v-bind="entry?.props"
    :class="style[`${baseClass}__${entry.type}`]"
  >
    <template v-if="Array.isArray(entry?.content)">
      <CdrChoreographer :schema="(entry?.content)" />
    </template>
    <template v-else>
      {{ entry?.content }}
    </template>
  </component>
</template>

<style lang="scss" module src="./styles/CdrChoreographer.module.scss">
</style>
