import{n as e}from"./chunk-BneVvdWh.js";import{i as t,n,r,t as i}from"./CdrSkeletonBone-q1FkEDFW.js";var a,o,s,c,l,u,d;e((()=>{t(),n(),a={title:`Components/Skeleton`,component:r,tags:[`autodocs`]},o={render:e=>({components:{CdrSkeleton:r,CdrSkeletonBone:i},setup(){return{args:e}},template:`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `}),args:{motion:!0}},s={render:e=>({components:{CdrSkeleton:r,CdrSkeletonBone:i},setup(){return{args:e}},template:`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `}),args:{motion:!1}},c={render:()=>({components:{CdrSkeleton:r,CdrSkeletonBone:i},template:`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Default</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="default" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Heading</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="heading" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Line</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="line" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Rectangle</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="rectangle" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Square</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="square" />
          </CdrSkeleton>
        </div>
      </div>
    `})},l={render:e=>({components:{CdrSkeleton:r,CdrSkeletonBone:i},setup(){return{args:e}},template:`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="square" />
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `}),args:{motion:!0}},u={render:e=>({components:{CdrSkeleton:r,CdrSkeletonBone:i},setup(){return{args:e}},template:`
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
      </div>
    `}),args:{motion:!0}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSkeleton,
      CdrSkeletonBone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    \`
  }),
  args: {
    motion: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSkeleton,
      CdrSkeletonBone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    \`
  }),
  args: {
    motion: false
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrSkeleton,
      CdrSkeletonBone
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Default</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="default" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Heading</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="heading" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Line</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="line" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Rectangle</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="rectangle" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Square</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="square" />
          </CdrSkeleton>
        </div>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSkeleton,
      CdrSkeletonBone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="square" />
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    \`
  }),
  args: {
    motion: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrSkeleton,
      CdrSkeletonBone
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
      </div>
    \`
  }),
  args: {
    motion: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`NoMotion`,`BoneTypes`,`CardLayout`,`MultipleCards`]}))();export{c as BoneTypes,l as CardLayout,o as Default,u as MultipleCards,s as NoMotion,d as __namedExportsOrder,a as default};