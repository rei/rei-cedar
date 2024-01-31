<script setup>
import { CdrAbstract, CdrKicker, CdrTitle, CdrImg, CdrRating, CdrLink, CdrCard } from '../../../lib';
import CdrChoreographer from '../CdrChoreographer.vue';

const map = {
  abstract: CdrAbstract,
  kicker: CdrKicker,
  title: CdrTitle,
  image: CdrImg,
  rating: CdrRating,
  link: CdrLink,
  card: CdrCard,
}

const schema = [
        {
          type: 'card',
          props: {
            as: 'lead'
          },
          content: [
            {
              type: 'image',
              props: {
                alt: "standard landscape",
                src: "https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md",
                responsive: true,
                cover: true
              },
            },
            {
              type: 'kicker',
              props: {
                tag: 'span',
              },
              content: 'skills'
            },
            {
              type: 'link',
              props: {
                href: '#',
                modifier: 'standalone',
                class: "cdr-card__link"
              },
              content: [
                {
                  type: 'title',
                  props: { tag: 'p' },
                  content: 'Running nutrition basics' 
                }
              ]
            },
            {
              type: 'rating',
              props: {
                rating: "4.0",
                count: "49",
                size: "small"
              }
            },
            {
              type: 'abstract',
              content: 'Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.'
            }
          ]
        }
      ]

</script>
<template>
  <div>
    <h2>choreographer</h2>
    <h3>Standalone card built from schema</h3>
    <div style="max-width: 550px; margin-bottom: 6.4rem;">
      <CdrChoreographer :component-map="map" :schema="schema"/>
    </div>
  </div>
</template>
