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
import type {
  CdrChoreographerProps,
  ChoreographerComponents,
  ChoreographerSchema,
} from '../../types/interfaces';

/**
 * CdrChoreographer - Dynamic component renderer based on schema configuration
 *
 * Choreographer allows you to define component layouts using a declarative schema.
 * This is an experimental component and should be considered unstable.
 * Use it to dynamically render component trees from configuration data.
 */

defineOptions({
  name: 'CdrChoreographer',
});

const props = withDefaults(defineProps<CdrChoreographerProps>(), {
  components: () => ({}),
});

/** Map of available components including built-in Cedar components and custom components */
const componentMap = computed<ChoreographerComponents>(
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
    } as ChoreographerComponents),
);

const baseClass: string = 'cdr-choreographer';
const style: Record<string, string> = useCssModule();
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
      :key="key"
      #[key]
    >
      <CdrChoreographer
        :schema="[value]"
        :components="components"
      />
    </template>
  </component>
</template>

<style lang="scss" module src="./styles/CdrChoreographer.module.scss" />
