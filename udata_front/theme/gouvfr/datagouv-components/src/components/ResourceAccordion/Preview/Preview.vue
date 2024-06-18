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
      <div class="bg-blue-100 text-blue-400 fr-hidden flex-md fr-p-2w fr-grid-row--middle">
        <div class="france-explore" v-html="franceSvg">
        </div>
        <div class="fr-mx-2w">
          <p class="fr-text--bold fr-m-0">{{ t("Explore data in detail") }}</p>
          <p class="fr-text--sm fr-m-0 f-italic">{{ t("Use our tool to get an overview of data, learn about different columns or perform filters and sorts.") }}</p>
        </div>
        <p class="fr-ml-auto fr-my-0">
          <a :href="resource.preview_url" class="fr-btn fr-btn--icon-right fr-icon-external-link-fill">
            {{ t("Explore data") }}
          </a>
        </p>
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
              <td v-for="col in columns" class="cell-padding"><div class="style-cell"><div class="content-cell">{{ row[col] }}</div></div></td>
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
          {{ t('{count} columns', columns.length) }} —
          {{ t('{count} rows', rowCount) }} —
          {{ t("Preview updated: {date}", {date: lastUpdate}) }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useTabularApiData from "../../../composables/preview/useTabularApiData";
import Loader from "./Loader.vue";
import franceSvg from "./france.svg?raw";
import Pagination from "../../Pagination";
import type { Resource } from "../../../types/resources";
import { formatDate } from "../../../helpers";
import { useI18n } from "vue-i18n";

const props = defineProps<{ resource: Resource }>();

const { t } = useI18n();

const {
    loading,
    hasError,
    rows,
    columns,
    rowCount,
    pageSize,
    currentPage,
    sortConfig,
    isSortedBy,
    sortByField,
    changePage,
    getTableInfos,
  } = useTabularApiData(props.resource)

const lastUpdate = formatDate(props.resource.extras['analysis:parsing:finished_at']);

onMounted(() => {
  getTableInfos(currentPage.value);
});

</script>

<style scoped>
.style-cell {
  height: 3rem;
  overflow-y: auto;
  display: block;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
}

.content-cell {
  margin-top: auto;
  margin-bottom: auto;
}

.col-width {
  width: 20rem;
}

.cell-padding {
  padding: 0.5rem 0rem 0.5rem 1.2rem!important
}

td {
  border-right: 1px solid #CECECE;
  border-bottom: 1px solid #CECECE;
}

th {
  border-right: 1px solid #CECECE;
}

@media (min-width: 48rem) {
  .banner-explore{
    min-height: 7rem;
    background-color: #E6EEFE;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid #CDDDFD;
  }

  .france-explore {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right: 1rem;
  }

  .text-explore {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right: 1rem;
  }
  .title-text-explore {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #3558A2;
  }
}
</style>
