<!--
---
name: Pagination
category: 5 - Interactions
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
          :href="page === 1 ? undefined :'#'"
          class="fr-pagination__link fr-pagination__link--first"
          @click.prevent="onClick(1)"
        >
          {{ $t('First page') }}
        </a>
      </li>
      <li>
        <a
          :href="page === 1 ? undefined : '#'"
          class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
          @click.prevent="previousPage"
        >
          {{ $t('Previous page') }}
        </a>
      </li>
      <li>
        <a
          :aria-current="page === 1 ? 'page' : undefined"
          :href="page === 1 ? undefined : '#'"
          class="fr-pagination__link"
          :class="{'fr-hidden fr-unhidden-sm': page > 1}"
          :title="$t('Page', {nb: 1})"
          @click.prevent="onClick(1)"
        >
          1
        </a>
      </li>
      <li v-for="index in visiblePages">
        <a
          class="fr-pagination__link"
          :class="{'fr-hidden fr-unhidden-lg': index < page - 1 || index > page + 1}"
          :aria-current="page === index ? 'page' : undefined"
          :href="page === index ? undefined : '#'"
          :title="$t('Page', {nb: index})"
          @click.prevent="onClick(index)"
          v-if="index"
          >
          {{ index }}
        </a>
        <a class="fr-pagination__link fr-hidden fr-unhidden-lg" v-else>
          …
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link"
          :aria-current="page === pageCount ? 'page' : undefined"
          :href="page === pageCount ? undefined : '#'"
          :title="$t('Page', {nb: pageCount})"
          @click.prevent="onClick(pageCount)"
        >
          {{ pageCount }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
          :href="page === pageCount ? undefined : '#'"
          @click.prevent="nextPage"
        >
          {{ $t('Next page') }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--last"
          :href="page === pageCount ? undefined : '#'"
          @click.prevent="onClick(pageCount)"
        >
          {{ $t('Last page') }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, defineComponent } from "vue";
import getVisiblePages from "./pagination";

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 0,
    },
    changePage: {
      type: Function,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    totalResults: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pageCount = computed(() => Math.ceil(props.totalResults / props.pageSize));
    const visiblePages = computed(() => getVisiblePages(props.page, pageCount.value));

    /**
    * @param {number} index
    */
    const onClick = (index) => {
      if (index !== props.page) {
        return props.changePage(index);
      }
    }

    const nextPage = () => {
      const index = props.page + 1;
      if (index <= pageCount.value) {
        return props.changePage(index);
      }
    };

    const previousPage = () => {
      const index = props.page - 1;
      if (index > 0) {
        return props.changePage(index);
      }
    }

    return {
      pageCount,
      visiblePages,
      onClick,
      nextPage,
      previousPage,
    }
  }
});
</script>
