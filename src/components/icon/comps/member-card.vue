
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'MemberCard',
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
      <path role="presentation" d="M7.042 13.956a2 2 0 111.916 0A3.001 3.001 0 0111 16.8a.5.5 0 11-1 0 2 2 0 10-4 0 .5.5 0 11-1 0c0-1.322.855-2.444 2.042-2.844zM4 7V5a1 1 0 011-1h14a1 1 0 011 1v2h1a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h1zm2 0h12V6H6v1zm14 11V9H4v9h16zm-7.563-7h6.126c.241 0 .437.224.437.5s-.196.5-.438.5h-6.125c-.241 0-.437-.224-.437-.5s.196-.5.438-.5zm0 2h6.126c.241 0 .437.224.437.5s-.196.5-.438.5h-6.125c-.241 0-.437-.224-.437-.5s.196-.5.438-.5zm0 2h6.126c.241 0 .437.224.437.5s-.196.5-.438.5h-6.125c-.241 0-.437-.224-.437-.5s.196-.5.438-.5zM8 13.2a1 1 0 100-2 1 1 0 000 2z"></path>
    </cdr-icon>
  </template>
  