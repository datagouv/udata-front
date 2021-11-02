<!--
---
name: Pagination
category: Interactions
---

# Pagination

A simple pagination Vue component that allow you to paginate long collections.

## Usage

Simply provide necessary props :

* page : current page
* page_size : how many elements will be on each page
* total_results : total collection length
* changePage : a function that will be called on each button click. It will be passed a single argument : the new page number

Check the example below for more infos :

```pagination-ex.vue
<template>
    <pagination
      v-if="total_results > page_size"
      :page="current_page"
      :page_size="page_size"
      :total_results="total_results"
      :changePage="changePage"
    />
</template>

<script>
import Pagination from "../components/pagination/pagination.vue"

export default {
  name: "XXX",
  components: {
      Pagination
  },
  methods: {
    changePage(index) {
      this.page = index; // Change current page
      this.loadPage(); // Load corresponding new info
      scrollToTop(); // Then scroll to the top
    }
  }
};
</script>
```
-->

<template>
  <nav role="navigation" class="fr-pagination fr-pagination--centered" aria-label="Pagination">
    <ul class="fr-pagination__list">
      <li>
        <a
          :href="page === 1 ? null :'#'"
          class="fr-pagination__link fr-pagination__link--first"
          @click.prevent="_onClick(1)"
        >
          {{ $t('First page') }}
        </a>
      </li>
      <li>
        <a
          :href="page === 1 ? null : '#'"
          class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
          @click.prevent="_onClick(page - 1)"
        >
          {{ $t('Previous page') }}
        </a>
      </li>
      <li>
        <a
          :aria-current="page === 1 ? 'page' : null"
          :href="page === 1 ? null : '#'"
          class="fr-pagination__link fr-displayed-sm"
          :title="$t('Page', {nb: 1})"
          @click.prevent="_onClick(1)"
        >
          1
        </a>
      </li>
      <li v-for="index in visible_pages">
        <a
          class="fr-pagination__link"
          :class="{'fr-displayed-lg': index < page - 1 || index > page + 1}"
          :aria-current="page === index ? 'page' : null"
          :href="page === index ? null : '#'"
          :title="$t('Page', {nb: index})"
          @click.prevent="_onClick(index)"
          v-if="index"
          >
          {{ index }}
        </a>
        <a class="fr-pagination__link fr-displayed-lg" v-else>
          …
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link"
          :aria-current="page === pages.length ? 'page' : null"
          :href="page === pages.length ? null : '#'"
          :title="$t('Page', {nb: pages.length})"
          @click.prevent="_onClick(pages.length)"
        >
          {{ pages.length }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
          :href="page === pages.length ? null : '#'"
          @click.prevent="_onClick(page + 1)"
        >
          {{ $t('Next page') }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--last"
          :href="page === pages.length ? null : '#'"
          @click.prevent="_onClick(pages.length)"
        >
          {{ $t('Last page') }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
function range(size, startAt = 1) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export default {
  props: {
    page: Number,
    changePage: Function,
    page_size: Number,
    total_results: Number,
  },
  computed: {
    pages() {
      return range(Math.ceil(this.total_results / this.page_size));
    },
    visible_pages() {
      const length = this.pages.length;
      const pagesAround = 3;
      const pagesShown = Math.min(pagesAround * 2 + 1, length - 2);
      const start = this.page <= pagesAround ? 2 : this.page - pagesAround;
      if (length <= 2) {
         return [];
      }
      let pagination = [...range(pagesShown, start)];
      if(!pagination.includes(2)) {
        pagination.unshift(null);
      }
      if(!pagination.includes(length - 1)) {
        pagination.push(null);
      }
      return pagination;
    },
  },
  methods: {
    _onClick(index) {
      if (index !== this.page && index > 0 && index <= this.pages.length) return this.changePage(index);
    },
  },
};
</script>
