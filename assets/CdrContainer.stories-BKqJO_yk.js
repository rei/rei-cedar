import{n as e}from"./chunk-BneVvdWh.js";import{m as t,s as n}from"./componentOptions-jKL8eaN0.js";import{n as r,t as i}from"./CdrContainer-BDfTs8hn.js";var a,o,s,c,l,u,d,f,p;e((()=>{r(),t(),a={title:`Components/Container`,component:i,tags:[`autodocs`],args:{tag:`div`,modifier:`static`},argTypes:{modifier:{control:`select`,options:n,description:`Controls whether container is static or fluid width`,table:{type:{summary:n.join(` | `)},defaultValue:{summary:`static`}}}}},o={render:e=>({components:{CdrContainer:i},setup(){return{args:e}},template:`
      <CdrContainer v-bind="args">
        <div style="width: 100%; border: 2px dashed #999; padding: 24px; text-align: center; background: #f5f5f5;">
          Container Content
        </div>
      </CdrContainer>
    `})},s={render:()=>({components:{CdrContainer:i},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Static container has a maximum width and centers content.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="static">
          <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
            Static Container
          </div>
        </CdrContainer>
      </div>
    `})},c={render:()=>({components:{CdrContainer:i},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Fluid container spans the full width with responsive padding.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="fluid">
          <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
            Fluid Container
          </div>
        </CdrContainer>
      </div>
    `})},l={render:()=>({components:{CdrContainer:i},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 12px;">Static Container</h3>
          <CdrContainer modifier="static">
            <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
              Max width, centered
            </div>
          </CdrContainer>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Fluid Container</h3>
          <CdrContainer modifier="fluid">
            <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
              Full width, responsive padding
            </div>
          </CdrContainer>
        </div>
      </div>
    `})},u={render:()=>({components:{CdrContainer:i},template:`
      <CdrContainer modifier="static">
        <article style="padding: 24px 0;">
          <h1 style="margin-bottom: 16px;">Article Title</h1>
          <p style="margin-bottom: 12px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris.
          </p>
          <p style="margin-bottom: 12px;">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </article>
      </CdrContainer>
    `})},d={render:()=>({components:{CdrContainer:i},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As div (default)</p>
          <CdrContainer tag="div" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as div</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As section</p>
          <CdrContainer tag="section" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as section</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As main</p>
          <CdrContainer tag="main" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as main</div>
          </CdrContainer>
        </div>
      </div>
    `})},f={render:()=>({components:{CdrContainer:i},template:`
      <CdrContainer modifier="fluid">
        <div style="border: 2px dashed #999; padding: 24px; background: #f9f9f9;">
          <p style="margin-bottom: 16px;">Outer Fluid Container</p>
          <CdrContainer modifier="static">
            <div style="border: 2px dashed #2c6ecb; padding: 24px; background: #fff;">
              Inner Static Container
            </div>
          </CdrContainer>
        </div>
      </CdrContainer>
    `})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrContainer
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrContainer v-bind="args">
        <div style="width: 100%; border: 2px dashed #999; padding: 24px; text-align: center; background: #f5f5f5;">
          Container Content
        </div>
      </CdrContainer>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Static container has a maximum width and centers content.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="static">
          <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
            Static Container
          </div>
        </CdrContainer>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Fluid container spans the full width with responsive padding.
          Resize the viewport to see how it behaves.
        </p>
        <CdrContainer modifier="fluid">
          <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
            Fluid Container
          </div>
        </CdrContainer>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 12px;">Static Container</h3>
          <CdrContainer modifier="static">
            <div style="width: 100%; border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;">
              Max width, centered
            </div>
          </CdrContainer>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Fluid Container</h3>
          <CdrContainer modifier="fluid">
            <div style="width: 100%; border: 2px dashed #0a845f; padding: 24px; text-align: center; background: #e5f5f0;">
              Full width, responsive padding
            </div>
          </CdrContainer>
        </div>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <CdrContainer modifier="static">
        <article style="padding: 24px 0;">
          <h1 style="margin-bottom: 16px;">Article Title</h1>
          <p style="margin-bottom: 12px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris.
          </p>
          <p style="margin-bottom: 12px;">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </article>
      </CdrContainer>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As div (default)</p>
          <CdrContainer tag="div" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as div</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As section</p>
          <CdrContainer tag="section" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as section</div>
          </CdrContainer>
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">As main</p>
          <CdrContainer tag="main" modifier="static">
            <div style="border: 1px solid #999; padding: 16px;">Container as main</div>
          </CdrContainer>
        </div>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrContainer
    },
    template: \`
      <CdrContainer modifier="fluid">
        <div style="border: 2px dashed #999; padding: 24px; background: #f9f9f9;">
          <p style="margin-bottom: 16px;">Outer Fluid Container</p>
          <CdrContainer modifier="static">
            <div style="border: 2px dashed #2c6ecb; padding: 24px; background: #fff;">
              Inner Static Container
            </div>
          </CdrContainer>
        </div>
      </CdrContainer>
    \`
  })
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Static`,`Fluid`,`Comparison`,`WithRealContent`,`DifferentTags`,`NestedContainers`]}))();export{l as Comparison,o as Default,d as DifferentTags,c as Fluid,f as NestedContainers,s as Static,u as WithRealContent,p as __namedExportsOrder,a as default};