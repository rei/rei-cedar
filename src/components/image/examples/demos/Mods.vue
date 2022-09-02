<template>
  <div>
    <h3>
      Image modifiers
    </h3>
    <cdr-grid style="grid-template-columns: 1fr 1fr;">
      <div>
        <cdr-text class="cdr-text-dev--subheading-sans-300">
          Responsive
        </cdr-text>
        <cdr-img
          container-class="cdr-img-test"
          ratio="4-3"
          modifier="responsive"
          loading="lazy"
          alt="ratio responsive"
          src="/src/dev/static/cedar-200x200.jpg"
        />
        <cdr-img
          container-class="cdr-img-test"
          modifier="responsive"
          alt="standard responsive"
          src="/src/dev/static/cedar-200x200.jpg"
        />
      </div>
      <div>
        <cdr-text class="cdr-text-dev--subheading-sans-300">
          Rounded
        </cdr-text>
        <cdr-img
          container-class="cdr-img-test"
          ratio="4-3"
          radius="rounded"
          alt="ratio rounded"
          src="/src/dev/static/cedar-200x200.jpg"
        />
        <cdr-img
          container-class="cdr-img-test"
          radius="rounded"
          alt="landscape rounded"
          src="/src/dev/static/cedar-350x150.jpg"
        />
        <cdr-img
          container-class="cdr-img-test"
          radius="rounded"
          alt="square rounded"
          src="/src/dev/static/cedar-200x200.jpg"
        />
      </div>
      <div>
        <cdr-text class="cdr-text-dev--subheading-sans-300">
          circle
        </cdr-text>
        <cdr-img
          container-class="cdr-img-test"
          ratio="4-3"
          radius="circle"
          alt="ratio circle"
          src="/src/dev/static/cedar-200x200.jpg"
        />
        <cdr-img
          container-class="cdr-img-test"
          radius="circle"
          alt="landscape circle"
          src="/src/dev/static/cedar-350x150.jpg"
        />
        <cdr-img
          container-class="cdr-img-test"
          radius-="circle"
          alt="square circle"
          src="/src/dev/static/cedar-200x200.jpg"
        />
      </div>
    </cdr-grid>
  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

export default {
  name: 'Mods',
  components: Components,
};
</script>
