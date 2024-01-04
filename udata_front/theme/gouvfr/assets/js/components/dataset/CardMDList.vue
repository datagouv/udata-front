<template>
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
    :changePage="changePage"
    class="fr-mt-2w"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Dataset } from '../../types';
import CardMD from './CardMD.vue';

defineProps<{
  totalResults: number,
  datasets: Array<Dataset>
}>();

const currentPage = ref(1);

const listRef = ref<HTMLElement | undefined>();

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 20;

function scrollToTop () {
  if (listRef.value) {
    listRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

function changePage (page: number) {
  currentPage.value = page;
  scrollToTop();
}

</script>
