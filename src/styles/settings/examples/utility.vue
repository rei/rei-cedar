<template>
  <div>
    <h2>Utility Classes Demo</h2>
    <cdr-grid class="grid-2-example" style="grid-template-areas: 'alignment display spacing type' 'content content content content';">
      <div style="grid-area: alignment;">
        <cdr-select
          id="alignment"
          label="Text Alignment:"
          v-model="selectedAlignment"
          prompt="Choose one"
          @select-change="doExternal"
        >
          <option value="cdr-align-text-left">Left</option>
          <option value="cdr-align-text-center">Center</option>
          <option value="cdr-align-text-right">Right</option>
          <option value="cdr-align-text-justify">Justify</option>
          <option value="cdr-align-center-block">Center Block</option>
        </cdr-select>
      </div>
      <div style="grid-area: display;">
        <cdr-select
          id="display"
          label="Display:"
          v-model="selectedDisplay"
          prompt="Choose one"
          @select-change="doExternal"
        >
          <option value="cdr-display-none">None</option>
          <option value="cdr-display-hidden">Hidden</option>
          <option value="cdr-display-block">Block</option>
          <option value="cdr-display-inline">Inline</option>
          <option value="cdr-display-inline-block">Inline Block</option>
          <option value="cdr-display-flex">Flex</option>
          <option value="cdr-display-inline-flex">Inline Flex</option>
        </cdr-select>
      </div>
      <div style="grid-area: spacing;">
        <cdr-select
          id="space"
          label="Space Scale:"
          v-model="selectedSpaceScale"
          prompt="Choose one"
          @select-change="doExternal"
        >
          <option value="cdr-space-scale-0">Scale 0</option>
          <option value="cdr-space-scale-1">Scale 1</option>
          <option value="cdr-space-scale-2">Scale 2</option>
          <option value="cdr-space-scale-3">Scale 3</option>
          <option value="cdr-space-scale-4">Scale 4</option>
          <option value="cdr-space-scale-5">Scale 5</option>
          <option value="cdr-space-scale-6">Scale 6</option>
          <option value="cdr-space-scale-7">Scale 7</option>
          <option value="cdr-space-scale-8">Scale 8</option>
          <option value="cdr-space-scale-0--1">Scale 0-1</option>
          <option value="cdr-space-scale-3--4">Scale 3-4</option>
          <option value="cdr-space-scale-3--5">Scale 3-5</option>
        </cdr-select>
      </div>
      <div style="grid-area: type;">
        <cdr-select
          id="type"
          label="Type Scale:"
          v-model="selectedTypeScale"
          prompt="Choose one"
          @select-change="doExternal"
        >
          <option value="cdr-type-scale--1">-1</option>
          <option value="cdr-type-scale-0">0</option>
          <option value="cdr-type-scale-1">1</option>
          <option value="cdr-type-scale-2">2</option>
          <option value="cdr-type-scale-3">3</option>
          <option value="cdr-type-scale-4">4</option>
          <option value="cdr-type-scale-5">5</option>
          <option value="cdr-type-scale-6">6</option>
          <option value="cdr-type-scale-7">7</option>
        </cdr-select>
      </div>
      <div class="grid-demo" style="grid-area: content;">
        <cdr-title :class="[selectedAlignment, selectedDisplay]" :style="textStyle">
          This is a sample text to demonstrate utility classes.
        </cdr-title>
      </div>
    </cdr-grid>
  </div>

  <hr class="icon-hr">

  <h2>Fluid space variables</h2>
  <cdr-table size="large">
    <caption>A sample table</caption>
    <thead>
      <tr>
        <th id="fluid-value" scope="col">Test head</th>
        <th id="scale" scope="col">Test head</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="index">
        <td :headers="row.headerId">{{ row.fluidValue }}</td>
        <td :headers="row.scaleId">
          <div class="spaces" :style="{ 'grid-template-columns': '120px 1fr 120px' }">
            <template v-for="(space, sIndex) in row.spaces" :key="sIndex">
              <div class="space space--with-square">
                <output>{{ space.output }}</output>
                <span class="space__square" :style="{ width: space.output }"></span>
              </div>
              <span v-if="sIndex < row.spaces.length - 1"></span>
            </template>
            <div class="spaces__bg" :style="{ 'clip-path': row.bgClipPath }"></div>
          </div>
        </td>
      </tr>
    </tbody>
    <thead>
      <tr>
        <th id="fluid-value" scope="col">range</th>
        <th id="scale" scope="col">range value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rangeRow, rangeIndex) in rangeTableData" :key="rangeIndex">
        <td :headers="rangeRow.headerId">{{ rangeRow.fluidValue }}</td>
        <td :headers="rangeRow.scaleId">
          <div class="spaces" :style="{ 'grid-template-columns': '120px 1fr 120px' }">
            <template v-for="(rangeSpace, rsIndex) in rangeRow.spaces" :key="rsIndex">
              <div class="space space--with-square">
                <output>{{ rangeSpace.output }}</output>
                <span class="space__square" :style="{ width: rangeSpace.output }"></span>
              </div>
              <span v-if="rsIndex < rangeRow.spaces.length - 1"></span>
            </template>
            <div class="spaces__bg" :style="{ 'clip-path': rangeRow.bgClipPath }"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </cdr-table>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Utility',
  components: {
    ...Components,
  },
  data() {
    return {
      selectedAlignment: 'cdr-align-text-left',
      selectedDisplay: 'cdr-display-block',
      selectedTypeScale: 'cdr-type-scale-0',
      selectedSpaceScale: 'cdr-space-scale-4',
      tableData: [
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-0',
          spaces: [
            { output: '0.2rem' },
            { output: '0.3rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.2rem, calc(100% - 120px) 0.3rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-1',
          spaces: [
            { output: '0.3rem' },
            { output: '0.4rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.3rem, calc(100% - 120px) 0.4rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-2',
          spaces: [
            { output: '0.4rem' },
            { output: '0.5rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.4rem, calc(100% - 120px) 0.5rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-3',
          spaces: [
            { output: '0.8rem' },
            { output: '1rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.8rem, calc(100% - 120px) 1rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-4',
          spaces: [
            { output: '1.2rem' },
            { output: '1.5rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 1.2rem, calc(100% - 120px) 1.5rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-5',
          spaces: [
            { output: '1.6rem' },
            { output: '2rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 1.6rem, calc(100% - 120px) 2rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-6',
          spaces: [
            { output: '2.4rem' },
            { output: '3rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 2.4rem, calc(100% - 120px) 3rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-7',
          spaces: [
            { output: '3.2rem' },
            { output: '4rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 3.2rem, calc(100% - 120px) 4rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-8',
          spaces: [
            { output: '4.8rem' },
            { output: '6rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 4.8rem, calc(100% - 120px) 6rem, calc(100% - 120px) 0%)'
        }
      ],
      rangeTableData: [
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-0--1',
          spaces: [
            { output: '0.2rem' },
            { output: '0.4rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.2rem, calc(100% - 120px) 0.4rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-3--4',
          spaces: [
            { output: '0.4rem' },
            { output: '1rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.4rem, calc(100% - 120px) 1rem, calc(100% - 120px) 0%)'
        },
        {
          headerId: 'fluid-value',
          scaleId: 'scale',
          fluidValue: '--cdr-space-scale-3--5',
          spaces: [
            { output: '0.8rem' },
            { output: '1.6rem' }
          ],
          bgClipPath: 'polygon(0px 0px, 0% 0.8rem, calc(100% - 120px) 1.6rem, calc(100% - 120px) 0%)'
        }
      ]
    };
  },
  computed: {
    textStyle() {
      return {
        '--cdr-type-scale': `var(--${this.selectedTypeScale})`,
        '--cdr-space-scale': `var(--${this.selectedSpaceScale})`,
        fontSize: 'var(--cdr-type-scale)',
        margin: 'var(--cdr-space-scale)'
      };
    },
  },
};
</script>
<style lang="scss">
@import '../index.scss';

.spaces, .spaces-heading {
  display: grid;
  grid-gap: var(--space);
  position: relative;
  max-width: 500px;
}

.space {
  grid-template-rows: 28px auto;
  font-size: var(--cdr-type-scale--1);
  display: grid;
  grid-gap: 0;
  min-width: 40px;

  output {
    margin-bottom: var(--space-2xs);
    display: block;
  }
}

.space__square {
  display: -webkit-box;
  display: flex;
  background: linear-gradient(135deg, rgba(169, 67, 154, .5), rgba(169, 67, 154, .4));
  border: none;
  -webkit-transition: all .25s ease-in-out;
  transition: all .25s ease-in-out;
  aspect-ratio: 1;
  max-width: 200px;
}

.spaces__bg {
  position: absolute;
  width: 100%;
  height: calc(100% - 28px);
  left: 0;
  top: 28px;
  background: linear-gradient(135deg, rgba(169, 67, 154, .5), rgba(169, 67, 154, .4));
  opacity: .5;
  -webkit-transition: -webkit-clip-path .25s ease-in-out;
  transition: -webkit-clip-path .25s ease-in-out;
  transition: clip-path .25s ease-in-out;
  transition: clip-path .25s ease-in-out, -webkit-clip-path .25s ease-in-out;
}

// Apply the mixins as classes
.cdr-align-text-left {
  @include cdr-align-text-left-mixin();
}

.cdr-align-text-center {
  @include cdr-align-text-center-mixin();
}

.cdr-align-text-right {
  @include cdr-align-text-right-mixin();
}

.cdr-align-text-justify {
  @include cdr-align-text-justify-mixin();
}

.cdr-align-center-block {
  @include cdr-align-center-block-mixin();
}

.cdr-display-none {
  @include cdr-display-none-mixin();
}

.cdr-display-hidden {
  @include cdr-display-hidden-mixin();
}

.cdr-display-block {
  @include cdr-display-block-mixin();
}

.cdr-display-inline {
  @include cdr-display-inline-mixin();
}

.cdr-display-inline-block {
  @include cdr-display-inline-block-mixin();
}

.cdr-display-flex {
  @include cdr-display-flex-mixin();
}

.cdr-display-inline-flex {
  @include cdr-display-inline-flex-mixin();
}

.grid-demo {
  background: linear-gradient(135deg, rgba(169, 67, 154, .5), rgba(169, 67, 154, .4));
}
</style>
