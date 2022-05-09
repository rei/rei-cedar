<template>
  <div>
    <h2>
      Images
    </h2>
    <div data-backstop="image-aspect-ratio">
      <h3>
        Aspect Ratios (with landscape images)
      </h3>

      <ratios />
    </div>

    <div data-backstop="image-cropping">
      <cropping />
    </div>

    <div data-backstop="image-mods">
      <mods />
    </div>

    <div data-backstop="image-error">
      <h3>
        Image With Error
      </h3>
      <cdr-img
        src="localhost:8000/not-here.png"
        @error="handleError"
        alt="im an error!"
      />
      Error Handled: {{ hasError }}
    </div>

    <div data-backstop="image-standard">
      <h3>
        Standard image
      </h3>
      <cdr-img
        alt="ratio standard"
        src="/src/dev/static/cedar-200x200.jpg"
      />
      <cdr-img
        alt="standard landscape"
        src="/src/dev/static/cedar-350x150.jpg"
      />
      <cdr-img
        alt="standard portrait"
        src="/src/dev/static/cedar-150x350.jpg"
      />
    </div>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import ratios from 'componentsdir/image/examples/demos/Ratios.vue';
import cropping from 'componentsdir/image/examples/demos/Cropping.vue';
import mods from 'componentsdir/image/examples/demos/Mods.vue';

export default {
  name: 'Images',
  components: {
    ...Components,
    ratios,
    cropping,
    mods,
  },
  data() {
    return {
      hasError: false,
    };
  },
  methods: {
    handleError() {
      this.hasError = true;
    },
  },
};
</script>
