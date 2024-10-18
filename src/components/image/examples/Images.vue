<template>
  <div>
    <h2>Images</h2>
    <div>
      <h3>Standard image</h3>
      <cdr-img
        :src="testImage"
        alt="A historical photo of a man standing on a tall rock"
      />
      <h3>Image properties</h3>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="16/9"
        style="background-color: lightskyblue"
      />
      <h4>Ratio Without object fit</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="4/1"
        style="background-color: lightskyblue"
      />
      <h4>Ratio with object fit contain</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="4/1"
        fit="contain"
        style="background-color: lightskyblue"
      />
      <h4>Ratio with object fit cover</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="4/1"
        fit="cover"
      />
      <h4>Object positioning (10% 75%)</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="4/1"
        position="10% 75%"
        fit="cover"
      />
      <h4>Object positioning (bottom left)</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        ratio="4/1"
        position="bottom left"
        fit="cover"
      />
      <h4>Border radius (token shorthand "soft")</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        radius="soft"
      />
      <h4>Border radius (custom "33%")</h4>
      <cdr-img
        alt=""
        :src="cedarImage"
        radius="33%"
      />
    </div>
    <div data-backstop="image-error">
      <h3>Image With Error</h3>
      <cdr-img
        src="/not-here.png"
        @error="handleError"
        alt="im an error!"
      />
      Error Handled: {{ hasError }}
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import testImage from '../../../dev/static/test-image.png';
import cedarImage from '../../../dev/static/cedar-1920x1080.jpg';

export default {
  name: 'Images',
  components: {
    ...Components,
  },
  data() {
    return {
      hasError: false,
      testImage,
      cedarImage,
    };
  },
  methods: {
    handleError() {
      this.hasError = true;
    },
  },
};
</script>
