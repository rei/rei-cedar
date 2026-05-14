import{n as e}from"./chunk-BneVvdWh.js";import{d as t,f as n,m as r,p as i}from"./componentOptions-jKL8eaN0.js";import{n as a,t as o}from"./CdrImg-CsEz-4ah.js";var s,c,l,u,d,f,p,m,h,g;e((()=>{a(),r(),s={title:`Components/Img`,component:o,tags:[`autodocs`],args:{src:`https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md`,alt:`Outdoor landscape`,loading:`lazy`},argTypes:{fit:{control:`select`,options:t,description:`Object fit of the image, passes value to CSS object-fit property`,table:{type:{summary:t.join(` | `)}}},radius:{control:`select`,options:i,description:`Border radius of the image`,table:{type:{summary:`${i.join(` | `)} | string`}}},loading:{control:`select`,options:n,description:`Value for loading attribute`,table:{type:{summary:n.join(` | `)},defaultValue:{summary:`lazy`}}}}},c={render:e=>({components:{CdrImg:o},setup(){return{args:e}},template:`<CdrImg v-bind="args" style="max-width: 600px;" />`})},l={render:()=>({components:{CdrImg:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">16:9 (Landscape)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Landscape" 
            ratio="16/9"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">4:3 (Standard)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Standard" 
            ratio="4/3"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">1:1 (Square)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Square" 
            ratio="1/1"
            style="max-width: 400px; background-color: lightskyblue;"
          />
        </div>
      </div>
    `})},u={render:()=>({components:{CdrImg:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Cover (default)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Cover" 
            ratio="4/1"
            fit="cover"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Contain</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Contain" 
            ratio="4/1"
            fit="contain"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
      </div>
    `})},d={render:()=>({components:{CdrImg:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Center (default)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Center" 
            ratio="4/1"
            fit="cover"
            position="center"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Top</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Top" 
            ratio="4/1"
            fit="cover"
            position="top"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Bottom Left</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Bottom left" 
            ratio="4/1"
            fit="cover"
            position="bottom left"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Custom (10% 75%)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Custom position" 
            ratio="4/1"
            fit="cover"
            position="10% 75%"
            style="max-width: 600px;"
          />
        </div>
      </div>
    `})},f={render:()=>({components:{CdrImg:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Soft (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Soft radius" 
            radius="soft"
            style="max-width: 400px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Softer (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Softer radius" 
            radius="softer"
            style="max-width: 400px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Round (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Round" 
            radius="round"
            ratio="1/1"
            style="max-width: 300px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Custom (33%)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Custom radius" 
            radius="33%"
            style="max-width: 400px;"
          />
        </div>
      </div>
    `})},p={render:()=>({components:{CdrImg:o},template:`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
            Square aspect ratio + Round border + Cover fit
          </p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Combined properties" 
            ratio="1/1"
            fit="cover"
            radius="round"
            position="center"
            style="max-width: 300px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
            16:9 aspect ratio + Soft border + Cover fit + Top position
          </p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Combined properties" 
            ratio="16/9"
            fit="cover"
            radius="soft"
            position="top"
            style="max-width: 600px;"
          />
        </div>
      </div>
    `})},m={render:()=>({components:{CdrImg:o},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This image uses srcset for responsive loading. The browser will choose the appropriate size.
        </p>
        <CdrImg 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          srcset="
            https://www.rei.com/dam/gerlach_090622_0135_web_sm.jpeg?t=ea16by9md 400w,
            https://www.rei.com/dam/gerlach_090622_0135_web_md.jpeg?t=ea16by9md 800w,
            https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md 1200w
          "
          sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
          alt="Responsive image" 
          ratio="16/9"
          style="max-width: 100%;"
        />
      </div>
    `})},h={render:()=>({components:{CdrImg:o},template:`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This image uses lazy loading. It will only load when it comes into the viewport.
        </p>
        <div style="height: 100vh; background: #f5f5f5; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <p>Scroll down to see the lazy-loaded image</p>
        </div>
        <CdrImg 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          alt="Lazy loaded image" 
          loading="lazy"
          ratio="16/9"
          style="max-width: 600px;"
        />
      </div>
    `})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrImg
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrImg v-bind="args" style="max-width: 600px;" />'
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">16:9 (Landscape)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Landscape" 
            ratio="16/9"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">4:3 (Standard)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Standard" 
            ratio="4/3"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">1:1 (Square)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Square" 
            ratio="1/1"
            style="max-width: 400px; background-color: lightskyblue;"
          />
        </div>
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Cover (default)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Cover" 
            ratio="4/1"
            fit="cover"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Contain</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Contain" 
            ratio="4/1"
            fit="contain"
            style="max-width: 600px; background-color: lightskyblue;"
          />
        </div>
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Center (default)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Center" 
            ratio="4/1"
            fit="cover"
            position="center"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Top</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Top" 
            ratio="4/1"
            fit="cover"
            position="top"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Bottom Left</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Bottom left" 
            ratio="4/1"
            fit="cover"
            position="bottom left"
            style="max-width: 600px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Custom (10% 75%)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Custom position" 
            ratio="4/1"
            fit="cover"
            position="10% 75%"
            style="max-width: 600px;"
          />
        </div>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Soft (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Soft radius" 
            radius="soft"
            style="max-width: 400px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Softer (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Softer radius" 
            radius="softer"
            style="max-width: 400px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Round (token)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Round" 
            radius="round"
            ratio="1/1"
            style="max-width: 300px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">Custom (33%)</p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Custom radius" 
            radius="33%"
            style="max-width: 400px;"
          />
        </div>
      </div>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div class="story-spacing story-spacing--vertical">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
            Square aspect ratio + Round border + Cover fit
          </p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Combined properties" 
            ratio="1/1"
            fit="cover"
            radius="round"
            position="center"
            style="max-width: 300px;"
          />
        </div>
        
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
            16:9 aspect ratio + Soft border + Cover fit + Top position
          </p>
          <CdrImg 
            src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
            alt="Combined properties" 
            ratio="16/9"
            fit="cover"
            radius="soft"
            position="top"
            style="max-width: 600px;"
          />
        </div>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This image uses srcset for responsive loading. The browser will choose the appropriate size.
        </p>
        <CdrImg 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          srcset="
            https://www.rei.com/dam/gerlach_090622_0135_web_sm.jpeg?t=ea16by9md 400w,
            https://www.rei.com/dam/gerlach_090622_0135_web_md.jpeg?t=ea16by9md 800w,
            https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md 1200w
          "
          sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
          alt="Responsive image" 
          ratio="16/9"
          style="max-width: 100%;"
        />
      </div>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrImg
    },
    template: \`
      <div>
        <p style="margin-bottom: 16px; color: #666;">
          This image uses lazy loading. It will only load when it comes into the viewport.
        </p>
        <div style="height: 100vh; background: #f5f5f5; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <p>Scroll down to see the lazy-loaded image</p>
        </div>
        <CdrImg 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          alt="Lazy loaded image" 
          loading="lazy"
          ratio="16/9"
          style="max-width: 600px;"
        />
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g=[`Default`,`AspectRatios`,`ObjectFit`,`ObjectPosition`,`BorderRadius`,`Combined`,`ResponsiveImage`,`LazyLoading`]}))();export{l as AspectRatios,f as BorderRadius,p as Combined,c as Default,h as LazyLoading,u as ObjectFit,d as ObjectPosition,m as ResponsiveImage,g as __namedExportsOrder,s as default};