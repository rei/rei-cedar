import { shallowMount } from '../../../../test/vue-jest-style-workaround.js';
import CdrPicture from '../CdrPicture.vue';

describe('CdrPicture', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CdrPicture, {
      props: {
        src: '/src/dev/static/cedar-350x150.jpg',
        sources: {
          xs: {
            media: '(max-width: 768px)',
            srcset: '/src/dev/static/cedar-350x150.jpg',
            width: '300',
          },
          sm: {
            media: '(min-width: 768px)',
            srcset: '/src/dev/static/cedar-1920x1080.jpg',
          },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
