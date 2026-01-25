<script setup lang="ts">
import { useCssModule, computed, inject, ref } from 'vue';
import type { CdrSkeletonBoneProps } from '../../types/interfaces';
import mapClasses from '../../utils/mapClasses';
import { motionKey } from '../../types/symbols';

defineOptions({
  name: 'CdrSkeletonBone',
});

const props = withDefaults(defineProps<CdrSkeletonBoneProps>(), {
  type: 'default',
});

const baseClass = 'cdr-skeleton-bone';
const style = useCssModule();
const typeClass = computed(() => `${baseClass}--${props.type}`);

const motionToggle = inject(motionKey, ref(true));
const motionClass = computed(() => (motionToggle.value ? `${baseClass}__shimmer` : ''));
</script>

<template>
  <div :class="mapClasses(style, baseClass, typeClass, motionClass)" />
</template>

<style lang="scss" module src="./styles/CdrSkeletonBone.module.scss" />
