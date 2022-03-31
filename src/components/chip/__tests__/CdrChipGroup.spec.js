import { h } from 'vue';
import { mount } from '../../../../test/vue-jest-style-workaround.js';

import CdrChipGroup from 'componentdir/chip/CdrChipGroup.vue';
import CdrChip from 'componentdir/chip/CdrChip.vue';


  // const wrapper = mount(h(CdrAccordionGroup, {}, {default: () => [
  //   h(CdrAccordion, {id: 'tab1', level: '2', label: 'label1'}),
  //   h(CdrAccordion, {id: 'tab2', level: '2', label: 'label2'}),
  // ]}));
describe('CdrChipGroup', () => {
  it('renders correctly', () => {
    const wrapper = mount(h(CdrChipGroup, {
        label: 'test',
      },
      {
        default: () => [
          h(CdrChip, {'aria-checked': true, tabindex: 0, role: 'radio'}, {default:() => 'chip 1'}),
          h(CdrChip, {'aria-checked': false, tabindex: -1, role: 'radio'}, {default:() => 'chip 2'}),
        ]
      },
    ));
    expect(wrapper.element).toMatchSnapshot()
  });

  it('renders correctly with label visible', () => {
    const wrapper = mount(h(CdrChipGroup, {
        label: 'test',
        hideLabel: false,
      },
      {
        default: () => [
          h(CdrChip, {'aria-checked': true, tabindex: 0, role: 'radio'}, {default:() => 'chip 1'}),
          h(CdrChip, {'aria-checked': false, tabindex: -1, role: 'radio'}, {default:() => 'chip 2'}),
        ]
      },
    ));
    expect(wrapper.element).toMatchSnapshot()
  });

  it('renders label slot', () => {
    const wrapper = mount(h(CdrChipGroup, {
        label: 'test',
        hideLabel: false,
      },
      {
        default: () => [
          h(CdrChip, {'aria-checked': true, tabindex: 0, role: 'radio'}, {default:() => 'chip 1'}),
          h(CdrChip, {'aria-checked': false, tabindex: -1, role: 'radio'}, {default:() => 'chip 2'}),
        ],
        label: 'hey im overriding here!!!',
      },
    ));

    expect(wrapper.element).toMatchSnapshot()
  });

  it('sets current index on mount', () => {
    const wrapper = mount(h(CdrChipGroup, {
        label: 'test',
      },
      {
        default: () => [
          h(CdrChip, {'aria-checked': 'false', tabindex: -1, role: 'radio'}, {default:() => 'chip 1'}),
          h(CdrChip, {'aria-checked': 'true', tabindex: 0, role: 'radio'}, {default:() => 'chip 2'}),
        ]
      },
    ));

    // await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentIdx).toBe(1);
  });

// TODO: old keyboard listener tests not working as we can no longer `setData`
 // (though questionable if this test was ever useful since it was just forcibly updating data and not letting the actual click handler do its thing...)
// Should refactor CdrChipGroup so that the keyboard handling logic is separate from the "chip focusing" logic
// That way there can be 1 unit tests that validates that keyboard events are processed properly (maybe it returns the new currentIdx?)
// and then another test can validate the "focusing a chip" logic.
  xit('has correct a11y', async () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    const wrapper = mount(h(CdrChipGroup, {
        label: 'test',
      },
      {
        default: () => [
          h(CdrChip, {'aria-checked': 'true', tabindex: 0, role: 'radio'}, {default:() => 'chip 1'}),
          h(CdrChip, {'aria-checked': 'false', tabindex: -1, role: 'radio'}, {default:() => 'chip 2'}),
          h(CdrChip, {'aria-checked': 'false', tabindex: -1, role: 'radio'}, {default:() => 'chip 3'}),
        ]
      },
    ), {attachTo: elem});

    /* keyboard nav tests
      `focusin` doesn't fire outside of the browser environment so it's faked by just doing the logic
      manually instead with setData. The proper focus logic is still checked via document.activeElement
    */
  //  TODO: can no longer set data on component, can we trigger focusin on specific elements?
    const chips = wrapper.vm.chips;
    // Up (first to last)
    wrapper.trigger('keydown', { key: 'ArrowUp' });
    // wrapper.setData({ currentIdx: 2 });
    await wrapper.vm.$nextTick();
    expect(chips[2]).toBe(document.activeElement);
    // Down (last to first)
    wrapper.trigger('keydown', { key: 'ArrowDown' });
    // wrapper.setData({ currentIdx: 0 });
    await wrapper.vm.$nextTick();
    expect(chips[0]).toBe(document.activeElement);
    // Down
    wrapper.trigger('keydown', { key: 'ArrowDown' });
    // wrapper.setData({ currentIdx: 1 });
    await wrapper.vm.$nextTick();
    expect(chips[1]).toBe(document.activeElement);
    // Up
    wrapper.trigger('keydown', { key: 'ArrowUp' });
    // wrapper.setData({ currentIdx: 0 });
    await wrapper.vm.$nextTick();
    expect(chips[0]).toBe(document.activeElement);
    // End
    wrapper.trigger('keydown', { key: 'End' });
    // wrapper.setData({ currentIdx: 2 });
    await wrapper.vm.$nextTick();
    expect(chips[2]).toBe(document.activeElement);
    // Home
    wrapper.trigger('keydown', { key: 'Home' });
    // wrapper.setData({ currentIdx: 0 });
    await wrapper.vm.$nextTick();
    expect(chips[0]).toBe(document.activeElement);
    wrapper.destroy();
  });
});
