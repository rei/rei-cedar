import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,m as r,r as i}from"./componentOptions-jKL8eaN0.js";import{n as a,t as o}from"./CdrButton-DeOQTtxS.js";var s,c,l,u,d,f,p,m,h,g,_;e((()=>{a(),r(),s={title:`Components/Button`,component:o,tags:[`autodocs`],args:{tag:`button`,type:`button`,modifier:`primary`,size:`medium`,fullWidth:!1,iconOnly:!1,withBackground:!1},argTypes:{tag:{control:`select`,options:n,description:`Renders CdrButton as a button or anchor element`,table:{type:{summary:n.join(` | `)},defaultValue:{summary:`button`}}},type:{control:`select`,options:t,description:`Sets the button type`,table:{type:{summary:t.join(` | `)},defaultValue:{summary:`button`}}},modifier:{control:`select`,options:i,description:`Modifies the style variant for this component`,table:{type:{summary:i.join(` | `)},defaultValue:{summary:`primary`}}},fullWidth:{control:`boolean`,description:`Sets button width to 100%`,table:{type:{summary:`boolean | string`},defaultValue:{summary:`false`}}},iconOnly:{control:`boolean`,description:`Renders an icon-only button`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},withBackground:{control:`boolean`,description:`Renders an icon-only button with a background color and border`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}}}},c={args:{modifier:`primary`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Add to Cart</CdrButton>`})},l={args:{modifier:`secondary`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Save for Later</CdrButton>`})},u={args:{modifier:`sale`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Shop Sale</CdrButton>`})},d={args:{modifier:`dark`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Dark Button</CdrButton>`})},f={args:{modifier:`link`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Link Style Button</CdrButton>`})},p={render:()=>({components:{CdrButton:o},template:`
      <div class="story-spacing">
        <CdrButton size="small">Small</CdrButton>
        <CdrButton size="medium">Medium</CdrButton>
        <CdrButton size="large">Large</CdrButton>
      </div>
    `})},m={args:{fullWidth:!0},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args">Full Width Button</CdrButton>`})},h={render:()=>({components:{CdrButton:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div class="story-spacing">
          <CdrButton modifier="primary">Primary</CdrButton>
          <CdrButton modifier="secondary">Secondary</CdrButton>
          <CdrButton modifier="sale">Sale</CdrButton>
          <CdrButton modifier="link">Link</CdrButton>
          <CdrButton modifier="dark">Dark</CdrButton>
        </div>
      </div>
    `})},g={args:{tag:`a`,modifier:`primary`},render:e=>({components:{CdrButton:o},setup(){return{args:e}},template:`<CdrButton v-bind="args" href="#">Button as Link</CdrButton>`})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'primary'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Add to Cart</CdrButton>'
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'secondary'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Save for Later</CdrButton>'
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'sale'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Shop Sale</CdrButton>'
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'dark'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Dark Button</CdrButton>'
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'link'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Link Style Button</CdrButton>'
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrButton
    },
    template: \`
      <div class="story-spacing">
        <CdrButton size="small">Small</CdrButton>
        <CdrButton size="medium">Medium</CdrButton>
        <CdrButton size="large">Large</CdrButton>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    fullWidth: true
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args">Full Width Button</CdrButton>'
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrButton
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div class="story-spacing">
          <CdrButton modifier="primary">Primary</CdrButton>
          <CdrButton modifier="secondary">Secondary</CdrButton>
          <CdrButton modifier="sale">Sale</CdrButton>
          <CdrButton modifier="link">Link</CdrButton>
          <CdrButton modifier="dark">Dark</CdrButton>
        </div>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    tag: 'a',
    modifier: 'primary'
  },
  render: (args: typeof meta.args) => ({
    components: {
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrButton v-bind="args" href="#">Button as Link</CdrButton>'
  })
}`,...g.parameters?.docs?.source}}},_=[`Primary`,`Secondary`,`Sale`,`Dark`,`LinkStyle`,`Sizes`,`FullWidth`,`AllVariants`,`AsAnchor`]}))();export{h as AllVariants,g as AsAnchor,d as Dark,m as FullWidth,f as LinkStyle,c as Primary,u as Sale,l as Secondary,p as Sizes,_ as __namedExportsOrder,s as default};