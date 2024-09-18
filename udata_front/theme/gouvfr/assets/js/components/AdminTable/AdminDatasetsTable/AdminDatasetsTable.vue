<template>
  <div class="fr-mb-2w">
    <AdminTable>
      <thead>
        <tr>
          <AdminTableTh
            @sort="(direction: SortDirection) => updateSort('title', direction)"
            :sorted="sorted('title')"
            scope="col"
          >
            {{ t('Title of the dataset') }}
          </AdminTableTh>
          <AdminTableTh scope="col">{{ t("Status") }}</AdminTableTh>
          <AdminTableTh
            @sort="(direction: SortDirection) => updateSort('created', direction)"
            :sorted="sorted('created')"
            scope="col"
          >
            {{ t('Created at') }}
          </AdminTableTh>
          <AdminTableTh
            @sort="(direction: SortDirection) => updateSort('last_update', direction)"
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
            @sort="(direction: SortDirection) => updateSort('views', direction)"
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
            @sort="(direction: SortDirection) => updateSort('reuses', direction)"
            :sorted="sorted('reuses')"
            scope="col"
          >
            <Tooltip>
              <span class="fr-icon--sm fr-icon-line-chart-line" aria-hidden="true"></span>
              <template #tooltip>{{ t('Reuses') }}</template>
            </Tooltip>
          </AdminTableTh>
          <AdminTableTh
            @sort="(direction: SortDirection) => updateSort('followers', direction)"
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
          <td>
            <AdminContentWithTooltip>
              <a class="fr-link fr-reset-link" :href="getDatasetLinkToAdmin(dataset)">
                <TextClamp :text="dataset.title" :auto-resize="true" :max-lines="2"/>
              </a>
            </AdminContentWithTooltip>
          </td>
          <td>
            <AdminBadge :type="getStatus(dataset).type">{{ getStatus(dataset).label }}</AdminBadge>
          </td>
          <td>
            {{ formatDate(dataset.created_at) }}
          </td>
          <td>
            {{ formatDate(dataset.last_modified) }}
          </td>
          <td>
            {{ getFilesCount(dataset) }}
          </td>
          <td>
            <Tooltip>
              <QualityScore class="w-100" :score="dataset.quality.score" />
              <template #tooltip>
                <QualityScoreTooltipContent :dataset="dataset" />
              </template>
            </Tooltip>
          </td>
          <td class="monospace">
            {{ summarize(dataset.metrics.discussions) }}
          </td>
          <td class="monospace">
            {{ summarize(dataset.metrics.views) }}
          </td>
          <td class="monospace">
            {{ summarize(dataset.metrics.resources_downloads ?? 0) }}
          </td>
          <td class="monospace">
            {{ summarize(dataset.metrics.reuses) }}
          </td>
          <td class="monospace">
            {{ summarize(dataset.metrics.followers) }}
          </td>
        </tr>
      </tbody>
    </AdminTable>
    <Container v-if="loading" class="fr-p-4w text-align-center">
      <AdminLoader/>
    </Container>
  </div>
</template>
<script setup lang="ts">
import { formatDate, QualityScore, summarize } from "@datagouv/components/ts";
import type { Dataset, DatasetV2 } from '@datagouv/components/ts';
import { useI18n } from 'vue-i18n';
import TextClamp from "vue3-text-clamp";
import QualityScoreTooltipContent from "../../dataset/QualityScore/QualityScoreTooltipContent/QualityScoreTooltipContent.vue";
import AdminBadge from "../../AdminBadge/AdminBadge.vue";
import AdminContentWithTooltip from "../../AdminContentWithTooltip/AdminContentWithTooltip.vue";
import AdminTable from "../Table/AdminTable.vue";
import AdminTableTh from "../Table/AdminTableTh.vue";
import Tooltip from '../../Tooltip/Tooltip.vue';
import { admin_root } from '../../../config';
import type { AdminBadgeState, DatasetSortedBy, SortDirection } from '../../../types';
import Container from "../../Ui/Container/Container.vue";
import AdminLoader from "../../AdminLoader/AdminLoader.vue";

const emit = defineEmits<{
  (event: 'sort', column: DatasetSortedBy, direction: SortDirection): void
}>();

const props = defineProps<{
  datasets: Array<Dataset | DatasetV2>;
  loading: boolean;
  sortDirection: SortDirection;
  sortedBy: DatasetSortedBy;
}>();

const { t } = useI18n();

function updateSort(column: DatasetSortedBy, direction: SortDirection) {
  emit('sort', column, direction);
}

function sorted(column: DatasetSortedBy) {
  if(props.sortedBy === column) {
    return props.sortDirection;
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
