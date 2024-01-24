import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrImg from '../CdrImg.vue';
import sinon from 'sinon';

describe('CdrImg', () => {
  describe('with just the alt text set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          src: '/src/dev/static/cedar-350x150.jpg',
          alt: 'test alt',
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('sets the alt attr correctly', () => {
      expect(wrapper.attributes().alt).toBe('test alt');
    });
  })

  describe('when crop and ratio and radius and responsive is set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          ratio: "1/1",
          radius: "softer",
          modifier: "responsive",
          fit: "cover",
          position: "left",
          alt: "crop left",
          src: "/src/dev/static/cedar-1920x1080.jpg",
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when arbitrary HTML attrs are passed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrImg, {
        propsData: {
          src: '/src/dev/static/cedar-350x150.jpg',
          loading: 'lazy',
          ratio: '1/1'
        }
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('the arbitrary attrs are passed to the img element', () => {
      expect(wrapper.find('img').attributes()['loading']).toBe('lazy');
    });
  });

  describe('', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallowMount(CdrImg, {
        propsData: {
          src: 'localhost:8000/nothing-to-see-here.png',
          onError: spy,
        }
      });
      wrapper.find('img').trigger('error');
    });

    it('emits error event for default image', () => {
      expect(spy.calledOnce).toBeTruthy();
    })
  });

});
