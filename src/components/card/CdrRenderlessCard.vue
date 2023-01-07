<script>

/**
 * CdrRenderlessCard
 *
 * A headless base component intended to display a card with data.
 *
 * @props {Object} cdrCardData - Optional. An object containing data to be displayed in the card.
 * @props {Array} cdrCardslots - Optional. An array of slots to be rendered in the card.
 *
 * @emits {String} card-clicked - Emitted when the card is clicked.
 *
 * @method registerCustomEvent - Registers a custom event.
 */

import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'CdrRenderlessCard',
  props: {
    cdrCardData: {
      type: Object,
      required: false,
    },
    cdrCardIsLinked: {
      type: Boolean,
      required: false,
    },
    cdrCardSlots: {
      type: Array,
      required: false,
    },
  },
  emits: ['cdr-card-clicked'],
  setup(props) {
    const reactiveProps = {};

    Object.keys(props.cdrCardData).forEach((key) => {
      reactiveProps[key] = ref(props.cdrCardData[key]);
    });

    const isLinked = ref(props.cdrCardIsLinked);
    const customEvents = ref({});
    const events = [
      { name: 'handleFocus', callback: () => {} },
      { name: 'handleHover', callback: () => {} },
      { name: 'handleActive', callback: () => {} },
      { name: 'handleClick', callback: () => { this.$emit('cdr-card-clicked'); } },
    ];

    return {
      ...reactiveProps,
      isLinked,
      customEvents,
      events,
    };
  },
  methods: {
    registerCustomEvent(name, callback) {
      this.customEvents.value[name] = callback;
    },
    handleCustomEvent(name) {
      if (this.customEvents.value[name]) {
        this.customEvents.value[name]();
      }
    },
  },
});
</script>
