import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{m as r,o as i,w as a}from"./componentOptions-jKL8eaN0.js";import{n as o,t as s}from"./CdrCheckbox-Dr3qKHS3.js";var c,l,u,d,f,p,m,h,g,_;e((()=>{n(),o(),r(),c={title:`Components/Checkbox`,component:s,tags:[`autodocs`],args:{size:`medium`,background:`primary`,disabled:!1,indeterminate:!1,modifier:``},argTypes:{background:{control:`select`,options:a,description:`Sets the background color the checkbox is rendered on`,table:{type:{summary:a.join(` | `)},defaultValue:{summary:`primary`}}},modifier:{control:`select`,options:i,description:`Modifies the component style variant`,table:{type:{summary:i.map(e=>e||`""`).join(` | `)},defaultValue:{summary:``}}},indeterminate:{control:`boolean`,description:`Shows the checkbox in an indeterminate state`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}}}},l={render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!1)}},template:`<CdrCheckbox v-bind="args" v-model="checked">Accept terms and conditions</CdrCheckbox>`})},u={render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!0)}},template:`<CdrCheckbox v-bind="args" v-model="checked">Checked by default</CdrCheckbox>`})},d={args:{disabled:!0},render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!1)}},template:`<CdrCheckbox v-bind="args" v-model="checked">Disabled checkbox</CdrCheckbox>`})},f={args:{indeterminate:!0},render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!1)}},template:`<CdrCheckbox v-bind="args" v-model="checked">Indeterminate state</CdrCheckbox>`})},p={render:()=>({components:{CdrCheckbox:s},setup(){return{small:t(!0),medium:t(!0),large:t(!0)}},template:`
      <div class="story-spacing story-spacing--vertical">
        <CdrCheckbox size="small" v-model="small">Small checkbox</CdrCheckbox>
        <CdrCheckbox size="medium" v-model="medium">Medium checkbox</CdrCheckbox>
        <CdrCheckbox size="large" v-model="large">Large checkbox</CdrCheckbox>
      </div>
    `})},m={render:()=>({components:{CdrCheckbox:s},setup(){return{selections:t([`hiking`])}},template:`
      <fieldset style="border: none; padding: 0;">
        <legend style="font-weight: bold; margin-bottom: 8px;">Select your interests:</legend>
        <div class="story-spacing story-spacing--vertical">
          <CdrCheckbox v-model="selections" custom-value="hiking">Hiking</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="camping">Camping</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="climbing">Climbing</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="cycling">Cycling</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="paddling">Paddling</CdrCheckbox>
        </div>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selections.join(', ') || 'None' }}</p>
      </fieldset>
    `})},h={args:{modifier:`hide-figure`},render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!1)}},template:`
      <CdrCheckbox v-bind="args" v-model="checked">
        <span :style="{ fontWeight: checked ? 'bold' : 'normal' }">
          Hidden checkbox (click to toggle)
        </span>
      </CdrCheckbox>
    `})},g={args:{background:`secondary`},render:e=>({components:{CdrCheckbox:s},setup(){return{args:e,checked:t(!0)}},template:`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrCheckbox v-bind="args" v-model="checked">Checkbox on secondary background</CdrCheckbox>
      </div>
    `})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(false);
      return {
        args,
        checked
      };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Accept terms and conditions</CdrCheckbox>'
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(true);
      return {
        args,
        checked
      };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Checked by default</CdrCheckbox>'
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(false);
      return {
        args,
        checked
      };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Disabled checkbox</CdrCheckbox>'
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  },
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(false);
      return {
        args,
        checked
      };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Indeterminate state</CdrCheckbox>'
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const small = ref(true);
      const medium = ref(true);
      const large = ref(true);
      return {
        small,
        medium,
        large
      };
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <CdrCheckbox size="small" v-model="small">Small checkbox</CdrCheckbox>
        <CdrCheckbox size="medium" v-model="medium">Medium checkbox</CdrCheckbox>
        <CdrCheckbox size="large" v-model="large">Large checkbox</CdrCheckbox>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const selections = ref<string[]>(['hiking']);
      return {
        selections
      };
    },
    template: \`
      <fieldset style="border: none; padding: 0;">
        <legend style="font-weight: bold; margin-bottom: 8px;">Select your interests:</legend>
        <div class="story-spacing story-spacing--vertical">
          <CdrCheckbox v-model="selections" custom-value="hiking">Hiking</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="camping">Camping</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="climbing">Climbing</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="cycling">Cycling</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="paddling">Paddling</CdrCheckbox>
        </div>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selections.join(', ') || 'None' }}</p>
      </fieldset>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'hide-figure'
  },
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(false);
      return {
        args,
        checked
      };
    },
    template: \`
      <CdrCheckbox v-bind="args" v-model="checked">
        <span :style="{ fontWeight: checked ? 'bold' : 'normal' }">
          Hidden checkbox (click to toggle)
        </span>
      </CdrCheckbox>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'secondary'
  },
  render: args => ({
    components: {
      CdrCheckbox
    },
    setup() {
      const checked = ref(true);
      return {
        args,
        checked
      };
    },
    template: \`
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrCheckbox v-bind="args" v-model="checked">Checkbox on secondary background</CdrCheckbox>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Checked`,`Disabled`,`Indeterminate`,`Sizes`,`CheckboxGroup`,`HideFigure`,`SecondaryBackground`]}))();export{m as CheckboxGroup,u as Checked,l as Default,d as Disabled,h as HideFigure,f as Indeterminate,g as SecondaryBackground,p as Sizes,_ as __namedExportsOrder,c as default};