<template>
  <div
    class="rating-reset"
  >
    <h2>
      Ratings
    </h2>
    <cdr-rating
      rating="3.3"
      count="16"
      content-priority="secondary"
      href="https://www.rei.com"
      data-backstop="rating-secondary-linked"
    />
    <cdr-rating
      rating="3.9"
      count="16"
      content-priority="secondary"
      href="https://www.rei.com"
      data-backstop="rating-secondary-linked"
    />
    <cdr-rating
      rating="3.1"
      count="16"
      content-priority="secondary"
      href="https://www.rei.com"
      data-backstop="rating-secondary-linked"
    />
    <cdr-rating
      rating="0"
      count="0"
      href="https://www.rei.com"
      data-backstop="rating-primary-linked"
    />

    <cdr-rating
      rating="0"
      count="0"
    />
    <cdr-rating
      :rating="0"
      :count="0"
    />
    <cdr-rating
      :rating="0"
      :count="10"
    />

    <cdr-rating
      rating="3.3"
      count="48"
    />
    <cdr-rating
      :rating="3.3"
      :count="48"
    />
    <!-- Large Size -->

    <cdr-rating
      rating="3"
      count="100"
      size="large"
      compact
    />
    <cdr-rating
      rating="3.66"
      count="1000"
      href="https://www.rei.com"
      size="large"
    />
    <div class="line-height-reset">
      <cdr-rating
        rating="3.63"
        count="1000"
        href="https://www.rei.com"
        size="large"
        compact
      />
    </div>

    <cdr-text>
      0 String Count
    </cdr-text>
    <cdr-rating
      rating="1.2"
      count="0"
    />
    <cdr-text>
      0 Num Count
    </cdr-text>
    <cdr-rating
      rating="1.2"
      :count="0"
    />
    <cdr-text>
      no Count
    </cdr-text>
    <cdr-rating
      rating="1.2"
    />
    <!-- Default Size -->
    <cdr-rating
      rating="1.2"
      count="77"
    />
    <cdr-rating
      rating="4.8"
      count="4561"
      compact
    />
    <cdr-rating
      rating="1.9"
      count="100"
      href="https://www.rei.com"
    />

    <!-- Small Size -->
    <cdr-rating
      rating="2"
      count="9"
      size="small"
    />
    <cdr-rating
      rating="3.444412321"
      count="615"
      size="small"
      compact
    />
    <cdr-rating
      rating="3"
      count="100"
      href="https://www.rei.com"
      size="small"
    />

    <!-- Responsive Size -->
    <cdr-text>
      Responsive Growing
    </cdr-text>
    <cdr-rating
      rating="2"
      count="9"
      size="small@xs medium@md large@lg"
    />
    <cdr-text>
      Responsive Inverse
    </cdr-text>
    <cdr-rating
      rating="3"
      count="100"
      size="large@xs medium@md small@lg"
    />
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Rating',
  components: {
    ...Components,
  },
};
</script>

<style>
/** resets to protect example stylings unrelated to the component for consistent testing */
.rating-reset {
  font-size: 0;
}

.line-height-reset {
  line-height: 1;
}
</style>
