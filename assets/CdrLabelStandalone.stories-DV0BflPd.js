import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrLabelStandalone-ByHzyXfy.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{t(),r={title:`Components/CdrLabelStandalone`,component:n,tags:[`autodocs`]},i={args:{forId:`example-input-1`,label:`Email Address`},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `})},a={args:{forId:`example-input-2`,label:`Full Name`,required:!0},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `})},o={args:{forId:`example-input-3`,label:`Phone Number`,optional:!0},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="tel" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `})},s={args:{forId:`example-input-4`,label:`Disabled Field`,disabled:!0},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" />
      </CdrLabelStandalone>
    `})},c={args:{forId:`example-input-5`,label:`Search`,hideLabel:!0},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="search" placeholder="Search..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `})},l={args:{forId:`example-input-6`,label:`Username`},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <template #helper>
          Must be 3-20 characters
        </template>
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `})},u={args:{forId:`example-input-7`,label:`Password`},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="password" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        <template #info>
          At least 8 characters with a mix of letters and numbers
        </template>
      </CdrLabelStandalone>
    `})},d={args:{forId:`example-input-8`,label:`Email`,required:!0},render:e=>({components:{CdrLabelStandalone:n},setup(){return{args:e}},template:`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #d32f2f; border-radius: 4px;" />
        <template #error>
          <span style="color: #d32f2f;">Please enter a valid email address</span>
        </template>
      </CdrLabelStandalone>
    `})},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-1',
    label: 'Email Address'
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    \`
  })
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-2',
    label: 'Full Name',
    required: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    \`
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-3',
    label: 'Phone Number',
    optional: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="tel" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-4',
    label: 'Disabled Field',
    disabled: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" />
      </CdrLabelStandalone>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-5',
    label: 'Search',
    hideLabel: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="search" placeholder="Search..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-6',
    label: 'Username'
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <template #helper>
          Must be 3-20 characters
        </template>
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-7',
    label: 'Password'
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="password" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        <template #info>
          At least 8 characters with a mix of letters and numbers
        </template>
      </CdrLabelStandalone>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    forId: 'example-input-8',
    label: 'Email',
    required: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelStandalone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #d32f2f; border-radius: 4px;" />
        <template #error>
          <span style="color: #d32f2f;">Please enter a valid email address</span>
        </template>
      </CdrLabelStandalone>
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Required`,`Optional`,`Disabled`,`HiddenLabel`,`WithHelperText`,`WithInfoText`,`WithError`]}))();export{i as Default,s as Disabled,c as HiddenLabel,o as Optional,a as Required,d as WithError,l as WithHelperText,u as WithInfoText,f as __namedExportsOrder,r as default};