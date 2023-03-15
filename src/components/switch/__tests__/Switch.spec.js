import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrSwitch from '../CdrSwitch.vue';

describe('CdrSwitch', () => {
  let wrapper;
  let label;
  beforeEach(() => {
    wrapper = mount(CdrSwitch, {
      props: {
        id: 'id-123',
        modelValue: false
      },
      attachTo: document.body,
      slots: {
        default: ' <span class="custom-text-style">Pull the lever Kronk!</span>'
      }
    });
    label = wrapper.find('label');
  })

  it('matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('has a role of "switch"', () => {
    expect(label.attributes('role')).toBe('switch');
  });

  it('has an "aria-checked" value of "false"', () => {
    expect(label.attributes('aria-checked')).toBe('false');
  });

  it('the aria-labelledby attribute references the correct id', () => {
    expect(label.attributes('aria-labelledby')).toBe('id-123');
  });

  describe('after a click', () => {
    beforeEach(async () => {
      await label.trigger('click');
    });

    it('emits the expected value', () => {
      expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(true)
    });
  })

  describe('when the "checked" property is set to true', () => {
    beforeEach(async () => {
      wrapper.setProps({ modelValue: true })
    });

    it('matches snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('has an "aria-checked" value of "true"', () => {
      expect(wrapper.find('label').attributes('aria-checked')).toBe('true');
    });

    describe('after a click', () => {
      beforeEach(async () => {
        await label.trigger('click')
      });

      it('emits the expected value', () => {
        expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(false)
      });
    })
  })
});
