import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrGrid-B7PYSIiK.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{t(),r={title:`Components/Grid`,component:n,tags:[`autodocs`],args:{gutter:`medium@xs medium@sm large@md large@lg`,tag:`div`}},i=[1,2,3,4,5,6,7,8,9],a={render:e=>({components:{CdrGrid:n},setup(){return{args:e,items:i}},template:`
      <CdrGrid v-bind="args" style="grid-template-columns: repeat(3, 1fr);">
        <div 
          v-for="item in items" 
          :key="item"
          style="border: 1px solid #999; padding: 24px; text-align: center; background: #f5f5f5;"
        >
          {{ item }}
        </div>
      </CdrGrid>
    `})},o={render:()=>({components:{CdrGrid:n},setup(){return{items:i}},template:`
      <CdrGrid gutter="medium" style="grid-template-columns: repeat(3, 1fr);">
        <div 
          v-for="item in items" 
          :key="item"
          style="border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;"
        >
          Item {{ item }}
        </div>
      </CdrGrid>
    `})},s={render:()=>({components:{CdrGrid:n},setup(){return{items:i}},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Resize the viewport to see the grid change from 1 column (small) to 2 columns (medium) to 3 columns (large).
        </p>
        <CdrGrid 
          gutter="small@xs medium@sm large@md" 
          style="
            grid-template-columns: 1fr;
            
            @media (min-width: 768px) {
              grid-template-columns: repeat(2, 1fr);
            }
            
            @media (min-width: 1024px) {
              grid-template-columns: repeat(3, 1fr);
            }
          "
        >
          <div 
            v-for="item in items" 
            :key="item"
            style="border: 1px solid #999; padding: 16px; text-align: center;"
          >
            {{ item }}
          </div>
        </CdrGrid>
      </div>
    `})},c={render:()=>({components:{CdrGrid:n},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 8px;">None</h3>
          <CdrGrid gutter="none" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Small</h3>
          <CdrGrid gutter="small" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Medium</h3>
          <CdrGrid gutter="medium" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Large</h3>
          <CdrGrid gutter="large" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
      </div>
    `})},l={render:()=>({components:{CdrGrid:n},setup(){return{items:i}},template:`
      <CdrGrid tag="ul" gutter="medium" style="grid-template-columns: repeat(3, 1fr); list-style: none; padding: 0; margin: 0;">
        <li 
          v-for="item in items" 
          :key="item"
          style="border: 1px solid #999; padding: 16px; text-align: center;"
        >
          List Item {{ item }}
        </li>
      </CdrGrid>
    `})},u={render:()=>({components:{CdrGrid:n},template:`
      <CdrGrid gutter="large" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #e8f1fc; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 1</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #e5f5f0; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 2</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #fef3e5; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 3</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
      </CdrGrid>
    `})},d={render:()=>({components:{CdrGrid:n},template:`
      <CdrGrid 
        gutter="large" 
        style="
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
        "
      >
        <div style="grid-column: span 2; border: 2px solid #2c6ecb; padding: 24px; background: #e8f1fc;">
          Spans 2 columns
        </div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 1</div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 2</div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 3</div>
        <div style="grid-column: span 3; border: 2px solid #0a845f; padding: 24px; background: #e5f5f0;">
          Spans 3 columns
        </div>
      </CdrGrid>
    `})},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrGrid
    },
    setup() {
      return {
        args,
        items
      };
    },
    template: \`
      <CdrGrid v-bind="args" style="grid-template-columns: repeat(3, 1fr);">
        <div 
          v-for="item in items" 
          :key="item"
          style="border: 1px solid #999; padding: 24px; text-align: center; background: #f5f5f5;"
        >
          {{ item }}
        </div>
      </CdrGrid>
    \`
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    setup() {
      return {
        items
      };
    },
    template: \`
      <CdrGrid gutter="medium" style="grid-template-columns: repeat(3, 1fr);">
        <div 
          v-for="item in items" 
          :key="item"
          style="border: 2px dashed #2c6ecb; padding: 24px; text-align: center; background: #e8f1fc;"
        >
          Item {{ item }}
        </div>
      </CdrGrid>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    setup() {
      return {
        items
      };
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          Resize the viewport to see the grid change from 1 column (small) to 2 columns (medium) to 3 columns (large).
        </p>
        <CdrGrid 
          gutter="small@xs medium@sm large@md" 
          style="
            grid-template-columns: 1fr;
            
            @media (min-width: 768px) {
              grid-template-columns: repeat(2, 1fr);
            }
            
            @media (min-width: 1024px) {
              grid-template-columns: repeat(3, 1fr);
            }
          "
        >
          <div 
            v-for="item in items" 
            :key="item"
            style="border: 1px solid #999; padding: 16px; text-align: center;"
          >
            {{ item }}
          </div>
        </CdrGrid>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <h3 style="margin-bottom: 8px;">None</h3>
          <CdrGrid gutter="none" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Small</h3>
          <CdrGrid gutter="small" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Medium</h3>
          <CdrGrid gutter="medium" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
        
        <div>
          <h3 style="margin-bottom: 8px;">Large</h3>
          <CdrGrid gutter="large" style="grid-template-columns: repeat(4, 1fr);">
            <div v-for="i in 4" :key="i" style="border: 1px solid #999; padding: 16px; text-align: center; background: #f5f5f5;">{{ i }}</div>
          </CdrGrid>
        </div>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    setup() {
      return {
        items
      };
    },
    template: \`
      <CdrGrid tag="ul" gutter="medium" style="grid-template-columns: repeat(3, 1fr); list-style: none; padding: 0; margin: 0;">
        <li 
          v-for="item in items" 
          :key="item"
          style="border: 1px solid #999; padding: 16px; text-align: center;"
        >
          List Item {{ item }}
        </li>
      </CdrGrid>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    template: \`
      <CdrGrid gutter="large" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #e8f1fc; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 1</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #e5f5f0; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 2</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; background: white;">
          <div style="height: 150px; background: #fef3e5; border-radius: 4px; margin-bottom: 12px;"></div>
          <h4 style="margin: 0 0 8px 0;">Card Title 3</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">Card description goes here</p>
        </div>
      </CdrGrid>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrGrid
    },
    template: \`
      <CdrGrid 
        gutter="large" 
        style="
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
        "
      >
        <div style="grid-column: span 2; border: 2px solid #2c6ecb; padding: 24px; background: #e8f1fc;">
          Spans 2 columns
        </div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 1</div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 2</div>
        <div style="border: 1px solid #999; padding: 24px; background: #f5f5f5;">Column 3</div>
        <div style="grid-column: span 3; border: 2px solid #0a845f; padding: 24px; background: #e5f5f0;">
          Spans 3 columns
        </div>
      </CdrGrid>
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Default`,`ThreeColumns`,`ResponsiveColumns`,`GutterSizes`,`AsList`,`CardGrid`,`ComplexLayout`]}))();export{l as AsList,u as CardGrid,d as ComplexLayout,a as Default,c as GutterSizes,s as ResponsiveColumns,o as ThreeColumns,f as __namedExportsOrder,r as default};