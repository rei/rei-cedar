<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import {
  CdrAbstract,
  CdrKicker,
  CdrTitle,
  CdrBody,
  CdrImg,
  CdrRating,
  CdrLink,
  CdrCard,
  CdrLayout,
  CdrPicture,
  CdrButton,
  CdrContainer,
} from '../../lib';
import {
  Choreographer,
  ChoreographerComponents,
  ChoreographerSchema,
} from '../../types/interfaces';

/** Choreographer is in an experimental stage and should be considered unstable */

defineOptions({
  name: 'CdrChoreographer',
});

const props = withDefaults(defineProps<Choreographer>(), {
  components: () => ({}),
});

const componentMap = computed(
  () =>
    ({
      abstract: CdrAbstract,
      kicker: CdrKicker,
      title: CdrTitle,
      body: CdrBody,
      image: CdrImg,
      picture: CdrPicture,
      rating: CdrRating,
      link: CdrLink,
      card: CdrCard,
      layout: CdrLayout,
      button: CdrButton,
      container: CdrContainer,
      ...props.components,
    }) as ChoreographerComponents,
);

const baseClass = 'cdr-choreographer';
const style = useCssModule();
</script>

<template>
  <component
    v-for="(entry, i) in schema"
    :key="`entry-${i}`"
    :is="
      entry.type && componentMap[entry.type]
        ? componentMap[entry.type as keyof typeof componentMap]
        : 'div'
    "
    v-bind="entry?.props"
    :class="style[`${baseClass}__${entry.type}`]"
  >
    <template v-if="entry.content && Array.isArray(entry.content)">
      <CdrChoreographer
        :schema="entry.content as [ChoreographerSchema]"
        :components="components"
      />
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
        :components="components"
      />
    </template>
  </component>
</template>

<style lang="scss" module src="./styles/CdrChoreographer.module.scss"></style>
