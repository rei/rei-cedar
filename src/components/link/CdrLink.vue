<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import mapClasses from '../../utils/mapClasses';
import propValidator from '../../utils/propValidator';

/** Clickable text elements used for navigating to other pages or sections */
defineOptions({
  name: 'CdrLink',
});

const props = defineProps({
  /**
   * Sets valid HTML element tag
   * @values a, button
   */
    tag: {
    type: String,
    default: 'a',
  },
  /**
   * Sets value for anchors href property. Requires tag prop value to be `a`.
   */
  href: {
    type: String,
    default: '#',
  },
  /**
   * Sets color and fill
   */
  inheritColor: {
    type: Boolean,
    default: false,
  },
  /**
   * Modifies the style variant for this component.
   * @values standalone
   */
  modifier: {
    type: String,
    default: '',
    validator: (value: string) => propValidator(value, ['', 'standalone']),
  },
  /** @ignore */
  target: String,
  /** @ignore */
  rel: String,  
});
const style = useCssModule();
const baseClass = 'cdr-link';
const computedHref = computed(() => (props.tag === 'a' ? props.href : null));
const computedRel = computed(() => {
  if (props.target === '_blank') {
    return props.rel || 'noopener noreferrer';
  }
  return props.rel;
});
const modifierClass = computed(() => props.modifier ? `${baseClass}--${props.modifier}` : '');
const inheritColorClass = computed(() => props.inheritColor ? 'cdr-link--inherit-color' : '');

</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, modifierClass, inheritColorClass)"
    :target="target"
    :rel="computedRel"
    :href="computedHref"
  >
    <!-- @slot Readable text of the link  -->
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrLink.module.scss">
</style>
