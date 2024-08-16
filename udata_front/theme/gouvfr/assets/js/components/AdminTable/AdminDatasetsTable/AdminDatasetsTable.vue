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
          <AdminBadge :type="getStatusType(dataset)">{{ getStatusLabel(dataset) }}</AdminBadge>
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
          {{ summarize(dataset.metrics.resources_downloads ?? 0) }}
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
import { formatDate } from "@datagouv/components";
import type { Dataset, DatasetV2 } from '@datagouv/components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import AdminTable from "../Table/AdminTable.vue";
import AdminTableTd from "../Table/AdminTableTd.vue";
import AdminTableTh from "../Table/AdminTableTh.vue";
import Tooltip from '../../Tooltip/Tooltip.vue';
import QualityScoreTooltip from "../../dataset/QualityScore/QualityScoreTooltip/QualityScoreTooltip.vue";
import { admin_root } from '../../../config';
import { summarize } from '../../../helpers';
import type { AdminBadgeState, DatasetSortedBy, SortDirection } from '../../../types';

const emit = defineEmits<{
  (event: 'sort', sort: string): void
}>();

defineProps<{
  datasets: Array<Dataset | DatasetV2>
}>();

const { t } = useI18n();

const sort = ref<SortDirection>('desc');
const sortedBy = ref<DatasetSortedBy>('created');

type DatasetStatuses = "deleted" | "archived" | "private" | "public";

const datasetStatusBadge: Record<DatasetStatuses, {label: string, type: AdminBadgeState}> = {
  deleted: {
    label: t("Deleted"),
    type: "error",
  },
  archived: {
    label: t("Archived"),
    type: "warning",
  },
  private: {
    label: t("Private"),
    type: "default",
  },
  public: {
    label: t("Public"),
    type: "info"
  }
}

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

function getStatus(dataset: Dataset | DatasetV2) {
  if (dataset.deleted) {
      return datasetStatusBadge.deleted;
  } else if (dataset.archived) {
      return datasetStatusBadge.archived;
  } else if (dataset.private) {
      return datasetStatusBadge.private;
  } else {
      return datasetStatusBadge.public;
  }
}

function getStatusType(dataset: Dataset | DatasetV2): AdminBadgeState {
  return getStatus(dataset).type;
}

function getStatusLabel(dataset: Dataset | DatasetV2) {
  return getStatus(dataset).label;
}

</script>
