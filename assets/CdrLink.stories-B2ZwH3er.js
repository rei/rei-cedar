import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrLink-v_BmLy7y.js";import{m as r,v as i,y as a}from"./componentOptions-jKL8eaN0.js";var o,s,c,l,u,d,f,p;e((()=>{t(),r(),o={title:`Components/Link`,component:n,tags:[`autodocs`],args:{tag:`a`,href:`#`,modifier:``,inheritColor:!1},argTypes:{tag:{control:`select`,options:a,description:`Sets valid HTML element tag`,table:{type:{summary:a.join(` | `)},defaultValue:{summary:`a`}}},modifier:{control:`select`,options:i,description:`Modifies the style variant for this component`,table:{type:{summary:i.map(e=>e||`""`).join(` | `)},defaultValue:{summary:``}}}}},s={render:e=>({components:{CdrLink:n},setup(){return{args:e}},template:`<CdrLink v-bind="args">Default Link</CdrLink>`})},c={args:{modifier:`standalone`},render:e=>({components:{CdrLink:n},setup(){return{args:e}},template:`<CdrLink v-bind="args">Standalone Link</CdrLink>`})},l={args:{inheritColor:!0},render:e=>({components:{CdrLink:n},setup(){return{args:e}},template:`
      <p style="color: #b11020;">
        This text is red and the <CdrLink v-bind="args">link inherits the color</CdrLink>.
      </p>
    `})},u={args:{href:`https://www.rei.com`,target:`_blank`},render:e=>({components:{CdrLink:n},setup(){return{args:e}},template:`<CdrLink v-bind="args">Visit REI.com (opens in new tab)</CdrLink>`})},d={render:()=>({components:{CdrLink:n},template:`
      <p>
        Looking for outdoor gear? Check out our
        <CdrLink href="#">camping equipment</CdrLink>,
        <CdrLink href="#">hiking boots</CdrLink>, and
        <CdrLink href="#">backpacks</CdrLink> for your next adventure.
      </p>
    `})},f={args:{tag:`button`},render:e=>({components:{CdrLink:n},setup(){return{args:e}},template:`<CdrLink v-bind="args">Link styled as button</CdrLink>`})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrLink v-bind="args">Default Link</CdrLink>'
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'standalone'
  },
  render: args => ({
    components: {
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrLink v-bind="args">Standalone Link</CdrLink>'
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    inheritColor: true
  },
  render: args => ({
    components: {
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <p style="color: #b11020;">
        This text is red and the <CdrLink v-bind="args">link inherits the color</CdrLink>.
      </p>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    href: 'https://www.rei.com',
    target: '_blank'
  },
  render: args => ({
    components: {
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrLink v-bind="args">Visit REI.com (opens in new tab)</CdrLink>'
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrLink
    },
    template: \`
      <p>
        Looking for outdoor gear? Check out our
        <CdrLink href="#">camping equipment</CdrLink>,
        <CdrLink href="#">hiking boots</CdrLink>, and
        <CdrLink href="#">backpacks</CdrLink> for your next adventure.
      </p>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    tag: 'button'
  },
  render: args => ({
    components: {
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrLink v-bind="args">Link styled as button</CdrLink>'
  })
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Standalone`,`InheritColor`,`ExternalLink`,`InParagraph`,`AsButton`]}))();export{f as AsButton,s as Default,u as ExternalLink,d as InParagraph,l as InheritColor,c as Standalone,p as __namedExportsOrder,o as default};