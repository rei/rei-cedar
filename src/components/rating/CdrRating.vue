<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import propValidator from '../../utils/propValidator';
import mapClasses from '../../utils/mapClasses';
import CdrStar100 from './components/CdrStar100.vue';
import CdrStar75 from './components/CdrStar75.vue';
import CdrStar50 from './components/CdrStar50.vue';
import CdrStar25 from './components/CdrStar25.vue';
import CdrStar00 from './components/CdrStar00.vue';
import CdrStarNull from './components/CdrStarNull.vue';

/** Provides insight into user opinions for products, experiences, and more */
defineOptions({
  name: 'CdrRating',
  components: {
    CdrStar100, CdrStar75, CdrStar50, CdrStar25, CdrStar00, CdrStarNull,
  },
});

const props = defineProps({
  /**
   * Sets the rating values between 0 and 5.
   */
    rating: {
    required: true,
    type: [String, Number],
    default: 0,
  },
  /**
   * Sets the total number of ratings
   */
  count: {
    required: false,
    type: [String, Number],
    default: null,
  },
  /**
   * Hides the word 'reviews' if true
   */
  compact: {
    type: Boolean,
    default: false,
  },
  /**
   * Sets the rating component (icons and text) to display inline and wraps them in an anchor tag so they can act as link.
   */
  href: {
    type: String,
  },
  /**
   * Sets the rating size.
   * @demoSelectMultiple false
   * @values small, medium, large
  */
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => propValidator(
      value,
      ['small', 'medium', 'large'],
    ),
  },
});

const style = useCssModule();
const baseClass = 'cdr-rating';
const ratingToNumber = computed(() => Number(props.rating));
const countToNumber = computed(() => Number(props.count));
const sizeClass = computed(() => props.size ? `${baseClass}--${props.size}` : '');
const linkedClass = computed(() => props.href ? `${baseClass}--linked` : '');
const hasReviews = computed(() => ((ratingToNumber.value > 0 || countToNumber.value > 0)));

const tag = computed(() => (props.href ? 'a' : 'div'));

const displayRating = computed(() => (Math.round(ratingToNumber.value * 10) / 10).toFixed(1));

const rounded = computed(() => Math.round(ratingToNumber.value * 4) / 4);

const whole = computed(() => Math.floor(rounded.value));

const remainder = computed(() => rounded.value.toFixed(2).split('.')[1]);

const empties = computed(() => 5 - whole.value - (+remainder.value > 0 ? 1 : 0));

const formattedCount = computed(() => (props.compact ? `(${props.count})` : `${props.count}`));

const srText = computed(() => {
  // linked
  if (props.href) {
    // no reviews
    if (props.count === 0 || props.count === '0') {
      return 'No reviews yet; be the first!';
    }
    // no count
    if (props.count === null) {
      return `View the reviews with an average rating of ${displayRating.value} out of 5 stars`;
    }
    // default
    return `View the ${props.count} reviews with an average rating of ${displayRating.value} out of 5 stars`; // eslint-disable-line max-len
  }

  // non-linked
  // no reviews
  if (props.count === 0 || props.count === '0') {
    return '0 reviews';
  }
  // no count
  if (props.count === null) {
    return `Rated ${displayRating.value} out of 5 stars`;
  }
  // default
  // eslint-disable-next-line
  return `${props.count} reviews with an average rating of ${displayRating.value} out of 5 stars`;
});
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="mapClasses(style,
                       baseClass,
                       sizeClass,
                       linkedClass,
    )"
  >
    <div :class="style['cdr-rating__ratings']">

      <CdrStar100
        v-for="star in Array(whole).keys()"
        :size="size"
        :key="`rating-whole-${star}`"
        aria-hidden="true"
      />
      <component
        v-if="remainder !== '00'"
        :is="`CdrStar${remainder}`"
        :size="size"
        aria-hidden="true"
      />

      <component
        v-for="empty in Array(empties).keys()"
        :is="(hasReviews) ? 'CdrStar00' : 'CdrStarNull'"
        :size="size"
        :key="`rating-empty-${empty}`"
        aria-hidden="true"
      />
    </div>

    <span
      v-if="count !== null"
      aria-hidden="true"
      :class="style['cdr-rating__count']"
    >
      <span
        v-if="href"
        :class="style['cdr-rating__number']"
      >
        {{ displayRating }}
      </span>

      <span>
        {{ formattedCount }}
      </span>

      <span v-if="!compact">
        &nbsp;Reviews
      </span>
    </span>

    <span :class="style['cdr-rating__caption-sr']">
      {{ srText }}
    </span>
  </component>
</template>

<style lang="scss" module src="./styles/CdrRating.module.scss">
</style>
