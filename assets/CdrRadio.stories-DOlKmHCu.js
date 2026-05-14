import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{n as i,t as a}from"./CdrRadio-BmXvbOUs.js";var o,s,c,l,u,d,f,p,m;e((()=>{n(),i(),o={title:`Components/Radio`,component:a,tags:[`autodocs`],args:{name:`radio-group`,disabled:!1}},s={render:e=>({components:{CdrRadio:a},setup(){let n=t(`option1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option3">
          Option 3
        </CdrRadio>
        <p style="margin-top: 16px;">Selected: {{ selected }}</p>
      </div>
    `})},c={args:{size:`small`},render:e=>({components:{CdrRadio:a},setup(){let n=t(`small1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small1">
          Small Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small2">
          Small Option 2
        </CdrRadio>
      </div>
    `})},l={args:{size:`medium`},render:e=>({components:{CdrRadio:a},setup(){let n=t(`medium1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium1">
          Medium Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium2">
          Medium Option 2
        </CdrRadio>
      </div>
    `})},u={args:{size:`large`},render:e=>({components:{CdrRadio:a},setup(){let n=t(`large1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large1">
          Large Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large2">
          Large Option 2
        </CdrRadio>
      </div>
    `})},d={args:{disabled:!0},render:e=>({components:{CdrRadio:a},setup(){let n=t(`option1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Disabled Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Disabled Option 2
        </CdrRadio>
      </div>
    `})},f={args:{background:`secondary`},render:e=>({components:{CdrRadio:a},setup(){let n=t(`option1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div style="background-color: #f5f5f5; padding: 16px;">
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1 on Secondary Background
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2 on Secondary Background
        </CdrRadio>
      </div>
    `})},p={args:{modifier:`hide-figure`},render:e=>({components:{CdrRadio:a},setup(){let n=t(`option1`);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let{modelValue:i,...a}=e;return{restArgs:a,selected:n}},template:`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Hidden Figure Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Hidden Figure Option 2
        </CdrRadio>
      </div>
    `})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('option1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option3">
          Option 3
        </CdrRadio>
        <p style="margin-top: 16px;">Selected: {{ selected }}</p>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'small'
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('small1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small1">
          Small Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small2">
          Small Option 2
        </CdrRadio>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium'
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('medium1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium1">
          Medium Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium2">
          Medium Option 2
        </CdrRadio>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'large'
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('large1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large1">
          Large Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large2">
          Large Option 2
        </CdrRadio>
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('option1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Disabled Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Disabled Option 2
        </CdrRadio>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    background: 'secondary'
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('option1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div style="background-color: #f5f5f5; padding: 16px;">
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1 on Secondary Background
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2 on Secondary Background
        </CdrRadio>
      </div>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    modifier: 'hide-figure'
  },
  render: args => ({
    components: {
      CdrRadio
    },
    setup() {
      const selected = ref('option1');
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) selected.value = newVal as string;
      });
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        selected
      };
    },
    template: \`
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Hidden Figure Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Hidden Figure Option 2
        </CdrRadio>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Small`,`Medium`,`Large`,`Disabled`,`SecondaryBackground`,`HideFigure`]}))();export{s as Default,d as Disabled,p as HideFigure,u as Large,l as Medium,f as SecondaryBackground,c as Small,m as __namedExportsOrder,o as default};