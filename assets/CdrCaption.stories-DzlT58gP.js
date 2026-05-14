import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrCaption-DbVnjUB2.js";var r,i,a,o,s,c,l;e((()=>{t(),r={title:`Components/Caption`,component:n,tags:[`autodocs`],args:{summary:`Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam.`,credit:`Photo by John Doe`}},i={render:e=>({components:{CdrCaption:n},setup(){return{args:e}},template:`<CdrCaption v-bind="args" />`})},a={render:()=>({components:{CdrCaption:n},template:`
      <CdrCaption 
        summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni?"
      />
    `})},o={render:()=>({components:{CdrCaption:n},template:`
      <CdrCaption credit="Photo by Jane Smith" />
    `})},s={render:()=>({components:{CdrCaption:n},template:`
      <figure style="margin: 0;">
        <img 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          alt="Outdoor scene" 
          style="width: 100%; max-width: 600px; height: auto;"
        />
        <figcaption>
          <CdrCaption
            summary="A beautiful outdoor landscape showcasing the natural environment."
            credit="Photo by REI Photography Team"
          />
        </figcaption>
      </figure>
    `})},c={render:()=>({components:{CdrCaption:n},template:`
      <div style="max-width: 600px;">
        <CdrCaption
          summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          credit="Photo credit: Lorem ipsum dolor sit amet consectetur adipisicing"
        />
      </div>
    `})},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrCaption
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrCaption v-bind="args" />'
  })
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCaption
    },
    template: \`
      <CdrCaption 
        summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni?"
      />
    \`
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCaption
    },
    template: \`
      <CdrCaption credit="Photo by Jane Smith" />
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCaption
    },
    template: \`
      <figure style="margin: 0;">
        <img 
          src="https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md" 
          alt="Outdoor scene" 
          style="width: 100%; max-width: 600px; height: auto;"
        />
        <figcaption>
          <CdrCaption
            summary="A beautiful outdoor landscape showcasing the natural environment."
            credit="Photo by REI Photography Team"
          />
        </figcaption>
      </figure>
    \`
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrCaption
    },
    template: \`
      <div style="max-width: 600px;">
        <CdrCaption
          summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores odio fuga reiciendis blanditiis magni? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          credit="Photo credit: Lorem ipsum dolor sit amet consectetur adipisicing"
        />
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l=[`Default`,`SummaryOnly`,`CreditOnly`,`InFigure`,`LongContent`]}))();export{o as CreditOnly,i as Default,s as InFigure,c as LongContent,a as SummaryOnly,l as __namedExportsOrder,r as default};