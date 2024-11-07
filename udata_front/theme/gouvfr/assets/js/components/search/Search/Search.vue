<template>
  <form class="fr-pt-3v" @submit.prevent="search">
    <div class="fr-grid-row fr-grid-row--middle justify-between" ref="searchRef" data-cy="search">
      <SearchInput
        @change="handleSearchChange"
        :value="queryString"
        :placeholder="t('Ex. 2022 presidential election')"
      />
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
                <div class="fr-col-12" v-if="!organization">
                  <MultiSelect
                    :placeholder="t('Organizations')"
                    :searchPlaceholder="t('Search an organization...')"
                    :allOption="t('All organizations')"
                    listUrl="/organizations/?sort=-followers"
                    suggestUrl="/organizations/suggest/"
                    entityUrl="/organizations/"
                    :values="facets.organization"
                    @change="(value: string) => handleFacetChange('organization', value)"
                    :isBlue="true"
                  />
                  <MultiSelect
                    :initialOptions="organizationTypesPromise"
                    :placeholder="t('Organization type')"
                    :searchPlaceholder="t('Search an organization type...')"
                    :allOption="t('All types')"
                    :values="facets.organization_badge"
                    @change="(value: string) => handleFacetChange('organization_badge', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Tags')"
                    :searchPlaceholder="t('Search a tag...')"
                    :allOption="t('All tags')"
                    suggestUrl="/tags/suggest/"
                    :values="facets.tag"
                    @change="(value: string) => handleFacetChange('tag', value)"
                    :minimumCharacterBeforeSuggest="2"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Formats')"
                    :searchPlaceholder="t('Search a format...')"
                    :allOption="t('All formats')"
                    :listUrl="allowedExtensionsUrl"
                    :values="facets.format"
                    @change="(value: string) => handleFacetChange('format', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Licenses')"
                    :explanation="t('Licenses define reuse rules for published datasets. See page data.gouv.fr/licences')"
                    :searchPlaceholder="t('Search a license...')"
                    :allOption="t('All licenses')"
                    :listUrl="licensesUrl"
                    :values="facets.license"
                    @change="(value: string) => handleFacetChange('license', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <SchemaSelect
                    :values="facets.schema || ''"
                    @change="(value: string) => handleFacetChange('schema', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Spatial coverage')"
                    :explanation="t('Geographic areas covered by data and for which they are relevant.')"
                    :searchPlaceholder="t('Search a spatial coverage...')"
                    :allOption="t('All coverages')"
                    suggestUrl="/spatial/zones/suggest/"
                    entityUrl="/spatial/zone/"
                    :values="facets.geozone"
                    @change="(value: string) => handleFacetChange('geozone', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="t('Spatial granularity')"
                    :explanation="t('Finest level of geographic detail covered by data.')"
                    :searchPlaceholder="t('Search a granularity...')"
                    :allOption="t('All granularities')"
                    listUrl="/spatial/granularities/"
                    :values="facets.granularity"
                    @change="(value: string) => handleFacetChange('granularity', value)"
                    :isBlue="true"
                  />
                </div>
                <div class="fr-col-12 fr-mb-3w text-align-center" v-if="isFiltered || downloadLink">
                  <button
                    class="fr-btn fr-btn--secondary fr-icon-close-circle-line fr-btn--icon-left justify-center w-100"
                    @click="resetFilters"
                    v-if="isFiltered"
                  >
                    {{ t('Reset filters') }}
                  </button>
                  <a
                    class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-download-line fr-btn--icon-left justify-center w-100 matomo_download"
                    :href="downloadLink"
                    v-else-if="downloadLink"
                  >
                    {{ t('Download list as CSV') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-mt-2w fr-mt-md-0 search-results" ref="resultsRef" v-bind="$attrs">
        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle justify-between fr-pb-1w" v-if="totalResults">
          <p class="fr-col-auto fr-my-0" role="status">
            {{ t("{count} results", totalResults) }}
          </p>
          <div class="fr-col-auto fr-grid-row fr-grid-row--middle">
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
          </div>
        </div>
        <transition mode="out-in">
          <div v-if="loading">
            <Loader />
          </div>
          <div v-else-if="results.length">
            <ul class="fr-mt-1w border-default-grey border-top relative z-2">
              <li v-for="result in results" :key="result.id">
                <CardLg :dataset="result" />
              </li>
            </ul>
            <Pagination
              v-if="totalResults > pageSize"
              :page="currentPage"
              :pageSize="pageSize"
              :totalResults="totalResults"
              @change="changePage"
              class="fr-mt-2w"
            />
            <NoSearchResults v-else @reset-filters="resetForm" />
          </div>
          <div v-else class="fr-mt-2w">
            <NoSearchResults @reset-filters="resetForm" />
          </div>
        </transition>
      </section>
    </div>
  </form>
</template>

<script setup lang="ts">
import { getOrganizationTypes, OTHER, Pagination, USER, type Dataset } from "@datagouv/components/ts";
import { ref, onMounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import axios, { type CancelTokenSource } from "axios";
import SearchInput from "../search-input.vue";
import CardLg from "../../dataset/card-lg.vue";
import Loader from "../../dataset/loader.vue";
import SchemaSelect from "../../SchemaSelect/SchemaSelect.vue";
import MultiSelect from "../../MultiSelect/MultiSelect.vue";
import { getLicensesUrl } from "../../../api/licenses";
import { getAllowedExtensionsUrl } from "../../../api/resources";
import { search_autocomplete_debounce } from "../../../config";
import { debounce } from "../../../composables/useDebouncedRef";
import useSearchUrl from "../../../composables/useSearchUrl";
import { useToast } from "../../../composables/useToast";
import { generateCancelToken, apiv2 } from "../../../plugins/api";
import NoSearchResults from "../../Form/NoSearchResults.vue";
import { MultiSelectOption } from "../../../types";

type Props = {
  downloadLink?: string,
  disableFirstSearch?: boolean,
  organization?: string,
  sorts?: Array<{label: string, order: string, value: string}>,
};

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  downloadLink: "",
  disableFirstSearch: false,
  organization: "",
  sorts: () => ([]),
});

type Facets = {
  organization?: string;
  organization_badge?: string;
  tag?: string;
  license?: string;
  format?: string;
  geozone?: string;
  granularity?: string;
  schema?: string;
};

const { t } = useI18n();
const { toast } = useToast();
/**
 * Update search params from URL on page load for deep linking
 */
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const allowedExtensionsUrl = getAllowedExtensionsUrl();
const licensesUrl = getLicensesUrl();
const organizationTypes: Array<MultiSelectOption> = getOrganizationTypes()
  .filter(type => type.type !== OTHER && type.type !== USER)
  .map((type) => ({
    label: type.label,
    value: type.type,
  }));
const organizationTypesPromise = Promise.resolve(organizationTypes);
/**
 * Search query
 */
const queryString = ref('');

/**
 * Reuse url of the query
 */
const {reuseUrl} = useSearchUrl(queryString);

/**
 * Query sort
 */
const searchSort = ref('');

/**
 * Search results
 */
const results = ref<Array<Dataset>>([]);

/**
 * Count of search results
 */
const totalResults = ref(0);

/**
 * Current page of results
 */
const currentPage = ref(1);

/**
 * Search page size
 */
const pageSize = 20;

/**
 * All other params are kept here as facets
 */
const facets = ref<Facets>({organization: props.organization});

/**
 * Search loading state
 */
const loading = ref(false);

/**
 * Current request if any to be cancelled if a new one comes
 */
const currentRequest = ref<CancelTokenSource | null>(null);

/**
 * Vue ref to results HTML
 */
const resultsRef = ref<HTMLElement | null>(null);

/**
 * Vue ref to results HTML
 */
const searchRef = ref<HTMLElement | null>(null);

const SAVE_TO_HISTORY = true;
const DONT_SAVE_TO_HISTORY = false;

const updateUrl = (save = SAVE_TO_HISTORY) => {
  // Update URL to match current search params value for deep linking
  let url = new URL(window.location.href);
  const urlParams = { ...searchParameters.value };
  if(props.organization) {
    delete urlParams.organization;
    delete urlParams.organization_badge;
  }
  url.search = new URLSearchParams(urlParams).toString();
  if (save) {
    window.history.pushState(null, "", url);
  }
  let linksWithQuery = document.querySelectorAll('[data-q]') as NodeListOf<HTMLAnchorElement>;
  for (let link of linksWithQuery) {
    link.href = reuseUrl.value;
  }
};

/**
 * Search new dataset results
 */
const search = debounce((saveToHistory = SAVE_TO_HISTORY) => {
  loading.value = true;
  if (currentRequest.value) currentRequest.value.cancel();
  currentRequest.value = generateCancelToken();
  apiv2
    .get("/datasets/search/", {
      cancelToken: currentRequest.value.token,
      params: {
        ...searchParameters.value,
        page_size: pageSize,
      },
    })
    .then((res) => res.data)
    .then((result) => {
      results.value = result.data;
      totalResults.value = result.total;
      loading.value = false;
      updateUrl(saveToHistory);
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        toast.error(t("Error getting search results."));
        loading.value = false;
      }
    });
}, search_autocomplete_debounce);

