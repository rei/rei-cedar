<template>
  <div>

    <h3>
      Resilience Tests
    </h3>

    <h4>
      List in small container
    </h4>
    <div style="width: 50px;">
      <cdr-list modifier="unordered">
        <li>foofofofofofofofofofofofofo</li>
        <li>
          bar
          <cdr-list modifier="unordered">
            <li>lala lalalalal alalalalalal alalalala lalala</li>
            <li>wa</li>
          </cdr-list>
        </li>
        <li>zoo</li>
      </cdr-list>
    </div>
    <h4>
      Typography validation - text wrapping lists
    </h4>

    <cdr-text
      v-for="p1 in paragraphs"
      :key="p1"
      :class="`cdr-text-dev--body-${p1}`"
    >
      <cdr-list>
        <li>List item text</li>
        <li>Lorem ipsum dolor
          <cdr-text
            tag="span"
            :class="`cdr-text-dev--body-strong-${p1}`"
          >
            sit amet,
          </cdr-text>
          consectetur adipiscing elit, sed do eiusmodList ordered
          <cdr-list>
            <li>List item text</li>
            <li>List item text</li>
          </cdr-list>
        </li>
        <li>List item text</li>
      </cdr-list>
    </cdr-text>

    <cdr-text
      v-for="utility in utilities"
      :key="utility"
      :class="`cdr-text-dev--utility-sans-${utility}`"
    >
      <cdr-list
        v-for="l1 in lists"
        :key="l1"
        :modifier="`${l1}`"
      >
        <li>utility-sans {{ utility }} in list {{ l1 }} </li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodList ordered
          <cdr-list>
            <li>List item text</li>
            <li>List item text</li>
          </cdr-list>
        </li>
        <li>List item text</li>
      </cdr-list>
    </cdr-text>

    <cdr-list
      tag="ol"
      modifier="ordered"
      class="stack"
    >
      <li
        v-for="paragraph in paragraphs"
        :key="paragraph"
      >
        <cdr-text
          tag="span"
          :class="`cdr-text-dev--body-${paragraph}`"
        >
          body-{{ paragraph }}
        </cdr-text>
      </li>
      <li>
        text
        <cdr-list>
          <li
            v-for="paragraph in paragraphs"
            :key="paragraph"
          >
            <cdr-text
              tag="span"
              :class="`cdr-text-dev--body-${paragraph}`"
            >
              body-{{ paragraph }}
            </cdr-text>
          </li>
        </cdr-list>
      </li>
    </cdr-list>

    <cdr-list
      modifier="unordered"
      class="stack"
    >
      <li
        v-for="utility in utilities"
        :key="utility"
      >
        random text
        <cdr-text
          tag="span"
          :class="`cdr-text-dev--utility-sans-${utility}`"
        >
          utility-sans-{{ utility }}
        </cdr-text>
      </li>
      <li>
        text
        <cdr-list>
          <li
            v-for="utility in utilities"
            :key="utility"
          >
            <cdr-text
              tag="span"
              :class="`cdr-text-dev--utility-sans-${utility}`"
            >
              utility-sans-{{ utility }}
            </cdr-text>
          </li>
        </cdr-list>
      </li>
    </cdr-list>

    NON Cedar list
    <ul class="stack">
      <li
        v-for="utility in utilities"
        :key="utility"
      >
        random text
        <cdr-text
          tag="span"
          :class="`cdr-text-dev--utility-sans-${utility}`"
        >
          utility-sans-{{ utility }}
        </cdr-text>
      </li>
      <li>
        text
        <ul>
          <li
            v-for="utility in utilities"
            :key="utility"
          >
            random text
            <cdr-text
              tag="span"
              :class="`cdr-text-dev--utility-sans-${utility}`"
            >
              utility-sans-{{ utility }}
            </cdr-text>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'ResilienceTest',
  components: Components,
  data() {
    return {
      paragraphs: ['300', '400', '500'],
      utilities: ['100', '200', '300', '400', '500', '600', '700', '800'],
      lists: ['bare', 'unordered', 'ordered'],

    };
  },
};
</script>

<style>

</style>
