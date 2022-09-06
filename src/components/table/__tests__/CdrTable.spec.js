import { mount } from '../../../../test/vue-jest-style-workaround.js';
import { h } from 'vue';
import CdrTable from '../CdrTable.vue';

const basicContent = { template:
  `<thead>
    <tr>
      <th>head 1</th>
      <th>head 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>content A1</td>
      <td>content A2</td>
    </tr>
    <tr>
      <td>content B1</td>
      <td>content B2</td>
    </tr>
  </tbody>`
}

describe('CdrTable.vue', () => {
  describe('with basic content', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrTable, {
        slots: {
          default: basicContent,
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    describe('with xs prop provided', ()=>{
      beforeEach(()=>{
        wrapper.setProps({fullWidth: '@xs'})
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      
      it('has a correct responsive class', () => {
        expect(wrapper.find('table').classes()).toContain('cdr-table--full-width@xs');
      });
    })

    describe('border and striped set to true', ()=>{
      beforeEach(()=>{
        wrapper.setProps({
        border: true,
        striped: true,
      })
      })

      it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
      
      it('has a correct striped class', () => {
        expect(wrapper.find('table').classes()).toContain('cdr-table--striped');
      });

      it('does not have a border class', () => {
        expect(wrapper.find('table').classes()).not.toContain('cdr-table--border');
      });
    })
  })

  describe('with the aria-label attr set', ()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = mount(CdrTable, {
        slots: {
          default: basicContent,
        },
        attrs: {
          'aria-label': 'test table'
        }
      });
    })

    it('renders correctly', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('places attrs on table element', () => {
      expect(wrapper.find('table').attributes('aria-label')).toBe('test table')
    });
  })
});
