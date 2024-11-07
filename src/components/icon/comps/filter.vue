
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Filter',
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
      <path role="presentation" d="M4.125 7h15.75C20.496 7 21 7.448 21 8s-.504 1-1.125 1H4.125C3.504 9 3 8.552 3 8s.504-1 1.125-1zM7 11h10a1 1 0 010 2H7a1 1 0 010-2zm4 4h2a1 1 0 010 2h-2a1 1 0 010-2z"></path>
    </cdr-icon>
  </template>
  