
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Mail',
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
      <path role="presentation" d="M21 5a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h18zm-1 3.536l-7.483 4.32a1 1 0 01-1.017.01L4 8.536V17h16V8.536zM18.658 7H5.34L12 10.845 18.658 7z"></path>
    </cdr-icon>
  </template>
  