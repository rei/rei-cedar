<script setup lang="ts">
import CdrObjectOverlay from '../CdrObjectOverlay.vue';
import CdrMediaObject from '../../mediaObject/CdrMediaObject.vue';
import CdrImg from '../../image/CdrImg.vue';
import CdrButton from '../../button/CdrButton.vue';
import CdrIcon from '../../icon/CdrIcon.vue';

defineOptions({ name: 'ObjectOverlay' });

</script>

<template>
  <div class="example">
    <h2>Media Object with Overlay</h2>

    <hr class="example__hr" />

  <CdrObjectOverlay :position="{ xs: 'center-top', md: 'right-center', lg: 'center-bottom' }" :margin="['zero', 'eighth-x']" :with-gradient="true">
    <template #container>
      <img src="https://placehold.co/600x400" width="100%" height="100%" alt="Background image" :style="{ display: 'block' }"/>
    </template>
    <template #content>
      <div class="overlay-content" :style="{ padding: '20px' }">
        Positioned Content
      </div>
    </template>
  </CdrObjectOverlay>

    <h2>Media Object with Multiple Overlays</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay position="left-top" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Top Left Overlay
            </div>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="right-bottom" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Bottom Right Overlay
            </div>
          </template>
        </CdrObjectOverlay>
      </template>
      <template #content>
        <div>
          <h3>Media Object Title</h3>
          <p>This is the content of the media object.</p>
        </div>
      </template>
    </CdrMediaObject>

    <hr />

    <h2>Media Object with Responsive Overlay</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay :position="{ xs: 'left-top', md: 'center-center', lg: 'right-bottom' }" margin="zero" :with-gradient="true" gradient-theme="light">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Responsive Overlay
            </div>
          </template>
        </CdrObjectOverlay>
      </template>
      <template #content>
        <div>
          <h3>Media Object Title</h3>
          <p>This is the content of the media object.</p>
        </div>
      </template>
    </CdrMediaObject>

    <hr />

    <h2>Media Object with Multiple Overlays and Content</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay position="left-top" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <CdrButton icon-only aria-label="Close">
              <CdrIcon name="close" />
            </CdrButton>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="right-bottom" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Bottom Right Overlay
            </div>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="center-center" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Center Overlay
            </div>
          </template>
        </CdrObjectOverlay>
      </template>
      <template #content>
        <div>
          <h3>Media Object Title</h3>
          <p>This is the content of the media object.</p>
        </div>
      </template>
    </CdrMediaObject>

    <hr />

    <h2>Media Object with Square Image</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay position="center-center" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/600x600" width="100%" height="100%" alt="Square media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Center Overlay
            </div>
          </template>
        </CdrObjectOverlay>
      </template>
      <template #content>
        <div>
          <h3>Media Object Title</h3>
          <p>This is the content of the media object.</p>
        </div>
      </template>
    </CdrMediaObject>

    <hr />

    <h2>Media Object with Tall Image</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay position="center-center" margin="zero" :with-gradient="true">
          <template #container>
            <CdrImg src="https://placehold.co/400x800" width="100%" height="100%" alt="Tall media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Center Overlay
            </div>
          </template>
        </CdrObjectOverlay>
      </template>
      <template #content>
        <div>
          <h3>Media Object Title</h3>
          <p>This is the content of the media object.</p>
        </div>
      </template>
    </CdrMediaObject>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.overlay-content {
  color: white;
  font-size: 1.5rem;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for contrast */
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* Match the radius of the image */
}

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__container {
    max-width: 1300px;
  }

  &__content {
    &--color-inverse {
      color: $cdr-color-text-inverse;
    }

    &--narrow {
      max-width: 50%;
    }
  }

  &__image {
    &--height {
      height: 200px;
      width: 100%;
      object-fit: cover;
    }

    &--11 {
      height: 100%;
      width: 100%;
    }

    &--badge {
      position: absolute;
      top: 20px;
      left: 0;
      border: 1px solid red;
    }

    &--soft-radius {
      border-radius: 8px; /* Apply soft radius to images */
    }
  }

  &__badge-example {
    position: relative;
  }
}
</style>