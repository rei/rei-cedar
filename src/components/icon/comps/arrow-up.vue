
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ArrowUp',
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
      <path role="presentation" d="M13 7.415l3.295 3.295a1 1 0 001.412-1.417l-4.98-4.98a.997.997 0 00-1.429-.025L6.293 9.293a1 1 0 001.414 1.414L11 7.414V19a1 1 0 002 0V7.415z"></path>
    </cdr-icon>
  </template>
  