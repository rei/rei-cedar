import{n as e}from"./chunk-BneVvdWh.js";import{T as t,_ as n,l as r,m as i}from"./componentOptions-jKL8eaN0.js";import{t as a}from"./CdrLayout-BDwFugkq.js";import{r as o}from"./CdrChoreographer-DQagLEMl.js";var s,c,l,u=e((()=>{i(),s=t,c=r,l=n})),d,f,p,m,h,g,_,v,y,b,x,S;e((()=>{o(),u(),d={title:`Components/CdrLayout`,component:a,tags:[`autodocs`],argTypes:{queryType:{control:`select`,options:s,description:`Chooses whether the layout responds to container or media queries.`,table:{type:{summary:s.join(` | `)}}},flow:{control:`select`,options:c,description:`Controls whether auto-placement flows by row or by column.`,table:{type:{summary:c.join(` | `)}}},gap:{control:`select`,options:l,description:`Sets the gap between rows and columns using Cedar space tokens.`,table:{type:{summary:l.join(` | `)}}},rowGap:{control:`select`,options:l,description:`Sets the row gap using Cedar space tokens.`,table:{type:{summary:l.join(` | `)}}},columnGap:{control:`select`,options:l,description:`Sets the column gap using Cedar space tokens.`,table:{type:{summary:l.join(` | `)}}}}},f=({color:e=`#0067A0`,height:t=`100px`})=>`
  <div style="background: ${e}; border-radius: 4px; padding: 16px; color: white; display: flex; align-items: center; justify-content: center; min-height: ${t};">
    Item
  </div>
`,p={args:{columns:`3`,gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e,Box:f}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#0067A0`})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
      </CdrLayout>
    `})},m={args:{columns:`2`,gap:`two-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#0067A0`})}
      </CdrLayout>
    `})},h={args:{columns:`4`,gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
        ${f({color:`#0067A0`})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
      </CdrLayout>
    `})},g={args:{columns:`1fr 2fr 1fr`,gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
      </CdrLayout>
    `})},_={args:{columns:`3`,rows:`2`,gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
        ${f({color:`#0067A0`})}
        ${f({color:`#00A3AD`})}
      </CdrLayout>
    `})},v={args:{columns:`3`,rowGap:`two-x`,columnGap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
        ${f({color:`#0067A0`})}
        ${f({color:`#00A3AD`})}
      </CdrLayout>
    `})},y={args:{columns:`repeat(auto-fit, minmax(150px, 1fr))`,gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
        ${f({color:`#0067A0`})}
      </CdrLayout>
    `})},b={args:{columns:{xs:`1`,sm:`2`,md:`3`,lg:`4`},gap:`one-x`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
        ${f({color:`#0067A0`})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#E94E1B`})}
      </CdrLayout>
    `})},x={args:{columns:`2`,gap:`two-x`,as:`section`},render:e=>({components:{CdrLayout:a},setup(){return{args:e}},template:`
      <CdrLayout v-bind="args">
        ${f({})}
        ${f({color:`#00A3AD`})}
        ${f({color:`#78BE20`})}
        ${f({color:`#0067A0`})}
      </CdrLayout>
    `})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '3',
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args,
        Box
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#0067A0'
    })}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
      </CdrLayout>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '2',
    gap: 'two-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#0067A0'
    })}
      </CdrLayout>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '4',
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
        \${Box({
      color: '#0067A0'
    })}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
      </CdrLayout>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '1fr 2fr 1fr',
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
      </CdrLayout>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '3',
    rows: '2',
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
        \${Box({
      color: '#0067A0'
    })}
        \${Box({
      color: '#00A3AD'
    })}
      </CdrLayout>
    \`
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '3',
    rowGap: 'two-x',
    columnGap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
        \${Box({
      color: '#0067A0'
    })}
        \${Box({
      color: '#00A3AD'
    })}
      </CdrLayout>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    columns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
        \${Box({
      color: '#0067A0'
    })}
      </CdrLayout>
    \`
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    columns: {
      xs: '1',
      sm: '2',
      md: '3',
      lg: '4'
    },
    gap: 'one-x'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
        \${Box({
      color: '#0067A0'
    })}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#E94E1B'
    })}
      </CdrLayout>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    columns: '2',
    gap: 'two-x',
    as: 'section'
  },
  render: (args: any) => ({
    components: {
      CdrLayout
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrLayout v-bind="args">
        \${Box({})}
        \${Box({
      color: '#00A3AD'
    })}
        \${Box({
      color: '#78BE20'
    })}
        \${Box({
      color: '#0067A0'
    })}
      </CdrLayout>
    \`
  })
}`,...x.parameters?.docs?.source}}},S=[`Default`,`TwoColumns`,`FourColumns`,`CustomColumnSizes`,`WithRowsAndColumns`,`DifferentGaps`,`AutoFlow`,`ResponsiveColumns`,`AsSection`]}))();export{x as AsSection,y as AutoFlow,g as CustomColumnSizes,p as Default,v as DifferentGaps,h as FourColumns,b as ResponsiveColumns,m as TwoColumns,_ as WithRowsAndColumns,S as __namedExportsOrder,d as default};