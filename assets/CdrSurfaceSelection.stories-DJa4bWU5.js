import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{n as r,t as i}from"./CdrSurfaceSelection-flX4FJQ5.js";var a,o,s,c,l,u,d,f;e((()=>{n(),r(),a={title:`Components/SurfaceSelection`,component:i,tags:[`autodocs`]},o={render:e=>({components:{CdrSurfaceSelection:i},setup(){return{args:e}},template:`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selection Option</h3>
          <p>Click to select this option</p>
        </div>
      </CdrSurfaceSelection>
    `}),args:{checked:!1,role:`checkbox`}},s={render:e=>({components:{CdrSurfaceSelection:i},setup(){return{args:e}},template:`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selected Option</h3>
          <p>This option is currently selected</p>
        </div>
      </CdrSurfaceSelection>
    `}),args:{checked:!0,role:`checkbox`}},c={render:e=>({components:{CdrSurfaceSelection:i},setup(){return{args:e}},template:`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Disabled Option</h3>
          <p>This option cannot be selected</p>
        </div>
      </CdrSurfaceSelection>
    `}),args:{disabled:!0,role:`checkbox`}},l={render:e=>({components:{CdrSurfaceSelection:i},setup(){return{args:e}},template:`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Loading Option</h3>
          <p>This option is currently loading</p>
        </div>
      </CdrSurfaceSelection>
    `}),args:{loading:!0,role:`checkbox`}},u={render:e=>({components:{CdrSurfaceSelection:i},setup(){return{args:e}},template:`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 20px;">
          <h4>Radio Option</h4>
          <p>One of several mutually exclusive options</p>
        </div>
      </CdrSurfaceSelection>
    `}),args:{role:`radio`,checked:!1}},d={render:()=>({components:{CdrSurfaceSelection:i},setup(){return{selected:t(null)}},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSurfaceSelection
          v-for="i in 3"
          :key="i"
          :checked="selected === i"
          role="radio"
          @click="selected = i"
          style="cursor: pointer;"
        >
          <div style="padding: 20px;">
            <h4>Option {{ i }}</h4>
            <p>{{ selected === i ? 'Selected' : 'Click to select' }}</p>
          </div>
        </CdrSurfaceSelection>
      </div>
    `})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selection Option</h3>
          <p>Click to select this option</p>
        </div>
      </CdrSurfaceSelection>
    \`
  }),
  args: {
    checked: false,
    role: 'checkbox'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selected Option</h3>
          <p>This option is currently selected</p>
        </div>
      </CdrSurfaceSelection>
    \`
  }),
  args: {
    checked: true,
    role: 'checkbox'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Disabled Option</h3>
          <p>This option cannot be selected</p>
        </div>
      </CdrSurfaceSelection>
    \`
  }),
  args: {
    disabled: true,
    role: 'checkbox'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Loading Option</h3>
          <p>This option is currently loading</p>
        </div>
      </CdrSurfaceSelection>
    \`
  }),
  args: {
    loading: true,
    role: 'checkbox'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 20px;">
          <h4>Radio Option</h4>
          <p>One of several mutually exclusive options</p>
        </div>
      </CdrSurfaceSelection>
    \`
  }),
  args: {
    role: 'radio',
    checked: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrSurfaceSelection
    },
    setup() {
      const selected = ref<number | null>(null);
      return {
        selected
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSurfaceSelection
          v-for="i in 3"
          :key="i"
          :checked="selected === i"
          role="radio"
          @click="selected = i"
          style="cursor: pointer;"
        >
          <div style="padding: 20px;">
            <h4>Option {{ i }}</h4>
            <p>{{ selected === i ? 'Selected' : 'Click to select' }}</p>
          </div>
        </CdrSurfaceSelection>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Checked`,`Disabled`,`Loading`,`RadioButton`,`InteractiveGroup`]}))();export{s as Checked,o as Default,c as Disabled,d as InteractiveGroup,l as Loading,u as RadioButton,f as __namedExportsOrder,a as default};