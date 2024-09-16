<template>
  <form class="fr-pt-3v" @submit.prevent="search">
    <div class="fr-grid-row fr-grid-row--middle justify-between" ref="searchRef" data-cy="search">
      <section class="fr-search-bar fr-search-bar--lg w-100">
        <label class="fr-label" :for="searchId">
          {{ t("Search") }}
        </label>
        <input
          :id="searchId"
          type="search"
          v-model="searchQuery"
          ref="searchInput"
          class="fr-input"
          :aria-label="t('Search...')"
          :placeholder="t('Search...')"
          data-cy="search-input"
          data-testid="search-input"
        />
        <button class="fr-btn" type="submit">
          {{ t('Search') }}
        </button>
      </section>
    </div>
    <div class="fr-grid-row fr-mt-1w fr-mt-md-5v">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3">
        <nav class="fr-sidemenu" aria-labelledby="fr-sidemenu-title">
          <div class="fr-sidemenu__inner">
            <button
              class="fr-sidemenu__btn fr-mt-1w"
              hidden
              aria-controls="fr-sidemenu-wrapper"
              aria-expanded="false"
            >
              {{ t('Filter results') }}
            </button>
            <div class="fr-collapse" id="fr-sidemenu-wrapper">
              <div class="fr-sidemenu__title fr-mb-3v" id="fr-sidemenu-title">{{ t('Filters') }}</div>
              <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Organizations')"
                    :searchPlaceholder="t('Search an organization...')"
                    :allOption="t('All organizations')"
                    listUrl="/organizations/?sort=-followers"
                    suggestUrl="/organizations/suggest/"
                    entityUrl="/organizations/"
                    :values="organization"
                    @change="(value: string) => organization = value"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12 fr-mb-3w text-align-center" v-if="hasFilters">
                  <button
                    class="fr-btn fr-btn--secondary fr-icon-close-circle-line fr-btn--icon-left justify-center w-100"
                    @click="resetFilters"
                  >
                    {{ t('Reset filters') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-mt-2w fr-mt-md-0 search-results">
        <div v-if="dataservices === null">
          <Loader />
        </div>
        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle justify-between fr-pb-1w" v-if="dataservices !== null">
          <p class="fr-col-auto fr-my-0" role="status">
            {{ t("{count} results", dataservices.total) }}
          </p>
          <!-- <div class="fr-col-auto fr-grid-row fr-grid-row--middle">
            <label for="sort-search" class="fr-col-auto fr-text--sm fr-m-0 fr-mr-1w">
                {{ t('Sort by:') }}
            </label>
            <div class="fr-col">
                <select
                  id="sort-search"
                  class="fr-select fr-select--blue"
                  name="sort"
                  v-model="searchSort"
                  @change="handleSortChange"
                >
                  <option value="">
                    {{ t('Relevance') }}
                  </option>
                  <option v-for="{value, label} in sortOptions" :value='value'>
                    {{ label }}
                  </option>
                </select>
            </div>
          </div> -->
        </div>
        <div v-if="dataservices !== null && dataservices.data.length">
          <ul class="fr-mt-1w border-default-grey border-top relative z-2">
            <li v-for="dataservice in dataservices.data" :key="dataservice.id">
              <DataserviceCard :dataservice dataserviceUrl="" />
            </li>
          </ul>
          <Pagination
              v-if="dataservices !== null && dataservices.total > dataservices.page_size"
              :page="page"
              :pageSize="dataservices.page_size"
              :totalResults="dataservices.total"
              @change="changePage"
              class="fr-mt-2w"
            />
        </div>
        <div v-if="dataservices !== null && dataservices.data.length === 0" class="fr-mt-2w">
          <ActionCard
          :title="t('No result found for your search')"
          :icon="franceWithMagnifyingGlassIcon"
          type="primary"
          >
            <p class="fr-mt-1v fr-mb-3v">
              {{ t("Try to reset filters to widen your search.") }}<br/>
              {{ t("You can also give us more details with our feedback form.") }}
            </p>
            <template v-slot:actions>
              <button @click="resetFilters" class="fr-btn fr-btn--secondary">
                {{ t("Reset filters") }}
              </button>
              <a :href="data_search_feedback_form_url" class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-lightbulb-line fr-ml-1w">
                {{ t("Tell us what you are looking for") }}
              </a>
            </template>
          </ActionCard>
        </div>
      </section>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Dataservice, DataserviceCard, Pagination } from "@datagouv/components";
import { ref, onMounted, computed, useId, useTemplateRef, watchEffect, watch } from "vue";
import { useI18n } from 'vue-i18n';
import Loader from "../dataset/loader.vue";
import MultiSelect from "../MultiSelect/MultiSelect.vue";
import ActionCard from "../Form/ActionCard/ActionCard.vue";
import { data_search_feedback_form_url } from "../../config";
import { api } from "../../plugins/api";
import franceWithMagnifyingGlassIcon from "../../../../templates/svg/illustrations/france_with_magnifying_glass.svg";
import { PaginatedArray } from "../../api/types";

const { t } = useI18n();

const organization = ref('');
const page = ref(1);

const hasFilters = computed(() => {
  return organization.value
});
const resetFilters = () => {
  organization.value = '';
}

const searchId = useId();
const searchQuery = ref('');
const searchInput = useTemplateRef('searchInput');

const url = computed(() => {
  const filters: { organization?: string, q?: string, page?: string } = {}
  if (organization.value) {
    filters.organization = organization.value;
  }
  if (searchQuery.value) {
    filters.q = searchQuery.value;
  }
  if (page.value) {
    filters.page = page.value.toString();
  }

  const params = new URLSearchParams(filters);
  console.log(`/dataservices?${params}`)
  return `/dataservices?${params}`
})

const dataservices = ref<null | PaginatedArray<Dataservice>>(null);

const search = async () => {
  dataservices.value = null
  const response = await api.get(url.value);
  dataservices.value = response.data;
};

watch(organization, () => {
  page.value = 1;
})

onMounted(() => {
  searchInput.value?.focus();
})
watchEffect(() => {
  search()
})

const changePage = (newPage: number) => {
  page.value = newPage
};
</script>
