
    <script>
      import { defineComponent } from 'vue';
      import CdrIcon from '../CdrIcon.vue';

      export default defineComponent({
        name: 'MinusSm',
        components: { CdrIcon },
        props: {
          props: {
            type: Object,
          }
        },
      });
    </script>
    <template>
    <cdr-icon v-bind="props">
      <slot/>
      <path role="presentation" d="M8 11h8a1 1 0 010 2H8a1 1 0 010-2z"></path>
    </cdr-icon>
    </template>
  