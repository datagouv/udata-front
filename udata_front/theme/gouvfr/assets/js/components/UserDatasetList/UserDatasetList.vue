<template>
  <h2 class="subtitle subtitle--uppercase fr-mb-5v" v-if="totalResults">
    {{ t('{n} datasets', totalResults) }}
  </h2>
  <CardMDList
    :datasets="currentDatasets"
    :loading="loading"
    :total-results="totalResults"
    @change-page="nextPage"
  />
</template>

<script lang="ts">
import type { Dataset, User } from '../../types';
import useOwnerName from '../../composables/useOwnerName';
export type UserDatasetListProps = {
  datasets: Array<Dataset>,
  owner: User,
  totalResults: number,
};
</script>

<script setup lang="ts">
import axios, { type CancelTokenSource } from 'axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from '../../composables/useToast';
import { apiv2, generateCancelToken } from '../../plugins/api';
import CardMDList from '../dataset/CardMDList.vue';

const { t } = useI18n();
const toast = useToast();

const props = defineProps<UserDatasetListProps>();

const name = useOwnerName({owner: props.owner});

const currentDatasets = ref([...props.datasets]);

const loading = ref(false);

/**
 * Current request to cancel before a new one comes
 */
 const currentRequest = ref<CancelTokenSource | null>(null);

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 20;

/**
 * Load new datasets
 */
 function nextPage (page: number) {
  loading.value = true;
  if (currentRequest.value) currentRequest.value.cancel();
  currentRequest.value = generateCancelToken();
  apiv2
    .get("/datasets/search/", {
      cancelToken: currentRequest.value.token,
      params: {
        page,
        owner: props.owner,
        page_size: pageSize,
      },
    })
    .then((res) => res.data)
    .then((result) => {
      currentDatasets.value = result.data;
      loading.value = false;
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        toast.error(t("Error getting search results."));
        loading.value = false;
      }
    });
};
</script>
