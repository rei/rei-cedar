
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ListView',
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
      <path role="presentation" d="M6 17a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h2zm14 1a1 1 0 010 2H10a1 1 0 010-2h10zM6 10a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h2zm14 1a1 1 0 010 2H10a1 1 0 010-2h10zM6 3a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2zm14 1a1 1 0 010 2H10a1 1 0 110-2h10z"></path>
    </cdr-icon>
  </template>
  