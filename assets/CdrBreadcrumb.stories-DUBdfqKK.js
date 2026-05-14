import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./CdrBreadcrumb-ufQMdfR8.js";var r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),r={title:`Components/Breadcrumb`,component:n,tags:[`autodocs`],args:{truncationEnabled:!0}},i=[{item:{url:`http://google.com`,name:`Item 1`}},{item:{url:`http://rei.com`,name:`Item 2`}}],a=[{item:{url:`http://google.com`,name:`Breadcrumb 1`}},{item:{url:`http://rei.com`,name:`Longer Breadcrumb 2`}},{item:{url:`http://yahoo.com`,name:`Breadcrumb 3`}},{item:{url:`http://bing.com`,name:`Really Really Long Breadcrumb 4`}},{item:{url:`http://bing.com`,name:`Breadcrumb 5`}}],o=[{item:{url:`http://google.com`,name:`Long Breadcrumb Item 1`}},{item:{url:`http://rei.com`,name:`Super Long Breadcrumb Item 2`}},{item:{url:`http://yahoo.com`,name:`Super Really Long Breadcrumb Item 3`}}],s=[{item:{url:`http://rei.com`,name:`Clothing`}},{item:{url:`http://rei.com`,name:`Clothing Accessories`}},{item:{url:`http://rei.com`,name:`Gloves and Mittens`}},{item:{url:`http://rei.com`,name:`Gloves`}},{item:{url:`http://rei.com`,name:`Snowsports Gloves`}},{item:{url:`http://rei.com`,name:`Cross-Country Ski Gloves`}},{item:{url:`http://rei.com`,name:`Women's Cross-Country Ski Gloves`}}],c={args:{items:i,id:`two-item-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e}},template:`<CdrBreadcrumb v-bind="args" />`})},l={args:{items:o,id:`three-item-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e}},template:`<CdrBreadcrumb v-bind="args" />`})},u={args:{items:a,truncationEnabled:!0,id:`ellipsis-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e}},template:`<CdrBreadcrumb v-bind="args" />`})},d={args:{items:s,id:`longest-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e}},template:`<CdrBreadcrumb v-bind="args" />`})},f={args:{items:i,id:`navigate-event-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e,handleNavigate:(e,t)=>{t.preventDefault(),console.log(`Navigated to:`,e.item),alert(`Navigated to: ${e.item.name}`)}}},template:`<CdrBreadcrumb v-bind="args" @navigate="handleNavigate" />`})},p={args:{items:a,truncationEnabled:!1,id:`no-truncation-breadcrumb`},render:e=>({components:{CdrBreadcrumb:n},setup(){return{args:e}},template:`<CdrBreadcrumb v-bind="args" />`})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: shortBreadcrumbItems,
    id: 'two-item-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrBreadcrumb v-bind="args" />'
  })
}`,...c.parameters?.docs?.source},description:{story:`Two-item breadcrumb - no truncation occurs`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: superLongBreadcrumbItems,
    id: 'three-item-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrBreadcrumb v-bind="args" />'
  })
}`,...l.parameters?.docs?.source},description:{story:`Three-item breadcrumb - shows truncation feature`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    items: averageBreadcrumbItems,
    truncationEnabled: true,
    id: 'ellipsis-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrBreadcrumb v-bind="args" />'
  })
}`,...u.parameters?.docs?.source},description:{story:`Five-item breadcrumb with ellipsis truncation`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: reiExampleBreadcrumbItems,
    id: 'longest-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrBreadcrumb v-bind="args" />'
  })
}`,...d.parameters?.docs?.source},description:{story:`Long breadcrumb trail based on REI.com example`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    items: shortBreadcrumbItems,
    id: 'navigate-event-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      const handleNavigate = (breadcrumb: BreadcrumbItem, event: MouseEvent) => {
        event.preventDefault();
        console.log('Navigated to:', breadcrumb.item);
        alert(\`Navigated to: \${breadcrumb.item.name}\`);
      };
      return {
        args,
        handleNavigate
      };
    },
    template: '<CdrBreadcrumb v-bind="args" @navigate="handleNavigate" />'
  })
}`,...f.parameters?.docs?.source},description:{story:`Breadcrumb with navigation event handling`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: averageBreadcrumbItems,
    truncationEnabled: false,
    id: 'no-truncation-breadcrumb'
  },
  render: args => ({
    components: {
      CdrBreadcrumb
    },
    setup() {
      return {
        args
      };
    },
    template: '<CdrBreadcrumb v-bind="args" />'
  })
}`,...p.parameters?.docs?.source},description:{story:`Breadcrumb without truncation enabled`,...p.parameters?.docs?.description}}},m=[`TwoItem`,`ThreeItem`,`WithEllipsis`,`LongestBreadcrumb`,`WithNavigateEvent`,`WithoutTruncation`]}))();export{d as LongestBreadcrumb,l as ThreeItem,c as TwoItem,u as WithEllipsis,f as WithNavigateEvent,p as WithoutTruncation,m as __namedExportsOrder,r as default};