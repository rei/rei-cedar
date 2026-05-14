import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{j as r,m as i}from"./componentOptions-jKL8eaN0.js";import{n as a,t as o}from"./CdrButton-DeOQTtxS.js";import{a as s,c,i as l,n as u,o as d,r as f,s as p,t as m}from"./warning-fill-DFXsikZg.js";import{n as h,t as g}from"./CdrToast-CocjSfrX.js";var _,v,y,b,x,S,C,w,T;e((()=>{n(),h(),a(),l(),c(),m(),d(),i(),_={title:`Components/Toast`,component:g,tags:[`autodocs`],argTypes:{type:{control:`select`,options:r,description:`Sets the toast type`,table:{type:{summary:r.join(` | `)},defaultValue:{summary:`default`}}},open:{control:`boolean`,description:`Used to programmatically control the toast open/close state`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},autoDismiss:{control:`boolean`,description:`Set to false to disable automatic closing after the dismissDelay`,table:{type:{summary:`boolean`},defaultValue:{summary:`true`}}},dismissDelay:{control:`number`,description:`Sets the interval (in milliseconds) before the toast automatically closes`,table:{type:{summary:`number`},defaultValue:{summary:`5000`}}}}},v={render:e=>({components:{CdrToast:g,CdrButton:o},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This is a default toast message
        </CdrToast>
      </div>
    `}),args:{type:`default`}},y={render:e=>({components:{CdrToast:g,CdrButton:o,IconInformationFill:f},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Info Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconInformationFill />
          </template>
          Your information has been saved
        </CdrToast>
      </div>
    `}),args:{type:`info`}},b={render:e=>({components:{CdrToast:g,CdrButton:o,IconCheckFill:p},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Success Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconCheckFill />
          </template>
          Action completed successfully!
        </CdrToast>
      </div>
    `}),args:{type:`success`}},x={render:e=>({components:{CdrToast:g,CdrButton:o,IconWarningFill:u},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Warning Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconWarningFill />
          </template>
          Please review your input before continuing
        </CdrToast>
      </div>
    `}),args:{type:`warning`}},S={render:e=>({components:{CdrToast:g,CdrButton:o,IconErrorFill:s},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Error Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconErrorFill />
          </template>
          An error occurred while processing your request
        </CdrToast>
      </div>
    `}),args:{type:`error`}},C={render:e=>({components:{CdrToast:g,CdrButton:o},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Persistent Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will not auto-dismiss. Click the X to close.
        </CdrToast>
      </div>
    `}),args:{autoDismiss:!1}},w={render:e=>({components:{CdrToast:g,CdrButton:o},setup(){let n=t(!1);return{args:e,isOpen:n,showToast:()=>{n.value=!0}}},template:`
      <div>
        <CdrButton @click="showToast">Show Toast (10s delay)</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will stay visible for 10 seconds
        </CdrToast>
      </div>
    `}),args:{dismissDelay:1e4}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This is a default toast message
        </CdrToast>
      </div>
    \`
  }),
  args: {
    type: 'default'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton,
      IconInformationFill
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Info Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconInformationFill />
          </template>
          Your information has been saved
        </CdrToast>
      </div>
    \`
  }),
  args: {
    type: 'info'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton,
      IconCheckFill
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Success Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconCheckFill />
          </template>
          Action completed successfully!
        </CdrToast>
      </div>
    \`
  }),
  args: {
    type: 'success'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton,
      IconWarningFill
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Warning Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconWarningFill />
          </template>
          Please review your input before continuing
        </CdrToast>
      </div>
    \`
  }),
  args: {
    type: 'warning'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton,
      IconErrorFill
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Error Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconErrorFill />
          </template>
          An error occurred while processing your request
        </CdrToast>
      </div>
    \`
  }),
  args: {
    type: 'error'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Persistent Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will not auto-dismiss. Click the X to close.
        </CdrToast>
      </div>
    \`
  }),
  args: {
    autoDismiss: false
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: (args: typeof meta.args) => ({
    components: {
      CdrToast,
      CdrButton
    },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return {
        args,
        isOpen,
        showToast
      };
    },
    template: \`
      <div>
        <CdrButton @click="showToast">Show Toast (10s delay)</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will stay visible for 10 seconds
        </CdrToast>
      </div>
    \`
  }),
  args: {
    dismissDelay: 10000
  }
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Info`,`Success`,`Warning`,`Error`,`NoAutoDismiss`,`CustomDelay`]}))();export{w as CustomDelay,v as Default,S as Error,y as Info,C as NoAutoDismiss,b as Success,x as Warning,T as __namedExportsOrder,_ as default};