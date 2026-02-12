
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'CaretRight',
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
      <path role="presentation" d="M16 12a.997.997 0 00-.288-.702l-5.005-5.005a1 1 0 00-1.414 1.414L13.585 12 9.29 16.295a1 1 0 001.417 1.412l4.98-4.98A.997.997 0 0016 12z"></path>
    </cdr-icon>
  </template>
  