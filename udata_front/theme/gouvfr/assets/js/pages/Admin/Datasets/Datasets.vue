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
    <h1 class="fr-h3 fr-mb-5v">{{ t("Datasets") }}</h1>
    <Container class="fr-mb-5v border">
      <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
        <div class="fr-col">
          <h2 class="fr-text--md fr-m-0">{{ t("Statistics of your datasets") }}</h2>
        </div>
        <p class="fr-col-auto fr-m-0">
          <button class="fr-btn fr-btn--sm fr-icon-download-line fr-btn--icon-left">
            {{ t("Download") }}
          </button>
        </p>
        <!-- TODO: require useAccordion from @datagouv/components
          <p class="fr-col-auto fr-ml-3v fr-m-0">
            <button
              @click="expand"
              role="button"
              :aria-expanded="expanded"
              :aria-controls="resourceContentId"
              class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-btn--secondary-grey-500"
              :class="{'fr-icon-arrow-up-s-line': expanded, 'fr-icon-arrow-down-s-line': !expanded}"
              data-testid="expand-button"
            >
            {{ t('See statistics') }}
            </button>
          </p>-->
      </div>
    </Container>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <h2 class="fr-col-12 fr-col-sm subtitle subtitle--uppercase fr-m-0">{{ t('{n} datasets', totalResult) }}</h2>
      <div class="fr-col-auto fr-grid-row fr-grid-row--middle">
        <!-- Add search component when org API allow search <InputGroup
          class="fr-m-0 fr-mr-1w"
          :label="t('Search')"
          v-model.trim="q"
        /> -->
        <div>
          <a :href="getOrganizationDatasetsCatalogUrl(oid)" class="fr-btn fr-btn--sm fr-icon-download-line fr-btn--icon-left">
            {{ t('Download catalog') }}
          </a>
        </div>
      </div>
    </div>
    <DatasetsTable
      class="fr-mt-1v"
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
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { getOrganizationDatasets, getOrganizationDatasetsCatalogUrl } from "../../../api/datasets";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import DatasetsTable from "../../../components/AdminTable/AdminDatasetsTable/AdminDatasetsTable.vue";
import Container from "../../../components/Ui/Container/Container.vue";
import InputGroup from "../../../components/Form/InputGroup/InputGroup.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { refDebounced } from "@vueuse/core";
import { search_autocomplete_debounce } from "../../../config";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const datasets = ref<Array<Dataset>>([]);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sort = ref("-created");
const q = ref("");
const qDebounced = refDebounced(q, search_autocomplete_debounce);

const { currentOrganization } = useCurrentOrganization();

watchEffect(async () => {
  const response = await getOrganizationDatasets(props.oid, qDebounced.value, page.value, pageSize.value, sort.value);
  datasets.value = response.data;
  page.value = response.page;
  pageSize.value = response.page_size;
  totalResult.value = response.total;
});
</script>
