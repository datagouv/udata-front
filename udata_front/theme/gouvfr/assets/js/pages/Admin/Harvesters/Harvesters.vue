<template>
  <div class="fr-container--fluid">
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
          {{ t('Harvesters') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Harvesters") }}</h1>
    <h2 class="subtitle subtitle--uppercase fr-m-0">{{ t("{n} harvesters", totalResult) }}</h2>
    <AdminTable :loading v-if="loading || totalResult">
      <thead>
        <AdminTableTh scope="col">
          {{ t("Name") }}
        </AdminTableTh>
        <AdminTableTh scope="col">
          {{ t("Status") }}
        </AdminTableTh>
        <AdminTableTh scope="col">
          {{ t("Created at") }}
        </AdminTableTh>
        <AdminTableTh scope="col">
          {{ t("Last run") }}
        </AdminTableTh>
        <AdminTableTh scope="col">
          {{ t("Datasets") }}
        </AdminTableTh>
        <AdminTableTh scope="col">
          {{ t("Dataservices") }}
        </AdminTableTh>
      </thead>
      <tbody>
        <tr v-for="harvester in harvesters">
          <td>
            <AdminContentWithTooltip>
              <a class="fr-link fr-reset-link" :href="getHarvesterLinkToAdmin(harvester)">
                <TextClamp :text="harvester.name" :auto-resize="true" :max-lines="2"/>
              </a>
            </AdminContentWithTooltip>
          </td>
          <td>
            <AdminBadge :type="getStatus(harvester).type">{{ getStatus(harvester).label }}</AdminBadge>
          </td>
          <td>{{ formatDate(harvester.created_at) }}</td>
          <td>
            <template v-if="harvester.last_job?.ended">
              {{ formatDate(harvester.last_job.ended) }}
            </template>
            <template v-else>
              {{ t('Not yet') }}
            </template>
          </td>
          <td>
            {{ getHarvesterDatasets(harvester) }}
          </td>
          <td>
            {{ getHarvesterDataservices(harvester) }}
          </td>
        </tr>
      </tbody>
    </AdminTable>
    <Container v-else class="fr-my-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="harvesterIcon" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`There is no harvesters yet`) }}
        </p>
        <AdminPublishButton type="harvester" />
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
import { api, formatDate, Pagination } from '@datagouv/components/ts';
import { ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import TextClamp from "vue3-text-clamp";
import { getOrganizationHarvesters } from '../../../api/harvesters';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import Container from '../../../components/Ui/Container/Container.vue';
import AdminPublishButton from '../../../components/AdminPublishButton/AdminPublishButton.vue';
import AdminTable from '../../../components/AdminTable/Table/AdminTable.vue';
import AdminTableTh from '../../../components/AdminTable/Table/AdminTableTh.vue';
import AdminContentWithTooltip from '../../../components/AdminContentWithTooltip/AdminContentWithTooltip.vue';
import AdminBadge from '../../../components/AdminBadge/AdminBadge.vue';
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { admin_root } from '../../../config';
import harvesterIcon from "../../../../../templates/svg/blank_state/harvester.svg";
import type { AdminBadgeState, HarvesterJob, HarvesterSource } from "../../../types";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const harvesters = ref<Array<HarvesterSource>>([]);
const jobs = ref<Record<string, HarvesterJob>>({});

const { currentOrganization } = useCurrentOrganization();

function getHarvesterLinkToAdmin(harvester: HarvesterSource) {
  return `${admin_root}harvester/${harvester.id}/`;
}

function getHarvesterDataservices(harvester: HarvesterSource) {
  if(!harvester.last_job|| !jobs.value[harvester.last_job.id]) {
    return 0;
  }
  return jobs.value[harvester.last_job.id].items.filter(item => item.dataservice).length;
}

function getHarvesterDatasets(harvester: HarvesterSource) {
  if(!harvester.last_job || !jobs.value[harvester.last_job.id]) {
    return 0;
  }
  return jobs.value[harvester.last_job.id].items.filter(item => item.dataset).length;
}

function getStatus(harvester: HarvesterSource): { label: string, type: AdminBadgeState } {
  switch(harvester.last_job?.status) {
    case 'pending':
      return {
        label: t('Pending'),
        type: 'default'
      };
    case 'initializing':
      return {
        label: t('Initializing'),
        type: 'info'
      };
    case 'initialized':
      return {
        label: t('Initialized'),
        type: 'default'
      };
    case 'processing':
      return {
        label: t('Processing'),
        type: 'info'
      };
    case 'done':
      return {
        label: t('Done'),
        type: 'success'
      };
    case 'done-errors':
      return {
        label: t('Done with errors'),
        type: 'warning'
      };
    case 'failed':
      return {
        label: t('Failed'),
        type: 'error'
      };
    default:
      return {
        label: t('No job yet'),
        type: 'default'
      };
  }
}

watchEffect(async () => {
  loading.value = true;
  harvesters.value = [];
  try {
    const response = await getOrganizationHarvesters(props.oid, page.value, pageSize.value);
    harvesters.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
    const jobRequests = [];
    for (const source of harvesters.value) {
      if(source.last_job?.id) {
        jobRequests.push(api.get<HarvesterJob>(`harvest/job/${source.last_job.id}/`));
      }
    }
    const requests = await Promise.allSettled(jobRequests);
    for(const request of requests) {
      if(request.status === "fulfilled") {
        jobs.value[request.value.data.id] = request.value.data;
      }
    }
  } finally {
    loading.value = false;
  }
});
</script>
