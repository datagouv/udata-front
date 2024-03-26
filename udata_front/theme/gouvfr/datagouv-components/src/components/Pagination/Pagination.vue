<template>
  <nav role="navigation" class="fr-pagination fr-pagination--centered" :aria-label="t('Pagination')">
    <ul class="fr-pagination__list">
      <li>
        <a
          :href="page === 1 ? undefined :'#'"
          class="fr-pagination__link fr-pagination__link--first"
          @click.prevent="onClick(1)"
          data-testid="first-page"
        >
          {{ t('First page') }}
        </a>
      </li>
      <li>
        <a
          :href="page === 1 ? undefined : '#'"
          class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
          @click.prevent="previousPage"
          data-testid="previous-page"
        >
          {{ t('Previous page') }}
        </a>
      </li>
      <li>
        <a
          :aria-current="page === 1 ? 'page' : undefined"
          :href="page === 1 ? undefined : '#'"
          class="fr-pagination__link"
          :class="{'fr-hidden fr-unhidden-sm': page > 1}"
          :title="t('Page {nb}', {nb: 1})"
          @click.prevent="onClick(1)"
          :data-testid="1"
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
          :title="t('Page {nb}', {nb: index})"
          @click.prevent="onClick(index)"
          :data-testid="index"
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
          :title="t('Page {nb}', {nb: pageCount})"
          @click.prevent="onClick(pageCount)"
          :data-testid="pageCount"
        >
          {{ pageCount }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
          :href="page === pageCount ? undefined : '#'"
          @click.prevent="nextPage"
          data-testid="next-page"
        >
          {{ t('Next page') }}
        </a>
      </li>
      <li>
        <a
          class="fr-pagination__link fr-pagination__link--last"
          :href="page === pageCount ? undefined : '#'"
          @click.prevent="onClick(pageCount)"
          data-testid="last-page"
        >
          {{ t('Last page') }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { getVisiblePages } from "./paginate";

type Props = {
  /**
   * The current page.
   */
  page?: number,
  /**
   * The page size.
   */
  pageSize?: number,
  /**
   * The number of items in the collection. It's used to calculated the number of pages.
   */
  totalResults: number,
};


const emit = defineEmits<{
  (event: 'change', page: number): void
}>();

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSize: 20,
});

const { t } = useI18n();
const pageCount = computed(() => Math.ceil(props.totalResults / props.pageSize));
const visiblePages = computed(() => getVisiblePages(props.page, pageCount.value));

const onClick = (index: number) => {
  if (index !== props.page) {
    return emit("change", index);
  }
}

const nextPage = () => {
  const index = props.page + 1;
  if (index <= pageCount.value) {
    return emit("change", index);
  }
};

const previousPage = () => {
  const index = props.page - 1;
  if (index > 0) {
    return emit("change", index);
  }
}
</script>
