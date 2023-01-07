<template>
  <cdr-card 
    ref="cdrCard"
    :cdr-card-data="cardData"
    :cdr-card-slots="cardSlots"
    class="card-example"
    :cdr-card-is-linked="true"
    @cdr-card-clicked="handleCustomEvent"
  >
    <!-- Image Slot -->
    <section slot="image" v-if="cardSlots.includes('image')">
      <cdr-img
        alt="card test image"
        :src="cardData.image"
        modifier="responsive"
      />
    </section>
    <!-- Title Slot -->
    <section slot="title" v-if="cardSlots.includes('title')">
      <cdr-link
        class="cdr-card__link"
        :href="cardData.url"
      >
        <h2>
          {{ cardData.title }}
        </h2>
      </cdr-link>
    </section>
    <!-- Rating Slot -->
    <section slot="rating" v-if="cardSlots.includes('rating')">
      <cdr-rating
        :rating="cardData.rating"
        :count="cardData.count"
        size="small"
      />
    </section>
    <!-- Content Slot -->
    <section slot="content" v-if="cardSlots.includes('content')">
      <cdr-text class="cdr-text-dev--body-300">
        {{ cardData.text }}
      </cdr-text>
    </section>
  </cdr-card>
</template>

<script>
import * as Components from 'srcdir/lib';

/**
 * ComplexCard
 * 
 * @emits cdrCard-clicked
 */
export default {
  name: 'ComplexCard',
  components: Components,
  data() {
    return {
      cardData: {
        title: 'My Card Title',
        text: 'My Card Text',
        image: '/src/dev/static/test-image.png',
        rating: 4.2,
        count: 12,
        url: ''
      },
      cardSlots: ['image', 'title', 'rating', 'content'],
    };
  },
  methods: {
    handleCustomEvent() {
      alert(`The card data is: ${JSON.stringify(this.cardData)}, and the card slots are: ${JSON.stringify(this.cardSlots)}`);
    }
  }
};
</script>


<style>
.card-example {
  max-width: 250px;
  width: 250px;
}
</style>