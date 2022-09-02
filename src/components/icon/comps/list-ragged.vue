
    <script>
      import { defineComponent } from 'vue';
      import CdrIcon from '../CdrIcon.vue';

      export default defineComponent({
        name: 'ListRagged',
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
      <path role="presentation" d="M18 17a1 1 0 010 2H4a1 1 0 010-2h14zm-4-6a1 1 0 010 2H4a1 1 0 010-2h10zm6-6a1 1 0 010 2H4a1 1 0 110-2h16z"></path>
    </cdr-icon>
    </template>
  