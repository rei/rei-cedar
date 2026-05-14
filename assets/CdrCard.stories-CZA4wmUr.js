import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrText-B9P_UOER.js";import{n as r,t as i}from"./CdrLink-v_BmLy7y.js";import{n as a,t as o}from"./CdrButton-DeOQTtxS.js";import{n as s,t as c}from"./CdrCard-q6UbtKTc.js";var l,u,d,f,p,m,h,g;e((()=>{s(),a(),r(),t(),l={title:`Components/Card`,component:c,tags:[`autodocs`],args:{tag:`article`}},u={render:e=>({components:{CdrCard:c,CdrText:n},setup(){return{args:e}},template:`
      <CdrCard v-bind="args" style="max-width: 300px; padding: 16px;">
        <CdrText>
          <h3>Card Title</h3>
          <p>This is some card content that describes the item or provides additional context.</p>
        </CdrText>
      </CdrCard>
    `})},d={render:()=>({components:{CdrCard:c,CdrButton:o,CdrLink:i,CdrText:n},template:`
      <CdrCard style="max-width: 280px;">
        <div style="aspect-ratio: 1; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <span style="color: #666;">Product Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone">
              <h3 style="margin: 0 0 8px 0;">Trail Running Shoes</h3>
            </CdrLink>
            <p style="color: #666; margin: 0 0 8px 0;">Lightweight and durable for all terrains</p>
            <p style="font-weight: bold; margin: 0 0 16px 0;">$129.99</p>
          </CdrText>
          <CdrButton full-width>Add to Cart</CdrButton>
        </div>
      </CdrCard>
    `})},f={render:()=>({components:{CdrCard:c,CdrLink:i,CdrText:n},template:`
      <CdrCard style="max-width: 350px;">
        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); display: flex; align-items: center; justify-content: center;">
          <span style="color: white;">Featured Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <span style="text-transform: uppercase; font-size: 12px; color: #666; letter-spacing: 1px;">Expert Advice</span>
            <h3 style="margin: 8px 0;">
              <CdrLink href="#">10 Tips for Your First Backpacking Trip</CdrLink>
            </h3>
            <p style="color: #666; margin: 0;">Learn essential skills and gear recommendations from our outdoor experts.</p>
          </CdrText>
        </div>
      </CdrCard>
    `})},p={render:()=>({components:{CdrCard:c,CdrLink:i,CdrText:n},template:`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Camping</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Tents, sleeping bags, and more</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Hiking</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Boots, packs, and trail gear</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Climbing</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Ropes, harnesses, and hardware</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Cycling</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Bikes, helmets, and accessories</p>
          </CdrText>
        </CdrCard>
      </div>
    `})},m={render:()=>({components:{CdrCard:c,CdrText:n,CdrButton:o},template:`
      <CdrCard style="max-width: 400px; padding: 24px; text-align: center;">
        <CdrText>
          <div style="width: 64px; height: 64px; background: #2d5a27; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h3 style="margin: 0 0 8px 0;">Thank You!</h3>
          <p style="color: #666; margin: 0 0 16px 0;">Your membership has been renewed. You'll receive a confirmation email shortly.</p>
        </CdrText>
        <CdrButton modifier="secondary">View Account</CdrButton>
      </CdrCard>
    `})},h={args:{tag:`section`},render:e=>({components:{CdrCard:c,CdrText:n},setup(){return{args:e}},template:`
      <CdrCard v-bind="args" style="padding: 24px;">
        <CdrText>
          <h2>Section Card</h2>
          <p>This card uses a section tag instead of article, suitable for grouping related content.</p>
        </CdrText>
      </CdrCard>
    `})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrCard,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrCard v-bind="args" style="max-width: 300px; padding: 16px;">
        <CdrText>
          <h3>Card Title</h3>
          <p>This is some card content that describes the item or provides additional context.</p>
        </CdrText>
      </CdrCard>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCard,
      CdrButton,
      CdrLink,
      CdrText
    },
    template: \`
      <CdrCard style="max-width: 280px;">
        <div style="aspect-ratio: 1; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <span style="color: #666;">Product Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone">
              <h3 style="margin: 0 0 8px 0;">Trail Running Shoes</h3>
            </CdrLink>
            <p style="color: #666; margin: 0 0 8px 0;">Lightweight and durable for all terrains</p>
            <p style="font-weight: bold; margin: 0 0 16px 0;">$129.99</p>
          </CdrText>
          <CdrButton full-width>Add to Cart</CdrButton>
        </div>
      </CdrCard>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCard,
      CdrLink,
      CdrText
    },
    template: \`
      <CdrCard style="max-width: 350px;">
        <div style="aspect-ratio: 16/9; background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); display: flex; align-items: center; justify-content: center;">
          <span style="color: white;">Featured Image</span>
        </div>
        <div style="padding: 16px;">
          <CdrText>
            <span style="text-transform: uppercase; font-size: 12px; color: #666; letter-spacing: 1px;">Expert Advice</span>
            <h3 style="margin: 8px 0;">
              <CdrLink href="#">10 Tips for Your First Backpacking Trip</CdrLink>
            </h3>
            <p style="color: #666; margin: 0;">Learn essential skills and gear recommendations from our outdoor experts.</p>
          </CdrText>
        </div>
      </CdrCard>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCard,
      CdrLink,
      CdrText
    },
    template: \`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;">
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Camping</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Tents, sleeping bags, and more</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Hiking</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Boots, packs, and trail gear</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Climbing</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Ropes, harnesses, and hardware</p>
          </CdrText>
        </CdrCard>
        <CdrCard style="padding: 16px;">
          <CdrText>
            <CdrLink href="#" modifier="standalone"><h4>Cycling</h4></CdrLink>
            <p style="font-size: 14px; color: #666;">Bikes, helmets, and accessories</p>
          </CdrText>
        </CdrCard>
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCard,
      CdrText,
      CdrButton
    },
    template: \`
      <CdrCard style="max-width: 400px; padding: 24px; text-align: center;">
        <CdrText>
          <div style="width: 64px; height: 64px; background: #2d5a27; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h3 style="margin: 0 0 8px 0;">Thank You!</h3>
          <p style="color: #666; margin: 0 0 16px 0;">Your membership has been renewed. You'll receive a confirmation email shortly.</p>
        </CdrText>
        <CdrButton modifier="secondary">View Account</CdrButton>
      </CdrCard>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    tag: 'section'
  },
  render: args => ({
    components: {
      CdrCard,
      CdrText
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrCard v-bind="args" style="padding: 24px;">
        <CdrText>
          <h2>Section Card</h2>
          <p>This card uses a section tag instead of article, suitable for grouping related content.</p>
        </CdrText>
      </CdrCard>
    \`
  })
}`,...h.parameters?.docs?.source}}},g=[`Default`,`ProductCard`,`ArticleCard`,`CardGrid`,`InfoCard`,`AsSection`]}))();export{f as ArticleCard,h as AsSection,p as CardGrid,u as Default,m as InfoCard,d as ProductCard,g as __namedExportsOrder,l as default};