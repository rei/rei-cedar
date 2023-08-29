<script setup lang="ts">
import mapClasses from '../../../utils/mapClasses';
import validateProp from "../../../utils/propValidator";
import { useStar } from '../composables/useStar';

const props = defineProps({
  size: {
      type: String,
      default: 'medium',
      validator: (value: string) => validateProp(
        value,
        ['small', 'medium', 'large'],
      ),
    },
})
const { style, sizeClass } = useStar(props.size);
</script>

<template>
  <svg
    :class="mapClasses(style,'cdr-rating__star', sizeClass)"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :class="style['cdr-rating__star--empty']"
      d="M12.1702 17.7643L11.9688 17.6359L11.7673 17.7643L6.37635 21.1984L7.81044
        14.6842L7.85695 14.473L7.69738 14.3269L2.8485 9.88945L9.21759 9.31204L9.44623
        9.29131L9.53174 9.07825L11.9688 3.00672L14.4058 9.07825L14.4913 9.29131L14.7199
        9.31204L21.089 9.88945L16.2401 14.3269L16.0806 14.473L16.1271 14.6842L17.5612
        21.1984L12.1702 17.7643Z"
      stroke-width="0.75"
    />
  </svg>
</template>

<style lang="scss" module src="../styles/CdrRating.module.scss">
</style>
