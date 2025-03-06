<script setup lang="ts">
import { useCssModule, computed, watch } from 'vue';
import mapClasses from '../../utils/mapClasses';

defineOptions({ name: 'CdrObjectOverlay' });

interface ResponsivePosition {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
}

interface ObjectOverlayProps {
  position?: string | ResponsivePosition;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  background?: string;
  customClass?: string;
  customStyle?: Record<string, string>;
  onPositionChange?: (newPosition: string | ResponsivePosition) => void;
  tag?: string;
}

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center',
  margin: '0',
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
  padding: '0',
  background: 'transparent',
  customClass: '',
  tag: 'div',
});

const style = useCssModule();

const positionClass = computed(() => {
  if (typeof props.position === 'string') {
    return props.position;
  } else {
    return Object.entries(props.position || {})
      .map(([breakpoint, pos]) => `${breakpoint}-${pos}`)
      .join(' ');
  }
});

const dataAttributes = computed(() => ({
  'data-position': positionClass.value,
  style: {
    '--cdr-object-overlay-component-margin': props.margin ?? '0',
    '--cdr-object-overlay-component-margin-top': props.marginTop ?? '0',
    '--cdr-object-overlay-component-margin-bottom': props.marginBottom ?? '0',
    '--cdr-object-overlay-component-margin-left': props.marginLeft ?? '0',
    '--cdr-object-overlay-component-margin-right': props.marginRight ?? '0',
    '--cdr-object-overlay-component-padding': props.padding ?? '0',
    '--cdr-object-overlay-component-background': props.background ?? 'transparent',
  },
}));

if (props.onPositionChange) {
  watch(() => props.position, (newPosition) => {
    props.onPositionChange?.(newPosition);
  });
}
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, 'cdr-object-overlay', props.customClass || '')"
    v-bind="dataAttributes"
  >
    <div :class="style['cdr-object-overlay__container']">
      <slot name="container" />
    </div>
    <div :class="style['cdr-object-overlay__content']">
      <slot name="content" />
    </div>
  </component>
</template>

<style lang="scss" module src="./styles/CdrObjectOverlay.module.scss">
.cdr-object-overlay {
  position: relative;
  width: 100%;
  height: 100%;

  --cdr-object-overlay-margin: 
  var(--cdr-object-overlay-component-margin, var(--cdr-token-margin, 0));
  --cdr-object-overlay-margin-top: 
  var(--cdr-object-overlay-component-margin-top, var(--cdr-token-margin-top, 0));
  --cdr-object-overlay-margin-bottom: 
  var(--cdr-object-overlay-component-margin-bottom, var(--cdr-token-margin-bottom, 0));
  --cdr-object-overlay-margin-left: 
  var(--cdr-object-overlay-component-margin-left, var(--cdr-token-margin-left, 0));
  --cdr-object-overlay-margin-right: 
  var(--cdr-object-overlay-component-margin-right, var(--cdr-token-margin-right, 0));
  --cdr-object-overlay-padding: 
  var(--cdr-object-overlay-component-padding, var(--cdr-token-padding, 0));
  --cdr-object-overlay-background: 
  var(--cdr-object-overlay-component-background, var(--cdr-token-background, transparent));

  &__container {
    width: 100%;
    height: 100%;
  }

  &__content {
    position: absolute;
    margin: var(--cdr-object-overlay-margin);
    margin-top: var(--cdr-object-overlay-margin-top);
    margin-bottom: var(--cdr-object-overlay-margin-bottom);
    margin-left: var(--cdr-object-overlay-margin-left);
    margin-right: var(--cdr-object-overlay-margin-right);
    padding: var(--cdr-object-overlay-padding);
    background: var(--cdr-object-overlay-background);
  }

  // Top positions
  &[data-position="top-left"] &__content {
    top: 0;
    left: 0;
  }

  &[data-position="top-center"] &__content {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &[data-position="top-right"] &__content {
    top: 0;
    right: 0;
  }

  // Center positions
  &[data-position="left"] &__content {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &[data-position="center"] &__content {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &[data-position="right"] &__content {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  // Bottom positions
  &[data-position="bottom-left"] &__content {
    bottom: 0;
    left: 0;
  }

  &[data-position="bottom-center"] &__content {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &[data-position="bottom-right"] &__content {
    bottom: 0;
    right: 0;
  }
}
</style>