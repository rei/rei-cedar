
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Clipboard',
  });
  
  defineProps({
    props: {
      type: Object,
    }
  });
  </script>
  <template>
    <cdr-icon v-bind="props">
      <slot/>
      <path role="presentation" d="M6 6v14h12V6h1a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h1zm6 8v1H8v-1h4zm4-2v1H8v-1h8zm0-2v1H8v-1h8zm-4-8a2 2 0 011.732 3.001L16 5a1 1 0 011 1v1H7V6a1 1 0 011-1l2.268.001A2 2 0 0112 2zm0 1a1 1 0 100 2 1 1 0 000-2z"></path>
    </cdr-icon>
  </template>
  