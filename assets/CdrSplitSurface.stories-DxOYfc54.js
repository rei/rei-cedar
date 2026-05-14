import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrSplitSurface-DH3iEC_R.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Components/SplitSurface`,component:n,tags:[`autodocs`]},i={render:e=>({components:{CdrSplitSurface:n},setup(){return{args:e}},template:`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f0f0f0;">
            <h2>Top Section</h2>
            <p>This is the top content area.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px; background: #e0e0e0;">
            <h2>Bottom Section</h2>
            <p>This is the bottom content area.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `}),args:{surface:`bottom`}},a={render:e=>({components:{CdrSplitSurface:n},setup(){return{args:e}},template:`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px; background: #4A90E2; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area below.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `}),args:{surface:`top`}},o={render:e=>({components:{CdrSplitSurface:n},setup(){return{args:e}},template:`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area above.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px; background: #50C878; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `}),args:{surface:`bottom`}},s={render:e=>({components:{CdrSplitSurface:n},setup(){return{args:e}},template:`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f5f5f5;">
            <h1>Article Title</h1>
            <p>Introduction paragraph</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px;">
            <p>Article body content goes here...</p>
          </div>
        </template>
      </CdrSplitSurface>
    `}),args:{surface:`top`,tag:`article`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSplitSurface
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f0f0f0;">
            <h2>Top Section</h2>
            <p>This is the top content area.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px; background: #e0e0e0;">
            <h2>Bottom Section</h2>
            <p>This is the bottom content area.</p>
          </div>
        </template>
      </CdrSplitSurface>
    \`
  }),
  args: {
    surface: 'bottom'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSplitSurface
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px; background: #4A90E2; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area below.</p>
          </div>
        </template>
      </CdrSplitSurface>
    \`
  }),
  args: {
    surface: 'top'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSplitSurface
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area above.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px; background: #50C878; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
      </CdrSplitSurface>
    \`
  }),
  args: {
    surface: 'bottom'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSplitSurface
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f5f5f5;">
            <h1>Article Title</h1>
            <p>Introduction paragraph</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px;">
            <p>Article body content goes here...</p>
          </div>
        </template>
      </CdrSplitSurface>
    \`
  }),
  args: {
    surface: 'top',
    tag: 'article'
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`,`TopSurface`,`BottomSurface`,`AsArticle`]}))();export{s as AsArticle,o as BottomSurface,i as Default,a as TopSurface,c as __namedExportsOrder,r as default};