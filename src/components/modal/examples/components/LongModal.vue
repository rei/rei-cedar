<template>
  <div>
    <cdr-button @click="modalOpened = true" aria-haspopup="dialog">
      Open long Modal
    </cdr-button>
    <cdr-modal
      label="Long modal"
      :opened="modalOpened"
      @closed="modalOpened = false"
    >
      <template #title>
        <cdr-text
          tag="h3"
          class="cdr-text-dev--heading-serif-600"
        >
        I am a modal with a really really really loooooooong title
        </cdr-text>
      </template>
      <cdr-text>So loooooong</cdr-text>
    </cdr-modal>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'LongModal',
  components: {
    ...Components,
  },
  data() {
    return {
      modalOpened: false,
    };
  },
};
</script>
