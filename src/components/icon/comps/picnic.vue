
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Picnic',
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
      <path role="presentation" d="M15.333 6l1.82 5H21a1 1 0 010 2h-3.12l2.06 5.658a1 1 0 01-1.88.684L15.752 13H8.248L5.94 19.342a1 1 0 11-1.88-.684L6.12 13H3a1 1 0 010-2h3.848l1.82-5H7a1 1 0 110-2h10a1 1 0 010 2h-1.667zm-2.11 0h-2.447c-.01.062-.026.125-.048.186L8.976 11h6.048l-1.752-4.814A1.005 1.005 0 0113.224 6h-.001z"></path>
    </cdr-icon>
  </template>
  