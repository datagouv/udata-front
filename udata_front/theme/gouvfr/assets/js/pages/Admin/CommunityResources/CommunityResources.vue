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
          {{ t('Community Resources') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Community Resources") }}</h1>
    <h2 class="subtitle subtitle--uppercase fr-m-0">{{ t("{n} community resources", communityResources.length) }}</h2>
    <AdminCommunityResourcesTable
      v-if="loading || totalResult > 0"
      :community-resources
      :loading
      :sortDirection="direction"
      :sortedBy
      @sort="sort"
    />
    <Container v-else class="fr-mt-1w fr-mb-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="communityResourceBlankState" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`You haven't published a community resource yet`) }}
        </p>
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
import { type CommunityResource, Pagination } from '@datagouv/components/ts';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { getOrganizationCommunityResources, getUserCommunityResources } from '../../../api/resources';
import AdminCommunityResourcesTable from '../../../components/AdminTable/AdminCommunityResourcesTable/AdminCommunityResourcesTable.vue';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import Container from '../../../components/Ui/Container/Container.vue';
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import communityResourceBlankState from "../../../../../templates/svg/illustrations/schema.svg";
import { CommunityResourceSortedBy, SortDirection } from '../../../types';
import { useMe } from '../../../api/me';

const { t } = useI18n();
const props = defineProps<{oid?: string}>();

const communityResources = ref<Array<CommunityResource>>([]);
const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sortedBy = ref<CommunityResourceSortedBy>('created_at_internal');
const direction = ref<SortDirection>('desc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`);

const { currentOrganization } = useCurrentOrganization();
const me = useMe();

function sort(column: CommunityResourceSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  communityResources.value = [];
  try {
    let response;
    if (props.oid) {
      response = await getOrganizationCommunityResources(props.oid, page.value, pageSize.value, sortDirection.value);
    } else if (me.value) {
      response = await getUserCommunityResources(me.value.id, page.value, pageSize.value, sortDirection.value);
    } else {
      return
    }
    communityResources.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});
</script>
