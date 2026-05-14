import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrText-B9P_UOER.js";import{C as r,m as i,t as a,x as o}from"./componentOptions-jKL8eaN0.js";import{n as s,t as c}from"./CdrButton-DeOQTtxS.js";import{n as l,t as u}from"./CdrImg-CsEz-4ah.js";import{n as d,t as f}from"./CdrMediaObject-JVFHy6D_.js";var p,m,h,g=e((()=>{i(),p=a,m=r,h=o})),_,v,y,b,x,S,C,w,T,E;e((()=>{d(),l(),t(),s(),g(),_={title:`Components/MediaObject`,component:f,tags:[`autodocs`],args:{align:`start`,mediaPosition:`left`,mediaWidth:`1fr`,mediaHeight:`auto`,mediaCover:!1,overlay:!1,contentPadding:`zero`},argTypes:{align:{control:`select`,options:p,description:`Controls the cross-axis alignment of the media and content.`,table:{type:{summary:p.join(` | `)}}},mediaPosition:{control:`select`,options:m,description:`Sets where the media appears relative to the content.`,table:{type:{summary:m.join(` | `)}}},overlayRowAlign:{control:`select`,options:p,description:`Controls row alignment for overlay content.`,table:{type:{summary:p.join(` | `)}}},overlayColumnAlign:{control:`select`,options:p,description:`Controls column alignment for overlay content.`,table:{type:{summary:p.join(` | `)}}},contentPadding:{control:`select`,options:h,description:`Sets content padding using Cedar space tokens.`,table:{type:{summary:h.join(` | `)}}}}},v=`https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg`,y={render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Explore Yosemite</CdrText>
          <CdrText>
            Discover the breathtaking beauty of Yosemite National Park. 
            From towering granite cliffs to cascading waterfalls, Yosemite 
            offers unforgettable adventures for outdoor enthusiasts.
          </CdrText>
        </template>
      </CdrMediaObject>
    `})},b={args:{mediaPosition:`right`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Right</CdrText>
          <CdrText>
            This media object has the image positioned on the right side 
            with content on the left.
          </CdrText>
        </template>
      </CdrMediaObject>
    `})},x={args:{mediaPosition:`top`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n,CdrButton:c},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Top</CdrText>
          <CdrText>
            Vertical layout with media positioned above the content.
          </CdrText>
          <CdrButton modifier="secondary">Learn More</CdrButton>
        </template>
      </CdrMediaObject>
    `})},S={args:{contentPadding:`one-x`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">With Padding</CdrText>
          <CdrText>
            This media object has padding applied to the content area.
          </CdrText>
        </template>
      </CdrMediaObject>
    `})},C={args:{overlay:!0,overlayRowAlign:`end`,overlayColumnAlign:`start`,contentPadding:`one-and-a-half-x`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n,CdrButton:c},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" fit="cover" />
        </template>
        <template #content>
          <CdrText tag="h2" style="color: white;">Overlay Content</CdrText>
          <CdrText style="color: white;">
            Content overlays the media in this configuration.
          </CdrText>
          <CdrButton modifier="primary">Explore Now</CdrButton>
        </template>
      </CdrMediaObject>
    `})},w={args:{align:`center`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="1/1" />
        </template>
        <template #content>
          <CdrText tag="h3">Centered Alignment</CdrText>
          <CdrText>
            The media and content are center-aligned vertically in this example.
          </CdrText>
        </template>
      </CdrMediaObject>
    `})},T={args:{mediaCover:!0,mediaWidth:`200px`},render:e=>({components:{CdrMediaObject:f,CdrImg:u,CdrText:n},setup(){return{args:e,imageSrc:v}},template:`
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" />
        </template>
        <template #content>
          <CdrText tag="h3">Media Cover</CdrText>
          <CdrText>
            The mediaCover prop makes the image fill its container using object-fit: cover.
          </CdrText>
        </template>
      </CdrMediaObject>
    `})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Explore Yosemite</CdrText>
          <CdrText>
            Discover the breathtaking beauty of Yosemite National Park. 
            From towering granite cliffs to cascading waterfalls, Yosemite 
            offers unforgettable adventures for outdoor enthusiasts.
          </CdrText>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    mediaPosition: 'right'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Right</CdrText>
          <CdrText>
            This media object has the image positioned on the right side 
            with content on the left.
          </CdrText>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    mediaPosition: 'top'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Top</CdrText>
          <CdrText>
            Vertical layout with media positioned above the content.
          </CdrText>
          <CdrButton modifier="secondary">Learn More</CdrButton>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    contentPadding: 'one-x'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">With Padding</CdrText>
          <CdrText>
            This media object has padding applied to the content area.
          </CdrText>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    overlay: true,
    overlayRowAlign: 'end',
    overlayColumnAlign: 'start',
    contentPadding: 'one-and-a-half-x'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" fit="cover" />
        </template>
        <template #content>
          <CdrText tag="h2" style="color: white;">Overlay Content</CdrText>
          <CdrText style="color: white;">
            Content overlays the media in this configuration.
          </CdrText>
          <CdrButton modifier="primary">Explore Now</CdrButton>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'center'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="1/1" />
        </template>
        <template #content>
          <CdrText tag="h3">Centered Alignment</CdrText>
          <CdrText>
            The media and content are center-aligned vertically in this example.
          </CdrText>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    mediaCover: true,
    mediaWidth: '200px'
  },
  render: args => ({
    components: {
      CdrMediaObject,
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
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" />
        </template>
        <template #content>
          <CdrText tag="h3">Media Cover</CdrText>
          <CdrText>
            The mediaCover prop makes the image fill its container using object-fit: cover.
          </CdrText>
        </template>
      </CdrMediaObject>
    \`
  })
}`,...T.parameters?.docs?.source}}},E=[`Default`,`MediaRight`,`MediaTop`,`WithContentPadding`,`WithOverlay`,`CenteredAlignment`,`WithCover`]}))();export{w as CenteredAlignment,y as Default,b as MediaRight,x as MediaTop,S as WithContentPadding,T as WithCover,C as WithOverlay,E as __namedExportsOrder,_ as default};