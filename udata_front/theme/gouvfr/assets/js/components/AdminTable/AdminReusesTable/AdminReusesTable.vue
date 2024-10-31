<template>
  <AdminTable :loading>
    <thead>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'title', direction)"
        :sorted="sorted('title')"
        scope="col"
      >
        {{ t("Reuse title") }}
      </AdminTableTh>
      <AdminTableTh>
        {{ t("Status") }}
      </AdminTableTh>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'created', direction)"
        :sorted="sorted('created')"
        scope="col"
      >
        {{ t("Created at") }}
      </AdminTableTh>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'datasets', direction)"
        :sorted="sorted('datasets')"
        scope="col"
      >
        {{ t("Datasets") }}
      </AdminTableTh>
      <AdminTableTh scope="col">
        <Tooltip>
          <span class="fr-icon--sm fr-icon-chat-3-line" aria-hidden="true"></span>
          <template #tooltip> {{ t('Discussions') }}</template>
        </Tooltip>
      </AdminTableTh>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'views', direction)"
        :sorted="sorted('views')"
        scope="col"
      >
        <Tooltip>
          <span class="fr-icon--sm fr-icon-eye-line" aria-hidden="true"></span>
          <template #tooltip> {{ t('Views') }}</template>
        </Tooltip>
      </AdminTableTh>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'followers', direction)"
        :sorted="sorted('followers')"
        scope="col"
      >
        <Tooltip>
          <span class="fr-icon--sm fr-icon-star-s-line" aria-hidden="true"></span>
          <template #tooltip> {{ t('Favorites') }}</template>
        </Tooltip>
      </AdminTableTh>
    </thead>
    <tbody>
      <tr v-for="reuse in reuses">
        <td>
          <AdminContentWithTooltip>
            <a class="fr-link fr-reset-link" :href="getReuseLinkToAdmin(reuse)">
              <TextClamp :text="reuse.title" :auto-resize="true" :max-lines="2"/>
            </a>
          </AdminContentWithTooltip>
        </td>
        <td>
          <AdminBadge :type="getStatus(reuse).type">{{ getStatus(reuse).label }}</AdminBadge>
        </td>
        <td>{{ formatDate(reuse.created_at) }}</td>
        <td class="monospace">{{ summarize(reuse.datasets.length) }}</td>
        <td class="monospace">{{ summarize(reuse.metrics.discussions) }}</td>
        <td class="monospace">{{ summarize(reuse.metrics.views) }}</td>
        <td class="monospace">{{ summarize(reuse.metrics.followers) }}</td>
      </tr>
    </tbody>
  </AdminTable>
</template>
<script setup lang="ts">
import { formatDate, summarize } from '@datagouv/components/ts';
import type { Reuse } from '@datagouv/components/ts';
import TextClamp from 'vue3-text-clamp';
import { useI18n } from 'vue-i18n';
import AdminBadge from '../../../components/AdminBadge/AdminBadge.vue';
import AdminTable from '../../../components/AdminTable/Table/AdminTable.vue';
import AdminTableTh from '../../../components/AdminTable/Table/AdminTableTh.vue';
import AdminContentWithTooltip from '../../../components/AdminContentWithTooltip/AdminContentWithTooltip.vue';
import Tooltip from '../../../components/Tooltip/Tooltip.vue';
import { admin_root } from '../../../config';
import type { AdminBadgeState, ReuseSortedBy, SortDirection } from "../../../types";

const props = defineProps<{
  reuses: Array<Reuse>;
  loading: boolean;
  sortedBy: ReuseSortedBy;
  sortDirection: SortDirection;
}>();

defineEmits<{
  (event: 'sort', column: ReuseSortedBy, direction: SortDirection): void
}>();

const { t } = useI18n();

function sorted(column: ReuseSortedBy) {
  if(props.sortedBy === column) {
    return props.sortDirection;
  }
  return null;
}

function getReuseLinkToAdmin(reuse: Reuse) {
  return `${admin_root}reuse/${reuse.id}/`;
}

function getStatus(reuse: Reuse): {label: string, type: AdminBadgeState} {
  if (reuse.deleted) {
    return {
      label: t("Deleted"),
      type: "error",
    };
  } else if (reuse.archived) {
    return {
      label: t("Archived"),
      type: "warning",
    };
  } else if (reuse.private) {
    return {
      label: t("Draft"),
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
