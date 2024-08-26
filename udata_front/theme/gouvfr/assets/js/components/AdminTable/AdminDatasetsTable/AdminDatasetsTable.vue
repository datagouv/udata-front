<template>
  <AdminTable>
    <thead>
      <tr>
        <AdminTableTh
          @sort="(direction) => updateSort('title', direction)"
          :sorted="sorted('title')"
          scope="col"
        >
          {{ t('Title of the dataset') }}
        </AdminTableTh>
        <AdminTableTh scope="col">{{ t("Status") }}</AdminTableTh>
        <AdminTableTh
          @sort="(direction) => updateSort('created', direction)"
          :sorted="sorted('created')"
          scope="col"
        >
          {{ t('Created at') }}
        </AdminTableTh>
        <AdminTableTh
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
          @sort="(direction) => updateSort('reuses', direction)"
          :sorted="sorted('reuses')"
          scope="col"
        >
          <Tooltip>
            <span class="fr-icon--sm fr-icon-line-chart-line" aria-hidden="true"></span>
            <template #tooltip>{{ t('Reuses') }}</template>
          </Tooltip>
        </AdminTableTh>
        <AdminTableTh
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
          <AdminBadge :type="getStatus(dataset).type">{{ getStatus(dataset).label }}</AdminBadge>
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
          <Tooltip>
            <QualityScore :score="dataset.quality.score" />
            <template #tooltip>
              <QualityScoreTooltipContent :dataset="dataset" />
            </template>
          </Tooltip>
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
import { formatDate, QualityScore } from "@datagouv/components";
import type { Dataset, DatasetV2 } from '@datagouv/components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import QualityScoreTooltipContent from "../../dataset/QualityScore/QualityScoreTooltipContent/QualityScoreTooltipContent.vue";
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import AdminTable from "../Table/AdminTable.vue";
import AdminTableTd from "../Table/AdminTableTd.vue";
import AdminTableTh from "../Table/AdminTableTh.vue";
import Tooltip from '../../Tooltip/Tooltip.vue';
import { admin_root } from '../../../config';
import { summarize } from '../../../helpers';
import type { AdminBadgeState, DatasetSortedBy, SortDirection } from '../../../types';

const emit = defineEmits<{
  (event: 'sort', sortDirection: string): void
}>();

defineProps<{
  datasets: Array<Dataset | DatasetV2>
}>();

const { t } = useI18n();

const sortDirection = ref<SortDirection>('desc');
const sortedBy = ref<DatasetSortedBy>('created');

function updateSort(column: DatasetSortedBy, direction: SortDirection) {
  sortDirection.value = direction;
  sortedBy.value = column;
  emit('sort', `${sortDirection.value === 'asc' ? "" : "-"}${sortedBy.value}`);
}

function sorted(column: DatasetSortedBy) {
  if(sortedBy.value === column) {
    return sortDirection.value;
  }
  return null;
}

function getFilesCount(dataset: Dataset | DatasetV2) {
  if(Array.isArray(dataset.resources)) {
    return dataset.resources.length;
  }
  return dataset.resources.total;
}

function getDatasetLinkToAdmin(dataset: Dataset | DatasetV2) {
  return `${admin_root}dataset/${dataset.id}/`;
}

function getStatus(dataset: Dataset | DatasetV2): {label: string, type: AdminBadgeState} {
  if (dataset.deleted) {
    return {
      label: t("Deleted"),
      type: "error",
    };
  } else if (dataset.archived) {
    return {
      label: t("Archived"),
      type: "warning",
    };
  } else if (dataset.private) {
    return {
      label: t("Private"),
      type: "default",
    };
  } else {
    return {
      label: t("Public"),
      type: "info"
    };
  }
}

</script>
