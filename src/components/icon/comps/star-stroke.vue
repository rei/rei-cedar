
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'StarStroke',
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
      <path role="presentation" d="M5.866 22.405l1.669-7.552L2 9.805l7.298-.66L12.176 2l2.878 7.147 7.298.659-5.535 5.048 1.669 7.552-6.31-4.007-6.31 4.006zm1.496-2.134l4.814-3.056 4.814 3.056-1.274-5.767L20 10.597l-5.645-.51-2.179-5.41-2.179 5.41-5.645.51 4.284 3.907-1.274 5.767z"></path>
    </cdr-icon>
  </template>
  