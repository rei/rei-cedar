import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{i,n as a,r as o,t as s}from"./CdrToggleGroup-DSRpJBLi.js";var c,l,u,d,f,p,m,h;e((()=>{n(),a(),i(),c={title:`Components/ToggleButton`,component:s,tags:[`autodocs`]},l={render:e=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{selected:a,restArgs:i}},template:`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Option 1" />
        <CdrToggleButton toggle-value="Option 2" />
        <CdrToggleButton toggle-value="Option 3" />
      </CdrToggleGroup>
    `}),args:{modelValue:`Option 1`,size:`medium`}},u={render:e=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{selected:a,restArgs:i}},template:`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Small" />
        <CdrToggleButton toggle-value="Medium" />
        <CdrToggleButton toggle-value="Large" />
        <CdrToggleButton toggle-value="X-Large" />
      </CdrToggleGroup>
    `}),args:{modelValue:`Medium`,size:`large`}},d={render:e=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{selected:a,restArgs:i}},template:`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="1">
          <span style="font-weight: bold;">1 Day</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="7">
          <span style="font-weight: bold;">7 Days</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="30">
          <span style="font-weight: bold;">30 Days</span>
        </CdrToggleButton>
      </CdrToggleGroup>
    `}),args:{modelValue:`7`,size:`medium`}},f={render:e=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{selected:a,restArgs:i}},template:`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="List" />
        <CdrToggleButton toggle-value="Grid" />
      </CdrToggleGroup>
    `}),args:{modelValue:`Grid`,size:`medium`}},p={render:e=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){let{modelValue:n,...i}=e,a=t(n);return r(()=>e.modelValue,e=>{a.value=e}),{selected:a,restArgs:i}},template:`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="XS" />
        <CdrToggleButton toggle-value="S" />
        <CdrToggleButton toggle-value="M" />
        <CdrToggleButton toggle-value="L" />
        <CdrToggleButton toggle-value="XL" />
        <CdrToggleButton toggle-value="XXL" />
      </CdrToggleGroup>
    `}),args:{modelValue:`M`,size:`medium`}},m={render:()=>({components:{CdrToggleGroup:s,CdrToggleButton:o},setup(){return{viewMode:t(`list`),sortBy:t(`name`)}},template:`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>View Mode: {{ viewMode }}</h4>
          <CdrToggleGroup v-model="viewMode">
            <CdrToggleButton toggle-value="list">List</CdrToggleButton>
            <CdrToggleButton toggle-value="grid">Grid</CdrToggleButton>
            <CdrToggleButton toggle-value="compact">Compact</CdrToggleButton>
          </CdrToggleGroup>
        </div>
        
        <div>
          <h4>Sort By: {{ sortBy }}</h4>
          <CdrToggleGroup v-model="sortBy" size="large">
            <CdrToggleButton toggle-value="name">Name</CdrToggleButton>
            <CdrToggleButton toggle-value="price">Price</CdrToggleButton>
            <CdrToggleButton toggle-value="rating">Rating</CdrToggleButton>
            <CdrToggleButton toggle-value="newest">Newest</CdrToggleButton>
          </CdrToggleGroup>
        </div>
      </div>
    `})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const selected = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        selected.value = newVal;
      });
      return {
        selected,
        restArgs
      };
    },
    template: \`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Option 1" />
        <CdrToggleButton toggle-value="Option 2" />
        <CdrToggleButton toggle-value="Option 3" />
      </CdrToggleGroup>
    \`
  }),
  args: {
    modelValue: 'Option 1',
    size: 'medium'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const selected = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        selected.value = newVal;
      });
      return {
        selected,
        restArgs
      };
    },
    template: \`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Small" />
        <CdrToggleButton toggle-value="Medium" />
        <CdrToggleButton toggle-value="Large" />
        <CdrToggleButton toggle-value="X-Large" />
      </CdrToggleGroup>
    \`
  }),
  args: {
    modelValue: 'Medium',
    size: 'large'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const selected = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        selected.value = newVal;
      });
      return {
        selected,
        restArgs
      };
    },
    template: \`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="1">
          <span style="font-weight: bold;">1 Day</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="7">
          <span style="font-weight: bold;">7 Days</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="30">
          <span style="font-weight: bold;">30 Days</span>
        </CdrToggleButton>
      </CdrToggleGroup>
    \`
  }),
  args: {
    modelValue: '7',
    size: 'medium'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const selected = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        selected.value = newVal;
      });
      return {
        selected,
        restArgs
      };
    },
    template: \`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="List" />
        <CdrToggleButton toggle-value="Grid" />
      </CdrToggleGroup>
    \`
  }),
  args: {
    modelValue: 'Grid',
    size: 'medium'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const {
        modelValue,
        ...restArgs
      } = args;
      const selected = ref(modelValue);
      watch(() => args.modelValue, newVal => {
        selected.value = newVal;
      });
      return {
        selected,
        restArgs
      };
    },
    template: \`
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="XS" />
        <CdrToggleButton toggle-value="S" />
        <CdrToggleButton toggle-value="M" />
        <CdrToggleButton toggle-value="L" />
        <CdrToggleButton toggle-value="XL" />
        <CdrToggleButton toggle-value="XXL" />
      </CdrToggleGroup>
    \`
  }),
  args: {
    modelValue: 'M',
    size: 'medium'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrToggleGroup,
      CdrToggleButton
    },
    setup() {
      const viewMode = ref('list');
      const sortBy = ref('name');
      return {
        viewMode,
        sortBy
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>View Mode: {{ viewMode }}</h4>
          <CdrToggleGroup v-model="viewMode">
            <CdrToggleButton toggle-value="list">List</CdrToggleButton>
            <CdrToggleButton toggle-value="grid">Grid</CdrToggleButton>
            <CdrToggleButton toggle-value="compact">Compact</CdrToggleButton>
          </CdrToggleGroup>
        </div>
        
        <div>
          <h4>Sort By: {{ sortBy }}</h4>
          <CdrToggleGroup v-model="sortBy" size="large">
            <CdrToggleButton toggle-value="name">Name</CdrToggleButton>
            <CdrToggleButton toggle-value="price">Price</CdrToggleButton>
            <CdrToggleButton toggle-value="rating">Rating</CdrToggleButton>
            <CdrToggleButton toggle-value="newest">Newest</CdrToggleButton>
          </CdrToggleGroup>
        </div>
      </div>
    \`
  })
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Large`,`CustomLabels`,`TwoOptions`,`ManyOptions`,`InteractiveExample`]}))();export{d as CustomLabels,l as Default,m as InteractiveExample,u as Large,p as ManyOptions,f as TwoOptions,h as __namedExportsOrder,c as default};