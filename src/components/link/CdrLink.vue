<script setup>
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses.js';
import propValidator from '../../utils/propValidator.js';

const props = defineProps({
    tag: {
      type: String,
      default: 'a',
    },
    href: {
      type: String,
      default: '#',
    },
    inheritColor: {
      type: Boolean,
      default: false,
    },
    modifier: {
      type: String,
      default: '',
      validator: (value) => propValidator(value, ['', 'standalone']),
    },
    /** @ignore */
    target: String,
    /** @ignore */
    rel: String,
});
const baseClass = 'cdr-link';
const style = useCssModule();

const computedHref = computed(() => (props.tag === 'a' ? props.href : null));
const computedRel = computed(() => {
  if (props.target === '_blank') {
    return props.rel || 'noopener noreferrer';
  }
  return props.rel;
});

const modifierClass = computed(() => props.modifier && `${baseClass}--${props.modifier}`);
const inheritColorClass = computed(() => props.inheritColor && 'cdr-link--inherit-color');
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass, inheritColorClass)"
    :target="target"
    :rel="computedRel"
    :href="computedHref"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrLink.module.scss">
</style>
