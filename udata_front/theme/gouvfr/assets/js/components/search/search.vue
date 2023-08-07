<template>
  <form class="fr-pt-3v" @submit.prevent="search">
    <div class="fr-grid-row fr-grid-row--middle justify-between search-bar" ref="searchRef">
      <SearchInput
        @change="handleSearchChange"
        :value="queryString"
        :placeholder="$t('Ex. 2022 presidential election')"
      />
    </div>
    <div class="fr-grid-row fr-mt-1w fr-mt-md-5v">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3">
        <nav class="fr-sidemenu" aria-labelledby="fr-sidemenu-title">
          <div class="fr-sidemenu__inner">
            <button class="fr-sidemenu__btn fr-mt-1w" hidden aria-controls="fr-sidemenu-wrapper" aria-expanded="false">{{$t('Filter results')}}</button>
            <div class="fr-collapse" id="fr-sidemenu-wrapper">
              <div class="fr-sidemenu__title fr-mb-3v" id="fr-sidemenu-title">{{$t('Filters')}}</div>
              <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12" v-if="!organization">
                  <MultiSelect
                    :placeholder="$t('Organizations')"
                    :searchPlaceholder="$t('Search an organization...')"
                    :allOption="$t('All organizations')"
                    listUrl="/organizations/?sort=-followers"
                    suggestUrl="/organizations/suggest/"
                    entityUrl="/organizations/"
                    :values="facets.organization"
                    @change="(value) => handleFacetChange('organization', value)"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Tags')"
                    :searchPlaceholder="$t('Search a tag...')"
                    :allOption="$t('All tags')"
                    suggestUrl="/tags/suggest/"
                    :values="facets.tag"
                    @change="(value) => handleFacetChange('tag', value)"
                    :minimumCharacterBeforeSuggest="2"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Formats')"
                    :searchPlaceholder="$t('Search a format...')"
                    :allOption="$t('All formats')"
                    listUrl="/datasets/extensions/"
                    :values="facets.format"
                    @change="(value) => handleFacetChange('format', value)"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Licenses')"
                    :explanation="$t('Licenses define reuse rules for published datasets. See page data.gouv.fr/licences')"
                    :searchPlaceholder="$t('Search a license...')"
                    :allOption="$t('All licenses')"
                    listUrl="/datasets/licenses/"
                    :values="facets.license"
                    @change="(value) => handleFacetChange('license', value)"
                  />
                </div>
                <div class="fr-col-12">
                  <SchemaSelect
                    :values="facets.schema"
                    @change="(value) => handleFacetChange('schema', value)"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Spatial coverage')"
                    :explanation="$t('Geographic areas covered by data and for which they are relevant.')"
                    :searchPlaceholder="$t('Search a spatial coverage...')"
                    :allOption="$t('All coverages')"
                    suggestUrl="/spatial/zones/suggest/"
                    entityUrl="/spatial/zone/"
                    :values="facets.geozone"
                    @change="(value) => handleFacetChange('geozone', value)"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Spatial granularity')"
                    :explanation="$t('Finest level of geographic detail covered by data.')"
                    :searchPlaceholder="$t('Search a granularity...')"
                    :allOption="$t('All granularities')"
                    listUrl="/spatial/granularities/"
                    :values="facets.granularity"
                    @change="(value) => handleFacetChange('granularity', value)"
                  />
                </div>
                <div class="fr-col-12 fr-mb-3w text-align-center">
                  <button
                    class="fr-btn fr-btn--secondary fr-icon-close-circle-line fr-btn--icon-left justify-center w-100"
                    @click="resetFilters"
                    v-if="isFiltered"
                  >
                    {{$t('Reset filters')}}
                  </button>
                  <a
                    class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-download-line fr-btn--icon-left justify-center w-100 matomo_download"
                    :href="downloadLink"
                    v-else-if="downloadLink"
                  >
                    {{$t('Download list as CSV')}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-mt-2w fr-mt-md-0 search-results" ref="resultsRef" v-bind="$attrs">
        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle justify-between fr-pb-1w">
          <p class="fr-col-auto fr-my-0" v-if="totalResults" role="status">
            {{ $t("{count} results", totalResults) }}
          </p>
          <div class="fr-col-auto fr-grid-row fr-grid-row--middle">
            <label for="sort-search" class="fr-col-auto fr-text--sm fr-m-0 fr-mr-1w">
                {{$t('Sort by:')}}
            </label>
            <div class="fr-col">
                <select
                  id="sort-search"
                  class="fr-select"
                  name="sort"
                  v-model="searchSort"
                  @change="handleSortChange"
                >
                  <option value="">
                    {{$t('Relevance')}}
                  </option>
                  <option v-for="{value, label} in sortOptions" :value='value'>
                    {{label}}
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
              <li v-for="(result, key) in results" :key="result.id">
                <Dataset v-bind="result" :style="zIndex(key)" />
              </li>
            </ul>
            <Pagination
                v-if="totalResults > pageSize"
                :page="currentPage"
                :pageSize="pageSize"
                :totalResults="totalResults"
                :changePage="changePage"
                class="fr-mt-2w"
              />
          </div>
          <div v-else>
            <Empty
              wide
              :queryString="queryString"
              :cta="$t('Reset filters')"
              :copy="$t('No dataset matching your query')"
              :copyAfter="$t('You can try to reset the filters to expand your search.')"
              :onClick="() => reloadForm()"
            />
          </div>
        </transition>
      </section>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import {useI18n} from 'vue-i18n';
import axios from "axios";
import { generateCancelToken, apiv2 } from "../../plugins/api";
import {useToast} from "../../composables/useToast";
import useSearchUrl from "../../composables/useSearchUrl";
import SearchInput from "./search-input.vue";
import Dataset from "../dataset/card-lg.vue";
import Loader from "../dataset/loader.vue";
import SchemaSelect from "../SchemaSelect/SchemaSelect.vue";
import Empty from "./empty.vue";
import { Pagination } from "@etalab/udata-front-plugins-helper";
import MultiSelect from "../MultiSelect/MultiSelect.vue";
import { search_autocomplete_debounce } from "../../config";
import { debounce } from "../../composables/useDebouncedRef";

export default defineComponent({
  inheritAttrs: false,
  components: {
    MultiSelect,
    SearchInput,
    SchemaSelect,
    Dataset,
    Empty,
    Loader,
    Pagination,
  },
  props: {
    downloadLink: {
      type: String,
      default: ""
    },
    disableFirstSearch: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: String,
      default: "",
    },
    sorts: {
      /** @type {import("vue").PropType<Array<{label: string, order: string, value: string}>>} */
      type: Array,
      default: [],
    }
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    /**
     * Update search params from URL on page load for deep linking
     */
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

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
     * @type {import("vue").Ref<Array>}
     */
    const results = ref([]);

    /**
     *
     * @param {number} key
     */
    const zIndex = (key) => {
      return {zIndex: results.value.length - key}
    };

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
    const facets = ref({organization: props.organization});

    /**
     * Search loading state
     */
    const loading = ref(false);

    /**
     * Current request if any to be cancelled if a new one comes
     * @type {import("vue").Ref<import("axios").CancelTokenSource | null>}
     */
    const currentRequest = ref(null);

    /**
     * Vue ref to results HTML
     * @type {import("vue").Ref<HTMLElement | null>}
     */
    const resultsRef = ref(null);

    /**
     * Vue ref to results HTML
     * @type {import("vue").Ref<HTMLElement | null>}
     */
    const searchRef = ref(null);

    /**
     *
     * @param {Array} data
     */
    const formatResults = (data) => {
      results.value = data.map(result => {
        result.last_modified = new Date(result.last_modified);
        return result;
      });
      return results;
    };

    const SAVE_TO_HISTORY = true;
    const DONT_SAVE_TO_HISTORY = false;

    const updateUrl = (save = SAVE_TO_HISTORY) => {
      // Update URL to match current search params value for deep linking
      let url = new URL(window.location.href);
      const urlParams = searchParameters.value;
      if(props.organization) {
        delete urlParams.organization;
      }
      url.search = new URLSearchParams(urlParams).toString();
      if (save) {
        window.history.pushState(null, "", url);
      }
      /** @type NodeListOf<HTMLAnchorElement> */
      let linksWithQuery = document.querySelectorAll('[data-q]');
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
          formatResults(result.data);
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
     * @param {string} input - input typed by user
     */
    const handleSearchChange = (input) => {
      queryString.value = input;
      currentPage.value = 1;
      search();
    };

    /**
     * Called on every facet selector change, updates the `facets.xxx` object then searches with new values
     */
    const handleFacetChange = (facet, values) => {
      console.log("new value", values);
      // Values can either be an array of varying length, or a String.
      if (Array.isArray(values)) {
        if (values.length > 1) {
          facets.value[facet] = values.map((obj) => obj.value);
        } else if (values.length === 1) {
          facets.value[facet] = values[0].value;
        } else {
          facets.value[facet] = null;
        }
      } else {
        if(values) {
          facets.value[facet] = values;
        } else {
          facets.value[facet] = null;
        }
      }
      if (props.organization) {
        facets.value.organization = props.organization;
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
     * @param {number} page
     */
    const changePage = (page) => {
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

    const reloadForm = ({q = '', ...params} = {}, saveToHistory = SAVE_TO_HISTORY) => {
      queryString.value = q;
      reloadFilters(params, saveToHistory);
    };

    /**
     * Is any filter active ?
     * We don't count scoped search as being filtered
     */
    const isFiltered = computed(() => {
      return Object.keys(facets.value).some(
        (key) => facets.value[key]?.length > 0 && (props.organization ? key !== "organization" : true)
      );
    });

    const sortOptions = computed(() => props.sorts.map(sort => ({
        value: sort.order == 'asc' ? sort.value : '-' + sort.value,
        label: sort.label,
      })));

    const searchParameters = computed(() => {
      /**
       *  @type Record<string, string>
       */
      let params = {};
      for (let key in facets.value) {
        if(facets.value[key]) {
          params[key] = facets.value[key];
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
    /**
     * @type {import("vue").Ref<{organization: ?string, tag: ?string, license: ?string, format: ?string, geozone: ?string, granularity: ?string, schema: ?string}>}
     */
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
            formatResults(JSON.parse(datasetResults));
          }
          totalResults.value = JSON.parse(total);
        }
        loading.value = false;
      }
      addEventListener('popstate', () => {
        // Update URL to match current search params value for deep linking
        const url = new URL(window.location.href);
        const params = {};
        for (const [key, value] of url.searchParams) {
          params[key] = value;
        }
        reloadForm(params, DONT_SAVE_TO_HISTORY);
      });
    });

    return {
      isFiltered,
      search,
      handleSearchChange,
      handleFacetChange,
      changePage,
      reloadForm,
      resetFilters,
      facets,
      results,
      totalResults,
      queryString,
      loading,
      pageSize,
      currentPage,
      resultsRef,
      searchRef,
      sortOptions,
      searchSort,
      handleSortChange,
      zIndex,
    };
  },
});
</script>
