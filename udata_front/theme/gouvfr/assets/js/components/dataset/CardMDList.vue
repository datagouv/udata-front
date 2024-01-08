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
      :changePage="changePage"
      class="fr-mt-2w"
    />
  </template>
</template>

<script lang="ts">
import type { Dataset } from '../../types';
import { useI18n } from 'vue-i18n';
export type CardMDListProps = {
  datasets: Array<Dataset>,
  loading?: boolean,
  totalResults: number,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@etalab/udata-front-plugins-helper';
import Loader from "./loader.vue";
import CardMD from './CardMD.vue';


withDefaults(defineProps<CardMDListProps>(), {
  loading: false,
});

const emit = defineEmits<{
  (event: 'changePage', page: number): void,
}>();

const { t } = useI18n();

const currentPage = ref(1);

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 20;

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
