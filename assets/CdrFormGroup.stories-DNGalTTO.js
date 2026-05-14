import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{c as r,m as i}from"./componentOptions-jKL8eaN0.js";import{n as a,t as o}from"./CdrCheckbox-Dr3qKHS3.js";import{n as s,t as c}from"./CdrFormGroup-CGmKuhCp.js";import{n as l,t as u}from"./CdrInput-BEXjoFvn.js";import{n as d,t as f}from"./CdrRadio-BmXvbOUs.js";var p,m,h,g,_,v,y,b,x,S,C;e((()=>{n(),s(),a(),d(),l(),i(),p={title:`Components/FormGroup`,component:c,tags:[`autodocs`],args:{label:`Form Group Label`,required:!1,optional:!1,disabled:!1},argTypes:{error:{control:`radio`,options:r,description:`Sets the form group to an error state`,table:{type:{summary:`boolean | string`},defaultValue:{summary:`false`}}}}},m={render:e=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{args:e,selected:t([])}},template:`
      <CdrFormGroup v-bind="args">
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `})},h={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{interests:t([`hiking`])}},template:`
      <CdrFormGroup label="Select your interests">
        <CdrCheckbox v-model="interests" custom-value="hiking">Hiking</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="camping">Camping</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="climbing">Climbing</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="biking">Biking</CdrCheckbox>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ interests.join(', ') || 'None' }}</p>
    `})},g={render:()=>({components:{CdrFormGroup:c,CdrRadio:f},setup(){return{size:t(`medium`)}},template:`
      <CdrFormGroup label="Select size">
        <CdrRadio v-model="size" name="size" value="small">Small</CdrRadio>
        <CdrRadio v-model="size" name="size" value="medium">Medium</CdrRadio>
        <CdrRadio v-model="size" name="size" value="large">Large</CdrRadio>
        <CdrRadio v-model="size" name="size" value="xlarge">Extra Large</CdrRadio>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ size }}</p>
    `})},_={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{terms:t(!1)}},template:`
      <CdrFormGroup label="Terms and Conditions" required>
        <CdrCheckbox v-model="terms">I agree to the terms and conditions</CdrCheckbox>
      </CdrFormGroup>
    `})},v={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{newsletter:t(!1)}},template:`
      <CdrFormGroup label="Newsletter Subscription" optional>
        <CdrCheckbox v-model="newsletter">Subscribe to our newsletter</CdrCheckbox>
      </CdrFormGroup>
    `})},y={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{selected:t([]),error:t(`Please select at least one option`)}},template:`
      <CdrFormGroup label="Select preferences" :error="error" required>
        <template #error>{{ error }}</template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `})},b={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{selected:t([`option1`])}},template:`
      <CdrFormGroup label="Disabled Form Group" disabled>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `})},x={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o,CdrInput:u},setup(){return{preferences:t([]),other:t(``)}},template:`
      <div class="story-spacing story-spacing--vertical">
        <CdrFormGroup label="Select your preferences" optional>
          <CdrCheckbox v-model="preferences" custom-value="email">Email notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="sms">SMS notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="push">Push notifications</CdrCheckbox>
        </CdrFormGroup>
        
        <CdrFormGroup label="Additional comments" optional>
          <CdrInput v-model="other" placeholder="Enter any additional comments..." />
        </CdrFormGroup>
      </div>
    `})},S={render:()=>({components:{CdrFormGroup:c,CdrCheckbox:o},setup(){return{selected:t([])}},template:`
      <CdrFormGroup>
        <template #label>
          <h3 style="margin: 0; color: #2c6ecb;">Custom Styled Label</h3>
        </template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
      </CdrFormGroup>
    `})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const selected = ref<string[]>([]);
      return {
        args,
        selected
      };
    },
    template: \`
      <CdrFormGroup v-bind="args">
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const interests = ref<string[]>(['hiking']);
      return {
        interests
      };
    },
    template: \`
      <CdrFormGroup label="Select your interests">
        <CdrCheckbox v-model="interests" custom-value="hiking">Hiking</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="camping">Camping</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="climbing">Climbing</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="biking">Biking</CdrCheckbox>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ interests.join(', ') || 'None' }}</p>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrRadio
    },
    setup() {
      const size = ref('medium');
      return {
        size
      };
    },
    template: \`
      <CdrFormGroup label="Select size">
        <CdrRadio v-model="size" name="size" value="small">Small</CdrRadio>
        <CdrRadio v-model="size" name="size" value="medium">Medium</CdrRadio>
        <CdrRadio v-model="size" name="size" value="large">Large</CdrRadio>
        <CdrRadio v-model="size" name="size" value="xlarge">Extra Large</CdrRadio>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ size }}</p>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const terms = ref<boolean>(false);
      return {
        terms
      };
    },
    template: \`
      <CdrFormGroup label="Terms and Conditions" required>
        <CdrCheckbox v-model="terms">I agree to the terms and conditions</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const newsletter = ref<boolean>(false);
      return {
        newsletter
      };
    },
    template: \`
      <CdrFormGroup label="Newsletter Subscription" optional>
        <CdrCheckbox v-model="newsletter">Subscribe to our newsletter</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const selected = ref<string[]>([]);
      const error = ref('Please select at least one option');
      return {
        selected,
        error
      };
    },
    template: \`
      <CdrFormGroup label="Select preferences" :error="error" required>
        <template #error>{{ error }}</template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const selected = ref<string[]>(['option1']);
      return {
        selected
      };
    },
    template: \`
      <CdrFormGroup label="Disabled Form Group" disabled>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox,
      CdrInput
    },
    setup() {
      const preferences = ref<string[]>([]);
      const other = ref('');
      return {
        preferences,
        other
      };
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <CdrFormGroup label="Select your preferences" optional>
          <CdrCheckbox v-model="preferences" custom-value="email">Email notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="sms">SMS notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="push">Push notifications</CdrCheckbox>
        </CdrFormGroup>
        
        <CdrFormGroup label="Additional comments" optional>
          <CdrInput v-model="other" placeholder="Enter any additional comments..." />
        </CdrFormGroup>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFormGroup,
      CdrCheckbox
    },
    setup() {
      const selected = ref<string[]>([]);
      return {
        selected
      };
    },
    template: \`
      <CdrFormGroup>
        <template #label>
          <h3 style="margin: 0; color: #2c6ecb;">Custom Styled Label</h3>
        </template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
      </CdrFormGroup>
    \`
  })
}`,...S.parameters?.docs?.source}}},C=[`Default`,`WithCheckboxes`,`WithRadios`,`Required`,`Optional`,`WithError`,`Disabled`,`MixedInputs`,`CustomLabel`]}))();export{S as CustomLabel,m as Default,b as Disabled,x as MixedInputs,v as Optional,_ as Required,h as WithCheckboxes,y as WithError,g as WithRadios,C as __namedExportsOrder,p as default};