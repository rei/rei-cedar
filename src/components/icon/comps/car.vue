
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Car',
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
      <path role="presentation" d="M3 18a1 1 0 01-1-1V9c0-.287.121-.546.315-.728l3.9-3.891A.998.998 0 017 4h8a1 1 0 01.942.663l1.78 3.487 3.408.858A1 1 0 0122 10v7a1 1 0 01-1 1h-2.05a2.5 2.5 0 01-4.9 0h-4.1a2.5 2.5 0 01-4.9 0H3zm4.5.25a.75.75 0 100-1.5.75.75 0 000 1.5zm9 0a.75.75 0 100-1.5.75.75 0 000 1.5zM4 16h1.5c.456-.607 1.182-1 2-1 .818 0 1.544.393 2 1h5c.456-.607 1.182-1 2-1 .818 0 1.544.393 2 1H20v-5.215l-3.176-.8a1.001 1.001 0 01-.799-.76L14.38 6H7.412L4 9.404V16zm2.002-5.997a1 1 0 000 2h4.01a1 1 0 100-2h-4.01zm6.999.004a1 1 0 000 2h2.011a1 1 0 100-2h-2.011z"></path>
    </cdr-icon>
  </template>
  