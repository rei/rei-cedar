
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Boat',
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
      <path role="presentation" d="M19 17h-6v3h4a1 1 0 010 2H7a1 1 0 010-2h4v-5H5a1 1 0 01-.813-1.582L11 4.036V3a1 1 0 112 0v1.007l6.789 11.378a1 1 0 01-.79 1.615zm-8-4V7.439L6.96 13H11zm2-5.123V15h4.24L13 7.877z"></path>
    </cdr-icon>
  </template>
  