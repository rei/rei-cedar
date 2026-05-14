import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{n as i,t as a}from"./CdrText-B9P_UOER.js";import{n as o,t as s}from"./CdrLink-v_BmLy7y.js";import{C as c,m as l}from"./componentOptions-jKL8eaN0.js";import{n as u,t as d}from"./CdrButton-DeOQTtxS.js";import{n as f,t as p}from"./CdrPopover-Dp7yUEqD.js";var m,h,g,_,v,y,b,x,S,C;e((()=>{n(),f(),u(),i(),o(),l(),m={title:`Components/Popover`,component:p,tags:[`autodocs`],args:{position:`top`,autoPosition:!0,id:`popover-1`},argTypes:{position:{control:`select`,options:c,description:`Sets the position where the popover will render relative to the trigger element`,table:{type:{summary:c.join(` | `)},defaultValue:{summary:`top`}}}}},h={args:{label:`Popover Title`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Popover</CdrButton>
          </template>
          <CdrText>
            This is a popover with some informational content. 
            It can contain text, links, or other elements.
          </CdrText>
        </CdrPopover>
      </div>
    `})},g={args:{label:`Top Position`,position:`top`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Above</CdrButton>
          </template>
          <CdrText>This popover appears above the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `})},_={args:{label:`Bottom Position`,position:`bottom`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Below</CdrButton>
          </template>
          <CdrText>This popover appears below the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `})},v={args:{label:`Left Position`,position:`left`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Left</CdrButton>
          </template>
          <CdrText>This popover appears to the left of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `})},y={args:{label:`Right Position`,position:`right`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Right</CdrButton>
          </template>
          <CdrText>This popover appears to the right of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `})},b={args:{label:`Helpful Links`,id:`popover-links`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a,CdrLink:s},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Menu</CdrButton>
          </template>
          <div>
            <CdrText>Quick links:</CdrText>
            <ul style="list-style: none; padding: 0; margin: 8px 0 0 0;">
              <li><CdrLink href="https://www.rei.com">REI Home</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/adventures">Adventures</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
            </ul>
          </div>
        </CdrPopover>
      </div>
    `})},x={args:{label:`More Information`,id:`popover-long`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){return{args:e}},template:`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Learn More</CdrButton>
          </template>
          <CdrText>
            This popover contains more detailed information that might span 
            multiple lines. Popovers are useful for providing contextual help 
            or additional details without cluttering the main interface.
          </CdrText>
          <CdrText>
            They can be dismissed by clicking the X button, pressing ESC, 
            or clicking outside the popover.
          </CdrText>
        </CdrPopover>
      </div>
    `})},S={args:{label:`Controlled Popover`,id:`popover-controlled`},render:e=>({components:{CdrPopover:p,CdrButton:d,CdrText:a},setup(){let n=t(!1);r(()=>e.open,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},{open:o,...s}=e;return{restArgs:s,isOpen:n,openPopover:i,closePopover:a}},template:`
      <div style="padding: 100px; text-align: center;">
        <div style="margin-bottom: 16px;">
          <CdrButton @click="openPopover" style="margin-right: 8px;">Open</CdrButton>
          <CdrButton @click="closePopover" modifier="secondary">Close</CdrButton>
        </div>
        <CdrPopover v-bind="restArgs" :open="isOpen" @closed="closePopover">
          <template #trigger>
            <CdrButton>Trigger Button</CdrButton>
          </template>
          <CdrText>
            This popover is controlled programmatically using the open prop.
          </CdrText>
        </CdrPopover>
      </div>
    `})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Popover Title'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Popover</CdrButton>
          </template>
          <CdrText>
            This is a popover with some informational content. 
            It can contain text, links, or other elements.
          </CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Top Position',
    position: 'top'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Above</CdrButton>
          </template>
          <CdrText>This popover appears above the trigger button.</CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Bottom Position',
    position: 'bottom'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Below</CdrButton>
          </template>
          <CdrText>This popover appears below the trigger button.</CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Left Position',
    position: 'left'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Left</CdrButton>
          </template>
          <CdrText>This popover appears to the left of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Right Position',
    position: 'right'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Right</CdrButton>
          </template>
          <CdrText>This popover appears to the right of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Helpful Links',
    id: 'popover-links'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText,
      CdrLink
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Menu</CdrButton>
          </template>
          <div>
            <CdrText>Quick links:</CdrText>
            <ul style="list-style: none; padding: 0; margin: 8px 0 0 0;">
              <li><CdrLink href="https://www.rei.com">REI Home</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/adventures">Adventures</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
            </ul>
          </div>
        </CdrPopover>
      </div>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'More Information',
    id: 'popover-long'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Learn More</CdrButton>
          </template>
          <CdrText>
            This popover contains more detailed information that might span 
            multiple lines. Popovers are useful for providing contextual help 
            or additional details without cluttering the main interface.
          </CdrText>
          <CdrText>
            They can be dismissed by clicking the X button, pressing ESC, 
            or clicking outside the popover.
          </CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Controlled Popover',
    id: 'popover-controlled'
  },
  render: args => ({
    components: {
      CdrPopover,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.open, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openPopover = () => {
        isOpen.value = true;
      };
      const closePopover = () => {
        isOpen.value = false;
      };
      const {
        open: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openPopover,
        closePopover
      };
    },
    template: \`
      <div style="padding: 100px; text-align: center;">
        <div style="margin-bottom: 16px;">
          <CdrButton @click="openPopover" style="margin-right: 8px;">Open</CdrButton>
          <CdrButton @click="closePopover" modifier="secondary">Close</CdrButton>
        </div>
        <CdrPopover v-bind="restArgs" :open="isOpen" @closed="closePopover">
          <template #trigger>
            <CdrButton>Trigger Button</CdrButton>
          </template>
          <CdrText>
            This popover is controlled programmatically using the open prop.
          </CdrText>
        </CdrPopover>
      </div>
    \`
  })
}`,...S.parameters?.docs?.source}}},C=[`Default`,`PositionTop`,`PositionBottom`,`PositionLeft`,`PositionRight`,`WithLinks`,`LongContent`,`ProgrammaticControl`]}))();export{h as Default,x as LongContent,_ as PositionBottom,v as PositionLeft,y as PositionRight,g as PositionTop,S as ProgrammaticControl,b as WithLinks,C as __namedExportsOrder,m as default};