
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'CheckSm',
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
      <path role="presentation" d="M16.77 8.645a1 1 0 10-1.533-1.286l-5.95 7.083-1.52-1.817a1 1 0 10-1.533 1.285l2.227 2.66a.999.999 0 001.565.1l6.743-8.025z"></path>
    </cdr-icon>
  </template>
  