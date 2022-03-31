import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrModal from 'componentdir/modal/CdrModal.vue';

describe('CdrModal.vue', () => {
  it('default open', async () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    const wrapper = mount(CdrModal, {
      propsData: {
        opened: true,
        label: "Label is the modal title"
      },
      slots: {
        default: 'Sticky content',
      },
      attachTo: elem,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
  
  it('handleKeyDown', async () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    const wrapper = mount(CdrModal, {
      propsData: {
        opened: true,
        label: "Label is the modal title"
      },
      slots: {
        default: 'Main content',
      },
      attachTo: elem,
    });

    wrapper.trigger('keydown', {
      key: 'a'
    });
    await wrapper.vm.$nextTick();

    wrapper.trigger('keydown', {
      key: 'Esc',
    });
    await wrapper.vm.$nextTick();

    wrapper.trigger('keydown', {
      key: 'Escape',
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().closed.length).toBe(2);
  });

  it('fullscreen snapshot', async () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    const wrapper = mount(CdrModal, {
      propsData: {
        opened: true,
        label: "Label is the modal title"
      },
      data() {
        return {
          fullscreen: true,
        };
      },
      slots: {
        scrollingContentSlot: 'Main content',
      },
      attachTo: elem,
    });


    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('removeNoScroll', async () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    const wrapper = mount(CdrModal, {
      propsData: {
        opened: true,
        label: "My Modal Label",
      },
      slots: {
        scrollingContentSlot: 'Main content',
      },
      attachTo: elem,
    });
    const { documentElement, body } = document;
    expect(documentElement.classList.contains('cdr-modal__noscroll')).toBe(true);
    wrapper.vm.removeNoScroll();

    expect(documentElement.classList.contains('cdr-modal__noscroll')).toBeFalsy();
    expect(body.classList.contains('cdr-modal__noscroll')).toBeFalsy();

  });
});
