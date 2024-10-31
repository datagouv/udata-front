<template>
  <form class="fr-pt-3v" @submit.prevent="search">
    <div class="fr-grid-row fr-grid-row--middle justify-between" data-cy="search">
      <section class="fr-search-bar fr-search-bar--lg w-100">
        <label class="fr-label" :for="searchId">
          {{ t("Search") }}
        </label>
        <input
          :id="searchId"
          type="search"
          v-model="searchQuery"
          ref="searchInputRef"
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
                <div class="fr-col-12">
                  <div class="fr-select-group">
                    <label class="fr-label" :for="isRestrictedId">
                      {{ t("Access terms") }}
                    </label>
                    <select class="fr-select" :id="isRestrictedId" v-model="isRestricted" :class="{
                      'text-mention-grey': isRestricted === null,
                    }">
                      <option :value="null">{{ t("All access terms") }}</option>
                      <option :value="false">{{ t("Open APIs to everyone") }}</option>
                      <option :value="true">{{ t("Restricted access APIs") }}</option>
                    </select>
                  </div>
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
            {{ t("{count} API", dataservices.total) }}
          </p>
        </div>
        <div v-if="dataservices !== null && dataservices.data.length">
          <ul class="fr-mt-1w border-default-grey border-top relative z-2">
            <li v-for="dataservice in dataservices.data" :key="dataservice.id">
              <DataserviceCard :dataservice :dataserviceUrl="dataservice.self_web_url" />
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
          <NoSearchResults v-else @reset-filters="resetFiltersAndSearch" />
        </div>
        <div v-if="dataservices !== null && dataservices.data.length === 0" class="fr-mt-2w">
          <NoSearchResults @reset-filters="resetFiltersAndSearch" />
        </div>
      </section>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Dataservice, DataserviceCard, Pagination, useToast } from "@datagouv/components/ts";
import { ref, onMounted, computed, useId, useTemplateRef, watch } from "vue";
import { useI18n } from 'vue-i18n';
import Loader from "../dataset/loader.vue";
import MultiSelect from "../MultiSelect/MultiSelect.vue";
import { apiv2 } from "../../plugins/api";
import { PaginatedArray } from "../../api/types";
import { refDebounced, watchIgnorable } from '@vueuse/core'
import axios from "axios";
import NoSearchResults from "../Form/NoSearchResults.vue";

const { t } = useI18n();
const { toast } = useToast();

const organization = ref<string | null>(null);
watch(organization, () => page.value = 1)

const isRestricted = ref<boolean | null>(null);
watch(isRestricted, () => page.value = 1)

const isRestrictedId = useId();

const page = ref(1);

const hasFilters = computed(() => {
  return organization.value || isRestricted.value !== null
});
const resetFilters = () => {
  organization.value = '';
  isRestricted.value = null;
}

const resetFiltersAndSearch = () => {
  searchQuery.value = '';
  resetFilters();
  scrollToTop();
}

const searchId = useId();
const searchQuery = ref('');
const searchQueryDebounced = refDebounced(searchQuery, 500);
const searchInput = useTemplateRef('searchInputRef');
const scrollToTop = () => {
  if (searchInput.value) {
    searchInput.value.scrollIntoView({ behavior: "smooth" })
  }
}

const params = computed(() => {
  const filters: { organization?: string, q?: string, is_restricted?: string, page?: string } = {}
  if (organization.value) {
    filters.organization = organization.value;
  }
  if (searchQueryDebounced.value) {
    filters.q = searchQueryDebounced.value;
  }
  if (isRestricted.value !== null) {
    filters.is_restricted = isRestricted.value.toString();
  }
  if (page.value && page.value !== 1) {
    filters.page = page.value.toString();
  }
  return new URLSearchParams(filters);
})
const { ignoreUpdates } = watchIgnorable(params, () => {
  let url = new URL(window.location.href);
  url.search = params.value.toString();
  window.history.pushState(null, "", url);
});

const url = computed(() => `/dataservices/search/?${params.value}`)

const dataservices = ref<null | PaginatedArray<Dataservice>>(null);

const abortController = ref<AbortController | null>(null);
watch(searchQuery, () => {
  // We want to cancel the ongoing request as soon as the user start typing
  // again.
  if (abortController.value) {
    abortController.value.abort();
  }
  page.value = 1;
})
const search = async () => {
  dataservices.value = null

  abortController.value = new AbortController();
  try {
    const response = await apiv2.get(url.value, { signal: abortController.value.signal });
    abortController.value = null;
    dataservices.value = response.data;
  } catch(e) {
    if (! axios.isCancel(e)) {
      toast.error(t("Error getting search results."));
    }
  }
};

const populateFromUrl = () => {
  const url = new URL(window.location.href);

  organization.value = url.searchParams.get('organization');
  searchQuery.value = url.searchParams.get('q') || '';

  if (url.searchParams.get('is_restricted') === "true") {
    isRestricted.value = true;
  } else if (url.searchParams.get('is_restricted') === "false") {
    isRestricted.value = false;
  } else {
    isRestricted.value = null;
  }

  page.value = parseInt(url.searchParams.get('page') || '1' );
}


onMounted(() => {
  populateFromUrl();
  search()
  searchInput.value?.focus();

  window.addEventListener('popstate', () => {
    // We don't want to trigger the watcher that
    // push url history on this change (otherwise we create a new
    // history step each time we use the back button and we cannot
    // go forward anymore)
    ignoreUpdates(() => {
      populateFromUrl();
    })
  });
})
watch(url, () => {
  search()
})

const changePage = (newPage: number) => {
  page.value = newPage
};
</script>
