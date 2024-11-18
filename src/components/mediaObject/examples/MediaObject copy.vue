<script>
import PositioningObject from './PositioningObject.vue';

export default {
  name: 'MediaObject',
  components: {
    PositioningObject
  },
  props: {
    imagePosition: {
      type: String,
      default: 'left',
      validator(value) {
        return ['top', 'right', 'bottom', 'left', 'background'].includes(value);
      }
    },
    mediaContentOverlayPosition: {
      type: String,
      default: 'center',
      validator(value) {
        return [
          'top-left', 'top', 'top-right',
          'right', 'center', 'left',
          'bottom-left', 'bottom', 'bottom-right'
        ].includes(value);
      }
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    mediaClass() {
      return `media-object-${this.imagePosition}`;
    }
  }
};
</script>

<template>
  <div :class="['media-object', mediaClass, className]">
    <div v-if="imagePosition === 'background'" class="media-object-background">
      <slot name="media"></slot>
    </div>
    <div v-else class="media-object-media">
      <slot name="media"></slot>
    </div>
    <PositioningObject v-if="imagePosition !== 'background'" class="media-object-overlay" :position="mediaContentOverlayPosition">
      <slot name="overlay"></slot>
    </PositioningObject>
    <div class="media-object-body">
      <slot name="media-body"></slot>
    </div>
  </div>
</template>

<style scoped>
.media-object {
  display: grid;
  gap: 1rem;
}

.media-object-top {
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}

.media-object-bottom {
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
}

.media-object-right {
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
}

.media-object-left {
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
}

.media-object-background {
  position: relative;
}

.media-object-background .media-object-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.media-object-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.media-object-overlay-content {
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin: 0.5rem;
}

.media-object-media {
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-object-body {
  display: grid;
  gap: 1rem;
}
</style> 