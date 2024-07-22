<template>
  <div v-if="loading">
    <Loader />
  </div>
  <template v-else-if="totalResults">
    <ul ref="listRef">
      <li v-for="(dataset, key) in datasets" :key="dataset.id">
        <CardLG :dataset="dataset" :style="zIndex(key)" />
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
import type { Dataset, DatasetV2 } from '@datagouv/components';
export type CardListProps = {
  datasets: Array<Dataset | DatasetV2>,
  loading?: boolean,
  totalResults: number,
  pageSize?: number,
};

/** TODO : use a config when the component moved to data.gouv.fr-components */
const defaultPageSize = 20;
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@datagouv/components';
import Loader from "./loader.vue";
import CardLG from './card-lg.vue';

const props = withDefaults(defineProps<CardListProps>(), {
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

const zIndex = (key: number) => {
  return {zIndex: props.datasets.length - key}
};

function changePage (page: number) {
  currentPage.value = page;
  emit("changePage", page);
  scrollToTop();
}

</script>
