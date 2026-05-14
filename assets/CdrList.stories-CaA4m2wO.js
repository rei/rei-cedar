import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrList-DDLtJu1u.js";import{n as r,t as i}from"./CdrLink-v_BmLy7y.js";import{b as a,m as o}from"./componentOptions-jKL8eaN0.js";var s,c,l,u,d,f,p,m;e((()=>{t(),r(),o(),s={title:`Components/List`,component:n,tags:[`autodocs`],args:{tag:`ul`},argTypes:{tag:{control:`select`,options:a,description:`Sets the HTML list element used to render the component`,table:{type:{summary:a.join(` | `)},defaultValue:{summary:`ul`}}}}},c={args:{modifier:`unordered`},render:e=>({components:{CdrList:n,CdrLink:i},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li>Default list item 1</li>
        <li>Default list item 2</li>
        <li>
          Default list item 3
          <CdrList modifier="unordered">
            <li>Nested list item 1</li>
            <li>Nested list item 2</li>
          </CdrList>
        </li>
      </CdrList>
    `})},l={args:{tag:`ol`,modifier:`ordered`},render:e=>({components:{CdrList:n},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
        <li>Ordered list item 4</li>
      </CdrList>
    `})},u={args:{modifier:`unordered compact`},render:e=>({components:{CdrList:n,CdrLink:i},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
      </CdrList>
    `})},d={args:{modifier:`unordered inline`},render:e=>({components:{CdrList:n,CdrLink:i},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li><CdrLink href="#">Inline item 1</CdrLink></li>
        <li><CdrLink href="#">Inline item 2</CdrLink></li>
        <li><CdrLink href="#">Inline item 3</CdrLink></li>
      </CdrList>
    `})},f={args:{},render:e=>({components:{CdrList:n},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li>Bare list item 1</li>
        <li>Bare list item 2</li>
        <li>Bare list item 3</li>
      </CdrList>
    `})},p={args:{tag:`ol`,modifier:`ordered`},render:e=>({components:{CdrList:n},setup(){return{args:e}},template:`
      <CdrList v-bind="args">
        <li>
          Ordered list item 1
          <CdrList tag="ol" modifier="ordered">
            <li>Nested ordered item 1</li>
            <li>Nested ordered item 2</li>
          </CdrList>
        </li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </CdrList>
    `})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'unordered'
  },
  render: args => ({
    components: {
      CdrList,
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li>Default list item 1</li>
        <li>Default list item 2</li>
        <li>
          Default list item 3
          <CdrList modifier="unordered">
            <li>Nested list item 1</li>
            <li>Nested list item 2</li>
          </CdrList>
        </li>
      </CdrList>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tag: 'ol',
    modifier: 'ordered'
  },
  render: args => ({
    components: {
      CdrList
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
        <li>Ordered list item 4</li>
      </CdrList>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'unordered compact'
  },
  render: args => ({
    components: {
      CdrList,
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
      </CdrList>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'unordered inline'
  },
  render: args => ({
    components: {
      CdrList,
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li><CdrLink href="#">Inline item 1</CdrLink></li>
        <li><CdrLink href="#">Inline item 2</CdrLink></li>
        <li><CdrLink href="#">Inline item 3</CdrLink></li>
      </CdrList>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    components: {
      CdrList
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li>Bare list item 1</li>
        <li>Bare list item 2</li>
        <li>Bare list item 3</li>
      </CdrList>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    tag: 'ol',
    modifier: 'ordered'
  },
  render: args => ({
    components: {
      CdrList
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrList v-bind="args">
        <li>
          Ordered list item 1
          <CdrList tag="ol" modifier="ordered">
            <li>Nested ordered item 1</li>
            <li>Nested ordered item 2</li>
          </CdrList>
        </li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </CdrList>
    \`
  })
}`,...p.parameters?.docs?.source}}},m=[`Unordered`,`Ordered`,`Compact`,`Inline`,`Bare`,`NestedLists`]}))();export{f as Bare,u as Compact,d as Inline,p as NestedLists,l as Ordered,c as Unordered,m as __namedExportsOrder,s as default};