<script setup lang="ts">
import { computed } from 'vue';
import { useCssModule } from 'vue';

defineOptions({ name: 'CdrObjectOverlay' });

interface ObjectOverlayProps {
  position?: string | Record<string, string>;
  margin?: string;
  padding?: string;
  background?: string;
  customClass?: string;
  sections?: Record<string, string>;
}

const props = withDefaults(defineProps<ObjectOverlayProps>(), {
  position: 'center',
  margin: '0',
  padding: '0',
  background: 'transparent',
  customClass: '',
  sections: () => ({}),
});

const styles = useCssModule();

const dataAttributes = computed(() => ({
  'data-position': typeof props.position === 'string' ? props.position : undefined,
  style: {
    '--cdr-object-overlay-margin': props.margin,
    '--cdr-object-overlay-padding': props.padding,
    '--cdr-object-overlay-background': props.background,
  },
}));
</script>

<template>
  <div
    :class="[styles['cdr-object-overlay'], props.customClass]"
    v-bind="dataAttributes"
  >
    <div :class="styles['cdr-object-overlay__container']">
      <slot name="container" />
    </div>
    <div :class="styles['cdr-object-overlay__content']">
      <slot name="content" />
      <div 
        v-for="(sectionPosition, sectionName) in props.sections"
        :key="sectionName" 
        :class="styles['cdr-object-overlay__section']"
        :data-position="sectionPosition"
      >
        <slot :name="sectionName" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module src="./styles/CdrObjectOverlay.module.scss" />