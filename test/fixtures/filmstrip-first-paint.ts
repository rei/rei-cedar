import { createApp, createSSRApp, defineComponent, h } from 'vue';
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
  filmstripId: 'first-paint-fixture',
  description: 'Product recommendations',
  useDefaultResizeStrategy: true,
});

export const FilmstripFixture = defineComponent({
  render: () => h(CdrFilmstrip, { model, adapter }),
});

if (typeof document !== 'undefined') {
  const root = document.querySelector('#app')!;
  const app = root.hasChildNodes() ? createSSRApp(FilmstripFixture) : createApp(FilmstripFixture);
  app.mount(root);
}
