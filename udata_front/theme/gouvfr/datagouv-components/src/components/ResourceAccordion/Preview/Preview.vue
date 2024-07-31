<template>
  <div>
    <div class="bg-alt-green-tilleul-verveine fr-p-3v fr-mt-4w fr-mx-4w fr-mb-3v" v-if="hasError">
      <p class="fr-grid-row fr-m-0">
        <span class="fr-icon-warning-line" aria-hidden="true"></span>
        {{ t("The preview of this file failed to load.") }}
      </p>
    </div>
    <Loader v-else-if="loading" />
    <template v-else>
      <div class="bg-blue-100 text-blue-400 fr-hidden fr-unhidden-md fr-p-2w">
        <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
          <div class="fr-col-auto" v-html="franceSvg">
          </div>
          <div class="fr-col">
            <p class="fr-text--bold fr-m-0">{{ t("Explore data in detail") }}</p>
            <p class="fr-text--sm fr-m-0 f-italic">{{ t("Use our tool to get an overview of data, learn about different columns or perform filters and sorts.") }}</p>
          </div>
          <p class="fr-col-auto fr-my-0">
            <a :href="resource.preview_url" class="fr-btn fr-btn--icon-right fr-icon-external-link-fill">
              {{ t("Explore data") }}
            </a>
          </p>
        </div>
      </div>
      <div class="fr-table fr-table--no-background fr-p-0 fr-pt-0-5v fr-m-0">
        <table class="fr-mb-3w">
          <caption class="fr-sr-only">{{ t('Preview of {name}', { name: resource.title }) }}</caption>
          <thead>
            <tr>
              <th scope="col" v-for="col in columns">
                <div class="fr-grid-row fr-grid-row--middle col-width">
                  <button
                    class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-my-n1w"
                    :class="{
                      'fr-btn--secondary-grey-500': !isSortedBy(col),
                      'fr-btn--icon-right': isSortedBy(col),
                      'fr-icon-arrow-down-line': isSortedBy(col) && sortConfig && sortConfig.type == 'desc',
                      'fr-icon-arrow-up-line': isSortedBy(col) && sortConfig && sortConfig.type == 'asc'
                      }"
                    @click="sortByField(col)"
                  >
                    {{ col }}
                    <span class="fr-sr-only">{{ sortConfig && sortConfig.type == 'desc' ? t("Sort ascending") : t("Sort descending") }}</span>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" >
              <td
                v-for="col in columns"
                class="cell-padding"
              >
                <div class="fr-grid-row fr-grid-row--middle fr-text--xs w-100 style-cell">
                  <div class="fr-my-auto">{{ row[col] }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        class="fr-mt-3w"
        :page="currentPage"
        :pageSize="pageSize"
        :totalResults="rowCount"
        @change="changePage"
      />
      <div class="fr-px-5v">
        {{ t("Preview updated on {date}", {date: lastUpdate}) }} —
        {{ t('{count} columns', columns.length) }} —
        {{ t('{count} rows', rowCount) }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import Loader from "./Loader.vue";
import franceSvg from "./france.svg?raw";
import Pagination from "../../Pagination";
import { getData, type SortConfig } from '../../../api/tabularApi';
import { config } from '../../../config';
import { formatDate } from "../../../helpers";
import type { Resource } from "../../../types/resources";

const props = defineProps<{ resource: Resource }>();

const { t } = useI18n();

const rows = ref<Array<Record<string, any>>>([]);
const columns = ref<Array<string>>([]);
const loading = ref(true);
const hasError = ref(false);
const sortConfig = ref<SortConfig>(null);
const rowCount = ref(0);
const pageSize = config.tabular_page_size;
const currentPage = ref(1);

/**
 * Check if the preview is sorted by the provided column
 */
function isSortedBy(col: string) {
  return col === sortConfig.value?.column;
}

/**
 * Retrieve preview necessary infos
 */
 async function getTableInfos (page: number, sortConfig?: SortConfig) {
  try {
    // Check that this function return wanted data
    const { data } = await getData(props.resource.id, page, sortConfig);
    if ('data' in data && data.data && data.data.length > 0) {
      // Update existing rows
      rows.value = data.data;
      columns.value = Object.keys(data.data[0]).filter(item => item !== "__id");
      rowCount.value = data.meta.total;
      currentPage.value = page;
      loading.value = false
    } else {
      hasError.value = true;
      loading.value = false;
    }
  } catch (error) {
    hasError.value = true;
    loading.value = false;
  }
};

/**
 * Change page
 */
function changePage(page: number) {
  getTableInfos(page, sortConfig.value);
}


/**
 * Sort by a specific column
 */
function sortByField(col: string) {
  if (sortConfig.value && sortConfig.value.column == col) {
    if (sortConfig.value.type == "asc") {
      sortConfig.value.type = "desc";
    } else {
      sortConfig.value.type = "asc";
    }
  } else {
    if (!sortConfig.value) {
      sortConfig.value = {
        column: col,
        type: "asc",
      };
    } else {
      sortConfig.value.column = col;
      sortConfig.value.type = "asc";
    }
  }
  currentPage.value = 1;
  getTableInfos(currentPage.value, sortConfig.value);
};

const lastUpdate = formatDate(props.resource.extras['analysis:parsing:finished_at']);

onMounted(() => {
  getTableInfos(currentPage.value);
});

</script>

<style scoped>
.style-cell {
  height: 3rem;
  overflow-y: auto;
}

.col-width {
  width: 20rem;
}

.cell-padding {
  padding: 0.5rem 0rem 0.5rem 1.2rem!important;
}

td {
  border-right: 1px solid #CECECE;
  border-bottom: 1px solid #CECECE;
}

th {
  border-right: 1px solid #CECECE;
}
</style>
