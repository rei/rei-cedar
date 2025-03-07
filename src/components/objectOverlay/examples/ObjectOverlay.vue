<script setup lang="ts">
import CdrObjectOverlay from '../CdrObjectOverlay.vue';
import CdrSurfaceNavigation from '../../surfaceNavigation/CdrSurfaceNavigation.vue';
import CdrSurfaceNavigationLink from '../../surfaceNavigation/CdrSurfaceNavigationLink.vue';
import CdrUtilitySans from '../../text/presets/CdrUtilitySans.vue';
import CdrSubheadingSans from '../../text/presets/CdrSubheadingSans.vue';
import CdrMediaObject from '../../mediaObject/CdrMediaObject.vue';
import CdrImg from '../../image/CdrImg.vue';
import CdrRating from '../../rating/CdrRating.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import tileImage from '../../../dev/static/tile-image.jpg';

defineOptions({ name: 'ObjectOverlay' });

export interface Example {
  exampleName: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  label: string;
  title: string;
  price: string;
  ratingProps: {
    rating: number;
    count: number;
    compact: boolean;
    size: string;
  };
  props: Record<string, any>;
  mediaObjectProps: Record<string, any>;
}

const boxes: Example[] = [
  {
    exampleName: 'Product Tile',
    image: {
      src: tileImage,
      alt: 'placeholder image',
      width: 150,
      height: 150
    },
    label: 'Arc\'teryx',
    title: 'Beta SL Jacket - Men\'s',
    price: '$299.00',
    props: {
      background: {
        rest: 'primary',
        hover: 'secondary'
      },
      borderColor: {
        rest: 'primary'
      },
      borderStyle: {
        rest: 'solid'
      },
      borderWidth: {
        rest: 'sixteenth-x'
      },
      shadow: {
        rest: 'flat',
        hover: 'elevated',
      }
    },
    ratingProps: {
      rating: 4.5,
      count: 100,
      compact: true,
      size: 'small',
    },
    mediaObjectProps: {
      contentPadding: 'one-x',
      mediaPosition: 'top',
    }
  }
];

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  console.log('clicked', e);
};

const handleBlur = (e: FocusEvent) => {
  console.log('blurred', e);
}

const handleFocus = (e: FocusEvent) => {
  console.log('focused', e);
}
</script>

<template>
  <div class="example">
    <h2>Default Overlay</h2>
    <CdrObjectOverlay>
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Position</h2>
    <CdrObjectOverlay position="top-right">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Responsive Position</h2>
    <CdrObjectOverlay :position="{ xs: 'top-left', md: 'center', lg: 'bottom-right' }">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Margins and Padding</h2>
    <CdrObjectOverlay margin="10px" padding="20px">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Background</h2>
    <CdrObjectOverlay background="rgba(0, 0, 0, 0.5)">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Custom Class</h2>
    <CdrObjectOverlay customClass="custom-overlay-class">
      <template #container>
        <div>Container Content</div>
      </template>
      <template #content>
        <div>Overlay Content</div>
      </template>
    </CdrObjectOverlay>

    <h2>Surface Navigation with Overlay</h2>
    <div v-for="{ exampleName, label, title, image, props, ratingProps, price, mediaObjectProps } in boxes" :key="label">
      <hr class="example__hr" />
      <h3>{{ exampleName }}</h3>
      <CdrSurfaceNavigation v-bind="props" class="card">
        <CdrMediaObject v-bind="mediaObjectProps">
          <template #media>
            <div class="card__image-wrapper">
              <CdrObjectOverlay :position="{ xs: 'top-left', md: 'center', lg: 'bottom-right' }" :sections="{ badge: 'left', details: 'bottom-right' }">
                <template #container>
                  <CdrImg v-bind="image" class="card__image" />
                </template>
                <template #badge>
                  <CdrSurface background="brand-spruce" class="overlay-content">
                    Badge
                  </CdrSurface>
                </template>
                <template #details>
                  <CdrSurface background="primary">
                    Details
                  </CdrSurface>
                </template>
              </CdrObjectOverlay>
            </div>
          </template>
          <template #content>
            <CdrUtilitySans>{{ label }}</CdrUtilitySans>
            <CdrSurfaceNavigationLink @click="handleClick" @blur="handleBlur" @focus="handleFocus">
              <CdrSubheadingSans class="card__title">{{ title }}</CdrSubheadingSans>
            </CdrSurfaceNavigationLink>
            <CdrRating v-bind="ratingProps" />
            <CdrUtilitySans>{{ price }}</CdrUtilitySans>
          </template>
        </CdrMediaObject>
      </CdrSurfaceNavigation>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.custom-overlay-class {
  border: 2px solid red;
}

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }
}

.card {
  max-width: 250px;

  &:hover {
    .card__title {
      text-decoration: underline;
    }
  }

  &__image-wrapper {
    background-color: $cdr-color-background-secondary;
    padding: $cdr-space-inset-one-x;
    position: relative;
  }

  &__image {
    mix-blend-mode: multiply;
    width: 100%;
    height: 150px;
    object-fit: contain;
  }

  .overlay-content {
    color: white;
    font-size: 1.5rem;
    padding: $cdr-space-quarter-x;
  }
}
</style>