<template>
  <div class="modal-example">
    <h2>
      Basic Modal Configuration
    </h2>

    <cdr-modal
      :opened="opened"
      @closed="closed"
      wrapper-class="wrapper-test-class"
      overlay-class="overlay-test-class"
      data-backstop="modal"
      role="dialog"
      data-ui="hamburger-modal"
      aria-labelledby="some-heading"
    >
      <template #title>
        <cdr-text
          tag="h2"
          class="cdr-text-dev--heading-serif-600 modal-title"
          id="some-heading"
        >
          Terms & Conditions
        </cdr-text>
      </template>

      <template
        #modal
        v-if="override"
      >
        <div>
          <p>Wow i can just take over the whole modal, huh? Better make sure I have clear way to close it!</p>
          <cdr-button @click="closed">Close modal</cdr-button>
        </div>
      </template>

      <!-- eslint-disable-next-line -->
      <cdr-text class="cdr-text-dev--body-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet dictum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam non urna sit amet dolor euismod consequat vitae non nunc. Nullam vulputate enim ac pharetra sagittis. Curabitur volutpat, metus eu euismod finibus, neque turpis viverra dolor, at ornare justo libero a arcu. Suspendisse nec lectus id leo aliquam posuere id eu mauris. Aenean fermentum justo ex, vel sagittis nulla efficitur nec. Mauris aliquet urna id felis maximus, et molestie erat bibendum. Donec dolor purus, iaculis vitae tellus at, iaculis facilisis nibh. Pellentesque at ex sit amet eros elementum iaculis quis ut justo. Pellentesque consequat in sapien ac blandit. Donec ullamcorper lacus sed interdum auctor.</cdr-text>

      <!-- eslint-disable-next-line -->
      <div style="display: flex; justify-content: space-between; align-items: center;" v-if="overflowContent">
        <cdr-link>Lorem Ipsum Etsum Flotsam Jetsons</cdr-link>
        <cdr-button>boop</cdr-button>
      </div>

      <!-- eslint-disable-next-line -->
      <cdr-text class="cdr-text-dev--body-300" v-if="overflowContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet dictum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam non urna sit amet dolor euismod consequat vitae non nunc. Nullam vulputate enim ac pharetra sagittis. Curabitur volutpat, metus eu euismod finibus, neque turpis viverra dolor, at ornare justo libero a arcu. Suspendisse nec lectus id leo aliquam posuere id eu mauris. Aenean fermentum justo ex, vel sagittis nulla efficitur nec. Mauris aliquet urna id felis maximus, et molestie erat bibendum. Donec dolor purus, iaculis vitae tellus at, iaculis facilisis nibh. Pellentesque at ex sit amet eros elementum iaculis quis ut justo. Pellentesque consequat in sapien ac blandit. Donec ullamcorper lacus sed interdum auctor.</cdr-text>

      <!-- eslint-disable-next-line -->
      <cdr-text class="cdr-text-dev--body-300" v-if="overflowContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet dictum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam non urna sit amet dolor euismod consequat vitae non nunc. Nullam vulputate enim ac pharetra sagittis. Curabitur volutpat, metus eu euismod finibus, neque turpis viverra dolor, at ornare justo libero a arcu. Suspendisse nec lectus id leo aliquam posuere id eu mauris. Aenean fermentum justo ex, vel sagittis nulla efficitur nec. Mauris aliquet urna id felis maximus, et molestie erat bibendum. Donec dolor purus, iaculis vitae tellus at, iaculis facilisis nibh. Pellentesque at ex sit amet eros elementum iaculis quis ut justo. Pellentesque consequat in sapien ac blandit. Donec ullamcorper lacus sed interdum auctor.</cdr-text>
    </cdr-modal>

    <cdr-button
      @click="opened = true"
      aria-haspopup="dialog"
    >Launch modal
    </cdr-button>

    <h3 class="stack">
      Content Options
    </h3>

    <cdr-checkbox v-model="overflowContent">
      Overflow Content
    </cdr-checkbox>

    <cdr-checkbox v-model="override">
      Override Content
    </cdr-checkbox>
    <hr>
    <h2>Advanced Modal Usage</h2>
    <br />
    <fancy-modal />
    <br />
    <async-modal />
    <br />
    <long-modal />
    <div class="spacer" />
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';
import FancyModal from './components/FancyModal.vue'
import AsyncModal from './components/AsyncModal.vue';
import LongModal from './components/LongModal.vue';

export default {
  name: 'Modal',
  components: {
    ...Components,
    FancyModal,
    AsyncModal,
    LongModal,
},
  data() {
    return {
      opened: false,
      overflowContent: false,
      override: false,
    };
  },
  methods: {
    closed() {
      this.opened = false;
    },
  },
};
</script>

<style>
@media (min-width: 672px) {
  .modal-example {
    min-height: 80vh; /* fixes a safari display bug */
  }
}

.spacer {
  height: 100vh;
}
</style>
