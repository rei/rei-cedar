
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ArrowDown',
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
      <path role="presentation" d="M11 16.585L7.705 13.29a1 1 0 00-1.412 1.417l4.98 4.98a.997.997 0 001.429.025l5.005-5.005a1 1 0 00-1.414-1.414L13 16.586V5a1 1 0 00-2 0v11.585z"></path>
    </cdr-icon>
  </template>
  