
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'ZoomOut',
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
      <path role="presentation" d="M20.706 19.296a1 1 0 01-1.414 1.414l-4.243-4.247a7.5 7.5 0 111.414-1.414l4.243 4.247zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM7.25 9.75h6.5a.75.75 0 110 1.5h-6.5a.75.75 0 110-1.5z"></path>
    </cdr-icon>
  </template>
  