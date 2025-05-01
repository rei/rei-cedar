<script setup lang="ts">
import { useCssModule, computed, useAttrs } from 'vue';
import type { CdrLinkProps } from '../../types/interfaces';

/** Clickable text elements used for navigating to other pages or sections */
defineOptions({ name: 'CdrLink' });

const props = withDefaults(defineProps<CdrLinkProps>(), {
  tag: 'a',
  href: '#',
  inheritColor: false,
  modifier: '',
});

const style = useCssModule();
const attrs = useAttrs();

// Use baseClass for CSS Modules and for future-proofing versioned class names
const baseClass = style['cdr-link']; // always use the CSS module version

const computedHref = computed(() => (props.tag === 'a' ? props.href : undefined));
const computedRel = computed(() => {
  if (props.target === '_blank') {
    return props.rel || 'noopener noreferrer';
  }
  return props.rel;
});

const getModifierClasses = (modifier: string) => {
  if (!modifier) return [];
  return modifier
    .split(' ')
    .map((mod) => mod.trim())
    .filter(Boolean)
    .map((mod) => style[`cdr-link--${mod}`])
    .filter(Boolean);
};
</script>

<template>
  <component
    :is="props.tag"
    :class="[
      baseClass,
      ...getModifierClasses(props.modifier),
      props.inheritColor && style['cdr-link--inherit-color'],
      ...(attrs.class ? [attrs.class] : [])
    ]"
    :href="computedHref"
    :rel="computedRel"
    :target="props.target"
    v-bind="attrs"
  >
    <!-- @slot Readable text of the link  -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrLink.module.scss" />
