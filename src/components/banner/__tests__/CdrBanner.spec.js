import { expect } from 'vitest';
import { merge } from 'lodash';
import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrBanner from '../CdrBanner.vue';

const mountBanner = (slots) => {
  let defaultSlots = {
    default: 'hey im a banner',
  }
  let mergedSlots = merge(defaultSlots, slots);

  return mount(CdrBanner, {
    slots: {
      ...mergedSlots
    }
  })
};


describe('CdrBanner', () => {
  describe('with just the default slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountBanner();
    })
    describe('with "type" prop set to "info"', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'info',
        });
      });

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      })

      it('has the expected typeClass', () => {
        expect(wrapper.vm.typeClass).toBe('cdr-banner--info');
      });
    })
  })

  describe('with icon-left slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountBanner({ 'icon-left': '<div />' });
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with icon-right slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountBanner({ 'icon-right': '<div />' })
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with info-action slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountBanner({ 'info-action': '<div />' })
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('with message-body slot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mountBanner({ 'message-body': 'and I am some extra information' })
    })
    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
