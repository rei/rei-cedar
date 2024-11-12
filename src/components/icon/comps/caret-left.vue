
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'CaretLeft',
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
      <path role="presentation" d="M8 12c0 .273.11.521.288.702l5.005 5.005a1 1 0 001.414-1.414L10.415 12l4.295-4.295a1 1 0 00-1.417-1.412l-4.98 4.98A.997.997 0 008 12z"></path>
    </cdr-icon>
  </template>
  