<script setup lang="ts">
import { useCssModule } from 'vue';
import type { surfaceLink } from '../../types/interfaces';

/** Navigation-specific link for use within CdrSurfaceNavigation */

defineOptions({ name: 'CdrSurfaceNavigationLink' });

const props = withDefaults(defineProps<surfaceLink>(), {
  href: '#',
  tag: 'a',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const style = useCssModule();
</script>

<template>
  <component
    v-bind="props"
    :is="props.tag"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    :class="style['cdr-surface-navigation-link']"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrSurfaceNavigation.module.scss" />