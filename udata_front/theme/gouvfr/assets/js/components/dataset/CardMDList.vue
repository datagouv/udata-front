<template>
  <div v-if="loading">
    <Loader />
  </div>
  <template v-else-if="totalResults">
    <ul ref="listRef">
      <li v-for="dataset in datasets" :key="dataset.id">
        <CardMD :dataset="dataset" />
      </li>
    </ul>
    <Pagination
      v-if="totalResults > pageSize"
      :page="currentPage"
      :pageSize="pageSize"
      :totalResults="totalResults"
      @change="changePage"
      class="fr-mt-2w"
    />
  </template>
</template>

<script lang="ts">
import type { Dataset } from '../../types';
export type CardMDListProps = {
  datasets: Array<Dataset>,
  loading?: boolean,
  totalResults: number,
  pageSize?: number,
};

/** TODO : use a config when the component moved to data.gouv.fr-components */
const defaultPageSize = 20;
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@etalab/data.gouv.fr-components';
import Loader from "./loader.vue";
import CardMD from './CardMD.vue';

withDefaults(defineProps<CardMDListProps>(), {
  loading: false,
  pageSize: defaultPageSize,
});

const emit = defineEmits<{
  (event: 'changePage', page: number): void,
}>();

const currentPage = ref(1);

const listRef = ref<HTMLElement | undefined>();

function scrollToTop () {
  if (listRef.value) {
    listRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

function changePage (page: number) {
  currentPage.value = page;
  emit("changePage", page);
  scrollToTop();
}

</script>
