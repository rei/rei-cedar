
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Pause',
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
      <path role="presentation" d="M9 8.027h1.5a.5.5 0 01.5.5v6.946a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5V8.527a.5.5 0 01.5-.5zm4.5 0H15a.5.5 0 01.5.5v6.946a.5.5 0 01-.5.5h-1.5a.5.5 0 01-.5-.5V8.527a.5.5 0 01.5-.5z"></path>
    </cdr-icon>
  </template>
  