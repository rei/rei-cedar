import{n as e}from"./chunk-BneVvdWh.js";import{i as t,n,r,t as i}from"./CdrTabs-BuXCfG33.js";var a,o,s,c,l,u,d;e((()=>{n(),t(),a={title:`Components/Tabs`,component:i,tags:[`autodocs`]},o={render:e=>({components:{CdrTabs:i,CdrTabPanel:r},setup(){return{args:e}},template:`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Tab 1" aria-labelledby="tab-1">
          <div style="padding: 20px;">
            <h3>Tab 1 Content</h3>
            <p>This is the content for the first tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Tab 2" aria-labelledby="tab-2">
          <div style="padding: 20px;">
            <h3>Tab 2 Content</h3>
            <p>This is the content for the second tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Tab 3" aria-labelledby="tab-3">
          <div style="padding: 20px;">
            <h3>Tab 3 Content</h3>
            <p>This is the content for the third tab.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    `}),args:{height:`240px`}},s={render:e=>({components:{CdrTabs:i,CdrTabPanel:r},setup(){return{args:e}},template:`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Overview" aria-labelledby="tab-overview">
          <div style="padding: 16px;">
            <h4>Overview</h4>
            <p>Compact tab layout with smaller spacing.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Details" aria-labelledby="tab-details">
          <div style="padding: 16px;">
            <h4>Details</h4>
            <p>Detailed information goes here.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Reviews" aria-labelledby="tab-reviews">
          <div style="padding: 16px;">
            <h4>Reviews</h4>
            <p>Customer reviews and ratings.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    `}),args:{size:`small`,height:`200px`}},c={render:e=>({components:{CdrTabs:i,CdrTabPanel:r},setup(){return{args:e}},template:`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Short" aria-labelledby="tab-short">
          <div style="padding: 20px;">
            <h3>Short Content</h3>
            <p>This tab has minimal content.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Long" aria-labelledby="tab-long">
          <div style="padding: 20px;">
            <h3>Long Content</h3>
            <p v-for="i in 10" :key="i">
              Paragraph {{ i }}: This tab has much more content that will cause the container to grow.
            </p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    `}),args:{height:`auto`}},l={render:e=>({components:{CdrTabs:i,CdrTabPanel:r},setup(){return{args:e}},template:`
      <CdrTabs v-bind="args">
        <CdrTabPanel
          v-for="i in 8"
          :key="i"
          :name="'Tab ' + i"
          :aria-labelledby="'tab-' + i"
        >
          <div style="padding: 20px;">
            <h3>Tab {{ i }} Content</h3>
            <p>Content for tab number {{ i }}.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    `}),args:{height:`240px`}},u={render:e=>({components:{CdrTabs:i,CdrTabPanel:r},setup(){return{args:e}},template:`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="First" aria-labelledby="tab-first">
          <div style="padding: 20px;">
            <h3>First Tab</h3>
            <p>This is the first tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Second" aria-labelledby="tab-second">
          <div style="padding: 20px;">
            <h3>Second Tab</h3>
            <p>This tab is active by default.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Third" aria-labelledby="tab-third">
          <div style="padding: 20px;">
            <h3>Third Tab</h3>
            <p>This is the third tab.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    `}),args:{activeTab:1,height:`240px`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTabs,
      CdrTabPanel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Tab 1" aria-labelledby="tab-1">
          <div style="padding: 20px;">
            <h3>Tab 1 Content</h3>
            <p>This is the content for the first tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Tab 2" aria-labelledby="tab-2">
          <div style="padding: 20px;">
            <h3>Tab 2 Content</h3>
            <p>This is the content for the second tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Tab 3" aria-labelledby="tab-3">
          <div style="padding: 20px;">
            <h3>Tab 3 Content</h3>
            <p>This is the content for the third tab.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    \`
  }),
  args: {
    height: '240px'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTabs,
      CdrTabPanel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Overview" aria-labelledby="tab-overview">
          <div style="padding: 16px;">
            <h4>Overview</h4>
            <p>Compact tab layout with smaller spacing.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Details" aria-labelledby="tab-details">
          <div style="padding: 16px;">
            <h4>Details</h4>
            <p>Detailed information goes here.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Reviews" aria-labelledby="tab-reviews">
          <div style="padding: 16px;">
            <h4>Reviews</h4>
            <p>Customer reviews and ratings.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    \`
  }),
  args: {
    size: 'small',
    height: '200px'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTabs,
      CdrTabPanel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="Short" aria-labelledby="tab-short">
          <div style="padding: 20px;">
            <h3>Short Content</h3>
            <p>This tab has minimal content.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Long" aria-labelledby="tab-long">
          <div style="padding: 20px;">
            <h3>Long Content</h3>
            <p v-for="i in 10" :key="i">
              Paragraph {{ i }}: This tab has much more content that will cause the container to grow.
            </p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    \`
  }),
  args: {
    height: 'auto'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTabs,
      CdrTabPanel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrTabs v-bind="args">
        <CdrTabPanel
          v-for="i in 8"
          :key="i"
          :name="'Tab ' + i"
          :aria-labelledby="'tab-' + i"
        >
          <div style="padding: 20px;">
            <h3>Tab {{ i }} Content</h3>
            <p>Content for tab number {{ i }}.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    \`
  }),
  args: {
    height: '240px'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTabs,
      CdrTabPanel
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrTabs v-bind="args">
        <CdrTabPanel name="First" aria-labelledby="tab-first">
          <div style="padding: 20px;">
            <h3>First Tab</h3>
            <p>This is the first tab.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Second" aria-labelledby="tab-second">
          <div style="padding: 20px;">
            <h3>Second Tab</h3>
            <p>This tab is active by default.</p>
          </div>
        </CdrTabPanel>
        <CdrTabPanel name="Third" aria-labelledby="tab-third">
          <div style="padding: 20px;">
            <h3>Third Tab</h3>
            <p>This is the third tab.</p>
          </div>
        </CdrTabPanel>
      </CdrTabs>
    \`
  }),
  args: {
    activeTab: 1,
    // Zero-indexed, so this selects the second tab
    height: '240px'
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Small`,`AutoHeight`,`ManyTabs`,`PreselectedTab`]}))();export{c as AutoHeight,o as Default,l as ManyTabs,u as PreselectedTab,s as Small,d as __namedExportsOrder,a as default};