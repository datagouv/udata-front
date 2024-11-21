<template>
  <h2 class="subtitle subtitle--uppercase fr-mb-5v" v-if="totalResults">
    {{ t('{n} reuses', totalResults) }}
  </h2>
  <ReuseList
    :page-size="pageSize"
    :reuses="reuses"
    :loading="loading"
    :total-results="totalResults"
    @change-page="loadPage"
  />
</template>

<script lang="ts">
export type UserReuseListProps = {
  owner: string,
};
</script>

<script setup lang="ts">
import axios, { type CancelTokenSource } from 'axios';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from '../../composables/useToast';
import { apiv2, generateCancelToken } from '../../plugins/api';
import ReuseList from '../Reuse/ReuseList.vue';
import { Reuse } from '@datagouv/components/ts';

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<UserReuseListProps>();

const reuses = ref<Array<Reuse>>([]);
const totalResults = ref(0);
const loading = ref(false);

/**
 * Current request to cancel before a new one comes
 */
const currentRequest = ref<CancelTokenSource | null>(null);

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 6;

/**
 * Load new reuses
 */
function loadPage (page: number) {
  loading.value = true;
  if (currentRequest.value) currentRequest.value.cancel();
  currentRequest.value = generateCancelToken();
  apiv2
    .get("/reuses/search/", {
      cancelToken: currentRequest.value.token,
      params: {
        page,
        owner: props.owner,
        page_size: pageSize,
      },
    })
    .then((res) => res.data)
    .then((result) => {
      reuses.value = result.data;
      totalResults.value = result.total;
      loading.value = false;
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        toast.error(t("Error getting search results."));
        loading.value = false;
      }
    });
};

onMounted(() => {
  loadPage(1);
});
</script>
