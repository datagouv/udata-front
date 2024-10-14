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
          {{ t('Dataservices') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3">{{ t("Dataservices") }}</h1>
    <h2 class="subtitle subtitle--uppercase">{{ t("{n} dataservices", totalResult ) }}</h2>
    <AdminDataservicesTable
      v-if="loading || totalResult > 0"
      :dataservices
      :loading
      :sortDirection="direction"
      :sortedBy
      @sort="sort"
    />
    <Container v-else class="fr-mt-1w fr-mb-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="dataserviceBlankState" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`You haven't published a dataservice yet`) }}
        </p>
        <AdminPublishButton type="dataservice"/>
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
import { type Dataservice, Pagination } from '@datagouv/components/ts';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { getOrganizationDataservices, getUserDataservices } from '../../../api/dataservices';
import AdminPublishButton from '../../../components/AdminPublishButton/AdminPublishButton.vue';
import AdminDataservicesTable from '../../../components/AdminTable/AdminDataservicesTable/AdminDataservicesTable.vue';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import Container from '../../../components/Ui/Container/Container.vue';
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import dataserviceBlankState from "../../../../../templates/svg/illustrations/dataservice.svg";
import { DataserviceSortedBy, SortDirection } from '../../../types';
import { useMe } from '../../../api/me';

const { t } = useI18n();
const props = defineProps<{oid?: string}>();

const dataservices = ref<Array<Dataservice>>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sortedBy = ref<DataserviceSortedBy>('title');
const direction = ref<SortDirection>('desc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`);

const { currentOrganization } = useCurrentOrganization();
const me = useMe();
    
function sort(column: DataserviceSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  dataservices.value = [];
  try {
    let response;
    if (props.oid) {
      response = await getOrganizationDataservices(props.oid, page.value, pageSize.value, sortDirection.value);
    } else if (me.value) {
      response = await getUserDataservices(me.value.id, page.value, pageSize.value, sortDirection.value);
    } else {
      return
    }
    dataservices.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});
</script>
