import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrAbstract-Cu6dNnGO.js";var r,i,a,o,s,c,l,u;e((()=>{t(),r={title:`Components/Abstract`,component:n,tags:[`autodocs`],args:{tag:`p`}},i=`Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.`,a={render:e=>({components:{CdrAbstract:n},setup(){return{args:e,defaultContent:i}},template:`<CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>`})},o={render:e=>({components:{CdrAbstract:n},setup(){return{args:e,defaultContent:i}},template:`
      <div>
        <p style="margin-bottom: 24px; color: #666;">
          Abstract provides fluid, responsive text that adapts based on container width. 
          Resize the viewport or the container to see the text size change.
        </p>
        
        <h3 style="margin-bottom: 8px;">Full Width Container</h3>
        <CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>
        
        <h3 style="margin: 32px 0 8px 0;">Constrained Container (540px max-width)</h3>
        <div style="max-width: 540px; border: 1px dashed #ff6b6b; padding: 16px; container-type: inline-size;">
          <CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>
        </div>
      </div>
    `})},s={render:()=>({components:{CdrAbstract:n},setup(){return{defaultContent:i}},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As paragraph (default)</p>
          <CdrAbstract tag="p">{{ defaultContent }}</CdrAbstract>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As span</p>
          <CdrAbstract tag="span">{{ defaultContent }}</CdrAbstract>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As h1</p>
          <CdrAbstract tag="h1">{{ defaultContent }}</CdrAbstract>
        </div>
      </div>
    `})},c={render:()=>({components:{CdrAbstract:n},template:`
      <article style="max-width: 800px;">
        <h1 style="margin-bottom: 16px;">Nutrition for Distance Running</h1>
        <CdrAbstract>
          Fueling well is the key to longevity and improvement in running. Our experts guide you 
          on filling your plate for your goals, whether you're training for a marathon or just 
          enjoying regular runs.
        </CdrAbstract>
        <div style="margin-top: 24px; color: #666;">
          <p>Article content would continue here...</p>
        </div>
      </article>
    `})},l={render:()=>({components:{CdrAbstract:n},template:`
      <div class="story-spacing story-spacing--vertical">
        <div style="max-width: 700px;">
          <h2>Trail Running Essentials</h2>
          <CdrAbstract>
            Discover the gear you need to tackle technical terrain with confidence. 
            From shoes to hydration systems, we've got you covered.
          </CdrAbstract>
        </div>
        
        <div style="max-width: 700px;">
          <h2>Winter Camping Guide</h2>
          <CdrAbstract>
            Learn how to stay warm and safe during cold-weather adventures. 
            Our experts share tips for gear selection, campsite setup, and more.
          </CdrAbstract>
        </div>
        
        <div style="max-width: 700px;">
          <h2>Beginner's Climbing Course</h2>
          <CdrAbstract>
            Start your climbing journey with proper technique and safety knowledge. 
            This comprehensive guide covers everything you need to know.
          </CdrAbstract>
        </div>
      </div>
    `})},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrAbstract
    },
    setup() {
      return {
        args,
        defaultContent
      };
    },
    template: '<CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>'
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrAbstract
    },
    setup() {
      return {
        args,
        defaultContent
      };
    },
    template: \`
      <div>
        <p style="margin-bottom: 24px; color: #666;">
          Abstract provides fluid, responsive text that adapts based on container width. 
          Resize the viewport or the container to see the text size change.
        </p>
        
        <h3 style="margin-bottom: 8px;">Full Width Container</h3>
        <CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>
        
        <h3 style="margin: 32px 0 8px 0;">Constrained Container (540px max-width)</h3>
        <div style="max-width: 540px; border: 1px dashed #ff6b6b; padding: 16px; container-type: inline-size;">
          <CdrAbstract v-bind="args">{{ defaultContent }}</CdrAbstract>
        </div>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAbstract
    },
    setup() {
      return {
        defaultContent
      };
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As paragraph (default)</p>
          <CdrAbstract tag="p">{{ defaultContent }}</CdrAbstract>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As span</p>
          <CdrAbstract tag="span">{{ defaultContent }}</CdrAbstract>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As h1</p>
          <CdrAbstract tag="h1">{{ defaultContent }}</CdrAbstract>
        </div>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAbstract
    },
    template: \`
      <article style="max-width: 800px;">
        <h1 style="margin-bottom: 16px;">Nutrition for Distance Running</h1>
        <CdrAbstract>
          Fueling well is the key to longevity and improvement in running. Our experts guide you 
          on filling your plate for your goals, whether you're training for a marathon or just 
          enjoying regular runs.
        </CdrAbstract>
        <div style="margin-top: 24px; color: #666;">
          <p>Article content would continue here...</p>
        </div>
      </article>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrAbstract
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div style="max-width: 700px;">
          <h2>Trail Running Essentials</h2>
          <CdrAbstract>
            Discover the gear you need to tackle technical terrain with confidence. 
            From shoes to hydration systems, we've got you covered.
          </CdrAbstract>
        </div>
        
        <div style="max-width: 700px;">
          <h2>Winter Camping Guide</h2>
          <CdrAbstract>
            Learn how to stay warm and safe during cold-weather adventures. 
            Our experts share tips for gear selection, campsite setup, and more.
          </CdrAbstract>
        </div>
        
        <div style="max-width: 700px;">
          <h2>Beginner's Climbing Course</h2>
          <CdrAbstract>
            Start your climbing journey with proper technique and safety knowledge. 
            This comprehensive guide covers everything you need to know.
          </CdrAbstract>
        </div>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}},u=[`Default`,`FluidResponsive`,`DifferentTags`,`InArticle`,`MultipleAbstracts`]}))();export{a as Default,s as DifferentTags,o as FluidResponsive,c as InArticle,l as MultipleAbstracts,u as __namedExportsOrder,r as default};