import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n,gt as r}from"./iframe-CLFhPnbD.js";import{n as i,t as a}from"./CdrPagination-cvwLjXpP.js";var o,s,c,l,u,d,f,p,m;e((()=>{n(),i(),o={title:`Components/Pagination`,component:a,tags:[`autodocs`],args:{linkTag:`a`}},s=e=>Array.from({length:e},(e,t)=>({page:t+1,url:`#page-${t+1}`})),c={args:{pages:s(10),totalPages:10},render:e=>({components:{CdrPagination:a},setup(){let n=t(1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=e=>{n.value=e},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},l={args:{pages:s(5),totalPages:5},render:e=>({components:{CdrPagination:a},setup(){let n=t(1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=e=>{n.value=e},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},u={args:{pages:s(50),totalPages:50},render:e=>({components:{CdrPagination:a},setup(){let n=t(1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=e=>{n.value=e},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }} of {{ args.totalPages }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},d={args:{pages:s(20),totalPages:20,modelValue:10},render:e=>({components:{CdrPagination:a},setup(){let n=t(e.modelValue||1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=e=>{n.value=e},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},f={args:{pages:s(15),totalPages:15,modelValue:15},render:e=>({components:{CdrPagination:a},setup(){let n=t(e.modelValue||1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=e=>{n.value=e},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},p={args:{pages:s(10),totalPages:10,linkTag:`button`},render:e=>({components:{CdrPagination:a},setup(){let n=t(1);r(()=>e.modelValue,e=>{e!==void 0&&(n.value=e)});let i=(e,t,r)=>{r.preventDefault(),n.value=e,console.log(`Navigate to:`,e,t)},{modelValue:a,...o}=e;return{restArgs:o,currentPage:n,handleNavigate:i}},template:`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(10),
    totalPages: 10
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(5),
    totalPages: 5
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(50),
    totalPages: 50
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }} of {{ args.totalPages }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(20),
    totalPages: 20,
    modelValue: 10
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(args.modelValue || 1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(15),
    totalPages: 15,
    modelValue: 15
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(args.modelValue || 1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    pages: generatePages(10),
    totalPages: 10,
    linkTag: 'button'
  },
  render: args => ({
    components: {
      CdrPagination
    },
    setup() {
      const currentPage = ref(1);
      watch(() => args.modelValue, newVal => {
        if (newVal !== undefined) currentPage.value = newVal;
      });
      const handleNavigate = (pageNum: number, url: string, e: Event) => {
        e.preventDefault();
        currentPage.value = pageNum;
        console.log('Navigate to:', pageNum, url);
      };
      const {
        modelValue: _,
        ...restArgs
      } = args;
      return {
        restArgs,
        currentPage,
        handleNavigate
      };
    },
    template: \`
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    \`
  })
}`,...p.parameters?.docs?.source}}},m=[`Default`,`FewPages`,`ManyPages`,`MiddlePage`,`LastPage`,`WithButtons`]}))();export{c as Default,l as FewPages,f as LastPage,u as ManyPages,d as MiddlePage,p as WithButtons,m as __namedExportsOrder,o as default};