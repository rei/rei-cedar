
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'MinusLg',
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
      <path role="presentation" d="M6 11h12a1 1 0 010 2H6a1 1 0 010-2z"></path>
    </cdr-icon>
  </template>
  