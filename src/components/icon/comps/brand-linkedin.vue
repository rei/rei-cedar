
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'BrandLinkedin',
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
      <path role="presentation" d="M19.668 3c.688 0 1.257.51 1.325 1.165l.007.132v15.404c0 .672-.526 1.226-1.196 1.292l-.136.007H4.328a1.319 1.319 0 01-1.321-1.166L3 19.7V4.297a1.31 1.31 0 011.193-1.29L4.329 3h15.339zm-4.532 6.535c-1.223 0-2.066.63-2.458 1.268l-.069.119h-.035V9.748h-2.56v8.59h2.666v-4.25c0-1.12.214-2.205 1.603-2.205 1.205 0 1.363.993 1.384 1.91l.003.368v4.177h2.668v-4.711l-.005-.391c-.06-2.12-.649-3.701-3.197-3.701zm-6.797.213h-2.67v8.59h2.67v-8.59zm-1.335-4.27a1.548 1.548 0 100 3.096 1.548 1.548 0 000-3.096z"></path>
    </cdr-icon>
  </template>
  