/**
 * Called when user type in search field
 */
const handleSearchChange = (input: string) => {
  queryString.value = input;
  currentPage.value = 1;
  search();
};

/**
 * Called on every facet selector change, updates the `facets.xxx` object then searches with new values
 */
const handleFacetChange = (facet: keyof Facets, values: string) => {
  if(values) {
    facets.value[facet] = values;
  } else {
    facets.value[facet] = undefined;
  }
  if (props.organization) {
    facets.value.organization = props.organization;
    facets.value.organization_badge = undefined;
  }
  currentPage.value = 1;
  search();
};

/**
 * Called when user change sort
 */
const handleSortChange = () => {
  currentPage.value = 1;
  search();
}

/**
 * Change current page
 */
const changePage = (page: number) => {
  currentPage.value = page;
  search();
  scrollToTop();
};

const scrollToTop = () => {
  if (searchRef.value) {
    searchRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const reloadFilters = ({page = 1, sort = '', ...params}, saveToHistory = SAVE_TO_HISTORY) => {
  facets.value = {...params, organization: props.organization || params.organization};
  currentPage.value = page;
  searchSort.value = sort;
  search(saveToHistory);
};

const resetFilters = () => {
  reloadFilters({});
};

const resetForm = () => {
  reloadForm();
  scrollToTop();
};

const reloadForm = ({q = '', ...params} = {}, saveToHistory = SAVE_TO_HISTORY) => {
  queryString.value = q;
  reloadFilters(params, saveToHistory);
};

/**
 * Is any filter active ?
 * We don't count scoped search as being filtered
 */
const isFiltered = computed(() => {
  const keys = Object.keys(facets.value) as Array<keyof Facets>;
  return keys.some(
    (key) => facets.value[key]?.length && (props.organization ? key !== "organization" : true)
  );
});

const sortOptions = computed(() => props.sorts.map(sort => ({
  value: sort.order == 'asc' ? sort.value : '-' + sort.value,
  label: sort.label,
})));

const searchParameters = computed(() => {
  let params: Record<string, string> = {};
  let key: keyof Facets;
  for (key in facets.value) {
    const facet = facets.value[key];
    if(facet) {
      params[key] = facet;
    }
  }
  if (currentPage.value > 1) params.page = currentPage.value.toString();
  if (queryString.value) params.q = queryString.value;
  if(searchSort.value) params.sort = searchSort.value;
  return params;
});

const q = params.get('q');
if (q) {
  queryString.value = q;
  params.delete('q');
}
const page = params.get('page');
if (page) {
  currentPage.value = parseInt(page);
  params.delete('page');
}
const sort = params.get('sort');
if(sort) {
  searchSort.value = sort;
  params.delete('sort');
}

facets.value = {...Object.fromEntries(params), organization: props.organization || params.get("organization") || ""};
if (props.disableFirstSearch) {
  loading.value = true;
} else {
  search();
}

onMounted(() => {
  if (props.disableFirstSearch && resultsRef.value) {
    let total = resultsRef.value.dataset.totalResults;
    if (total && parseInt(total) > 0) {
      let datasetResults = resultsRef.value.dataset.results;
      if(datasetResults) {
        results.value = JSON.parse(datasetResults);
      }
      totalResults.value = JSON.parse(total);
    }
    loading.value = false;
  }
  addEventListener('popstate', () => {
    // Update URL to match current search params value for deep linking
    const url = new URL(window.location.href);
    const params: Record<string, string> = {};
    for (const [key, value] of url.searchParams) {
      params[key] = value;
    }
    reloadForm(params, DONT_SAVE_TO_HISTORY);
  });
});
</script>
