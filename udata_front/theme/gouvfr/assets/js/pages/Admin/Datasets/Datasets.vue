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
    <DatasetsTable
      :datasets="datasets"
      @sort="(newSort) => sort = newSort"
    />
    <Pagination
      v-if="totalResult > pageSize"
      :page="page"
      :page-size="pageSize"
      :total-results="totalResult"
      @change="(changedPage) => page = changedPage"
    />
  </div>
</template>
<script setup lang="ts">
import { Pagination, type Dataset } from "@etalab/data.gouv.fr-components";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import DatasetsTable from "../../../components/AdminTable/AdminDatasetsTable/AdminDatasetsTable.vue";
import { watchPostEffect } from "vue";
import { getOrganizationDatasets } from "../../../api/datasets";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const datasets = ref<Array<Dataset>>([]);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sort = ref("-created");

const { currentOrganization } = useCurrentOrganization();

watchPostEffect(async () => {
  const response = await getOrganizationDatasets(props.oid, page.value, pageSize.value, sort.value);
  datasets.value = response.data;
  page.value = response.page;
  pageSize.value = response.page_size;
  totalResult.value = response.total;
});
</script>
