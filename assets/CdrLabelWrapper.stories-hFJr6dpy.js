import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrLabelWrapper-DxxcZA86.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{t(),r={title:`Components/CdrLabelWrapper`,component:n,tags:[`autodocs`]},i={args:{background:`primary`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Standard checkbox label
      </CdrLabelWrapper>
    `})},a={args:{background:`primary`,disabled:!0},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" disabled />
        </template>
        Disabled checkbox label
      </CdrLabelWrapper>
    `})},o={args:{background:`primary`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <div>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="1" />
          </template>
          Option 1
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="2" />
          </template>
          Option 2
        </CdrLabelWrapper>
      </div>
    `})},s={args:{background:`secondary`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Checkbox on secondary background
      </CdrLabelWrapper>
    `})},c={args:{background:`primary`,modifier:`compact`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Compact checkbox
      </CdrLabelWrapper>
    `})},l={args:{background:`primary`,labelClass:`custom-label-class`,contentClass:`custom-content-class`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Custom styled checkbox
      </CdrLabelWrapper>
    `})},u={args:{background:`primary`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        This is a very long label that demonstrates how the label wrapper handles text wrapping when the content is longer than a single line
      </CdrLabelWrapper>
    `})},d={args:{background:`primary`},render:e=>({components:{CdrLabelWrapper:n},setup(){return{args:e}},template:`
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Hiking
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Camping
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Climbing
        </CdrLabelWrapper>
      </div>
    `})},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Standard checkbox label
      </CdrLabelWrapper>
    \`
  })
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary',
    disabled: true
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" disabled />
        </template>
        Disabled checkbox label
      </CdrLabelWrapper>
    \`
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="1" />
          </template>
          Option 1
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="2" />
          </template>
          Option 2
        </CdrLabelWrapper>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'secondary'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Checkbox on secondary background
      </CdrLabelWrapper>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary',
    modifier: 'compact'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Compact checkbox
      </CdrLabelWrapper>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary',
    labelClass: 'custom-label-class',
    contentClass: 'custom-content-class'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Custom styled checkbox
      </CdrLabelWrapper>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        This is a very long label that demonstrates how the label wrapper handles text wrapping when the content is longer than a single line
      </CdrLabelWrapper>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'primary'
  },
  render: (args: any) => ({
    components: {
      CdrLabelWrapper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Hiking
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Camping
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Climbing
        </CdrLabelWrapper>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Disabled`,`RadioButton`,`SecondaryBackground`,`WithModifier`,`WithCustomClass`,`LongLabelText`,`MultipleCheckboxes`]}))();export{i as Default,a as Disabled,u as LongLabelText,d as MultipleCheckboxes,o as RadioButton,s as SecondaryBackground,l as WithCustomClass,c as WithModifier,f as __namedExportsOrder,r as default};