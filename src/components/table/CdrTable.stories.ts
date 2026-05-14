import type { Meta, StoryObj } from '@storybook/vue3';
import CdrTable from './CdrTable.vue';
import { responsiveBooleanOptions } from '../../types/componentOptions';

const meta: Meta<typeof CdrTable> = {
  title: 'Components/Table',
  component: CdrTable,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'radio',
      options: responsiveBooleanOptions,
      description: 'Sets the width to 100%. Also accepts space separated strings for breakpoints',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { name: 'Product A', price: '$49.99', stock: 'In Stock', rating: '4.5' },
  { name: 'Product B', price: '$79.99', stock: 'Low Stock', rating: '4.2' },
  { name: 'Product C', price: '$99.99', stock: 'In Stock', rating: '4.8' },
  { name: 'Product D', price: '$129.99', stock: 'Out of Stock', rating: '4.0' },
];

export const Default: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args, sampleData };
    },
    template: `
      <CdrTable v-bind="args">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </CdrTable>
    `,
  }),
  args: {
    border: true,
  },
};

export const Striped: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args, sampleData };
    },
    template: `
      <CdrTable v-bind="args">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </CdrTable>
    `,
  }),
  args: {
    striped: true,
    border: false,
  },
};

export const WithHover: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args, sampleData };
    },
    template: `
      <CdrTable v-bind="args">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </CdrTable>
    `,
  }),
  args: {
    hover: true,
    border: true,
  },
};

export const Small: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args, sampleData };
    },
    template: `
      <CdrTable v-bind="args">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </CdrTable>
    `,
  }),
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args, sampleData };
    },
    template: `
      <CdrTable v-bind="args">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sampleData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.rating }}</td>
          </tr>
        </tbody>
      </CdrTable>
    `,
  }),
  args: {
    size: 'large',
  },
};

export const Responsive: Story = {
  render: (args) => ({
    components: { CdrTable },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 400px; border: 1px dashed #ccc;">
        <CdrTable v-bind="args">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th>Rating</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wide Product Name A</td>
              <td>Long description text here</td>
              <td>$49.99</td>
              <td>In Stock</td>
              <td>4.5/5</td>
              <td>125</td>
            </tr>
            <tr>
              <td>Wide Product Name B</td>
              <td>Another long description</td>
              <td>$79.99</td>
              <td>Low Stock</td>
              <td>4.2/5</td>
              <td>89</td>
            </tr>
          </tbody>
        </CdrTable>
      </div>
    `,
  }),
  args: {
    responsive: true,
  },
};
