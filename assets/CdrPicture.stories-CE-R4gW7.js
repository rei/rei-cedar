import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrPicture-BwFChXGK.js";var r,i,a,o,s,c,l,u,d,f;e((()=>{t(),r={title:`Components/Picture`,component:n,tags:[`autodocs`],args:{alt:`Outdoor adventure`}},i=`https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg`,a=`https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.webp`,o={args:{src:i,sources:{source1:{media:`(min-width: 1024px)`,srcset:i}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <CdrPicture v-bind="args" />
    `})},s={args:{src:i,sources:{webp:{media:`(min-width: 0px)`,srcset:a,type:`image/webp`},fallback:{media:`(min-width: 0px)`,srcset:i,type:`image/jpeg`}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <CdrPicture v-bind="args" />
    `})},c={args:{src:i,sources:{large:{media:`(min-width: 1024px)`,srcset:i,width:`1200`,height:`675`},medium:{media:`(min-width: 768px)`,srcset:i,width:`800`,height:`450`},small:{media:`(min-width: 0px)`,srcset:i,width:`400`,height:`225`}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <CdrPicture v-bind="args" />
    `})},l={args:{src:i,ratio:`16/9`,fit:`cover`,sources:{source1:{media:`(min-width: 0px)`,srcset:i}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <CdrPicture v-bind="args" />
    `})},u={args:{src:i,ratio:`1/1`,fit:`cover`,sources:{source1:{media:`(min-width: 0px)`,srcset:i}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <div style="max-width: 400px;">
        <CdrPicture v-bind="args" />
      </div>
    `})},d={args:{src:i,ratio:`16/9`,sources:{avif:{media:`(min-width: 0px)`,srcset:a,type:`image/avif`},webp:{media:`(min-width: 0px)`,srcset:a,type:`image/webp`},jpeg:{media:`(min-width: 0px)`,srcset:i,type:`image/jpeg`}}},render:e=>({components:{CdrPicture:n},setup(){return{args:e}},template:`
      <CdrPicture v-bind="args" />
    `})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    sources: {
      source1: {
        media: '(min-width: 1024px)',
        srcset: imageSrc
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrPicture v-bind="args" />
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    sources: {
      webp: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/webp'
      },
      fallback: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        type: 'image/jpeg'
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrPicture v-bind="args" />
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    sources: {
      large: {
        media: '(min-width: 1024px)',
        srcset: imageSrc,
        width: '1200',
        height: '675'
      },
      medium: {
        media: '(min-width: 768px)',
        srcset: imageSrc,
        width: '800',
        height: '450'
      },
      small: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        width: '400',
        height: '225'
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrPicture v-bind="args" />
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    ratio: '16/9',
    fit: 'cover',
    sources: {
      source1: {
        media: '(min-width: 0px)',
        srcset: imageSrc
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrPicture v-bind="args" />
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    ratio: '1/1',
    fit: 'cover',
    sources: {
      source1: {
        media: '(min-width: 0px)',
        srcset: imageSrc
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="max-width: 400px;">
        <CdrPicture v-bind="args" />
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    src: imageSrc,
    ratio: '16/9',
    sources: {
      avif: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/avif'
      },
      webp: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/webp'
      },
      jpeg: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        type: 'image/jpeg'
      }
    }
  },
  render: args => ({
    components: {
      CdrPicture
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrPicture v-bind="args" />
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Default`,`WithWebP`,`ResponsiveSources`,`WithAspectRatio`,`SquareRatio`,`MultipleFormats`]}))();export{o as Default,d as MultipleFormats,c as ResponsiveSources,u as SquareRatio,l as WithAspectRatio,s as WithWebP,f as __namedExportsOrder,r as default};