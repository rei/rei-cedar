
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ShoppingBagFill',
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
      <path role="presentation" d="M7 8a5 5 0 1110 0h2.074a1 1 0 01.997.916l.928 11A1 1 0 0120.002 21H4a1 1 0 01-.997-1.083l.914-11A1 1 0 014.914 8H7zm5-3a3 3 0 00-3 3h6a3 3 0 00-3-3z"></path>
    </cdr-icon>
  </template>
  