
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'PauseFill',
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
      <path role="presentation" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM9 8.027a.5.5 0 00-.5.5v6.946a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5V8.527a.5.5 0 00-.5-.5H9zm4.5 0a.5.5 0 00-.5.5v6.946a.5.5 0 00.5.5H15a.5.5 0 00.5-.5V8.527a.5.5 0 00-.5-.5h-1.5z"></path>
    </cdr-icon>
  </template>
  