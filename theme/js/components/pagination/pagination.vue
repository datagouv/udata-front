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
      v-if="totalResults > pageSize"
      :page="currentPage"
      :page-size="pageSize"
      :total-results="totalResults"
      :change-page="changePage"
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
          class="fr-pagination__link"
          :class="{'fr-displayed-sm': page > 1}"
          :title="$t('Page', {nb: 1})"
          @click.prevent="_onClick(1)"
        >
          1
        </a>
      </li>
      <li v-for="index in visiblePages">
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
    pageSize: Number,
    totalResults: Number,
  },
  data() {
    return {
      pagesAround: 3
    }
  },
  computed: {
    pages() {
      return range(Math.ceil(this.totalResults / this.pageSize));
    },
    pagesShown() {
      return Math.min(
        this.pagesAround * 2 + 1, // we want 3 pages around the current one, this is the default
        this.pages.length - 2, // we want to show at most all pages except the first and last
        this.pagesAround + this.page - 1, // if we're close to the first page, we'll show less than 3 pages on the left
        this.pagesAround + this.pages.length - this.page // if we're close to the last page, we'll show less than 3 pages on the right
      );
    },
    startPage() {
      return Math.max(
        this.page - this.pagesAround, // we want to start 3 pages before the current one
        2 // we don't want to start below page 2
      )
    },
    visiblePages() {
      if (this.pages.length <= 2) {
         return [];
      }
      let pagination = [...range(this.pagesShown, this.startPage)];
      if(!pagination.includes(2)) {
        pagination.unshift(null);
      }
      if(!pagination.includes(this.pages.length - 1)) {
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
