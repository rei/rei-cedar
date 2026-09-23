import { createApp, defineComponent, h } from 'vue';
import CdrFilmstrip from '../../src/components/filmstrip/CdrFilmstrip.vue';

const ProductFrame = defineComponent({
  props: { name: { type: String, required: true } },
  setup(props) {
    return () =>
      h('div', { class: 'product-frame' }, [
        h('div', { class: 'product-image' }),
        h('p', props.name),
      ]);
  },
});

const model = {
  items: Array.from({ length: 10 }, (_, index) => ({ name: `Product ${index + 1}` })),
};
const adapter = (source: typeof model) => ({
  component: ProductFrame,
  frames: source.items.map((item, index) => ({ key: index, props: item })),
  filmstripId: 'resize-fixture',
  description: 'Product recommendations',
  framesToShow: 2,
  framesToScroll: 1,
  frameExtra: 0.25,
});

createApp({ render: () => h(CdrFilmstrip, { model, adapter }) }).mount('#app');

const style = document.createElement('style');
style.textContent = `
  body { margin: 0; }
  .product-frame { box-sizing: border-box; padding: 8px; }
  .product-image { width: 100%; aspect-ratio: 1; background: #ddd; }
  .product-frame p { margin: 8px 0; }
`;
document.head.append(style);
