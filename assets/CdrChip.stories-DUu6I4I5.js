import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{i as r,n as i,r as a,t as o}from"./CdrChipGroup-DoGIkpSs.js";import{n as s,r as c,t as l}from"./icon-CpweIAOr.js";import{n as u}from"./x-lg-DTezhWFZ.js";var d,f,p,m,h,g,_,v,y,b,x;e((()=>{n(),r(),i(),l(),d={title:`Components/Chip`,component:a,tags:[`autodocs`]},f={render:()=>({components:{CdrChip:a},template:`<CdrChip>Default Chip</CdrChip>`})},p={render:()=>({components:{CdrChip:a,IconHeartStroke:s},template:`
      <CdrChip>
        <template #icon-left>
          <IconHeartStroke inherit-color size="small" />
        </template>
        Favorite
      </CdrChip>
    `})},m={render:()=>({components:{CdrChip:a,IconXLg:u},template:`
      <CdrChip>
        Filter
        <template #icon-right>
          <IconXLg inherit-color size="small" />
        </template>
      </CdrChip>
    `})},h={render:()=>({components:{CdrChip:a,IconHeartStroke:s,IconHeartFill:c},setup(){return{toggled:t(!1)}},template:`
      <CdrChip
        @click="toggled = !toggled"
        :aria-pressed="toggled ? 'true' : 'false'"
      >
        <template #icon-left>
          <IconHeartStroke v-if="!toggled" inherit-color size="small" />
          <IconHeartFill v-else inherit-color size="small" />
        </template>
        {{ toggled ? 'Favorited' : 'Favorite' }}
      </CdrChip>
    `})},g={render:()=>({components:{CdrChip:a,IconXLg:u},setup(){let e=t([`Hiking`,`Camping`,`Backpacking`]);return{filters:e,removeFilter:t=>{e.value.splice(t,1)}}},template:`
      <div>
        <p style="margin-bottom: 12px; color: #666;">Active Filters:</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <CdrChip
            v-for="(filter, index) in filters"
            :key="filter"
            @click="removeFilter(index)"
            aria-pressed="true"
          >
            {{ filter }}
            <template #icon-right>
              <IconXLg size="small" inherit-color />
            </template>
          </CdrChip>
        </div>
        <p v-if="filters.length === 0" style="margin-top: 12px; color: #999;">
          No active filters
        </p>
      </div>
    `})},_={render:()=>({components:{CdrChipGroup:o,CdrChip:a},setup(){let e=[`January`,`February`,`March`,`April`,`May`,`June`],n=t(`March`);return{months:e,selectedMonth:n,selectMonth:e=>{n.value=e}}},template:`
      <div>
        <CdrChipGroup label="Pick One Month">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonth(month)"
            :disabled="i === 4"
            :aria-checked="selectedMonth === month ? 'true' : 'false'"
            role="radio"
            :tabindex="selectedMonth === month ? '0' : '-1'"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selectedMonth }}</p>
      </div>
    `})},v={render:()=>({components:{CdrChipGroup:o,CdrChip:a},setup(){let e=[`January`,`February`,`March`,`April`,`May`,`June`],n=t([`February`,`April`]);return{months:e,selectedMonths:n,selectMonths:e=>{let t=n.value.indexOf(e);t>-1?n.value.splice(t,1):n.value.push(e)}}},template:`
      <div>
        <CdrChipGroup label="Pick As Many Months As You Like">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonths(month)"
            :disabled="i === 3"
            :aria-checked="selectedMonths.includes(month) ? 'true' : 'false'"
            role="checkbox"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">
          Selected: {{ selectedMonths.length > 0 ? selectedMonths.join(', ') : 'None' }}
        </p>
      </div>
    `})},y={render:()=>({components:{CdrChip:a},template:`<CdrChip disabled>Disabled Chip</CdrChip>`})},b={render:()=>({components:{CdrChip:a,IconHeartStroke:s},template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>Hiking</CdrChip>
        <CdrChip>Camping</CdrChip>
        <CdrChip>Backpacking</CdrChip>
        <CdrChip>Climbing</CdrChip>
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Favorites
        </CdrChip>
      </div>
    `})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip
    },
    template: '<CdrChip>Default Chip</CdrChip>'
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip,
      IconHeartStroke
    },
    template: \`
      <CdrChip>
        <template #icon-left>
          <IconHeartStroke inherit-color size="small" />
        </template>
        Favorite
      </CdrChip>
    \`
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip,
      IconXLg
    },
    template: \`
      <CdrChip>
        Filter
        <template #icon-right>
          <IconXLg inherit-color size="small" />
        </template>
      </CdrChip>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip,
      IconHeartStroke,
      IconHeartFill
    },
    setup() {
      const toggled = ref(false);
      return {
        toggled
      };
    },
    template: \`
      <CdrChip
        @click="toggled = !toggled"
        :aria-pressed="toggled ? 'true' : 'false'"
      >
        <template #icon-left>
          <IconHeartStroke v-if="!toggled" inherit-color size="small" />
          <IconHeartFill v-else inherit-color size="small" />
        </template>
        {{ toggled ? 'Favorited' : 'Favorite' }}
      </CdrChip>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip,
      IconXLg
    },
    setup() {
      const filters = ref(['Hiking', 'Camping', 'Backpacking']);
      const removeFilter = (index: number) => {
        filters.value.splice(index, 1);
      };
      return {
        filters,
        removeFilter
      };
    },
    template: \`
      <div>
        <p style="margin-bottom: 12px; color: #666;">Active Filters:</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <CdrChip
            v-for="(filter, index) in filters"
            :key="filter"
            @click="removeFilter(index)"
            aria-pressed="true"
          >
            {{ filter }}
            <template #icon-right>
              <IconXLg size="small" inherit-color />
            </template>
          </CdrChip>
        </div>
        <p v-if="filters.length === 0" style="margin-top: 12px; color: #999;">
          No active filters
        </p>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChipGroup,
      CdrChip
    },
    setup() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June'];
      const selectedMonth = ref('March');
      const selectMonth = (month: string) => {
        selectedMonth.value = month;
      };
      return {
        months,
        selectedMonth,
        selectMonth
      };
    },
    template: \`
      <div>
        <CdrChipGroup label="Pick One Month">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonth(month)"
            :disabled="i === 4"
            :aria-checked="selectedMonth === month ? 'true' : 'false'"
            role="radio"
            :tabindex="selectedMonth === month ? '0' : '-1'"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selectedMonth }}</p>
      </div>
    \`
  })
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChipGroup,
      CdrChip
    },
    setup() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June'];
      const selectedMonths = ref<string[]>(['February', 'April']);
      const selectMonths = (month: string) => {
        const index = selectedMonths.value.indexOf(month);
        if (index > -1) {
          selectedMonths.value.splice(index, 1);
        } else {
          selectedMonths.value.push(month);
        }
      };
      return {
        months,
        selectedMonths,
        selectMonths
      };
    },
    template: \`
      <div>
        <CdrChipGroup label="Pick As Many Months As You Like">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonths(month)"
            :disabled="i === 3"
            :aria-checked="selectedMonths.includes(month) ? 'true' : 'false'"
            role="checkbox"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">
          Selected: {{ selectedMonths.length > 0 ? selectedMonths.join(', ') : 'None' }}
        </p>
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip
    },
    template: '<CdrChip disabled>Disabled Chip</CdrChip>'
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrChip,
      IconHeartStroke
    },
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>Hiking</CdrChip>
        <CdrChip>Camping</CdrChip>
        <CdrChip>Backpacking</CdrChip>
        <CdrChip>Climbing</CdrChip>
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Favorites
        </CdrChip>
      </div>
    \`
  })
}`,...b.parameters?.docs?.source}}},x=[`Default`,`WithIconLeft`,`WithIconRight`,`ToggleChip`,`FilterChip`,`ChipGroupRadio`,`ChipGroupCheckbox`,`DisabledChip`,`MultipleChips`]}))();export{v as ChipGroupCheckbox,_ as ChipGroupRadio,f as Default,y as DisabledChip,g as FilterChip,b as MultipleChips,h as ToggleChip,p as WithIconLeft,m as WithIconRight,x as __namedExportsOrder,d as default};