
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'XSm',
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
      <path role="presentation" d="M13.406 12.006l3.297-3.296a1 1 0 10-1.414-1.414l-3.297 3.295-3.285-3.295A1 1 0 107.293 8.71l3.285 3.295-3.285 3.288a1 1 0 001.414 1.415l3.285-3.289 3.297 3.289a1 1 0 001.414-1.415l-3.297-3.287z"></path>
    </cdr-icon>
  </template>
  