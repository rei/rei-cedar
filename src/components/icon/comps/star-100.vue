
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Star100',
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
      <path role="presentation" d="M5.686 22.066l1.668-7.552L1.82 9.465l7.298-.659 2.877-7.146 2.877 7.146 7.298.659-5.534 5.049 1.668 7.552-6.309-4.006z"></path>
    </cdr-icon>
  </template>
  