
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Facebook',
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
      <path role="presentation" d="M9.677 20.895v-8.241H7V9.69h2.677V7.517S9.485 3 13.394 3H17v3.02h-2.415s-1.45-.08-1.465 1.417V9.69h3.34L16 12.654h-2.912V21h-3.41v-.105z"></path>
    </cdr-icon>
  </template>
  