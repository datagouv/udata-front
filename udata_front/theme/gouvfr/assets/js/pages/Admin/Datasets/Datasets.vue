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

    <div
      class="bg-white border rounded-xxs fr-mb-3w"
      v-if="oid && !loading && totalResult > 0"
      :class="{ 'fr-pb-4v': metricsOpen }"
    >
      <header class="fr-p-3w flex items-center justify-between relative">
        <div>
          <h4 class="fr-mb-1v flex items-center" :id="metricsTitleId">
            <button type="button" @click="metricsOpen = ! metricsOpen" class="fr-p-0 fr-text flex items-center font-bold" data-testid="expand-button" :aria-expanded="metricsOpen">
              {{ $t('Statistics on your datasets') }}

              <span class="absolute inset-0 z-1"></span>
            </button>
          </h4>
        </div>
        <div class="flex items-center fr-ml-4v buttons">
          <p class="fr-col-auto fr-ml-3v fr-m-0">
            <a
              :disabled="!downloadStatsUrl"
              :href="downloadStatsUrl || ''"
              rel="ugc nofollow noopener"
              :title="t('Download file')"
              download="stats.csv"
              class="relative fr-btn fr-btn--sm fr-btn--icon-left fr-icon-test-tube-line fr-icon-download-line fr-icon--sm z-2"
            >
              {{ $t('Download') }}
            </a>
          </p>
          <div
            class="fr-icon--sm fr-ml-4v"
            :class="{'fr-icon-arrow-up-s-line': metricsOpen, 'fr-icon-arrow-down-s-line': !metricsOpen}"
          ></div>
        </div>
      </header>
      <section
        v-if="metricsOpen"
        :aria-labelledby="metricsTitleId"
        class="flex fr-pb-3w fr-pl-3w fr-pr-3w"
      >
        <StatBox :title="$t('Views')" :data="metricsViews" type="line" :summary="metricsViewsTotal" class="w-1/3" />
        <StatBox :title="$t('Downloads')" :data="metricsDownloads" type="line" :summary="metricsDownloadsTotal" class="w-1/3" />
        <StatBox :title="$t('Reuses Visits')" :data="metricsReuses" type="line" :summary="metricsReusesTotal" class="w-1/3" />
      </section>
    </div>

    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <div class="fr-col">
        <h2 class="subtitle subtitle--uppercase fr-m-0">{{ t('{n} datasets', totalResult) }}</h2>
      </div>
      <div v-if="oid" class="fr-col-auto fr-grid-row fr-grid-row--middle">
        <div>
          <a :href="getOrganizationDatasetsCatalogUrl(oid, totalResult)" class="fr-btn fr-btn--sm fr-icon-download-line fr-btn--icon-left">
            {{ t('Download catalog') }}
          </a>
        </div>
      </div>
    </div>
    <DatasetsTable
      v-if="loading || totalResult > 0"
      :datasets
      :loading
      :sort-direction="direction"
      :sortedBy
      @sort="sort"
    />
    <Container v-else class="fr-my-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="datasetIcon" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`You haven't published a dataset yet`) }}
        </p>
        <AdminPublishButton type="dataset" />
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
import { Pagination, StatBox, type Dataset } from "@datagouv/components/ts";
import { refDebounced } from "@vueuse/core";
import { computed, ref, useId, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { getOrganizationDatasets, getOrganizationDatasetsCatalogUrl, getUserDatasets } from "../../../api/datasets";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import DatasetsTable from "../../../components/AdminTable/AdminDatasetsTable/AdminDatasetsTable.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { search_autocomplete_debounce } from "../../../config";
import datasetIcon from "../../../../../templates/svg/illustrations/dataset.svg";
import Container from "../../../components/Ui/Container/Container.vue";
import AdminPublishButton from "../../../components/AdminPublishButton/AdminPublishButton.vue";
import type { DatasetSortedBy, SortDirection } from "../../../types";
import { useMe } from "../../../api/me";

const { t } = useI18n();
const props = defineProps<{oid?: string}>();

const datasets = ref<Array<Dataset>>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);;
const sortedBy = ref<DatasetSortedBy>('created');
const direction = ref<SortDirection>('desc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`);
const q = ref("");
const qDebounced = refDebounced(q, search_autocomplete_debounce);

const { currentOrganization } = useCurrentOrganization();
const me = useMe();

function sort(column: DatasetSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  datasets.value = [];
  try {
    let response;
    if (props.oid) {
      response = await getOrganizationDatasets(props.oid, qDebounced.value, page.value, pageSize.value, sortDirection.value);
    } else if (me.value) {
      response = await getUserDatasets(me.value.id, qDebounced.value, page.value, pageSize.value, sortDirection.value);
    } else {
      return
    }
    datasets.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});

const metricsOpen = ref(false);
const metricsTitleId = useId();

const metricsViews = ref<null | Record<string, number>>(null);
const metricsViewsTotal = ref<null | number>(null);
const metricsDownloads = ref<null | Record<string, number>>(null);
const metricsDownloadsTotal = ref<null | number>(null);
const metricsReuses = ref<null | Record<string, number>>(null);
const metricsReusesTotal = ref<null | number>(null);
watchEffect(async () => {
  if (! props.oid) return;

  {
    // Fetching last 12 months
    const response = await fetch(`https://metric-api.data.gouv.fr/api/organizations/data/?organization_id__exact=${props.oid}&metric_month__sort=desc&page_size=12`)
    const page = await response.json();

    metricsViews.value = {};
    metricsDownloads.value = {};
    metricsReuses.value = {};

    for (const { metric_month, monthly_download_resource, monthly_visit_dataset, monthly_visit_reuse } of page.data) {
      metricsViews.value[metric_month] = monthly_visit_dataset;
      metricsDownloads.value[metric_month] = monthly_download_resource;
      metricsReuses.value[metric_month] = monthly_visit_reuse;
    }
  }

  {
    // Fetching totals
    const response = await fetch(`https://metric-api.data.gouv.fr/api/organizations_total/data/?organization_id__exact=${props.oid}`)
    const page = await response.json();
    if(page.data[0]) {
      metricsViewsTotal.value = page.data[0].visit_dataset;
      metricsDownloadsTotal.value = page.data[0].download_resource;
      metricsReusesTotal.value = page.data[0].visit_reuse;
    }
  }
})

const downloadStatsUrl = computed(() => {
  if (! metricsViews.value || ! metricsDownloads.value || ! metricsReuses.value) {
    return null;
  }

  let data = 'month,visit_datasets,download_resource,visit_reuse\n'

  for (const month in metricsViews.value) {
    data += `${month},${metricsViews.value[month]},${metricsDownloads.value[month]},${metricsReuses.value[month]}\n`
  }

  return URL.createObjectURL(new Blob([data], { type: 'text/csv' }));
})


</script>
<style scoped>
.w-1\/3 {
  width: 33.33%
}
</style>
