
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Star25',
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
      <path role="presentation" d="M5.686 22.066l1.668-7.552L1.82 9.465l7.298-.659 2.877-7.146 2.877 7.146 7.298.66-5.534 5.048 1.668 7.552-6.309-4.006-6.31 4.006h.001zm4.303-3.917l2.006-1.274 4.814 3.057-1.274-5.767 4.283-3.908-5.645-.51-2.178-5.41-2.009 4.99.003 8.822z"></path>
    </cdr-icon>
  </template>
  