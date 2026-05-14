import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{c as r,g as i,m as a,w as o}from"./componentOptions-jKL8eaN0.js";import{n as s,t as c}from"./CdrSelect-DgMVwAas.js";var l,u,d,f,p,m,h,g,_,v,y;e((()=>{n(),s(),a(),l={title:`Components/Select`,component:c,tags:[`autodocs`],args:{label:`Select Label`,hideLabel:!1,background:`primary`,error:!1},argTypes:{background:{control:`select`,options:o,description:`Sets the background color the select is rendered on`,table:{type:{summary:o.join(` | `)},defaultValue:{summary:`primary`}}},error:{control:`radio`,options:r,description:`Sets the select to an error state, displays the error slot if one is present`,table:{type:{summary:`boolean | string`},defaultValue:{summary:`false`}}},size:{control:`select`,options:i,description:`Sets the component size`,table:{type:{summary:`large`}}}}},u=[{text:`California`,value:`CA`},{text:`Colorado`,value:`CO`},{text:`Oregon`,value:`OR`},{text:`Washington`,value:`WA`}],d=[`Small`,`Medium`,`Large`,`X-Large`],f={args:{label:`State`,prompt:`Select a state`,options:u},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`<CdrSelect v-bind="args" v-model="selected" />`})},p={args:{label:`Size`,prompt:`Choose a size`,options:d},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`<CdrSelect v-bind="args" v-model="selected" />`})},m={args:{label:`State`,prompt:`Select a state`,options:u,error:!0},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`
      <CdrSelect v-bind="args" v-model="selected">
        <template #error>Please select a state</template>
      </CdrSelect>
    `})},h={args:{label:`Country`,prompt:`Select a country`,size:`large`,options:[`United States`,`Canada`,`Mexico`]},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`<CdrSelect v-bind="args" v-model="selected" />`})},g={args:{label:`Sort by`,hideLabel:!0,prompt:`Sort by...`,options:[`Price: Low to High`,`Price: High to Low`,`Newest`,`Best Selling`]},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`<CdrSelect v-bind="args" v-model="selected" />`})},_={args:{label:`Quantity`,options:[`1`,`2`,`3`,`4`,`5`]},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(`1`)}},template:`<CdrSelect v-bind="args" v-model="selected" />`})},v={args:{label:`Category`,prompt:`Select category`,background:`secondary`,options:[`Camping`,`Hiking`,`Climbing`,`Cycling`]},render:e=>({components:{CdrSelect:c},setup(){return{args:e,selected:t(``)}},template:`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrSelect v-bind="args" v-model="selected" />
      </div>
    `})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'State',
    prompt: 'Select a state',
    options: stateOptions
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />'
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Size',
    prompt: 'Choose a size',
    options: simpleOptions
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />'
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'State',
    prompt: 'Select a state',
    options: stateOptions,
    error: true
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: \`
      <CdrSelect v-bind="args" v-model="selected">
        <template #error>Please select a state</template>
      </CdrSelect>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    prompt: 'Select a country',
    size: 'large',
    options: ['United States', 'Canada', 'Mexico']
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />'
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sort by',
    hideLabel: true,
    prompt: 'Sort by...',
    options: ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best Selling']
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />'
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Quantity',
    options: ['1', '2', '3', '4', '5']
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('1');
      return {
        args,
        selected
      };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />'
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Category',
    prompt: 'Select category',
    background: 'secondary',
    options: ['Camping', 'Hiking', 'Climbing', 'Cycling']
  },
  render: args => ({
    components: {
      CdrSelect
    },
    setup() {
      const selected = ref('');
      return {
        args,
        selected
      };
    },
    template: \`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrSelect v-bind="args" v-model="selected" />
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}},y=[`Default`,`WithSimpleOptions`,`WithError`,`LargeSize`,`HiddenLabel`,`Preselected`,`SecondaryBackground`]}))();export{f as Default,g as HiddenLabel,h as LargeSize,_ as Preselected,v as SecondaryBackground,m as WithError,p as WithSimpleOptions,y as __namedExportsOrder,l as default};