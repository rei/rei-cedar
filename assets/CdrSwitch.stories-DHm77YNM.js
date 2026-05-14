import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{V as i,m as a}from"./componentOptions-jKL8eaN0.js";import{n as o,t as s}from"./CdrSwitch-CGulI2zW.js";var c,l,u,d,f,p,m;e((()=>{n(),o(),a(),c={title:`Components/Switch`,component:s,tags:[`autodocs`],argTypes:{size:{control:`select`,options:i,description:`Sets the size of the switch`,table:{type:{summary:i.join(` | `)},defaultValue:{summary:`medium`}}}}},l={render:e=>({components:{CdrSwitch:s},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{checked:a,restArgs:i}},template:`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Enable notifications
      </CdrSwitch>
    `}),args:{modelValue:!1,size:`medium`}},u={render:e=>({components:{CdrSwitch:s},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{checked:a,restArgs:i}},template:`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Feature enabled
      </CdrSwitch>
    `}),args:{modelValue:!0,size:`medium`}},d={render:e=>({components:{CdrSwitch:s},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{checked:a,restArgs:i}},template:`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Large switch option
      </CdrSwitch>
    `}),args:{modelValue:!1,size:`large`}},f={render:e=>({components:{CdrSwitch:s},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{checked:a,restArgs:i}},template:`
      <div style="border: 1px dashed #ccc; padding: 16px;">
        <CdrSwitch v-model="checked" v-bind="restArgs">
          Full width switch
        </CdrSwitch>
      </div>
    `}),args:{modelValue:!1,fullWidth:!0}},p={render:()=>({components:{CdrSwitch:s},setup(){return{darkMode:t(!1),notifications:t(!0),autoSave:t(!0)}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSwitch v-model="darkMode">
          Dark mode
        </CdrSwitch>
        <CdrSwitch v-model="notifications">
          Push notifications
        </CdrSwitch>
        <CdrSwitch v-model="autoSave">
          Auto-save
        </CdrSwitch>
      </div>
    `})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSwitch
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const checked = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        checked.value = newVal;
      });
      return {
        checked,
        restArgs
      };
    },
    template: \`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Enable notifications
      </CdrSwitch>
    \`
  }),
  args: {
    modelValue: false,
    size: 'medium'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSwitch
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const checked = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        checked.value = newVal;
      });
      return {
        checked,
        restArgs
      };
    },
    template: \`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Feature enabled
      </CdrSwitch>
    \`
  }),
  args: {
    modelValue: true,
    size: 'medium'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSwitch
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const checked = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        checked.value = newVal;
      });
      return {
        checked,
        restArgs
      };
    },
    template: \`
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Large switch option
      </CdrSwitch>
    \`
  }),
  args: {
    modelValue: false,
    size: 'large'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSwitch
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const checked = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        checked.value = newVal;
      });
      return {
        checked,
        restArgs
      };
    },
    template: \`
      <div style="border: 1px dashed #ccc; padding: 16px;">
        <CdrSwitch v-model="checked" v-bind="restArgs">
          Full width switch
        </CdrSwitch>
      </div>
    \`
  }),
  args: {
    modelValue: false,
    fullWidth: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrSwitch
    },
    setup() {
      const darkMode = ref(false);
      const notifications = ref(true);
      const autoSave = ref(true);
      return {
        darkMode,
        notifications,
        autoSave
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSwitch v-model="darkMode">
          Dark mode
        </CdrSwitch>
        <CdrSwitch v-model="notifications">
          Push notifications
        </CdrSwitch>
        <CdrSwitch v-model="autoSave">
          Auto-save
        </CdrSwitch>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Checked`,`Large`,`FullWidth`,`MultipleSettings`]}))();export{u as Checked,l as Default,f as FullWidth,d as Large,p as MultipleSettings,m as __namedExportsOrder,c as default};