<script setup lang="ts">
import { CdrPicture } from '../../../lib';
import cedarSm from '../../../dev/static/cedar-1920x1080.jpg';
import cedarXs from '../../../dev/static/cedar-350x150.jpg';
import testImage from '../../../dev/static/test-image.png';

const sourceObj = {
  xs: {
    media: '(max-width: 768px)',
    srcset: cedarXs,
    width: '300',
  },
  sm: {
    media: '(min-width: 768px)',
    srcset: cedarSm,
  },
};
</script>

<template>
  <div>
    <h2>picture</h2>
    <cdr-picture
      :src="testImage"
      loading="eager"
      :sources="sourceObj"
    />
  </div>
</template>

<style></style>
