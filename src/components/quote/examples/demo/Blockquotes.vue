<template>
  <div>
    <h2>
      Blockquote
    </h2>
    <cdr-quote

      cite="http://github.com/rei/rei-cedar"
      summary="Blockquote Summary:
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam
      ex aliquam. Temporibus, veritatis laudantium molestiae accusamus
      asperiores odio fuga reiciendis blanditiis magni?"
      citation="Blockquote Citation: Lorem ipsum dolor sit"
    />

    <h3>
      Summary only
    </h3>
    <cdr-quote
      summary="Blockquote Summary:
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam
      ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores
      odio fuga reiciendis blanditiis magni?"
    />

    <h3>
      Citation only
    </h3>
    <cdr-quote
      citation="Citation: Lorem ipsum dolor sit"
    />

    <h3>
      Nested blockquote
    </h3>
    <cdr-quote
      summary="Blockquote Summary:
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      At perferendis reiciendis sapiente delectus commodi eaque sunt aperiam
      ex aliquam. Temporibus, veritatis laudantium molestiae accusamus asperiores
      odio fuga reiciendis blanditiis magni?"
    >
      <cdr-quote
        citation="bob"
      >
        <cdr-text>
          consectetur adipisicing elit. At perferendis reiciendis
          sapiente delectus commodi eaque sunt aperiam ex aliquam.
          Temporibus, veritatis laudantium molestiae accusamus asperiores
          odio fuga reiciendis blanditiis magni?
        </cdr-text>
      </cdr-quote>
    </cdr-quote>

  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'BlockquoteDemo',
  components: Components,
};
</script>

<style>
</style>
