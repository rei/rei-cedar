
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Star75',
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
      <path role="presentation" d="M5.686 22.066l1.668-7.552L1.82 9.465l7.298-.659 2.877-7.146 2.877 7.146 7.298.66-5.534 5.048 1.668 7.552-6.309-4.006-6.31 4.006h.001zm8.514-3.79l2.609 1.656-1.274-5.767 4.283-3.908-5.62-.508.002 8.527z"></path>
    </cdr-icon>
  </template>
  