
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ExternalLinkAlt',
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
      <path fill-rule="evenodd" d="M15.95 9.465v4.66a1 1 0 002-.004V7.08a.997.997 0 00-.993-1.029H9.88a1 1 0 100 2h4.657l-8.193 8.193a1 1 0 001.414 1.414l8.192-8.192z" clip-rule="evenodd"></path>
    </cdr-icon>
  </template>
  