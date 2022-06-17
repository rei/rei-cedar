import { mount } from '../../../../test/vue-jest-style-workaround.js';
import CdrModal from '../CdrModal.vue';

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
});
