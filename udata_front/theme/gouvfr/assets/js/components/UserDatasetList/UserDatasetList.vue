<template>
  <h2 class="subtitle subtitle--uppercase fr-mb-5v" v-if="totalResults">
    {{ t('{n} datasets', totalResults) }}
  </h2>
  <CardList
    :page-size="pageSize"
    :datasets="datasets"
    :loading="loading"
    :total-results="totalResults"
    @change-page="loadPage"
  />
</template>

<script lang="ts">
import type { Dataset } from '@datagouv/components/ts';

export type UserDatasetListProps = {
  owner: string,
};
</script>

<script setup lang="ts">
import axios, { type CancelTokenSource } from 'axios';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from '../../composables/useToast';
import { apiv2, generateCancelToken } from '../../plugins/api';
import CardList from '../dataset/CardList.vue';

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<UserDatasetListProps>();

const datasets = ref<Array<Dataset>>([]);
const totalResults = ref(0);
const loading = ref(false);

/**
 * Current request to cancel before a new one comes
 */
const currentRequest = ref<CancelTokenSource | null>(null);

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 3;

/**
 * Load new datasets
 */
function loadPage (page: number) {
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
      datasets.value = result.data;
      totalResults.value = result.total;
      loading.value = false;
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        toast.error(t("Error getting search results."));
        loading.value = false;
      }
    });
};
onMounted(() => {
  loadPage(1);
});
</script>
