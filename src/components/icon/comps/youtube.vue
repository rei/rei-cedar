
  <script setup lang="ts">
  import CdrIcon from '../CdrIcon.vue';

  defineOptions({
    name: 'Youtube',
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
      <path role="presentation" d="M18.941 5.225s1.716.06 2.387 1.336c0 0 .67.925.67 5.439v.041c.004.352.018 2.86-.277 4.239-.318 1.485-1.02 1.92-1.02 1.92s-.45.433-1.443.551c-.993.119-4.213.249-7.273.249 0 0-5.603-.003-7.49-.313-1.82-.298-2.13-1.936-2.15-2.052l-.01-.06c-.084-.514-.715-4.683.008-9.198 0 0 .224-1.926 2.479-2.152 0 0 2.318-.213 6.795-.225h.368c4.717 0 6.956.225 6.956.225zM9.925 9.143v5.495l5.469-2.747-5.469-2.748z"></path>
    </cdr-icon>
  </template>
  