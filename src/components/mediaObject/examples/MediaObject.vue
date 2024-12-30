<script setup lang="ts">
import CdrImg from '../../image/CdrImg.vue';
import CdrLayout from '../../layout/CdrLayout.vue';
import CdrMediaObject from '../CdrMediaObject.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { MediaObject, HtmlAttributes } from '../../../types/interfaces';
import cedarImage from '../../../dev/static/cedar-1920x1080.jpg';
import cedarSmallImage from '../../../dev/static/cedar-50x50.jpg';

defineOptions({ name: 'Media Object' });

interface MediaObjectExample {
  props: MediaObject | HtmlAttributes;
  label: string;
  flags?: string[];
}

const contentShort =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const contentLong = `${contentShort} ${contentShort} ${contentShort}`;

const examples: MediaObjectExample[] = [
  {
    label: 'default: media position left, media width 1fr, media height auto, align start',
    props: {},
    flags: [],
  },
  {
    label: 'content padding',
    props: { contentPadding: 'two-x' },
    flags: [],
  },
  {
    label: 'content padding dynamic',
    props: { contentPadding: { xs: 'one-x', sm: 'one-x', md: 'three-x', lg: 'three-x' } },
    flags: [],
  },
  {
    label: 'small image, media width auto',
    props: { mediaWidth: 'auto' },
    flags: ['content-long', 'image-small'],
  },
  {
    label: 'media width 100px',
    props: { mediaWidth: '100px' },
    flags: [],
  },
  {
    label: 'media width dynamic',
    props: { mediaWidth: { xs: '100px', sm: '100px', md: '300px', lg: '300px' } },
    flags: [],
  },
  {
    label: 'align center',
    props: { mediaWidth: 'auto', align: 'center' },
    flags: ['image-small', 'content-long'],
  },
  {
    label: 'dynamic align',
    props: { mediaWidth: 'auto', align: { xs: 'center', sm: 'center', md: 'end', lg: 'start' } },
    flags: ['image-small', 'content-long'],
  },
  {
    label: 'media cover, media configured independently to object-fit cover',
    props: { mediaWidth: '125px', mediaCover: true },
    flags: ['content-long', 'image-cover'],
  },
  {
    label: 'media position right',
    props: {
      mediaPosition: 'right',
    },
  },
  {
    label: 'media position dynamic',
    props: {
      mediaPosition: { xs: 'top', sm: 'bottom', md: 'left', lg: 'right' },
    },
  },
  {
    label: 'media bottom',
    props: {
      mediaPosition: 'bottom',
    },
  },
  {
    label: 'media top, align center',
    props: {
      mediaPosition: 'top',
      align: 'center',
    },
    flags: ['image-small'],
  },

  {
    label: 'media top, align start',
    props: {
      mediaPosition: 'top',
      align: 'start',
    },
    flags: ['image-small'],
  },
  {
    label: 'media top, media cover, media height set',
    props: {
      mediaPosition: 'top',
      mediaHeight: '100px',
      mediaCover: true,
    },
    flags: ['image-cover'],
  },
  {
    label: 'media position dynamic, media height dynamic, media width dynamic',
    props: {
      mediaWidth: { xs: '100%', sm: '100%', md: '50%', lg: '75%' },
      mediaHeight: { xs: '100px', sm: '200px', md: 'auto', lg: 'auto' },
      mediaPosition: { xs: 'top', sm: 'top', md: 'left', lg: 'left' },
      mediaCover: true,
    },
    flags: ['image-cover'],
  },
  {
    label: 'media configured to object fit none, object position center',
    props: { mediaCover: true },
    flags: ['image-center', 'image-small', 'content-long'],
  },
  {
    label: 'overlay, row align, column align, content configured independently to 50% width',
    props: {
      overlay: true,
      overlayColumnAlign: 'end',
      overlayRowAlign: 'center',
    },
    flags: ['color-inverse', 'image-1/1', 'content-narrow'],
  },
  {
    label: 'overlay, media height static',
    props: {
      overlay: true,
      mediaHeight: '200px',
    },
    flags: ['color-inverse', 'image-1/1', 'content-narrow'],
  },
  {
    label: 'overlay, media height responsive',
    props: {
      overlay: true,
      mediaHeight: { xs: '200px', sm: '200px', md: '400px', lg: '400px' },
    },
    flags: ['color-inverse', 'image-1/1', 'content-narrow'],
  },
  {
    label: 'pass down props to Layout and Surface',
    props: {
      background: 'brand-spruce',
      gap: 'two-x',
      contentPadding: 'none',
    },
    flags: ['color-inverse'],
  },
  {
    label: 'badges within media by passing in a div with multiple images',
    props: {},
    flags: ['image-badge'],
  },
];

