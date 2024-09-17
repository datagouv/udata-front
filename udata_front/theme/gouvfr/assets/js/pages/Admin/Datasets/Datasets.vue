<template>
  <div>
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="currentOrganization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ currentOrganization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Datasets') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Datasets") }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <div class="fr-col">
        <h2 class="subtitle subtitle--uppercase fr-m-0">{{ t('{n} datasets', totalResult) }}</h2>
      </div>
      <div v-if="totalResult" class="fr-col-auto fr-grid-row fr-grid-row--middle">
        <div>
          <a :href="getOrganizationDatasetsCatalogUrl(oid)" class="fr-btn fr-btn--sm fr-icon-download-line fr-btn--icon-left">
            {{ t('Download catalog') }}
          </a>
        </div>
      </div>
    </div>
    <DatasetsTable
      class="fr-mt-1w"
      :datasets="datasets"
      :loading="loading"
      :sort-direction="direction"
      :sorted-by="sortedBy"
      @sort="sort"
    />
    <Container v-if="!loading && totalResult === 0" class="fr-mt-1w fr-mb-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="datasetIcon" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`You haven't published a dataset yet`) }}
        </p>
        <AdminPublishButton />
      </div>
    </Container>
    <Pagination
      v-if="totalResult > pageSize"
      :page="page"
      :page-size="pageSize"
      :total-results="totalResult"
      @change="(changedPage: number) => page = changedPage"
    />
  </div>
</template>
<script setup lang="ts">
import { Pagination, type Dataset } from "@datagouv/components/ts";
import { refDebounced } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { getOrganizationDatasets, getOrganizationDatasetsCatalogUrl } from "../../../api/datasets";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import DatasetsTable from "../../../components/AdminTable/AdminDatasetsTable/AdminDatasetsTable.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { search_autocomplete_debounce } from "../../../config";
import datasetIcon from "../../../../../templates/svg/illustrations/dataset.svg";
import Container from "../../../components/Ui/Container/Container.vue";
import AdminPublishButton from "../../../components/AdminPublishButton/AdminPublishButton.vue";
import type { DatasetSortedBy, SortDirection } from "../../../types";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const datasets = ref<Array<Dataset>>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);;
const sortedBy = ref<DatasetSortedBy>('created');
const direction = ref<SortDirection>('asc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`)
const q = ref("");
const qDebounced = refDebounced(q, search_autocomplete_debounce);

const { currentOrganization } = useCurrentOrganization();

function sort(column: DatasetSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  datasets.value = [];
  try {
    const response = await getOrganizationDatasets(props.oid, qDebounced.value, page.value, pageSize.value, sortDirection.value);
    datasets.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});
</script>
