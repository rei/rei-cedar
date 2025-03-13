<script setup lang="ts">
import CdrObjectOverlay from '../CdrObjectOverlay.vue';
import CdrMediaObject from '../../mediaObject/CdrMediaObject.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrImg from '../../image/CdrImg.vue';
import CdrText from '../../text/CdrText.vue';
import CdrBody from '../../text/presets/CdrBody.vue';
import CdrTitle from '../../title/CdrTitle.vue';
import CdrButton from '../../button/CdrButton.vue';
import CdrIcon from '../../icon/CdrIcon.vue';
import cedarImage from '../../../dev/static/cedar-1920x1080.jpg';

defineOptions({ name: 'ObjectOverlay' });

const contentShort = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const overlayExamples = [
  {
    label: 'Overlay with column align end and row align center',
    props: {
      overlay: true,
      overlayColumnAlign: 'end',
      overlayRowAlign: 'center',
    },
  },
  {
    label: 'Overlay with column align start and row align start',
    props: {
      overlay: true,
      overlayColumnAlign: 'start',
      overlayRowAlign: 'start',
    },
  },
  {
    label: 'Overlay with column align center and row align end',
    props: {
      overlay: true,
      overlayColumnAlign: 'center',
      overlayRowAlign: 'end',
    },
  },
  {
    label: 'Overlay with column align center and row align center',
    props: {
      overlay: true,
      overlayColumnAlign: 'center',
      overlayRowAlign: 'center',
    },
  },
];
</script>

<template>
  <div class="example">
    <h2>Media Object with Overlay</h2>

    <hr class="example__hr" />
    <CdrLayout class="example__container" gap="two-x">
      <template v-for="({ props, label }, index) in overlayExamples">
        <div>
          <CdrText>
            <code>
              <strong v-html="label" />
              <br />
              {{ JSON.stringify(props) }}
            </code>
          </CdrText>
          <CdrMediaObject
            :as="CdrSurface"
            background="secondary"
            :content-padding="index === 0 ? 'zero' : 'two-x'"
            v-bind="props"
          >
            <template #content>
              <CdrTitle>A CdrTitle example</CdrTitle>
              <CdrBody class="example__content">
                {{ contentShort }}
              </CdrBody>
            </template>
            <template #media>
              <CdrObjectOverlay position="center-center" gradient="to-bottom">
                <template #container>
                  <CdrImg
                    alt="Test image"
                    :src="cedarImage"
                    radius="soft"
                  />
                </template>
                <template #content>
                  <CdrButton icon-only aria-label="Close">
                    <CdrIcon name="close" />
                  </CdrButton>
                </template>
              </CdrObjectOverlay>
            </template>
          </CdrMediaObject>
        </div>
      </template>
    </CdrLayout>

  <CdrObjectOverlay :position="{ xs: 'center-center', lg: 'bottom-center', md: 'bottom-left' }" :margin="['zero', 'eighth-x']">
    <template #container>
      <img src="https://placehold.co/600x400" width="100%" height="100%" alt="Background image" :style="{ display: 'block' }"/>
    </template>
    <template #content>
      <div class="overlay-content" :style="{ backgroundColor: '#fff', padding: '20px' }">
        Positioned Content
      </div>
    </template>
  </CdrObjectOverlay>

    <h2>Media Object with Multiple Overlays</h2>
    <CdrMediaObject>
      <template #media>
        <CdrObjectOverlay position="top-left" margin="zero" gradient="to-bottom">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Top Left Overlay
            </div>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="bottom-right" margin="zero" gradient="to-top">
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
        <CdrObjectOverlay :position="{ xs: 'top-left', md: 'center-center', lg: 'bottom-right' }" margin="zero" gradient="to-right">
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
        <CdrObjectOverlay position="top-left" margin="zero" gradient="to-bottom">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <CdrButton icon-only aria-label="Close">
              <CdrIcon name="close" />
            </CdrButton>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="bottom-right" margin="zero" gradient="to-top">
          <template #container>
            <CdrImg src="https://placehold.co/600x400" width="100%" height="100%" alt="Media image" radius="soft" />
          </template>
          <template #content>
            <div class="overlay-content">
              Bottom Right Overlay
            </div>
          </template>
        </CdrObjectOverlay>
        <CdrObjectOverlay position="center-center" margin="zero" gradient="to-left">
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
        <CdrObjectOverlay position="center-center" margin="zero" gradient="to-bottom">
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
        <CdrObjectOverlay position="center-center" margin="zero" gradient="to-bottom">
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