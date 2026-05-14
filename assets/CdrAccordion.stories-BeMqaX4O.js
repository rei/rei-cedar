import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{i,n as a,r as o,t as s}from"./CdrAccordionGroup-UkYTK-j0.js";import{n as c,t as l}from"./CdrText-B9P_UOER.js";import{n as u,t as d}from"./CdrList-DDLtJu1u.js";import{n as f,t as p}from"./CdrLink-v_BmLy7y.js";import{m,u as h}from"./componentOptions-jKL8eaN0.js";var g,_,v,y,b,x,S,C,w,T,E;e((()=>{n(),i(),a(),c(),u(),f(),m(),g={title:`Components/Accordion`,component:o,tags:[`autodocs`],args:{id:`accordion-1`,level:3,compact:!1,borderAligned:!1,contentSpacing:!0,label:`Accordion Label`,opened:!1},argTypes:{level:{control:`select`,options:h,description:`Sets the heading level`,table:{type:{summary:h.join(` | `)},defaultValue:{summary:`3`}}}}},_={args:{id:`default`,label:`A short label`},render:e=>({components:{CdrAccordion:o,CdrText:l},setup(){let n=t(e.opened??!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!n.value},{opened:a,...o}=e;return{restArgs:o,isOpen:n,toggle:i}},template:`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This is some text. It's in a <strong>CdrText paragraph</strong> element as
          that's how you assign the correct font and line-height for text display on REI.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum fermentum 
          tortor posuere fermentum. Sed interdum vel urna at tempor.
        </CdrText>
      </CdrAccordion>
    `})},v={args:{id:`compact`,label:`Compact accordion`,compact:!0},render:e=>({components:{CdrAccordion:o,CdrList:d,CdrLink:p},setup(){let n=t(e.opened??!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!n.value},{opened:a,...o}=e;return{restArgs:o,isOpen:n,toggle:i}},template:`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrList modifier="unordered">
          <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
        </CdrList>
      </CdrAccordion>
    `})},y={args:{id:`border-aligned`,label:`Border aligned accordion`,borderAligned:!0},render:e=>({components:{CdrAccordion:o},setup(){let n=t(e.opened??!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!n.value},{opened:a,...o}=e;return{restArgs:o,isOpen:n,toggle:i}},template:`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <p>Border aligned accordion content.</p>
      </CdrAccordion>
    `})},b={render:()=>({components:{CdrAccordion:o,CdrAccordionGroup:s,CdrText:l,CdrList:d},setup(){let e=t([]);return{toggle:t=>{let n=e.value.indexOf(t);n>-1?e.value.splice(n,1):e.value.push(t)},isOpened:t=>e.value.includes(t)}},template:`
      <CdrAccordionGroup>
        <CdrAccordion 
          id="group-1" 
          :level="3" 
          label="A short label"
          :opened="isOpened('group-1')"
          @accordion-toggle="toggle('group-1')"
        >
          <CdrText>
            This is some text. It's in a <strong>CdrText paragraph</strong> element as
            that's how you assign the correct font and line-height for text display on REI.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CdrText>
        </CdrAccordion>
        <CdrAccordion 
          id="group-2" 
          :level="3" 
          label="Label with multiple words, so many words in fact that this content may wrap to several lines"
          :opened="isOpened('group-2')"
          @accordion-toggle="toggle('group-2')"
        >
          <CdrList modifier="unordered">
            <li>This is a cdr-list item inside an accordion.</li>
            <li>It includes no extra styling</li>
            <li>I'm adding a bunch of items</li>
            <li>to this list because</li>
            <li>I want to see what it's like</li>
            <li>when animated!</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    `})},x={args:{id:`opened`,label:`Initially open`,opened:!0},render:e=>({components:{CdrAccordion:o},setup(){let n=t(e.opened);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!n.value},{opened:a,...o}=e;return{restArgs:o,isOpen:n,toggle:i}},template:`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <p>This accordion starts in an open state.</p>
      </CdrAccordion>
    `})},S={args:{id:`no-spacing`,label:`No content spacing`,contentSpacing:!1},render:e=>({components:{CdrAccordion:o,CdrText:l},setup(){let n=t(e.opened??!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!n.value},{opened:a,...o}=e;return{restArgs:o,isOpen:n,toggle:i}},template:`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This accordion has no padding around content. This is useful when you want to 
          control spacing with custom layouts or when nesting other components that provide 
          their own spacing.
        </CdrText>
      </CdrAccordion>
    `})},C={render:()=>({components:{CdrAccordion:o,CdrAccordionGroup:s},setup(){let e=t([{label:`These are border-aligned`,content:`These accordions will only allow one open at a time.`,opened:!1,id:`linked1`},{label:`And they are also linked`,content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula, nibh vitae luctus mattis, quam sapien tempus risus, sit amet viverra quam velit a orci.`,opened:!1,id:`linked2`},{label:`To close others when one is opened`,content:`These accordions will only allow one open at a time.`,opened:!1,id:`linked3`}]);return{grouped:e,updateGroup:t=>{if(e.value[t].opened)e.value[t].opened=!1;else for(let n=0;n<e.value.length;n++)e.value[n].opened=t===n}}},template:`
      <CdrAccordionGroup>
        <CdrAccordion
          v-for="(item, index) in grouped"
          :id="item.id"
          :level="3"
          :border-aligned="true"
          :opened="item.opened"
          :key="item.id"
          @accordion-toggle="updateGroup(index)"
        >
          <template #label>{{ item.label }}</template>
          {{ item.content }}
        </CdrAccordion>
      </CdrAccordionGroup>
    `})},w={render:()=>({components:{CdrAccordion:o,CdrAccordionGroup:s,CdrList:d,CdrLink:p},setup(){let e=t(!1),n=t(!1);return{accordion1:e,accordion2:n,toggle1:()=>{e.value=!e.value},toggle2:()=>{n.value=!n.value}}},template:`
      <CdrAccordionGroup>
        <CdrAccordion
          id="compact-1"
          :level="3"
          :compact="true"
          :opened="accordion1"
          @accordion-toggle="toggle1"
        >
          <template #label>Compact</template>
          <CdrList modifier="unordered">
            <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
          </CdrList>
        </CdrAccordion>
        <CdrAccordion
          id="compact-2"
          :level="3"
          :compact="true"
          :opened="accordion2"
          @accordion-toggle="toggle2"
        >
          <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
          <CdrList tag="ol">
            <li>Item one</li>
            <li>Item two</li>
            <li>Hopefully right font size</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    `})},T={render:()=>({components:{CdrAccordion:o,CdrAccordionGroup:s,CdrText:l,CdrList:d},setup(){let e=t(!0),n=t(!1);return{accordion1:e,accordion2:n,toggle1:()=>{e.value=!e.value},toggle2:()=>{n.value=!n.value}}},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This accordion group unwraps at medium and large breakpoints, 
          displaying content in an always-open state.
        </p>
        <CdrAccordionGroup unwrap="@md @lg">
          <CdrAccordion
            id="unwrap-1"
            :level="3"
            :opened="accordion1"
            @accordion-toggle="toggle1"
          >
            <template #label>A short label</template>
            <CdrText>
              This is some text. It's in a <strong>CdrText paragraph</strong> element as
              that's how you assign the correct font and line-height for text display on REI.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CdrText>
          </CdrAccordion>
          <CdrAccordion
            id="unwrap-2"
            :level="3"
            :opened="accordion2"
            @accordion-toggle="toggle2"
          >
            <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
            <CdrList modifier="unordered">
              <li>This is a cdr-list item inside an accordion.</li>
              <li>It includes no extra styling</li>
              <li>I'm adding a bunch of items</li>
              <li>to this list because</li>
              <li>I want to see what it's like</li>
              <li>when animated!</li>
            </CdrList>
          </CdrAccordion>
        </CdrAccordionGroup>
      </div>
    `})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'default',
    label: 'A short label'
  },
  render: args => ({
    components: {
      CdrAccordion,
      CdrText
    },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      const {
        opened,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        toggle
      };
    },
    template: \`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This is some text. It's in a <strong>CdrText paragraph</strong> element as
          that's how you assign the correct font and line-height for text display on REI.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum fermentum 
          tortor posuere fermentum. Sed interdum vel urna at tempor.
        </CdrText>
      </CdrAccordion>
    \`
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'compact',
    label: 'Compact accordion',
    compact: true
  },
  render: args => ({
    components: {
      CdrAccordion,
      CdrList,
      CdrLink
    },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      const {
        opened,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        toggle
      };
    },
    template: \`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrList modifier="unordered">
          <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
          <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
        </CdrList>
      </CdrAccordion>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'border-aligned',
    label: 'Border aligned accordion',
    borderAligned: true
  },
  render: args => ({
    components: {
      CdrAccordion
    },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      const {
        opened,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        toggle
      };
    },
    template: \`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <p>Border aligned accordion content.</p>
      </CdrAccordion>
    \`
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAccordion,
      CdrAccordionGroup,
      CdrText,
      CdrList
    },
    setup() {
      const openAccordions = ref<string[]>([]);
      const toggle = (id: string) => {
        const index = openAccordions.value.indexOf(id);
        if (index > -1) {
          openAccordions.value.splice(index, 1);
        } else {
          openAccordions.value.push(id);
        }
      };
      const isOpened = (id: string) => openAccordions.value.includes(id);
      return {
        toggle,
        isOpened
      };
    },
    template: \`
      <CdrAccordionGroup>
        <CdrAccordion 
          id="group-1" 
          :level="3" 
          label="A short label"
          :opened="isOpened('group-1')"
          @accordion-toggle="toggle('group-1')"
        >
          <CdrText>
            This is some text. It's in a <strong>CdrText paragraph</strong> element as
            that's how you assign the correct font and line-height for text display on REI.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CdrText>
        </CdrAccordion>
        <CdrAccordion 
          id="group-2" 
          :level="3" 
          label="Label with multiple words, so many words in fact that this content may wrap to several lines"
          :opened="isOpened('group-2')"
          @accordion-toggle="toggle('group-2')"
        >
          <CdrList modifier="unordered">
            <li>This is a cdr-list item inside an accordion.</li>
            <li>It includes no extra styling</li>
            <li>I'm adding a bunch of items</li>
            <li>to this list because</li>
            <li>I want to see what it's like</li>
            <li>when animated!</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'opened',
    label: 'Initially open',
    opened: true
  },
  render: args => ({
    components: {
      CdrAccordion
    },
    setup() {
      const isOpen = ref(args.opened);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      const {
        opened,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        toggle
      };
    },
    template: \`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <p>This accordion starts in an open state.</p>
      </CdrAccordion>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'no-spacing',
    label: 'No content spacing',
    contentSpacing: false
  },
  render: args => ({
    components: {
      CdrAccordion,
      CdrText
    },
    setup() {
      const isOpen = ref(args.opened ?? false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const toggle = () => {
        isOpen.value = !isOpen.value;
      };
      const {
        opened,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        toggle
      };
    },
    template: \`
      <CdrAccordion v-bind="restArgs" :opened="isOpen" @accordion-toggle="toggle">
        <CdrText>
          This accordion has no padding around content. This is useful when you want to 
          control spacing with custom layouts or when nesting other components that provide 
          their own spacing.
        </CdrText>
      </CdrAccordion>
    \`
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAccordion,
      CdrAccordionGroup
    },
    setup() {
      interface AccordionItem {
        label: string;
        content: string;
        opened: boolean;
        id: string;
      }
      const grouped = ref<AccordionItem[]>([{
        label: 'These are border-aligned',
        content: 'These accordions will only allow one open at a time.',
        opened: false,
        id: 'linked1'
      }, {
        label: 'And they are also linked',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula, nibh vitae luctus mattis, quam sapien tempus risus, sit amet viverra quam velit a orci.',
        opened: false,
        id: 'linked2'
      }, {
        label: 'To close others when one is opened',
        content: 'These accordions will only allow one open at a time.',
        opened: false,
        id: 'linked3'
      }]);
      const updateGroup = (index: number) => {
        const opened = grouped.value[index].opened;
        if (opened) {
          grouped.value[index].opened = false;
        } else {
          for (let i = 0; i < grouped.value.length; i++) {
            grouped.value[i].opened = index === i;
          }
        }
      };
      return {
        grouped,
        updateGroup
      };
    },
    template: \`
      <CdrAccordionGroup>
        <CdrAccordion
          v-for="(item, index) in grouped"
          :id="item.id"
          :level="3"
          :border-aligned="true"
          :opened="item.opened"
          :key="item.id"
          @accordion-toggle="updateGroup(index)"
        >
          <template #label>{{ item.label }}</template>
          {{ item.content }}
        </CdrAccordion>
      </CdrAccordionGroup>
    \`
  })
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAccordion,
      CdrAccordionGroup,
      CdrList,
      CdrLink
    },
    setup() {
      const accordion1 = ref(false);
      const accordion2 = ref(false);
      const toggle1 = () => {
        accordion1.value = !accordion1.value;
      };
      const toggle2 = () => {
        accordion2.value = !accordion2.value;
      };
      return {
        accordion1,
        accordion2,
        toggle1,
        toggle2
      };
    },
    template: \`
      <CdrAccordionGroup>
        <CdrAccordion
          id="compact-1"
          :level="3"
          :compact="true"
          :opened="accordion1"
          @accordion-toggle="toggle1"
        >
          <template #label>Compact</template>
          <CdrList modifier="unordered">
            <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
            <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
          </CdrList>
        </CdrAccordion>
        <CdrAccordion
          id="compact-2"
          :level="3"
          :compact="true"
          :opened="accordion2"
          @accordion-toggle="toggle2"
        >
          <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
          <CdrList tag="ol">
            <li>Item one</li>
            <li>Item two</li>
            <li>Hopefully right font size</li>
          </CdrList>
        </CdrAccordion>
      </CdrAccordionGroup>
    \`
  })
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAccordion,
      CdrAccordionGroup,
      CdrText,
      CdrList
    },
    setup() {
      const accordion1 = ref(true);
      const accordion2 = ref(false);
      const toggle1 = () => {
        accordion1.value = !accordion1.value;
      };
      const toggle2 = () => {
        accordion2.value = !accordion2.value;
      };
      return {
        accordion1,
        accordion2,
        toggle1,
        toggle2
      };
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This accordion group unwraps at medium and large breakpoints, 
          displaying content in an always-open state.
        </p>
        <CdrAccordionGroup unwrap="@md @lg">
          <CdrAccordion
            id="unwrap-1"
            :level="3"
            :opened="accordion1"
            @accordion-toggle="toggle1"
          >
            <template #label>A short label</template>
            <CdrText>
              This is some text. It's in a <strong>CdrText paragraph</strong> element as
              that's how you assign the correct font and line-height for text display on REI.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CdrText>
          </CdrAccordion>
          <CdrAccordion
            id="unwrap-2"
            :level="3"
            :opened="accordion2"
            @accordion-toggle="toggle2"
          >
            <template #label>Label with multiple words, so many words in fact that this content may wrap to several lines</template>
            <CdrList modifier="unordered">
              <li>This is a cdr-list item inside an accordion.</li>
              <li>It includes no extra styling</li>
              <li>I'm adding a bunch of items</li>
              <li>to this list because</li>
              <li>I want to see what it's like</li>
              <li>when animated!</li>
            </CdrList>
          </CdrAccordion>
        </CdrAccordionGroup>
      </div>
    \`
  })
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Compact`,`BorderAligned`,`AccordionGroup`,`Opened`,`NoContentSpacing`,`BorderAlignedGroup`,`CompactGroup`,`UnwrappedGroup`]}))();export{b as AccordionGroup,y as BorderAligned,C as BorderAlignedGroup,v as Compact,w as CompactGroup,_ as Default,S as NoContentSpacing,x as Opened,T as UnwrappedGroup,E as __namedExportsOrder,g as default};