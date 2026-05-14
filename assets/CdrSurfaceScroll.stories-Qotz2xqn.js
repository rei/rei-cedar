import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrSurfaceScroll-SeQMYTYu.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Components/SurfaceScroll`,component:n,tags:[`autodocs`]},i={render:e=>({components:{CdrSurfaceScroll:n},setup(){return{args:e}},template:`
      <div style="height: 300px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <div style="padding: 16px;">
            <h3>Scrollable Content</h3>
            <p v-for="i in 20" :key="i">
              Line {{ i }}: This is some scrollable content that will overflow the container.
            </p>
          </div>
        </CdrSurfaceScroll>
      </div>
    `}),args:{}},a={render:e=>({components:{CdrSurfaceScroll:n},setup(){return{args:e}},template:`
      <div style="width: 400px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" :scrollbar-props="{ orientation: 'horizontal' }">
          <div style="display: flex; gap: 16px; padding: 16px;">
            <div v-for="i in 10" :key="i" style="min-width: 200px; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
              Card {{ i }}
            </div>
          </div>
        </CdrSurfaceScroll>
      </div>
    `}),args:{}},o={render:e=>({components:{CdrSurfaceScroll:n},setup(){return{args:e}},template:`
      <div style="height: 400px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li v-for="i in 50" :key="i" style="padding: 12px; border-bottom: 1px solid #eee;">
              Item {{ i }}: List item content
            </li>
          </ul>
        </CdrSurfaceScroll>
      </div>
    `}),args:{}},s={render:e=>({components:{CdrSurfaceScroll:n},setup(){return{args:e}},template:`
      <div style="height: 150px; width: 300px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <div style="padding: 16px;">
            <h4>Compact Scrollable Area</h4>
            <p v-for="i in 10" :key="i">
              Paragraph {{ i }}: Content in a smaller scrollable container.
            </p>
          </div>
        </CdrSurfaceScroll>
      </div>
    `}),args:{}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceScroll
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="height: 300px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <div style="padding: 16px;">
            <h3>Scrollable Content</h3>
            <p v-for="i in 20" :key="i">
              Line {{ i }}: This is some scrollable content that will overflow the container.
            </p>
          </div>
        </CdrSurfaceScroll>
      </div>
    \`
  }),
  args: {}
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceScroll
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="width: 400px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" :scrollbar-props="{ orientation: 'horizontal' }">
          <div style="display: flex; gap: 16px; padding: 16px;">
            <div v-for="i in 10" :key="i" style="min-width: 200px; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
              Card {{ i }}
            </div>
          </div>
        </CdrSurfaceScroll>
      </div>
    \`
  }),
  args: {}
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceScroll
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="height: 400px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li v-for="i in 50" :key="i" style="padding: 12px; border-bottom: 1px solid #eee;">
              Item {{ i }}: List item content
            </li>
          </ul>
        </CdrSurfaceScroll>
      </div>
    \`
  }),
  args: {}
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSurfaceScroll
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="height: 150px; width: 300px; border: 1px solid #ccc;">
        <CdrSurfaceScroll v-bind="args" style="height: 100%">
          <div style="padding: 16px;">
            <h4>Compact Scrollable Area</h4>
            <p v-for="i in 10" :key="i">
              Paragraph {{ i }}: Content in a smaller scrollable container.
            </p>
          </div>
        </CdrSurfaceScroll>
      </div>
    \`
  }),
  args: {}
}`,...s.parameters?.docs?.source}}},c=[`Default`,`HorizontalScroll`,`LongList`,`SmallContainer`]}))();export{i as Default,a as HorizontalScroll,o as LongList,s as SmallContainer,c as __namedExportsOrder,r as default};