<template>
  <div>
    <cdr-button @click="handleOpen" aria-haspopup="dialog">Open async modal</cdr-button>
    <cdr-modal
      label="Cat facts!"
      :opened="modalOpened"
      @closed="modalOpened = false"
    >
      <template #title>
        <cdr-text
          tag="h3"
          class="cdr-text-dev--heading-serif-600"
        >
          Cat Fact!
        </cdr-text>
      </template>
      <cdr-text>{{ catFact }}</cdr-text>
    </cdr-modal>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'AsyncModal',
  components: {
    ...Components,
  },
  data() {
    return {
      catFact: 'Purrrring with anticipation',
      modalOpened: false,
    };
  },
  methods: {
    async getCatFact() {
      await fetch("https://cat-fact.herokuapp.com/facts")
        .then(response => response.json())
        .then(data => (this.catFact = data[Math.floor(Math.random() * (4 - 0) + 0)].text));
    },
    handleOpen() {
      this.getCatFact();
      this.modalOpened = true;
    },

  }
};
</script>
