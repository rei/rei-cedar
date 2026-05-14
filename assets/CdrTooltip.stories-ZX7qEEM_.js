import{n as e}from"./chunk-BneVvdWh.js";import{C as t,m as n}from"./componentOptions-jKL8eaN0.js";import{n as r,t as i}from"./CdrButton-DeOQTtxS.js";import{n as a,t as o}from"./CdrTooltip-BNLvlSyK.js";var s,c,l,u,d,f,p,m,h,g;e((()=>{a(),r(),n(),s={title:`Components/Tooltip`,component:o,tags:[`autodocs`],argTypes:{position:{control:`select`,options:t,description:`Sets the position where the tooltip will render relative to the trigger element`,table:{type:{summary:t.join(` | `)},defaultValue:{summary:`top`}}}}},c={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for tooltip</CdrButton>
          </template>
          This is a helpful tooltip message
        </CdrTooltip>
      </div>
    `}),args:{position:`top`}},l={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Top Tooltip</CdrButton>
          </template>
          Tooltip appears above the button
        </CdrTooltip>
      </div>
    `}),args:{position:`top`}},u={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Bottom Tooltip</CdrButton>
          </template>
          Tooltip appears below the button
        </CdrTooltip>
      </div>
    `}),args:{position:`bottom`}},d={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Left Tooltip</CdrButton>
          </template>
          Tooltip appears to the left
        </CdrTooltip>
      </div>
    `}),args:{position:`left`}},f={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Right Tooltip</CdrButton>
          </template>
          Tooltip appears to the right
        </CdrTooltip>
      </div>
    `}),args:{position:`right`}},p={render:()=>({components:{CdrTooltip:o,CdrButton:i},template:`
      <div style="padding: 150px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 100px;">
        <div style="text-align: center;">
          <CdrTooltip position="top">
            <template #trigger>
              <CdrButton>Top</CdrButton>
            </template>
            Tooltip on top
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="bottom">
            <template #trigger>
              <CdrButton>Bottom</CdrButton>
            </template>
            Tooltip on bottom
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="left">
            <template #trigger>
              <CdrButton>Left</CdrButton>
            </template>
            Tooltip on left
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="right">
            <template #trigger>
              <CdrButton>Right</CdrButton>
            </template>
            Tooltip on right
          </CdrTooltip>
        </div>
      </div>
    `})},m={render:e=>({components:{CdrTooltip:o,CdrButton:i},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for detailed info</CdrButton>
          </template>
          This is a longer tooltip message that provides more detailed information
          about the action or element. It can wrap to multiple lines if needed.
        </CdrTooltip>
      </div>
    `}),args:{position:`top`}},h={render:()=>({components:{CdrTooltip:o,CdrButton:i},template:`
      <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Save</CdrButton>
          </template>
          Save your changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Cancel</CdrButton>
          </template>
          Discard changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Delete</CdrButton>
          </template>
          Permanently delete this item
        </CdrTooltip>
      </div>
    `})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for tooltip</CdrButton>
          </template>
          This is a helpful tooltip message
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'top'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Top Tooltip</CdrButton>
          </template>
          Tooltip appears above the button
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'top'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Bottom Tooltip</CdrButton>
          </template>
          Tooltip appears below the button
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'bottom'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Left Tooltip</CdrButton>
          </template>
          Tooltip appears to the left
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'left'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Right Tooltip</CdrButton>
          </template>
          Tooltip appears to the right
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'right'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    template: \`
      <div style="padding: 150px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 100px;">
        <div style="text-align: center;">
          <CdrTooltip position="top">
            <template #trigger>
              <CdrButton>Top</CdrButton>
            </template>
            Tooltip on top
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="bottom">
            <template #trigger>
              <CdrButton>Bottom</CdrButton>
            </template>
            Tooltip on bottom
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="left">
            <template #trigger>
              <CdrButton>Left</CdrButton>
            </template>
            Tooltip on left
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="right">
            <template #trigger>
              <CdrButton>Right</CdrButton>
            </template>
            Tooltip on right
          </CdrTooltip>
        </div>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for detailed info</CdrButton>
          </template>
          This is a longer tooltip message that provides more detailed information
          about the action or element. It can wrap to multiple lines if needed.
        </CdrTooltip>
      </div>
    \`
  }),
  args: {
    position: 'top'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrTooltip,
      CdrButton
    },
    template: \`
      <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Save</CdrButton>
          </template>
          Save your changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Cancel</CdrButton>
          </template>
          Discard changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Delete</CdrButton>
          </template>
          Permanently delete this item
        </CdrTooltip>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g=[`Default`,`TopPosition`,`BottomPosition`,`LeftPosition`,`RightPosition`,`AllPositions`,`LongContent`,`MultipleTooltips`]}))();export{p as AllPositions,u as BottomPosition,c as Default,d as LeftPosition,m as LongContent,h as MultipleTooltips,f as RightPosition,l as TopPosition,g as __namedExportsOrder,s as default};