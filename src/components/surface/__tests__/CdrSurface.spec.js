import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSurface from '../CdrSurface.vue';
import sinon from 'sinon'

describe('CdrSurface', () => {
  describe('snapshot test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(CdrSurface);
    })
    it('renders correctly', () => {
      wrapper.setProps({
        display: 'flex',
        background: 'secondary',
        palette: 'secondary',
        radius: 'soft',
        withBorder: true,
        borderWidth: 'one-x',
        position: 'absolute',
        p: 'three-x',
        m: 'one-x',
      })
      expect(wrapper.element).toMatchSnapshot()
    });
  })

  describe('component unit tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(CdrSurface);
    });

    describe('default component with no configuration', () => {
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('sets the default tag prop correctly', () => {
        expect(wrapper.element.tagName).toBe('DIV');
      });
      it('no class added', () => {
        expect(wrapper.classes()).toEqual([]);
      });
    })

    describe('when "tag" is set to "a"', () => {
      beforeEach(() => {
        wrapper.setProps({ tag: 'a' });
      });
      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      it('renders a link', () => {
        expect(wrapper.element.tagName).toBe('A');
      });
    })

    // describe('when "iconOnly" and "withBackground" is set to true', () => {
    //   beforeEach(() => {
    //     wrapper.setProps({
    //       iconOnly: true,
    //       withBackground: true,
    //     });
    //   });
    //   it('renders correctly', () => {
    //     expect(wrapper.element).toMatchSnapshot();
    //   });
    //   it('adds class for icon only', () => {
    //     expect(wrapper.classes()).toContain('cdr-button--icon-only');
    //   });

    //   it('adds class for icon background', () => {
    //     expect(wrapper.classes()).toContain('cdr-button--with-background');
    //   });
    // })

  })
});