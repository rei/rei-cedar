<script setup lang="ts">
import CdrImg from '../../image/CdrImg.vue';
import CdrLayout from '../../layout/CdrLayout.vue';
import CdrMediaObject from '../CdrMediaObject.vue';
import CdrSurface from '../../surface/CdrSurface.vue';
import CdrText from '../../text/CdrText.vue';
import type { MediaObject } from '../../../types/interfaces';
import cedarImage from '../../../dev/static/cedar-1920x1080.jpg';
import cedarSmallImage from '../../../dev/static/cedar-100x100.jpg';

defineOptions({ name: 'Media Object' });

interface MediaObjectExample {
  props: MediaObject;
  label: string;
  flags?: string[];
}

const contentShort =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const contentLong = `${contentShort} ${contentShort}`;

const examples: MediaObjectExample[] = [
  {
    label: 'Default (Position right)',
    props: {},
  },
  {
    label: 'Position left, align center',
    props: {
      contentPosition: 'left',
      contentAlignment: 'center',
    },
  },
  {
    label: 'Position top',
    props: {
      contentPosition: 'top',
      mediaHeight: '200px',
    },
  },
  {
    label: 'Position bottom',
    props: {
      contentPosition: 'bottom',
      mediaHeight: '200px',
    },
  },
  {
    label: 'Pass down props to Layout and Surface',
    props: {
      gap: 'two-x',
      background: 'brand-spruce',
    },
    flags: ['no-padding', 'color-inverse'],
  },
  {
    label: 'Content cut-off (known issue)',
    props: {
      mediaHeight: '100px',
    },
    flags: ['long'],
  },
  {
    label: 'Content not cut-off',
    props: {
      mediaHeight: 'auto',
    },
    flags: ['long'],
  },
  {
    label: 'Dynamic position and width',
    props: {
      mediaWidth: { xs: '100%', sm: '100%', md: '50%', lg: '75%' },
      mediaHeight: { xs: '100px', sm: '200px', md: 'auto', lg: 'auto' },
      contentPosition: { xs: 'bottom', sm: 'bottom', md: 'right', lg: 'right' },
    },
  },
  {
    label: 'Small image',
    props: {
      mediaFit: 'none',
    },
    flags: ['small-image', 'long'],
  },
];

const tallColumnsExample = {
  label: 'Tall columns',
  props: {
    mediaWidth: '100px',
  },
};

const sideBySideExample = {
  label: 'Side by side',
  props: {
    mediaHeight: '200px',
    contentPosition: 'bottom',
  },
};
</script>

<template>
  <div class="example">
    <h2>Media Object</h2>

    <hr class="example__hr" />
    <div class="example__container">
      <template v-for="{ props, label, flags } in examples">
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
            v-bind="props"
          >
            <template #content>
              <div
                :class="{
                  example__content: true,
                  'example__content--no-padding': flags && flags.includes('no-padding'),
                  'example__content--color-inverse': flags && flags.includes('color-inverse'),
                }"
              >
                {{ flags && flags.includes('long') ? contentLong : contentShort }}
              </div>
            </template>
            <template #media>
              <CdrImg
                alt="Test image"
                :src="flags && flags.includes('small-image') ? cedarSmallImage : cedarImage"
              />
            </template>
          </CdrMediaObject>
        </div>
      </template>
      <div>
        <CdrText>
          <code>
            <strong v-html="tallColumnsExample.label" />
            <br />
            {{ JSON.stringify(tallColumnsExample.props) }}
          </code>
        </CdrText>
        <CdrLayout
          :columns="2"
          gap="two-x"
        >
          <CdrMediaObject
            v-bind="tallColumnsExample.props"
            :as="CdrSurface"
            background="secondary"
          >
            <template #content>
              <div class="example__content">
                {{ contentLong }}
              </div>
            </template>
            <template #media>
              <CdrImg
                alt="Test image"
                :src="cedarImage"
              />
            </template>
          </CdrMediaObject>
          <CdrMediaObject
            v-bind="tallColumnsExample.props"
            :as="CdrSurface"
            background="secondary"
          >
            <template #content>
              <div class="example__content">
                {{ contentShort }}
              </div>
            </template>
            <template #media>
              <CdrImg
                alt="Test image"
                :src="cedarImage"
              />
            </template>
          </CdrMediaObject>
        </CdrLayout>
      </div>
      <div>
        <CdrText>
          <code>
            <strong v-html="sideBySideExample.label" />
            <br />
            {{ JSON.stringify(sideBySideExample.props) }}
          </code>
        </CdrText>
        <CdrLayout
          :columns="2"
          gap="two-x"
        >
          <CdrMediaObject
            v-bind="sideBySideExample.props"
            :as="CdrSurface"
            background="secondary"
          >
            <template #content>
              <div class="example__content">
                {{ contentLong }}
              </div>
            </template>
            <template #media>
              <CdrImg
                alt="Test image"
                :src="cedarImage"
              />
            </template>
          </CdrMediaObject>
          <CdrMediaObject
            v-bind="sideBySideExample.props"
            :as="CdrSurface"
            background="secondary"
          >
            <template #content>
              <div class="example__content">
                {{ contentShort }}
              </div>
            </template>
            <template #media>
              <CdrImg
                alt="Test image"
                :src="cedarImage"
              />
            </template>
          </CdrMediaObject>
        </CdrLayout>
      </div>
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
    padding: $cdr-space-two-x;

    &--no-padding {
      padding: 0;
    }

    &--color-inverse {
      color: $cdr-color-text-inverse;
    }
  }

  &__full-height {
    height: 100%;
  }
}
</style>
