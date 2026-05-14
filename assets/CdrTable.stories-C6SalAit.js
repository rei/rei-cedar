import{n as e}from"./chunk-BneVvdWh.js";import{E as t,m as n}from"./componentOptions-jKL8eaN0.js";import{n as r,t as i}from"./CdrTable-tJQfi1FQ.js";var a,o,s,c,l,u,d,f,p;e((()=>{r(),n(),a={title:`Components/Table`,component:i,tags:[`autodocs`],argTypes:{fullWidth:{control:`radio`,options:t,description:`Sets the width to 100%. Also accepts space separated strings for breakpoints`,table:{type:{summary:`boolean | string`},defaultValue:{summary:`false`}}}}},o=[{name:`Product A`,price:`$49.99`,stock:`In Stock`,rating:`4.5`},{name:`Product B`,price:`$79.99`,stock:`Low Stock`,rating:`4.2`},{name:`Product C`,price:`$99.99`,stock:`In Stock`,rating:`4.8`},{name:`Product D`,price:`$129.99`,stock:`Out of Stock`,rating:`4.0`}],s={render:e=>({components:{CdrTable:i},setup(){return{args:e,sampleData:o}},template:`
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
    `}),args:{border:!0}},c={render:e=>({components:{CdrTable:i},setup(){return{args:e,sampleData:o}},template:`
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
    `}),args:{striped:!0,border:!1}},l={render:e=>({components:{CdrTable:i},setup(){return{args:e,sampleData:o}},template:`
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
    `}),args:{hover:!0,border:!0}},u={render:e=>({components:{CdrTable:i},setup(){return{args:e,sampleData:o}},template:`
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
    `}),args:{size:`small`}},d={render:e=>({components:{CdrTable:i},setup(){return{args:e,sampleData:o}},template:`
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
    `}),args:{size:`large`}},f={render:e=>({components:{CdrTable:i},setup(){return{args:e}},template:`
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
    `}),args:{responsive:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args,
        sampleData
      };
    },
    template: \`
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
    \`
  }),
  args: {
    border: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args,
        sampleData
      };
    },
    template: \`
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
    \`
  }),
  args: {
    striped: true,
    border: false
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args,
        sampleData
      };
    },
    template: \`
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
    \`
  }),
  args: {
    hover: true,
    border: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args,
        sampleData
      };
    },
    template: \`
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
    \`
  }),
  args: {
    size: 'small'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args,
        sampleData
      };
    },
    template: \`
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
    \`
  }),
  args: {
    size: 'large'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
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
    \`
  }),
  args: {
    responsive: true
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Striped`,`WithHover`,`Small`,`Large`,`Responsive`]}))();export{s as Default,d as Large,f as Responsive,u as Small,c as Striped,l as WithHover,p as __namedExportsOrder,a as default};