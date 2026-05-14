import{n as e}from"./chunk-BneVvdWh.js";import{At as t,C as n}from"./iframe-CLFhPnbD.js";import{a as r,s as i}from"./warning-fill-DFXsikZg.js";import{t as a}from"./icon-CpweIAOr.js";import{i as o,n as s,r as c,t as l}from"./CdrFulfillmentTileIcon-CrQt5wVr.js";var u,d,f,p,m,h,g,_,v;e((()=>{n(),o(),s(),a(),u={title:`Components/FulfillmentTile`,component:c,tags:[`autodocs`],args:{checked:!1,disabled:!1,loading:!1}},d={render:e=>({components:{CdrFulfillmentTile:c},setup(){return{args:e}},template:`
      <CdrFulfillmentTile v-bind="args" class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    `,styles:[`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},f={render:()=>({components:{CdrFulfillmentTile:c,CdrFulfillmentTileIcon:l,IconCheckFill:i,IconErrorFill:r},template:`
      <div class="example">
        <CdrFulfillmentTile :disabled="true" class="example__tile">
          <template #header>Pick up</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon>
              <IconErrorFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #body>Not offered</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile class="example__tile">
          <template #header>Ship to address</template>
          <template #body>Today after 2pm</template>
          <template #footer><strong>FREE</strong> - $60 minimum</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :checked="true" class="example__tile">
          <template #header>Another option with really long text</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon type="success">
              <IconCheckFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #footer>Footer <strong>content</strong></template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :loading="true" class="example__tile">
          <template #header>Loading option</template>
        </CdrFulfillmentTile>
      </div>
    `,styles:[`
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},p={render:()=>({components:{CdrFulfillmentTile:c,CdrFulfillmentTileIcon:l,IconErrorFill:r},template:`
      <CdrFulfillmentTile :disabled="true" class="example__tile">
        <template #header>Pick up</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon>
            <IconErrorFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
    `,styles:[`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},m={render:()=>({components:{CdrFulfillmentTile:c,CdrFulfillmentTileIcon:l,IconCheckFill:i},template:`
      <CdrFulfillmentTile :checked="true" class="example__tile">
        <template #header>Another option with really long text</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #footer>Footer <strong>content</strong></template>
      </CdrFulfillmentTile>
    `,styles:[`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},h={render:()=>({components:{CdrFulfillmentTile:c},template:`
      <CdrFulfillmentTile :loading="true" class="example__tile">
        <template #header>Loading option</template>
      </CdrFulfillmentTile>
    `,styles:[`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},g={render:()=>({components:{CdrFulfillmentTile:c},template:`
      <CdrFulfillmentTile class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    `,styles:[`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    `]})},_={render:()=>({components:{CdrFulfillmentTile:c,CdrFulfillmentTileIcon:l,IconCheckFill:i,IconErrorFill:r},setup(){return{selected:t(`ship`)}},template:`
      <div>
        <div class="example">
          <CdrFulfillmentTile 
            :disabled="true" 
            class="example__tile"
            @click="selected = 'pickup'"
          >
            <template #header>Pick up</template>
            <template #icon-right>
              <CdrFulfillmentTileIcon>
                <IconErrorFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Not offered</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'ship'"
            class="example__tile example__tile--clickable"
            @click="selected = 'ship'"
          >
            <template #header>Ship to address</template>
            <template #icon-right v-if="selected === 'ship'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Today after 2pm</template>
            <template #footer><strong>FREE</strong> - $60 minimum</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'other'"
            class="example__tile example__tile--clickable"
            @click="selected = 'other'"
          >
            <template #header>Another option with really long text</template>
            <template #icon-right v-if="selected === 'other'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #footer>Footer <strong>content</strong></template>
          </CdrFulfillmentTile>
        </div>
        <p class="example__status">Selected: {{ selected }}</p>
      </div>
    `,styles:[`
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
      .example__tile--clickable {
        cursor: pointer;
      }
      .example__status {
        margin-top: 16px;
      }
    `]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      CdrFulfillmentTile
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <CdrFulfillmentTile v-bind="args" class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    \`,
    styles: [\`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile,
      CdrFulfillmentTileIcon,
      IconCheckFill,
      IconErrorFill
    },
    template: \`
      <div class="example">
        <CdrFulfillmentTile :disabled="true" class="example__tile">
          <template #header>Pick up</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon>
              <IconErrorFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #body>Not offered</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile class="example__tile">
          <template #header>Ship to address</template>
          <template #body>Today after 2pm</template>
          <template #footer><strong>FREE</strong> - $60 minimum</template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :checked="true" class="example__tile">
          <template #header>Another option with really long text</template>
          <template #icon-right>
            <CdrFulfillmentTileIcon type="success">
              <IconCheckFill inherit-color />
            </CdrFulfillmentTileIcon>
          </template>
          <template #footer>Footer <strong>content</strong></template>
        </CdrFulfillmentTile>
        
        <CdrFulfillmentTile :loading="true" class="example__tile">
          <template #header>Loading option</template>
        </CdrFulfillmentTile>
      </div>
    \`,
    styles: [\`
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile,
      CdrFulfillmentTileIcon,
      IconErrorFill
    },
    template: \`
      <CdrFulfillmentTile :disabled="true" class="example__tile">
        <template #header>Pick up</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon>
            <IconErrorFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #body>Not offered</template>
      </CdrFulfillmentTile>
    \`,
    styles: [\`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile,
      CdrFulfillmentTileIcon,
      IconCheckFill
    },
    template: \`
      <CdrFulfillmentTile :checked="true" class="example__tile">
        <template #header>Another option with really long text</template>
        <template #icon-right>
          <CdrFulfillmentTileIcon type="success">
            <IconCheckFill inherit-color />
          </CdrFulfillmentTileIcon>
        </template>
        <template #footer>Footer <strong>content</strong></template>
      </CdrFulfillmentTile>
    \`,
    styles: [\`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile
    },
    template: \`
      <CdrFulfillmentTile :loading="true" class="example__tile">
        <template #header>Loading option</template>
      </CdrFulfillmentTile>
    \`,
    styles: [\`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile
    },
    template: \`
      <CdrFulfillmentTile class="example__tile">
        <template #header>Ship to address</template>
        <template #body>Today after 2pm</template>
        <template #footer><strong>FREE</strong> - $60 minimum</template>
      </CdrFulfillmentTile>
    \`,
    styles: [\`
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
    \`]
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      CdrFulfillmentTile,
      CdrFulfillmentTileIcon,
      IconCheckFill,
      IconErrorFill
    },
    setup() {
      const selected = ref('ship');
      return {
        selected
      };
    },
    template: \`
      <div>
        <div class="example">
          <CdrFulfillmentTile 
            :disabled="true" 
            class="example__tile"
            @click="selected = 'pickup'"
          >
            <template #header>Pick up</template>
            <template #icon-right>
              <CdrFulfillmentTileIcon>
                <IconErrorFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Not offered</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'ship'"
            class="example__tile example__tile--clickable"
            @click="selected = 'ship'"
          >
            <template #header>Ship to address</template>
            <template #icon-right v-if="selected === 'ship'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #body>Today after 2pm</template>
            <template #footer><strong>FREE</strong> - $60 minimum</template>
          </CdrFulfillmentTile>
          
          <CdrFulfillmentTile 
            :checked="selected === 'other'"
            class="example__tile example__tile--clickable"
            @click="selected = 'other'"
          >
            <template #header>Another option with really long text</template>
            <template #icon-right v-if="selected === 'other'">
              <CdrFulfillmentTileIcon type="success">
                <IconCheckFill inherit-color />
              </CdrFulfillmentTileIcon>
            </template>
            <template #footer>Footer <strong>content</strong></template>
          </CdrFulfillmentTile>
        </div>
        <p class="example__status">Selected: {{ selected }}</p>
      </div>
    \`,
    styles: [\`
      .example {
        display: flex;
        flex-wrap: wrap;
        gap: var(--cdr-space-one-x);
      }
      .example__tile {
        min-height: 108px;
        width: 230px;
      }
      .example__tile--clickable {
        cursor: pointer;
      }
      .example__status {
        margin-top: 16px;
      }
    \`]
  })
}`,..._.parameters?.docs?.source}}},v=[`Default`,`AllStates`,`Disabled`,`Checked`,`Loading`,`WithBody`,`Interactive`]}))();export{f as AllStates,m as Checked,d as Default,p as Disabled,_ as Interactive,h as Loading,g as WithBody,v as __namedExportsOrder,u as default};