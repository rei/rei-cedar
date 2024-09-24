import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrModal from '../CdrModal.vue';
import { config } from '@vue/test-utils'

config.global.stubs['Teleport'] = true;

describe('CdrModal.vue', () => {

  describe('default open', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
        propsData: {
          opened: true,
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

    it('contains the "cdr-modal__noscroll" class', () => {
      expect(document.documentElement.classList.contains('cdr-modal__noscroll')).toBe(true);
    });

    it('handleKeyDown', async () => {
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
  });

  describe('ARIA show/hide for screen reader', () => {
    let wrapper;
    let modalEl;
    let ariaHiddenEl;
    let displayNoneEl;
    let scriptEl;
    let styleEl;
    beforeAll(()=>{
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
        propsData: {
          opened: true,
          label: 'Label is the modal title',
        },
        slots: {
          default: 'Sticky content',
        },
        attachTo: modalEl,
      });
    });

    it('aria-hides elements that should be hidden', () => {
      expect(modalEl.getAttribute('aria-hidden')).to.equal('true');
    });

    it('does not show/hide script elements', () => {
      expect(scriptEl.hasAttribute('aria-hidden')).to.be.false;
    });

    it('does not show/hide style elements', () => {
      expect(styleEl.hasAttribute('aria-hidden')).to.be.false;
    });

    it('does not hide itself', () => {
      const thisModal = wrapper.find({ ref: 'wrapperEl' });
      expect(thisModal.attributes('aria-hidden')).toBeUndefined();
    });

    it('does not show/hide elements that are display: none', () => {
      expect(displayNoneEl.hasAttribute('aria-hidden')).to.be.false;
    });

    it('does not remove aria-hidden from elements that were aria-hidden on page load', () => {
      wrapper.setProps({ opened: false });
      expect(ariaHiddenEl.getAttribute('aria-hidden')).to.equal('true');
    });

    it('removes aria-hidden from the elements it added them to on modal close', () => {
      wrapper.setProps({ opened: false });
      expect(modalEl.hasAttribute('aria-hidden')).to.be.false;
    });
  });

  describe('prop handling', () => {
    let wrapper;
      let elem;
      let dialogEl;
      beforeEach(()=>{
        elem = document.createElement('div')
        if (document.body) {
          document.body.appendChild(elem)
        }
        wrapper = mount(CdrModal, {
          propsData: {
            opened: true,
            label: 'Label is the modal title',
            ariaDescribedby: 'some-selector',
            role: 'alertdialog',
            id: 'some-id',
            wrapperClass: "wrapper-class",
            contentClass: "content-class",
          },
          attrs: {
            'data-ui': 'my-modal',
          },
          slots: {
            default: 'Sticky content',
          },
          attachTo: elem,
        });
        dialogEl = wrapper.find({ref: 'modalEl'})
      });

      it('hides title', async () => {
        expect(wrapper.text()).to.include('Label is the modal title',
          'it should be there on mount');
        await wrapper.setProps( { showTitle: false} );
        expect(wrapper.text()).to.not.include('Label is the modal title',
          'now it should be gone');
      });

      it('passes aria-describedby to the dialog element', () => {
        expect(dialogEl.attributes('aria-describedby')).to.equal('some-selector');
      });

      it('passes id to the dialog element', () => {
        expect(dialogEl.attributes('id')).to.equal('some-id');
      });

      it('sets the role of the dialog if alertdialog', () => {
        expect(dialogEl.attributes('role')).to.equal('alertdialog');
      });

      it('sets the dialog class', () => {
        const innerWrapEl = dialogEl.find('.cdr-modal__innerWrap');
        expect(innerWrapEl.classes('content-class')).to.be.true;
      });

      it('sets the wrapper class', () => {
        const outerwrap = wrapper.find('.cdr-modal__outerWrap');
        expect(outerwrap.classes('wrapper-class')).to.be.true;
      });
  })

  describe('other variations', () => {
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
    });

    it('should pass non-prop attributes to the proper child', () => {
      const wrapper = mount(CdrModal, {
        propsData: {
          opened: true,
          label: 'Label is the modal title',
        },
        attrs: {
          'data-ui': 'my-modal',
        },
        attachTo: elem,
      });
      const dialog = wrapper.find({ref: 'modalEl'});

      expect(dialog.attributes('data-ui')).to.equal('my-modal')
    });
  });


  describe('default closed', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
        propsData: {
          opened: false,
          label: "Label is the modal title"
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

  describe('fullscreen snapshot', ()=>{
    let wrapper;
    let elem;
    beforeEach(()=>{
      elem = document.createElement('div')
      if (document.body) {
        document.body.appendChild(elem)
      }
      wrapper = mount(CdrModal, {
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
    });

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
