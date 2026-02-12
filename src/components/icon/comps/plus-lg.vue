
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'PlusLg',
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
      <path role="presentation" d="M11 11H6a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V6a1 1 0 00-2 0v5z"></path>
    </cdr-icon>
  </template>
  