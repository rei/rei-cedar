
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'QuestionFill',
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
      <path role="presentation" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 13.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 6a3.5 3.5 0 00-3.5 3.5 1 1 0 002 0 1.5 1.5 0 013 0c0 .816-.881 1.119-1.5 1.75s-1 1.296-1 2.257a1 1 0 102-.007 1.493 1.493 0 01.695-1.266c.233-.148 1.805-.938 1.805-2.734A3.5 3.5 0 0012 6z"></path>
    </cdr-icon>
  </template>
  