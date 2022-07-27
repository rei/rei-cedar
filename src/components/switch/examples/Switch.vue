<template>
  <div>
    <h2>Toggle Switch</h2>
    <cdr-grid :class="greenTheme ? 'green-switch-grid' : 'switch-grid'"  :style="{ width: extraWide ? '1000px' : '550px' }" >
      <cdr-switch id="kronk" v-model="kronkLever">
        Pull the Lever Kronk! (Medium)
      </cdr-switch>
      <cdr-switch id="greentheme" v-model="greenTheme" :full-width="true">
        <cdr-text>Switch to a green theme (Medium: Full Width)</cdr-text>
      </cdr-switch>
      <cdr-switch id="extrawide" v-model="extraWide" size="large">
        <cdr-text>Extra wide switch containers (Large)</cdr-text>
      </cdr-switch>
      <cdr-switch v-model="happiness" size="large" :full-width="true">
        Happiness <span v-show="happiness">🙂🙂🙂🙂🙂🙂🙂</span> (Large: Full Width)
      </cdr-switch>
      <cdr-switch id="customtext" v-model="customTextStyle">
        <cdr-text :class="customTextStyle ? 'custom-text-style' : ''">Add Custom Switch Label Styling</cdr-text>
      </cdr-switch>
      <img class="switchable-image" :style="{ maxHeight: kronkLever ? '500px' : 0 }"
        src="https://c.tenor.com/hPZScif7OvwAAAAC/pull-lever.gif" alt="">
    </cdr-grid>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Switch',
  data() {
    return {
      kronkLever: false,
      greenTheme: false,
      extraWide: false,
      happiness: false,
      customTextStyle: false,
    }
  },
  components: {
    ...Components,
  },
};
</script>

<style>
.switch-grid, .green-switch-grid {
  padding: 2rem;
  gap: 2rem;
}

.custom-text-style {
  color: #1f513f;
  font-weight: bold;
}

.switch-grid > div[class^="cdr-switch"] {
  border: 1px solid #dcd6cb;
  padding: 1rem;
}

.green-switch-grid > div[class^="cdr-switch"] {
  border: 5px solid green;
  padding: 1rem;
}

.switchable-image {
  transition: max-height 1.15s ease-out;
  margin: auto;
  width: 500px;
}
</style>
