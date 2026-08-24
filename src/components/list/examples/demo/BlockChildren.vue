<template>
  <div>
    <h3>Block-level Children in List Items</h3>
    <p style="margin-bottom: 1rem; color: #666">
      Demonstrates proper bullet alignment when list items contain block-level elements like
      &lt;p&gt;, &lt;div&gt;, etc.
    </p>

    <h4>Unordered list with paragraphs</h4>
    <cdr-list modifier="unordered">
      <li>
        <p style="margin: 0">
          This is a paragraph inside a list item. The bullet should align with the top of this text.
        </p>
      </li>
      <li>
        <p style="margin: 0">
          Another paragraph item with more content that wraps to multiple lines to show alignment
          stays consistent.
        </p>
      </li>
      <li>
        <div>
          <p style="margin: 0 0 0.5rem 0"><strong>Title in a div</strong></p>
          <p style="margin: 0">Description text below the title, all inside the same list item.</p>
        </div>
      </li>
    </cdr-list>

    <h4>Nested unordered list with block children</h4>
    <cdr-list modifier="unordered">
      <li>
        <p style="margin: 0">Parent item with paragraph</p>
        <cdr-list>
          <li>
            <p style="margin: 0">Nested item with paragraph - dash should align correctly</p>
          </li>
          <li>
            <div>
              <p style="margin: 0">Nested item with div wrapper</p>
            </div>
          </li>
        </cdr-list>
      </li>
      <li>
        <p style="margin: 0">Another parent item</p>
      </li>
    </cdr-list>

    <h4>Ordered list with nested block children</h4>
    <cdr-list
      tag="ol"
      modifier="ordered"
    >
      <li>
        <p style="margin: 0">First ordered item with paragraph</p>
        <cdr-list>
          <li>
            <p style="margin: 0">
              Nested item under ordered list - should have dash marker aligned properly
            </p>
          </li>
          <li>
            <div>
              <p style="margin: 0"><strong>Bold heading</strong></p>
              <p style="margin: 0">With description below</p>
            </div>
          </li>
        </cdr-list>
      </li>
      <li>
        <p style="margin: 0">Second ordered item</p>
      </li>
    </cdr-list>

    <h4>Comparison: Inline text vs Block element</h4>
    <cdr-list modifier="unordered">
      <li>This is plain inline text - baseline alignment</li>
      <li>
        <p style="margin: 0">This is a paragraph - should align the same way</p>
      </li>
      <li>
        <div>This is text inside a div - should also align correctly</div>
      </li>
    </cdr-list>
  </div>
</template>

<script>
import CdrList from 'componentsdir/list/CdrList.vue';

export default {
  name: 'BlockChildrenDemo',
  components: {
    CdrList,
  },
};
</script>
