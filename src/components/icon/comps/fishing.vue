
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Fishing',
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
      <path role="presentation" d="M6.446 8.841A3.502 3.502 0 017.491 2a3.5 3.5 0 01.955 6.868v6.81c.007.1.24 3.69 3.603 4.245.37.062.77.088 1.195.072 4.456-.135 4.732-3.508 4.75-3.895v-.098h-1.002a1.002 1.002 0 01-.903-1.43l2.023-4.003a.991.991 0 011.123-.54c.45.103.766.508.755.97v5.142c-.066 1.986-1.53 5.698-6.678 5.855-.094.002-.187.004-.28.004a7.936 7.936 0 01-1.304-.103c-3.974-.657-5.192-4.317-5.28-6.172l-.002-6.884zM7.491 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
    </cdr-icon>
  </template>
  