<template>
  <div data-backstop="pagination-page">
    <h2>pagination</h2>

    <hr>
    <p>Normal</p>

    <cdr-pagination
      v-model="page"
      :pages="pages"
      :total-pages="10"
      data-backstop="pagination-default"
      for-label="normal"
      @navigate="preventNavigate"
    />

    <hr>
    <p>intra-page pagination using buttons</p>
    <cdr-pagination
      v-model="page"
      :pages="pages"
      :total-pages="10"
      link-tag="button"
      for-label="potatoes"
      data-backstop="pagination-default"
      @navigate="preventNavigate"
    />
    <hr>

    <div
      v-for="datam in paginationData.example1[ex1Page]"
      :key="datam.title"
    >
      <h1>{{ datam.title }}</h1>
      <p>{{ datam.description }}</p>
    </div>

    <p>Using vue router programatically</p>
    <cdr-pagination
      :pages="makePages(20, null)"
      :total-pages="20"
      for-label="router"
      v-model="ex1Page"
      @navigate="updateRoute"
    />

    <hr>

    <p>Previous/Next only (known total)</p>

    <cdr-pagination
      :pages="makePages(ex2KnownPages, '/#/pagination?ex2-known-page', ex2PageKnown - 2)"
      :total-pages="10"
      for-label="prev"
      v-model="ex2PageKnown"
    />

    <hr>
    <p>Previous/Next only (unknown total)</p>

    <cdr-pagination
      :pages="makePages(ex2UnknownPages, '/#/pagination?ex2-unknown-page', ex2PageUnknown - 2)"
      v-model="ex2PageUnknown"
      for-label="next"
    />

    <hr>
    <p>Only 5 pages provided</p>

    <cdr-pagination
      :pages="makePages(5, '/#/pagination?ex3-page')"
      :total-pages="5"
      v-model="ex3Page"
      for-label="limit"
    />

  </div>
</template>

<script>
import * as Components from 'srcdir/lib';

import paginationData from 'componentsdir/pagination/examples/data.json';

export default {
  name: 'Pagination',
  components: {
    ...Components,
  },
  beforeRouteUpdate(to) {
    if (Object.prototype.hasOwnProperty.call(to.query, 'router-page')) {
      this.ex1Page = parseInt(to.query['router-page'], 10);
    }
  },
  data() {
    return {
      page: 3,
      pages: [
        { page: 1, url: '/#/pagination?page=1' },
        { page: 2, url: '/#/pagination?page=2' },
        { page: 3, url: '/#/pagination?page=3' },
        { page: 4, url: '/#/pagination?page=4' },
        { page: 5, url: '/#/pagination?page=5' },
        { page: 6, url: '/#/pagination?page=6' },
        { page: 7, url: '/#/pagination?page=7' },
        { page: 8, url: '/#/pagination?page=8' },
        { page: 9, url: '/#/pagination?page=9' },
        { page: 10, url: '/#/pagination?page=10' },
      ],
      paginationData,
      ex1Page: parseInt(this.$route.query['router-page'], 10) || 1,
      paraPage: 1,
      ex2PageKnown: 5,
      ex2PageUnknown: 5,
      ex3Page: 1,
    };
  },
  computed: {
    ex2KnownPages() {
      if (this.ex2PageKnown === 1 || this.ex2PageKnown === 10) {
        return 2;
      }
      return 3;
    },
    ex2UnknownPages() {
      if (this.ex2PageUnknown === 1 || this.ex2PageUnknown === 20) {
        return 2;
      }
      return 3;
    },
  },
  methods: {
    updateRoute(num, url, e) {
      e.preventDefault();
      this.$router.replace({ query: { 'router-page': num } });
    },
    preventNavigate(num, url, e) {
      e.preventDefault();
      console.log('preventNavigate'); // eslint-disable-line
      console.warn(num, url); // eslint-disable-line
    },
    makePages(total, arg = 'page', startingAt = 0) {
      const adjuster = startingAt > 0 ? startingAt : 0;
      const result = [];
      const arr = Array(total).fill().map((_, i) => i + adjuster + 1);
      arr.forEach((n) => {
        const obj = {};
        obj.page = n;
        obj.url = `?${arg}=${n}`;
        result.push(obj);
      });
      return result;
    },
  },
};
</script>

<style>
</style>
