<script setup lang="ts">
import { CdrPicture } from '../../../lib';

const sourceObj = {
  xs: {
    media: '(max-width: 768px)',
    srcset: '/src/dev/static/cedar-350x150.jpg',
    width: '300',
  },
  sm: {
    media: '(min-width: 768px)',
    srcset: '/src/dev/static/cedar-1920x1080.jpg',
  }
}
</script>



<template>
  <div>
    <h2>picture</h2>
    <cdr-picture 
      src="/src/dev/static/test-image.png"
      loading="eager"
      :sources="sourceObj"
    />
  </div>
</template>

<style>
</style>
