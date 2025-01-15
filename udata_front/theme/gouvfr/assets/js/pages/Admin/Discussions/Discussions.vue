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
          {{ t('Discussions') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Discussions") }}</h1>
    <h2 class="subtitle subtitle--uppercase fr-m-0">{{ t("{n} discussions", totalResult) }}</h2>
    <AdminDiscussionsTable
      v-if="loading || totalResult > 0"
      :discussions
      :loading
      :sort-direction="direction"
      :sortedBy
      @sort="sort"
    />
    <Container v-else class="fr-my-2w">
      <div class="text-align-center fr-py-1w">
        <img :src="discussionIcon" alt="" loading="lazy"/>
        <p class="fr-text--bold fr-my-3v">
          {{ t(`There is no discussion yet`) }}
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
import { Pagination } from '@datagouv/components/ts';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { getOrganizationDiscussions } from '../../../api/discussions';
import AdminDiscussionsTable from '../../../components/AdminTable/AdminDiscussionsTable/AdminDiscussionsTable.vue';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import Container from '../../../components/Ui/Container/Container.vue';
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import type { DiscussionSortedBy, SortDirection, Thread } from "../../../types";
import discussionIcon from "../../../../../templates/svg/blank_state/discussion.svg";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const loading = ref(false);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);;
const sortedBy = ref<DiscussionSortedBy>('created');
const direction = ref<SortDirection>('desc');
const sortDirection = computed(() => `${direction.value === 'asc' ? "" : "-"}${sortedBy.value}`);
const discussions = ref<Array<Thread>>([]);

const { currentOrganization } = useCurrentOrganization();

function sort(column: DiscussionSortedBy, newDirection: SortDirection) {
  sortedBy.value = column;
  direction.value = newDirection;
}

watchEffect(async () => {
  loading.value = true;
  discussions.value = [];
  try {
    const response = await getOrganizationDiscussions(props.oid, page.value, pageSize.value, sortDirection.value);
    discussions.value = response.data;
    page.value = response.page;
    pageSize.value = response.page_size;
    totalResult.value = response.total;
  } finally {
    loading.value = false;
  }
});
</script>
