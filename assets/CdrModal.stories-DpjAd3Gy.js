import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{n as i,t as a}from"./CdrText-B9P_UOER.js";import{S as o,m as s}from"./componentOptions-jKL8eaN0.js";import{n as c,t as l}from"./CdrButton-DeOQTtxS.js";import{n as u,t as d}from"./CdrModal-BB1XpCM0.js";var f,p,m,h,g,_,v;e((()=>{n(),u(),c(),i(),s(),f={title:`Components/Modal`,component:d,tags:[`autodocs`],args:{label:`Modal Title`,showTitle:!0,role:`dialog`},argTypes:{role:{control:`select`,options:o,description:`Sets the role attribute on the modal content element`,table:{type:{summary:o.join(` | `)},defaultValue:{summary:`dialog`}}}}},p={args:{opened:!1},render:e=>({components:{CdrModal:d,CdrButton:l,CdrText:a},setup(){let n=t(!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},{opened:o,...s}=e;return{restArgs:s,isOpen:n,openModal:i,closeModal:a}},template:`
      <div>
        <CdrButton @click="openModal">Open Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This is a modal dialog. Modals interrupt the user's workflow and require 
            an action before they can return to the main content.
          </CdrText>
          <CdrText>
            Press ESC or click the X button to close this modal.
          </CdrText>
        </CdrModal>
      </div>
    `})},m={args:{opened:!1,label:`Terms and Conditions`},render:e=>({components:{CdrModal:d,CdrButton:l,CdrText:a},setup(){let n=t(!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},{opened:o,...s}=e;return{restArgs:s,isOpen:n,openModal:i,closeModal:a}},template:`
      <div>
        <CdrButton @click="openModal">Open Modal with Long Content</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText tag="h2">Agreement</CdrText>
          <CdrText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </CdrText>
          <CdrText>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </CdrText>
          <CdrText>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </CdrText>
          <CdrText>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </CdrText>
          <CdrText>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
            dolore magnam aliquam quaerat voluptatem.
          </CdrText>
        </CdrModal>
      </div>
    `})},h={args:{opened:!1,label:`Accessible Label`,showTitle:!1},render:e=>({components:{CdrModal:d,CdrButton:l,CdrText:a},setup(){let n=t(!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},{opened:o,...s}=e;return{restArgs:s,isOpen:n,openModal:i,closeModal:a}},template:`
      <div>
        <CdrButton @click="openModal">Open Modal without Visible Title</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has no visible title, but the label prop still provides 
            an accessible name for screen readers.
          </CdrText>
        </CdrModal>
      </div>
    `})},g={args:{opened:!1,label:`Delete Confirmation`,role:`alertdialog`},render:e=>({components:{CdrModal:d,CdrButton:l,CdrText:a},setup(){let n=t(!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},o=()=>{alert(`Item deleted!`),a()},{opened:s,...c}=e;return{restArgs:c,isOpen:n,openModal:i,closeModal:a,handleDelete:o}},template:`
      <div>
        <CdrButton @click="openModal">Delete Item</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            Are you sure you want to delete this item? This action cannot be undone.
          </CdrText>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <CdrButton modifier="primary" @click="handleDelete">Delete</CdrButton>
            <CdrButton modifier="secondary" @click="closeModal">Cancel</CdrButton>
          </div>
        </CdrModal>
      </div>
    `})},_={args:{opened:!1,label:`Custom Styled Modal`,contentClass:`custom-modal-content`},render:e=>({components:{CdrModal:d,CdrButton:l,CdrText:a},setup(){let n=t(!1);r(()=>e.opened,e=>{n.value=e??!1});let i=()=>{n.value=!0},a=()=>{n.value=!1},{opened:o,...s}=e;return{restArgs:s,isOpen:n,openModal:i,closeModal:a}},template:`
      <div>
        <CdrButton @click="openModal">Open Custom Styled Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has custom CSS classes applied via the contentClass prop.
          </CdrText>
        </CdrModal>
      </div>
    `})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    opened: false
  },
  render: args => ({
    components: {
      CdrModal,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const {
        opened: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openModal,
        closeModal
      };
    },
    template: \`
      <div>
        <CdrButton @click="openModal">Open Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This is a modal dialog. Modals interrupt the user's workflow and require 
            an action before they can return to the main content.
          </CdrText>
          <CdrText>
            Press ESC or click the X button to close this modal.
          </CdrText>
        </CdrModal>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    opened: false,
    label: 'Terms and Conditions'
  },
  render: args => ({
    components: {
      CdrModal,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const {
        opened: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openModal,
        closeModal
      };
    },
    template: \`
      <div>
        <CdrButton @click="openModal">Open Modal with Long Content</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText tag="h2">Agreement</CdrText>
          <CdrText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </CdrText>
          <CdrText>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </CdrText>
          <CdrText>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </CdrText>
          <CdrText>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </CdrText>
          <CdrText>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
            dolore magnam aliquam quaerat voluptatem.
          </CdrText>
        </CdrModal>
      </div>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    opened: false,
    label: 'Accessible Label',
    showTitle: false
  },
  render: args => ({
    components: {
      CdrModal,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const {
        opened: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openModal,
        closeModal
      };
    },
    template: \`
      <div>
        <CdrButton @click="openModal">Open Modal without Visible Title</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has no visible title, but the label prop still provides 
            an accessible name for screen readers.
          </CdrText>
        </CdrModal>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    opened: false,
    label: 'Delete Confirmation',
    role: 'alertdialog'
  },
  render: args => ({
    components: {
      CdrModal,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const handleDelete = () => {
        alert('Item deleted!');
        closeModal();
      };
      const {
        opened: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openModal,
        closeModal,
        handleDelete
      };
    },
    template: \`
      <div>
        <CdrButton @click="openModal">Delete Item</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            Are you sure you want to delete this item? This action cannot be undone.
          </CdrText>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <CdrButton modifier="primary" @click="handleDelete">Delete</CdrButton>
            <CdrButton modifier="secondary" @click="closeModal">Cancel</CdrButton>
          </div>
        </CdrModal>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    opened: false,
    label: 'Custom Styled Modal',
    contentClass: 'custom-modal-content'
  },
  render: args => ({
    components: {
      CdrModal,
      CdrButton,
      CdrText
    },
    setup() {
      const isOpen = ref(false);
      watch(() => args.opened, newVal => {
        isOpen.value = newVal ?? false;
      });
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const {
        opened: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        isOpen,
        openModal,
        closeModal
      };
    },
    template: \`
      <div>
        <CdrButton @click="openModal">Open Custom Styled Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has custom CSS classes applied via the contentClass prop.
          </CdrText>
        </CdrModal>
      </div>
    \`
  })
}`,..._.parameters?.docs?.source}}},v=[`Default`,`LongContent`,`NoTitle`,`AlertDialog`,`WithCustomClasses`]}))();export{g as AlertDialog,p as Default,m as LongContent,h as NoTitle,_ as WithCustomClasses,v as __namedExportsOrder,f as default};