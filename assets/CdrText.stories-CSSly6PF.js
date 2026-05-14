import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrText-B9P_UOER.js";import{i as r,n as i,r as a,t as o}from"./CdrBody-BC6Kbg5a.js";import{a as s,c,d as l,f as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./CdrEyebrow-CQrWHRc3.js";var y,b,x,S,C,w,T,E;e((()=>{t(),i(),p(),u(),c(),v(),r(),m(),d(),y={title:`Components/Text`,component:n,tags:[`autodocs`]},b={render:e=>({components:{CdrText:n},setup(){return{args:e}},template:`
      <CdrText v-bind="args">
        This is a default text paragraph using CdrText component.
      </CdrText>
    `}),args:{tag:`p`}},x={render:()=>({components:{CdrText:n,CdrBody:o,CdrEyebrow:_,CdrHeadingDisplay:l,CdrHeadingSans:g,CdrHeadingSerif:f,CdrSubheadingSans:a,CdrUtilitySans:s,CdrUtilitySerif:h},template:`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Heading Display</h4>
          <CdrHeadingDisplay>This is a display heading</CdrHeadingDisplay>
        </div>
        
        <div>
          <h4>Heading Sans</h4>
          <CdrHeadingSans>This is a sans-serif heading</CdrHeadingSans>
        </div>
        
        <div>
          <h4>Heading Serif</h4>
          <CdrHeadingSerif>This is a serif heading</CdrHeadingSerif>
        </div>
        
        <div>
          <h4>Subheading Sans</h4>
          <CdrSubheadingSans>This is a sans-serif subheading</CdrSubheadingSans>
        </div>
        
        <div>
          <h4>Body</h4>
          <CdrBody>This is body text with standard paragraph styling.</CdrBody>
        </div>
        
        <div>
          <h4>Eyebrow</h4>
          <CdrEyebrow>This is eyebrow text</CdrEyebrow>
        </div>
        
        <div>
          <h4>Utility Sans</h4>
          <CdrUtilitySans>This is utility sans-serif text</CdrUtilitySans>
        </div>
        
        <div>
          <h4>Utility Serif</h4>
          <CdrUtilitySerif>This is utility serif text</CdrUtilitySerif>
        </div>
      </div>
    `})},S={render:()=>({components:{CdrBody:o},template:`
      <div>
        <CdrBody>
          This is a paragraph of body text. It uses the standard body text preset
          which provides appropriate sizing and spacing for readable paragraphs.
        </CdrBody>
        <CdrBody>
          Multiple paragraphs can be used to create longer-form content with
          proper vertical rhythm and spacing between sections.
        </CdrBody>
      </div>
    `})},C={render:()=>({components:{CdrHeadingDisplay:l,CdrHeadingSans:g,CdrHeadingSerif:f,CdrSubheadingSans:a},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrHeadingDisplay>Display Heading</CdrHeadingDisplay>
        <CdrHeadingSans>Sans Heading Level 1</CdrHeadingSans>
        <CdrHeadingSerif>Serif Heading Level 1</CdrHeadingSerif>
        <CdrSubheadingSans>Subheading Sans</CdrSubheadingSans>
      </div>
    `})},w={render:()=>({components:{CdrUtilitySans:s,CdrUtilitySerif:h},template:`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <CdrUtilitySans>Utility sans-serif for labels and small text</CdrUtilitySans>
        <CdrUtilitySerif>Utility serif for accents and special cases</CdrUtilitySerif>
      </div>
    `})},T={render:e=>({components:{CdrText:n},setup(){return{args:e}},template:`
      <CdrText v-bind="args">
        This text is rendered as a span element instead of a paragraph.
      </CdrText>
    `}),args:{tag:`span`}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrText v-bind="args">
        This is a default text paragraph using CdrText component.
      </CdrText>
    \`
  }),
  args: {
    tag: 'p'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrText,
      CdrBody,
      CdrEyebrow,
      CdrHeadingDisplay,
      CdrHeadingSans,
      CdrHeadingSerif,
      CdrSubheadingSans,
      CdrUtilitySans,
      CdrUtilitySerif
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Heading Display</h4>
          <CdrHeadingDisplay>This is a display heading</CdrHeadingDisplay>
        </div>
        
        <div>
          <h4>Heading Sans</h4>
          <CdrHeadingSans>This is a sans-serif heading</CdrHeadingSans>
        </div>
        
        <div>
          <h4>Heading Serif</h4>
          <CdrHeadingSerif>This is a serif heading</CdrHeadingSerif>
        </div>
        
        <div>
          <h4>Subheading Sans</h4>
          <CdrSubheadingSans>This is a sans-serif subheading</CdrSubheadingSans>
        </div>
        
        <div>
          <h4>Body</h4>
          <CdrBody>This is body text with standard paragraph styling.</CdrBody>
        </div>
        
        <div>
          <h4>Eyebrow</h4>
          <CdrEyebrow>This is eyebrow text</CdrEyebrow>
        </div>
        
        <div>
          <h4>Utility Sans</h4>
          <CdrUtilitySans>This is utility sans-serif text</CdrUtilitySans>
        </div>
        
        <div>
          <h4>Utility Serif</h4>
          <CdrUtilitySerif>This is utility serif text</CdrUtilitySerif>
        </div>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrBody
    },
    template: \`
      <div>
        <CdrBody>
          This is a paragraph of body text. It uses the standard body text preset
          which provides appropriate sizing and spacing for readable paragraphs.
        </CdrBody>
        <CdrBody>
          Multiple paragraphs can be used to create longer-form content with
          proper vertical rhythm and spacing between sections.
        </CdrBody>
      </div>
    \`
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrHeadingDisplay,
      CdrHeadingSans,
      CdrHeadingSerif,
      CdrSubheadingSans
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrHeadingDisplay>Display Heading</CdrHeadingDisplay>
        <CdrHeadingSans>Sans Heading Level 1</CdrHeadingSans>
        <CdrHeadingSerif>Serif Heading Level 1</CdrHeadingSerif>
        <CdrSubheadingSans>Subheading Sans</CdrSubheadingSans>
      </div>
    \`
  })
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrUtilitySans,
      CdrUtilitySerif
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <CdrUtilitySans>Utility sans-serif for labels and small text</CdrUtilitySans>
        <CdrUtilitySerif>Utility serif for accents and special cases</CdrUtilitySerif>
      </div>
    \`
  })
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrText v-bind="args">
        This text is rendered as a span element instead of a paragraph.
      </CdrText>
    \`
  }),
  args: {
    tag: 'span'
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`AllPresets`,`BodyText`,`Headings`,`UtilityText`,`CustomTag`]}))();export{x as AllPresets,S as BodyText,T as CustomTag,b as Default,C as Headings,w as UtilityText,E as __namedExportsOrder,y as default};