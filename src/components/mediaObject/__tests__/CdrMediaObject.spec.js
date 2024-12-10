import { markRaw } from 'vue';
import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrMediaObject from '../CdrMediaObject.vue';
import CdrSurface from '../../surface/CdrSurface.vue';

const CdrSurfaceRaw = markRaw(CdrSurface);

export const examples = [
  {
    label: 'default: media position left, media width 1fr, media height auto, align start',
    props: {},
  },
  {
    label: 'content padding',
    props: { contentPadding: 'two-x' },
  },
  {
    label: 'content padding dynamic',
    props: { contentPadding: { xs: 'one-x', sm: 'one-x', md: 'three-x', lg: 'three-x' } },
  },
  {
    label: 'media width 100px',
    props: { mediaWidth: '100px' },
  },
  {
    label: 'media width dynamic',
    props: { mediaWidth: { xs: '100px', sm: '100px', md: '300px', lg: '300px' } },
  },
  {
    label: 'align center',
    props: { mediaWidth: 'auto', align: 'center' },
  },
  {
    label: 'dynamic align',
    props: { mediaWidth: 'auto', align: { xs: 'center', sm: 'center', md: 'end', lg: 'start' } },
  },
  {
    label: 'cover',
    props: { mediaWidth: '125px', cover: true },
  },
  {
    label: 'media position right',
    props: {
      mediaPosition: 'right',
    },
  },
  {
    label: 'media position dynamic',
    props: {
      mediaPosition: { xs: 'top', sm: 'bottom', md: 'left', lg: 'right' },
    },
  },
  {
    label: 'media bottom',
    props: {
      mediaPosition: 'bottom',
    },
  },
  {
    label: 'media top, align center',
    props: {
      mediaPosition: 'top',
      align: 'center',
    },
  },
  {
    label: 'media position dynamic, media height dynamic, media width dynamic',
    props: {
      mediaWidth: { xs: '100%', sm: '100%', md: '50%', lg: '75%' },
      mediaHeight: { xs: '100px', sm: '200px', md: 'auto', lg: 'auto' },
      mediaPosition: { xs: 'top', sm: 'top', md: 'left', lg: 'left' },
      cover: true,
    },
  },
  {
    label: 'overlay, row align, column align, content configured independently to 50% width',
    props: {
      overlay: true,
      overlayColumnAlign: 'end',
      overlayRowAlign: 'center',
    },
  },
  {
    label: 'pass down props to Layout and Surface',
    props: {
      background: 'brand-spruce',
      as: CdrSurfaceRaw,
    },
  },
];

describe('CdrMediaObject', () => {
  describe('snapshot tests', () => {
    examples.forEach(({ label, props }) => {
      it(label, () => {
        const wrapper = mount(CdrMediaObject, {
          props,
          slots: { content: 'Some content', media: 'Some media' },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
