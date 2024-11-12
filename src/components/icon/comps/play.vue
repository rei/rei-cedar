
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Play',
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
      <path role="presentation" d="M9.737 16.195a.5.5 0 01-.737-.44v-7.5a.5.5 0 01.737-.44l6.999 3.745a.5.5 0 010 .881l-6.999 3.754z"></path>
    </cdr-icon>
  </template>
  