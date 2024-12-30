<template>
  <div class="foo">
    <h2>choreographer</h2>
    <h3>Standalone card built from schema</h3>
    <!-- <div style="max-width: 550px; margin-bottom: 6.4rem">
      <CdrChoreographer :schema="schemaB" />
    </div> -->
    <CdrChoreographer :schema="schemaA" />
    <!-- <h3>Card</h3>

    <cdr-card class="c-card">
      <CdrChoreographer :schema="schemaA" />
    </cdr-card>

    <cdr-card class="b-card">
      <CdrChoreographer :schema="schemaA" />
    </cdr-card> -->
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Choreographer',
  components: {
    ...Components,
  },
  data() {
    return {
      schemaA: [
        {
          type: 'mediaObject',
          slots: {
            media: {
              type: 'image',
              props: {
                alt: 'A sample image',
                src: 'https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md',
              },
            },
            content: {
              content: [
                { type: 'kicker', content: 'Example kicker' },
                { type: 'title', content: 'Example title' },
              ],
            },
          },
        },
        {
          type: 'image',
          props: {
            alt: 'standard landscape',
            src: 'https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md',
            responsive: true,
            cover: true,
          },
        },
        {
          type: 'kicker',
          content: 'skills',
        },
        {
          type: 'link',
          props: {
            href: '#',
            modifier: 'standalone',
          },
          content: [
            {
              type: 'title',
              props: { tag: 'p' },
              content: 'Running nutrition basics',
            },
          ],
        },
        {
          type: 'rating',
          props: {
            rating: '4.0',
            count: '49',
            size: 'small',
          },
        },
        {
          type: 'abstract',
          content:
            'Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.',
        },
      ],
      schemaB: [
        {
          type: 'card',
          props: {
            as: 'lead',
          },
          content: [
            {
              type: 'image',
              props: {
                alt: 'standard landscape',
                src: 'https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md',
                responsive: true,
                cover: true,
              },
            },
            {
              type: 'kicker',
              props: {
                tag: 'span',
              },
              content: 'skills',
            },
            {
              type: 'link',
              props: {
                href: '#',
                modifier: 'standalone',
                class: 'cdr-card__link',
              },
              content: [
                {
                  type: 'title',
                  props: { tag: 'p' },
                  content: 'Running nutrition basics',
                },
              ],
            },
            {
              type: 'rating',
              props: {
                rating: '4.0',
                count: '49',
                size: 'small',
              },
            },
            {
              type: 'abstract',
              content:
                'Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.c-card {
  container-type: inline-size;
  max-width: 250px;
  padding-bottom: 2.4rem;
  margin-bottom: 5rem;
}
.b-card {
  container-type: inline-size;
  max-width: 600px;
  margin-bottom: 5rem;
  padding-bottom: 2.4rem;
}
</style>
