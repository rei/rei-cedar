import{n as e}from"./chunk-BneVvdWh.js";import{c as t,g as n,h as r,m as i,w as a}from"./componentOptions-jKL8eaN0.js";import{n as o,t as s}from"./CdrInput-BEXjoFvn.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{o(),i(),c={title:`Components/Input`,component:s,tags:[`autodocs`],args:{type:`text`,label:`Input Label`,hideLabel:!1,background:`primary`,disabled:!1,required:!1,error:!1,rows:1},argTypes:{type:{control:`select`,options:r,description:`Type attribute for the input`,table:{type:{summary:r.join(` | `)},defaultValue:{summary:`text`}}},background:{control:`select`,options:a,description:`Sets the background color the input is rendered on`,table:{type:{summary:a.join(` | `)},defaultValue:{summary:`primary`}}},error:{control:`radio`,options:t,description:`Sets the input to an error state, displays the error slot if one is present`,table:{type:{summary:`boolean | string`},defaultValue:{summary:`false`}}},size:{control:`select`,options:n,description:`Sets the input field size`,table:{type:{summary:`large`}}}}},l={args:{label:`Email Address`,type:`email`},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" />`})},u={args:{label:`Search`,type:`search`},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" placeholder="Search for products..." />`})},d={args:{label:`Full Name`,required:!0},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" />`})},f={args:{label:`Email Address`,type:`email`,error:!0},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`
      <CdrInput v-bind="args">
        <template #error>Please enter a valid email address</template>
      </CdrInput>
    `})},p={args:{label:`Disabled Input`,disabled:!0},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" value="Cannot edit this" />`})},m={args:{label:`Search`,hideLabel:!0,type:`search`},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" placeholder="Search..." />`})},h={args:{label:`Large Input`,size:`large`},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" />`})},g={args:{label:`Comments`,rows:4},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" placeholder="Enter your comments here..." />`})},_={args:{label:`Password`,type:`password`,required:!0},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`<CdrInput v-bind="args" />`})},v={render:()=>({components:{CdrInput:s},template:`
      <div class="story-spacing story-spacing--vertical" style="max-width: 400px;">
        <CdrInput label="Text" type="text" />
        <CdrInput label="Email" type="email" />
        <CdrInput label="Password" type="password" />
        <CdrInput label="Number" type="number" />
        <CdrInput label="Search" type="search" />
        <CdrInput label="Tel" type="tel" />
        <CdrInput label="URL" type="url" />
        <CdrInput label="Date" type="date" />
      </div>
    `})},y={args:{label:`Secondary Background`,background:`secondary`},parameters:{backgrounds:{default:`light`}},render:e=>({components:{CdrInput:s},setup(){return{args:e}},template:`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrInput v-bind="args" />
      </div>
    `})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email'
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" />'
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    type: 'search'
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" placeholder="Search for products..." />'
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    required: true
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" />'
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    error: true
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrInput v-bind="args">
        <template #error>Please enter a valid email address</template>
      </CdrInput>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Input',
    disabled: true
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" value="Cannot edit this" />'
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    hideLabel: true,
    type: 'search'
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" placeholder="Search..." />'
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Large Input',
    size: 'large'
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" />'
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Comments',
    rows: 4
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" placeholder="Enter your comments here..." />'
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    required: true
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrInput v-bind="args" />'
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrInput
    },
    template: \`
      <div class="story-spacing story-spacing--vertical" style="max-width: 400px;">
        <CdrInput label="Text" type="text" />
        <CdrInput label="Email" type="email" />
        <CdrInput label="Password" type="password" />
        <CdrInput label="Number" type="number" />
        <CdrInput label="Search" type="search" />
        <CdrInput label="Tel" type="tel" />
        <CdrInput label="URL" type="url" />
        <CdrInput label="Date" type="date" />
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Secondary Background',
    background: 'secondary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  },
  render: args => ({
    components: {
      CdrInput
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrInput v-bind="args" />
      </div>
    \`
  })
}`,...y.parameters?.docs?.source}}},b=[`Default`,`WithPlaceholder`,`Required`,`WithError`,`Disabled`,`HiddenLabel`,`LargeSize`,`Textarea`,`Password`,`InputTypes`,`SecondaryBackground`]}))();export{l as Default,p as Disabled,m as HiddenLabel,v as InputTypes,h as LargeSize,_ as Password,d as Required,y as SecondaryBackground,g as Textarea,f as WithError,u as WithPlaceholder,b as __namedExportsOrder,c as default};