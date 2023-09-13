
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Duplicate',
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
      <path fill-rule="evenodd" d="M7 7H4.077C3.482 7 3 7.448 3 8v12c0 .552.482 1 1.077 1h11.846c.595 0 1.077-.448 1.077-1v-3h2.923c.595 0 1.077-.448 1.077-1V4c0-.552-.482-1-1.077-1H8.077C7.482 3 7 3.448 7 4v3zm2 0h6.923C16.518 7 17 7.448 17 8v7h2V5H9v2zM5 19V9h10v10H5z" clip-rule="evenodd"></path>
    </cdr-icon>
  </template>
  