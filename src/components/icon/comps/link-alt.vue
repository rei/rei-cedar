
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'LinkAlt',
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
      <path fill-rule="evenodd" d="M10 17a1 1 0 100-2H7a3 3 0 110-6h3a1 1 0 100-2H7a5 5 0 000 10h3zm3-9a1 1 0 011-1h3a5 5 0 110 10h-3a1 1 0 010-2h3a3 3 0 000-6h-3a1 1 0 01-1-1zm-5 4a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path>
    </cdr-icon>
  </template>
  