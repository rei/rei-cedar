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
    <g
      fill="none"
      fill-rule="evenodd"
    >
      <path
        :class="style['cdr-rating__star--null-fill']"
        fill-rule="nonzero"
        d="M7.186 19.635L12 16.579l4.814 3.056-1.274-5.767 4.284-3.907-5.645-.51L12
        4.041l-2.179 5.41-5.645.51 4.284 3.907z"
      />
      <path
        :class="style['cdr-rating__star--null-outline']"
        d="M5.69 21.769l1.669-7.552-5.535-5.048 7.298-.66L12 1.364l2.878 7.147
        7.298.659-5.535 5.048 1.669 7.552L12 17.763l-6.31 4.006zm1.496-2.134L12
        16.579l4.814 3.056-1.274-5.767 4.284-3.907-5.645-.51L12 4.04 9.821
        9.45l-5.645.51 4.284 3.907-1.274 5.767z"
      />
    </g>    </svg>
</template>

<style lang="scss" module src="../styles/CdrRating.module.scss">
</style>
