import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, mount } from '../../../../test/vue-jest-style-workaround.js';
import { CdrToggleGroup } from '../../../lib.js';
import { h } from 'vue';
import CdrToggleButton from '../CdrToggleButton.vue';

describe('CdrToggleButton', () => {
  let wrapper;
  let firstButton;
  let secondButton;
  let thirdButton;
  describe('component snapshot', () => {
    beforeEach(()=>{
      wrapper = mount(CdrToggleGroup, {
        slots: {
          default: [
            h(CdrToggleButton, {'custom-value': 'thing-1'}), 
            h(CdrToggleButton, {'custom-value': 'thing-2'}),
            h(CdrToggleButton, {'custom-value': 'thing-3'}),
          ],
        },
        attachTo: document.body
      });
      firstButton = wrapper.findAll('button')[0];
      secondButton = wrapper.findAll('button')[1];
      thirdButton = wrapper.findAll('button')[2];
      firstButton.element.focus();
    })

    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('the first button is focused',  () => {
      expect(document.activeElement).toBe(firstButton.wrapperElement);
    });

    it('the tabindex of the first button is 0', ()=>{
      expect(firstButton.attributes('tabindex')).toBe('0');
    })

    it('the tabindex of the second button is -1', ()=>{
      expect(secondButton.attributes('tabindex')).toBe('-1');
    });

    it('the aria-checked value of the first button is true', ()=>{
      expect(firstButton.attributes('aria-checked')).toBe('true');
    })

    it('the aria-checked value of the second button is false', ()=>{
      expect(secondButton.attributes('aria-checked')).toBe('false');
    });

    describe('when hitting the right arrow key', ()=>{
      beforeEach(()=>{
        firstButton.trigger('keyup.right');
      });
      afterEach(()=>{
        firstButton.element.focus();
      });

      it('the second button is focused', ()=> {
        expect(document.activeElement).toBe(secondButton.wrapperElement);
      })
    })

    describe('when hitting the right arrow key', ()=>{
      beforeEach(async ()=>{
        thirdButton.element.focus();
        await wrapper.vm.$nextTick();
        thirdButton.trigger('keyup.left');
      });
      
      afterEach(()=>{
        thirdButton.element.focus();
      });

      it('the second button is focused', ()=> {
        expect(document.activeElement).toBe(secondButton.wrapperElement);
      })
    });

    //Test for when the third button is selected and you're hitting right

    describe('when clicking on an unchecked button', ()=>{
      beforeEach(()=>{
        secondButton.trigger('click');
      });

      it('matches snapshot', () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      it('turns the aria-checked value to true', () => {
        expect(secondButton.attributes('aria-checked')).toBe('true');
      });

      it('turns the aria-checked value of the previously checked button to false', () => {
        expect(firstButton.attributes('aria-checked')).toBe('false');
      });

      it('the tabindex of the first button is -1', ()=>{
        expect(firstButton.attributes('tabindex')).toBe('-1');
      });

      it('the tabindex of the second button is 0', ()=>{
        expect(secondButton.attributes('tabindex')).toBe('0');
      });

      it('the second button is focused', ()=> {
        expect(document.activeElement).toBe(secondButton.wrapperElement);
      });
    });
  })
});
