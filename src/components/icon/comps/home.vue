
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Home',
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
      <path role="presentation" d="M19 12.177V19a.997.997 0 01-1 1h-4a.997.997 0 01-1-1v-5h-2v5a.997.997 0 01-1 1H6a.997.997 0 01-1-1v-6.827l-.301.253a1.002 1.002 0 11-1.354-1.473l-.001-.002 8-6.707a1 1 0 011.354.04l7.944 6.659a1 1 0 11-1.286 1.532L19 12.177zM17 10.5l-5.002-4.193L7 10.497V18h2v-5a.997.997 0 011-1h4a.997.997 0 011 1v5h2v-7.5z"></path>
    </cdr-icon>
  </template>
  