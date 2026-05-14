import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrToggleGroup from '../CdrToggleGroup.vue';
import CdrToggleButton from '../CdrToggleButton.vue';
import { h } from 'vue';

function makeWrapper(props = {}) {
  return mount(CdrToggleGroup, {
    props: {
      modelValue: 'a',
      ...props,
    },
    slots: {
      default: [
        h(CdrToggleButton, { 'toggle-value': 'a' }, () => 'A'),
        h(CdrToggleButton, { 'toggle-value': 'b' }, () => 'B'),
        h(CdrToggleButton, { 'toggle-value': 'c' }, () => 'C'),
      ],
    },
    attachTo: document.body,
  });
}

describe('CdrToggleGroup', () => {
  it('renders correctly', () => {
    const wrapper = makeWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders as a <ul> with role="radiogroup"', () => {
    const wrapper = makeWrapper();
    expect(wrapper.element.tagName).toBe('UL');
    expect(wrapper.attributes('role')).toBe('radiogroup');
  });

  it('applies medium size class by default', () => {
    const wrapper = makeWrapper();
    expect(wrapper.classes()).toContain('cdr-toggle-group--medium');
  });

  it('applies large size class when size="large"', () => {
    const wrapper = makeWrapper({ size: 'large' });
    expect(wrapper.classes()).toContain('cdr-toggle-group--large');
  });

  it('marks the initially selected button as aria-checked', () => {
    const wrapper = makeWrapper({ modelValue: 'b' });
    const buttons = wrapper.findAll('button');
    expect(buttons[0].attributes('aria-checked')).toBe('false');
    expect(buttons[1].attributes('aria-checked')).toBe('true');
    expect(buttons[2].attributes('aria-checked')).toBe('false');
  });

  it('emits update:modelValue when a button is clicked', async () => {
    const wrapper = makeWrapper({ modelValue: 'a' });
    const buttons = wrapper.findAll('button');
    await buttons[1].trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('b');
  });

  it('updates selected button when modelValue prop changes', async () => {
    const wrapper = makeWrapper({ modelValue: 'a' });
    await wrapper.setProps({ modelValue: 'c' });
    const buttons = wrapper.findAll('button');
    expect(buttons[2].attributes('aria-checked')).toBe('true');
    expect(buttons[0].attributes('aria-checked')).toBe('false');
  });

  it('does not emit when clicking the container (non-button area)', async () => {
    const wrapper = makeWrapper();
    // Trigger click on the list element itself (not a button)
    await wrapper.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });
});