const columnExamples = [
  {
    label: 'Tall columns',
    props: {
      mediaWidth: '100px',
      mediaCover: true,
    },
    flags: ['image-cover'],
  },
  {
    label: 'Side by side, media cover',
    props: {
      mediaHeight: '100px',
      mediaPosition: 'top',
      mediaCover: true,
    },
    flags: ['image-cover'],
  },
  {
    label: 'Side by side 1:1 images',
    props: {
      mediaPosition: 'top',
    },
    flags: ['image-1/1'],
  },
];
</script>

<template>
  <div class="example">
    <h2>Media Object</h2>

    <hr class="example__hr" />
    <div class="example__container">
      <template v-for="({ props, label, flags }, index) in examples">
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
              <div
                :class="{
                  example__content: true,
                  'example__content--color-inverse': flags && flags.includes('color-inverse'),
                  'example__content--narrow': flags && flags.includes('content-narrow'),
                }"
              >
                {{ flags && flags.includes('content-long') ? contentLong : contentShort }}
              </div>
            </template>
            <template #media>
              <div
                v-if="flags && flags.includes('image-badge')"
                class="example__badge-example"
              >
                <CdrImg
                  alt="Test image"
                  :src="cedarImage"
                  class="example__image"
                />
                <CdrImg
                  alt="Badge"
                  :src="cedarSmallImage"
                  class="example__image--badge"
                />
              </div>
              <CdrImg
                v-else
                alt="Test image"
                :src="flags && flags.includes('image-small') ? cedarSmallImage : cedarImage"
                :class="{
                  example__image: true,
                  'example__image--height': flags && flags.includes('image-height'),
                  'example__image--11': flags && flags.includes('image-1/1'),
                }"
                :fit="
                  flags && (flags.includes('image-cover') || flags.includes('image-1/1'))
                    ? 'cover'
                    : flags && flags.includes('image-center')
                      ? 'none'
                      : undefined
                "
                :position="
                  flags && (flags.includes('image-cover') || flags.includes('image-center'))
                    ? 'center'
                    : undefined
                "
                :ratio="flags && flags.includes('image-1/1') ? '2/1' : 'auto'"
              />
            </template>
          </CdrMediaObject>
        </div>
      </template>
      <template v-for="{ props, label, flags } in columnExamples">
        <div>
          <CdrText>
            <code>
              <strong v-html="label" />
              <br />
              {{ JSON.stringify(props) }}
            </code>
          </CdrText>
          <CdrLayout
            :columns="2"
            gap="two-x"
          >
            <CdrMediaObject
              v-for="index in 2"
              v-bind="props"
              :as="CdrSurface"
              background="secondary"
              content-padding="two-x"
            >
              <template #content>
                <div class="example__content">
                  {{ index }}: {{ index === 1 ? contentLong : contentShort }}
                </div>
              </template>
              <template #media>
                <CdrImg
                  alt="Test image"
                  :src="flags && flags.includes('image-small') ? cedarSmallImage : cedarImage"
                  :class="{
                    example__image: true,
                    'example__image--height': flags && flags.includes('image-height'),
                    'example__image--11': flags && flags.includes('image-1/1'),
                  }"
                  :fit="
                    flags && (flags.includes('image-cover') || flags.includes('image-1/1'))
                      ? 'cover'
                      : flags && flags.includes('image-center')
                        ? 'none'
                        : undefined
                  "
                  :position="
                    flags && (flags.includes('image-cover') || flags.includes('image-center'))
                      ? 'center'
                      : undefined
                  "
                  :ratio="flags && flags.includes('image-1/1') ? '1/1' : undefined"
                />
              </template>
            </CdrMediaObject>
          </CdrLayout>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss';

.example {
  &__hr {
    margin: $cdr-space-two-x 0;
  }

  &__container {
    max-width: 850px;
    width: 100%;

    & > *:not(:first-child) {
      margin-top: $cdr-space-two-x;
    }
  }

  &__content {
    &--color-inverse {
      color: $cdr-color-text-inverse;
    }

    &--narrow {
      max-width: 50%;
    }
  }

  &__full-height {
    height: 100%;
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
  }

  &__badge-example {
    position: relative;
  }
}
</style>
