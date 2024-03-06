<template>
  <AdminTable>
    <thead>
      <tr>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('title', direction)"
          :sorted="sorted('title')"
          scope="col"
        >
          {{ t('Title of the dataset') }}
        </AdminTableTh>
        <AdminTableTh scope="col">{{ t("Status") }}</AdminTableTh>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('created', direction)"
          :sorted="sorted('created')"
          scope="col"
        >
          {{ t('Created at') }}
        </AdminTableTh>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('last_update', direction)"
          :sorted="sorted('last_update')"
          scope="col"
        >
          {{ t('Updated at') }}
        </AdminTableTh>
        <AdminTableTh scope="col">{{ t('Files') }}</AdminTableTh>
        <AdminTableTh scope="col">{{ t('Score') }}</AdminTableTh>
        <AdminTableTh scope="col">
          <Tooltip>
            <span class="fr-icon--sm fr-icon-chat-3-line" aria-hidden="true"></span>
            <template #tooltip> {{ t('Discussions') }}</template>
          </Tooltip>
        </AdminTableTh>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('views', direction)"
          :sorted="sorted('views')"
          scope="col"
        >
          <Tooltip>
            <span class="fr-icon--sm fr-icon-eye-line" aria-hidden="true"></span>
            <template #tooltip> {{ t('Views') }}</template>
          </Tooltip>
        </AdminTableTh>
        <AdminTableTh scope="col">
          <Tooltip>
            <span class="fr-icon--sm fr-icon-download-line" aria-hidden="true"></span>
            <template #tooltip> {{ t('Downloads') }}</template>
          </Tooltip>
        </AdminTableTh>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('reuses', direction)"
          :sorted="sorted('reuses')"
          scope="col"
        >
          <Tooltip>
            <span class="fr-icon--sm fr-icon-line-chart-line" aria-hidden="true"></span>
            <template #tooltip> {{ t('Reuses') }}</template>
          </Tooltip>
        </AdminTableTh>
        <AdminTableTh
          :sortable="true"
          @sort="(direction) => updateSort('followers', direction)"
          :sorted="sorted('followers')"
          scope="col"
        >
          <Tooltip>
            <span class="fr-icon--sm fr-icon-star-s-line" aria-hidden="true"></span>
            <template #tooltip> {{ t('Favorites') }}</template>
          </Tooltip>
        </AdminTableTh>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dataset in datasets" :key="dataset.id">
        <AdminTableTd>
          <AdminContentWithTooltip>
            <a class="fr-link" :href="getDatasetLinkToAdmin(dataset)">
              {{ dataset.title }}
            </a>
          </AdminContentWithTooltip>
        </AdminTableTd>
        <AdminTableTd>
        <AdminBadge :type="dataset.private ? 'default' : 'info'">{{ dataset.private ? t('Private') : t('Public') }}</AdminBadge>
        </AdminTableTd>
        <AdminTableTd>
          {{ formatDate(dataset.created_at) }}
        </AdminTableTd>
        <AdminTableTd>
          {{ formatDate(dataset.last_modified) }}
        </AdminTableTd>
        <AdminTableTd>
          {{ getFilesCount(dataset) }}
        </AdminTableTd>
        <AdminTableTd>
          <QualityScoreTooltip :dataset="dataset"/>
        </AdminTableTd>
        <AdminTableTd class="monospace">
          {{ summarize(dataset.metrics.discussions) }}
        </AdminTableTd>
        <AdminTableTd class="monospace">
          {{ summarize(dataset.metrics.views) }}
        </AdminTableTd>
        <AdminTableTd class="monospace">
          {{ summarize(getMetrics(dataset)) }}
        </AdminTableTd>
        <AdminTableTd class="monospace">
          {{ summarize(dataset.metrics.reuses) }}
        </AdminTableTd>
        <AdminTableTd class="monospace">
          {{ summarize(dataset.metrics.followers) }}
        </AdminTableTd>
      </tr>
    </tbody>
  </AdminTable>
</template>
<script setup lang="ts">
import { formatDate } from "@etalab/data.gouv.fr-components";
import type { Dataset, DatasetV2 } from '@etalab/data.gouv.fr-components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import AdminTable from "../Table/AdminTable.vue";
import AdminTableTd from "../Table/AdminTableTd.vue";
import AdminTableTh from "../Table/AdminTableTh.vue";
import Tooltip from '../../Tooltip/Tooltip.vue';
import QualityScoreTooltip from "../../dataset/QualityScore/QualityScoreTooltip/QualityScoreTooltip.vue";
import { metrics_api } from '../../../plugins/api';
import { admin_root } from '../../../config';
import { summarize } from '../../../helpers';
import { DatasetSortedBy, SortDirection } from '../../../types';

const emit = defineEmits<{
  (event: 'sort', sort: string): void
}>();

defineProps<{
  datasets: Array<Dataset | DatasetV2>
}>();

const metrics = ref<Record<string, number>>({});
const sort = ref<SortDirection>('desc');
const sortedBy = ref<DatasetSortedBy>('created');

const { t } = useI18n();

function updateSort(column: DatasetSortedBy, direction: SortDirection) {
  sort.value = direction;
  sortedBy.value = column;
  emit('sort', `${sort.value === 'asc' ? "" : "-"}${sortedBy.value}`);
}

function sorted(column: DatasetSortedBy) {
  if(sortedBy.value === column) {
    return sort.value;
  }
  return undefined;
}

function getFilesCount(dataset: Dataset | DatasetV2) {
  if(Array.isArray(dataset.resources)) {
    return dataset.resources.length;
  }
  return dataset.resources.total;
}

function getDatasetLinkToAdmin(dataset: Dataset | DatasetV2) {
  return admin_root + `dataset/${dataset.id}/`;
}

function getMetrics(dataset: Dataset | DatasetV2) {
  if(metrics.value[dataset.id]) {
    return metrics.value[dataset.id];
  }
  if(!metrics_api) { return 0; }
  metrics_api.get("datasets/data/", {params: {
    metric_month__sort: 'desc',
    dataset_id__exact: dataset.id,
  }}).then(response => {
    metrics.value[dataset.id] = response.data.data[0]?.monthly_download_resource ?? 0;
  });
  return metrics.value[dataset.id];
}

</script>
