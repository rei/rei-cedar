import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrText-B9P_UOER.js";import{n as r,t as i}from"./CdrButton-DeOQTtxS.js";import{n as a,t as o}from"./CdrImg-CsEz-4ah.js";import{n as s,t as c}from"./CdrObjectOverlay-DEaNY4UA.js";var l,u,d,f,p,m,h,g,_,v;e((()=>{s(),a(),t(),r(),l={title:`Components/ObjectOverlay`,component:c,tags:[`autodocs`],args:{position:`center-center`,margin:`zero`,tag:`div`,gradientTheme:`dark`}},u=`https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg`,d={render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n,CdrButton:i},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Centered Content</CdrText>
            <CdrButton modifier="primary">Explore Now</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},f={args:{position:`left-top`,margin:`one-x`},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText tag="h3">Top Left</CdrText>
            <CdrText>Positioned in top left corner</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},p={args:{position:`right-bottom`,margin:`one-x`},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText>Bottom Right Content</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},m={args:{position:`center-top`,margin:`one-and-a-half-x`},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n,CdrButton:i},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Top Centered</CdrText>
            <CdrButton>Take Action</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},h={args:{position:`center-bottom`,margin:`two-x`},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white; background: rgba(0, 0, 0, 0.6); padding: 24px; border-radius: 8px;">
            <CdrText tag="h3">Bottom Centered Banner</CdrText>
            <CdrText>Perfect for captions or calls to action</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},g={args:{position:`left-center`,margin:`one-x`},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n,CdrButton:i},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 4px; max-width: 300px;">
            <CdrText tag="h3">Left Aligned</CdrText>
            <CdrText>Vertically centered on the left side</CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Learn More</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},_={args:{position:{xs:`center-bottom`,sm:`center-bottom`,md:`left-center`,lg:`left-center`},margin:{xs:`one-x`,md:`two-x`}},render:e=>({components:{CdrObjectOverlay:c,CdrImg:o,CdrText:n,CdrButton:i},setup(){return{args:e,imageSrc:u}},template:`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 4px;">
            <CdrText tag="h3">Responsive Positioning</CdrText>
            <CdrText>
              This overlay changes position at different breakpoints. 
              Bottom center on mobile, left center on desktop.
            </CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Get Started</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText,
      CdrButton
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Centered Content</CdrText>
            <CdrButton modifier="primary">Explore Now</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left-top',
    margin: 'one-x'
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText tag="h3">Top Left</CdrText>
            <CdrText>Positioned in top left corner</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right-bottom',
    margin: 'one-x'
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText>Bottom Right Content</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'center-top',
    margin: 'one-and-a-half-x'
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText,
      CdrButton
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Top Centered</CdrText>
            <CdrButton>Take Action</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'center-bottom',
    margin: 'two-x'
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white; background: rgba(0, 0, 0, 0.6); padding: 24px; border-radius: 8px;">
            <CdrText tag="h3">Bottom Centered Banner</CdrText>
            <CdrText>Perfect for captions or calls to action</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left-center',
    margin: 'one-x'
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText,
      CdrButton
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 4px; max-width: 300px;">
            <CdrText tag="h3">Left Aligned</CdrText>
            <CdrText>Vertically centered on the left side</CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Learn More</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    position: {
      xs: 'center-bottom',
      sm: 'center-bottom',
      md: 'left-center',
      lg: 'left-center'
    },
    margin: {
      xs: 'one-x',
      md: 'two-x'
    }
  },
  render: args => ({
    components: {
      CdrObjectOverlay,
      CdrImg,
      CdrText,
      CdrButton
    },
    setup() {
      return {
        args,
        imageSrc
      };
    },
    template: \`
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 4px;">
            <CdrText tag="h3">Responsive Positioning</CdrText>
            <CdrText>
              This overlay changes position at different breakpoints. 
              Bottom center on mobile, left center on desktop.
            </CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Get Started</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    \`
  })
}`,..._.parameters?.docs?.source}}},v=[`CenterCenter`,`LeftTop`,`RightBottom`,`CenterTop`,`CenterBottom`,`LeftCenter`,`ResponsivePosition`]}))();export{h as CenterBottom,d as CenterCenter,m as CenterTop,g as LeftCenter,f as LeftTop,_ as ResponsivePosition,p as RightBottom,v as __namedExportsOrder,l as default};