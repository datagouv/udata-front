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
          :aria-disabled="page === 1"
          class="fr-pagination__link fr-pagination__link--first"
          @click.prevent="_onClick(1)"
        >
          {{ $t('First page') }}
        </a>
      </li>
      <li>
        <a
          :aria-disabled="page === 1"
          class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
          @click.prevent="_onClick(page - 1)"
        >
          {{ $t('Previous page') }}
        </a>
      </li>
      <li>
        <a
          :aria-current="page === 1 ? 'page' : null"
          :aria-disabled="page === 1"
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
          :aria-current="page === index ? 'page' : null"
          :title="$t('Page', {nb: index})"
          @click.prevent="_onClick(index)"
          v-if="index"
          >
          {{ index }}
        </a>
        <a class="fr-pagination__link fr-displayed-lg" aria-disabled="true" v-else>
          …
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link"
          :aria-current="page === pages.length ? 'page' : null"
          :title="$t('Page', {nb: pages.length})"
          @click.prevent="_onClick(pages.length)"
        >
          {{ pages.length }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
          :aria-disabled="page === pages.length"
          @click.prevent="_onClick(page + 1)"
        >
          {{ $t('Next page') }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--last"
          :aria-disabled="page === pages.length"
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
      const pagesAround = 1; // Pages around current one
      const pagesShown = Math.min(pagesAround * 2 + 1, length);

      if (length < pagesAround + 2) return [];

      if (this.page <= pagesShown) return [...range(pagesShown, 2), null];

      if (this.page >= length - pagesShown + 1) {
        return [null, ...range(pagesShown, length - pagesShown)];
      }

      return [null, ...range(pagesShown, this.page - pagesAround), null];
    },
  },
  methods: {
    _onClick(index) {
      if (index !== this.page && index > 0 && index <= this.pages.length) return this.changePage(index);
    },
  },
};
</script>
