<template>
  <v-hover v-slot="{ isHovering, props }">
    <div class="custom-card bg-accent0" v-bind="props">
      <MediaObject
        :imageSrc="card.image"
        :imageAlt="card.title"
        :imagePosition="'top'"
      >
        <template #media>
          <img :src="card.image" :alt="card.title" class="card-image" />
        </template>
        <template #media-body>
          <CTA
            :title="card.title"
            :subtitle="card.subTitle"
            :abstract="card.description"
            titleScale="type-step-2"
            subtitleScale="type-step-0"
            textScale="type-step-minus-1"
            titleTag="h2"
            subtitleTag="h3"
            textTag="p"
          />
        </template>
      </MediaObject>
    </div>
  </v-hover>
</template>

<script>
import MediaObject from './displayTypes/MediaObject.vue';
import CTA from './contentTypes/CTA.vue';

export default {
  name: 'CardComponent',
  components: {
    MediaObject,
    CTA
  },
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImagePath(image) {
      return require(`@/assets/img/stories/${image}`);
    }
  }
};
</script>

<style scoped>
.custom-card {
  background-color: var(--v-theme-background);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: var(--space-s);
  border-radius: 8px;
  min-width: 250px;
  display: grid;
  grid-template-rows: auto;
  gap: var(--v-space-3xs);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}
</style>