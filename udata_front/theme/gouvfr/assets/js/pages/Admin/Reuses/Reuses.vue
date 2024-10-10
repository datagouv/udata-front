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
          {{ t('Reuses') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Reuses") }}</h1>
    <h2 class="subtitle subtitle--uppercase fr-mb-0">{{ t("{n} reuses of your organization", reuses.length) }}</h2>
    <AdminReusesTable
      v-if="loading || totalResult > 0"
      :reuses
      :loading
      :sortDirection="direction"
      :sortedBy
      @sort="sort"
    />
    <Container v-else class="fr-mt-1w fr-mb-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="reuseBlankState" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`You haven't published a reuse yet`) }}
        </p>
        <AdminPublishButton type="reuse"/>
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
import { Pagination, Reuse } from '@datagouv/components/ts';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { getOrganizationReuses, getUserReuses } from '../../../api/reuses';
import AdminReusesTable from '../../../components/AdminTable/AdminReusesTable/AdminReusesTable.vue';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import Container from '../../../components/Ui/Container/Container.vue';
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import reuseBlankState from "../../../../../templates/svg/blank_state/reuse.svg";
import { ReuseSortedBy, SortDirection } from '../../../types';
import AdminPublishButton from '../../../components/AdminPublishButton/AdminPublishButton.vue';
import { useMe } from '../../../api/me';

const { t } = useI18n();
const props = defineProps<{oid?: string}>();

const reuses = ref<Array<Reuse>>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sortedBy = ref<ReuseSortedBy>('created');
const direction = ref<SortDirection>('desc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`);

const { currentOrganization } = useCurrentOrganization();
const me = useMe();

function sort(column: ReuseSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  reuses.value = [];
  try {
    let response;
    if (props.oid) {
      response = await getOrganizationReuses(props.oid, page.value, pageSize.value, sortDirection.value);
    } else if (me.value) {
      response = await getUserReuses(me.value.id, page.value, pageSize.value, sortDirection.value);
    } else {
      return;
    }
    reuses.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});
</script>
