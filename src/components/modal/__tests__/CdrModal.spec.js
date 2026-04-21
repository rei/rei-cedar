import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrModal from '../CdrModal.vue';
import { config } from '@vue/test-utils';

config.global.stubs['Teleport'] = true;
let teleportTimingDialogIdCounter = 0;

const waitForOpenEffects = async (wrapper) => {
  await wrapper.vm.$nextTick();
  await new Promise((resolve) => setTimeout(resolve, 0));
  await wrapper.vm.$nextTick();
};

describe('CdrModal.vue', () => {
  describe('default open', () => {
    let wrapper;
    let elem;
    beforeEach(async () => {
      elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
      wrapper = mount(CdrModal, {
        props: {
          opened: true,
          label: 'Label is the modal title',
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
      });
      await waitForOpenEffects(wrapper);
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('contains the "cdr-modal__noscroll" class', () => {
      expect(document.documentElement.classList.contains('cdr-modal__noscroll')).toBe(true);
    });

    it('handleKeyDown', async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Esc' }));
      await wrapper.vm.$nextTick();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().closed?.length || 0).toBe(2);
    });
  });

  describe('ARIA show/hide for screen reader', () => {
    let wrapper;
    let modalEl;
    let ariaHiddenEl;
    let displayNoneEl;
    let scriptEl;
    let styleEl;
    beforeAll(async () => {
      modalEl = document.createElement('div');
      ariaHiddenEl = document.createElement('div');
      ariaHiddenEl.setAttribute('aria-hidden', 'true');
      displayNoneEl = document.createElement('div');
      displayNoneEl.setAttribute('hidden', null);
      scriptEl = document.createElement('script');
      styleEl = document.createElement('style');
      if (document.body) {
        document.body.appendChild(modalEl);
        document.body.appendChild(ariaHiddenEl);
        document.body.appendChild(displayNoneEl);
        document.body.appendChild(scriptEl);
        document.body.appendChild(styleEl);
      }
      wrapper = mount(CdrModal, {
        props: {
          opened: true,
          label: 'Label is the modal title',
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: modalEl,
      });
      await waitForOpenEffects(wrapper);
    });

    it('aria-hides elements that should be hidden', () => {
      expect(modalEl.getAttribute('aria-hidden')).toBe('true');
    });

    it('does not show/hide script elements', () => {
      expect(scriptEl.hasAttribute('aria-hidden')).toBe(false);
    });

    it('does not show/hide style elements', () => {
      expect(styleEl.hasAttribute('aria-hidden')).toBe(false);
    });

    it('does not hide itself', () => {
      const thisModal = wrapper.find('.cdr-modal');
      expect(thisModal.attributes('aria-hidden')).toBeUndefined();
    });

    it('does not show/hide elements that are display: none', () => {
      expect(displayNoneEl.hasAttribute('aria-hidden')).toBe(false);
    });

    it('does not remove aria-hidden from elements that were aria-hidden on page load', () => {
      wrapper.setProps({ opened: false });
      expect(ariaHiddenEl.getAttribute('aria-hidden')).toBe('true');
    });

    it('removes aria-hidden from the elements it added them to on modal close', () => {
      wrapper.setProps({ opened: false });
      expect(modalEl.hasAttribute('aria-hidden')).toBe(false);
    });
  });

  describe('prop handling', () => {
    let wrapper;
    let elem;
    let dialogEl;
    beforeEach(() => {
      elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
      wrapper = mount(CdrModal, {
        props: {
          opened: true,
          label: 'Label is the modal title',
          ariaDescribedby: 'some-selector',
          role: 'alertdialog',
          id: 'some-id',
          wrapperClass: 'wrapper-class',
          contentClass: 'content-class',
        },
        attrs: {
          'data-ui': 'my-modal',
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
      });
      dialogEl = wrapper.find('[role="alertdialog"]');
    });

    it('hides title', async () => {
      expect(wrapper.text()).toContain('Label is the modal title');
      await wrapper.setProps({ showTitle: false });
      expect(wrapper.text()).not.toContain('Label is the modal title');
    });

    it('passes aria-describedby to the dialog element', () => {
      expect(dialogEl.attributes('aria-describedby')).toBe('some-selector');
    });

    it('passes id to the dialog element', () => {
      expect(dialogEl.attributes('id')).toBe('some-id');
    });

    it('sets the role of the dialog if alertdialog', () => {
      expect(dialogEl.attributes('role')).toBe('alertdialog');
    });

    it('sets the dialog class', () => {
      const innerWrapEl = dialogEl.find('.cdr-modal__innerWrap');
      expect(innerWrapEl.classes('content-class')).toBe(true);
    });

    it('sets the wrapper class', () => {
      const outerwrap = wrapper.find('.cdr-modal__outerWrap');
      expect(outerwrap.classes('wrapper-class')).toBe(true);
    });
  });

  describe('other variations', () => {
    let elem;
    beforeEach(() => {
      elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
    });

    it('should pass non-prop attributes to the proper child', () => {
      const wrapper = mount(CdrModal, {
        props: {
          opened: true,
          label: 'Label is the modal title',
        },
        attrs: {
          'data-ui': 'my-modal',
        },
        attachTo: elem,
      });
      const dialog = wrapper.find('[role="dialog"]');
      expect(dialog.attributes('data-ui')).toBe('my-modal');
    });
  });

  describe('teleport timing behavior', () => {
    it('does not leave the modal inside an aria-hidden ancestor when opening right after mount', async () => {
      teleportTimingDialogIdCounter += 1;
      const testDialogId = `teleport-timing-dialog-${teleportTimingDialogIdCounter}`;
      const elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }

      const wrapper = mount(CdrModal, {
        props: {
          opened: false,
          label: 'Label is the modal title',
          id: testDialogId,
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
        global: {
          stubs: {
            Teleport: false,
          },
        },
      });

      await wrapper.setProps({ opened: true });
      let dialogEl = null;
      let modalEl = null;
      for (let i = 0; i < 10; i += 1) {
        await wrapper.vm.$nextTick();
        dialogEl = document.getElementById(testDialogId);
        modalEl = dialogEl?.closest('.cdr-modal') || null;
        if (modalEl && dialogEl) break;
      }

      expect(dialogEl).not.toBeNull();
      expect(modalEl).not.toBeNull();
      expect(modalEl.closest('[aria-hidden="true"]')).toBeNull();

      wrapper.unmount();
      elem.remove();
    });
  });

  describe('default closed', () => {
    let wrapper;
    let elem;
    beforeEach(() => {
      elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
      wrapper = mount(CdrModal, {
        props: {
          opened: false,
          label: 'Label is the modal title',
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: elem,
      });
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('fullscreen snapshot', () => {
    let wrapper;
    let elem;
    beforeEach(async () => {
      elem = document.createElement('div');
      if (document.body) {
        document.body.appendChild(elem);
      }
      wrapper = mount(CdrModal, {
        props: {
          opened: true,
          label: 'Label is the modal title',
        },
        slots: {
          default: 'Main content',
        },
        attachTo: elem,
      });
      await waitForOpenEffects(wrapper);
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
