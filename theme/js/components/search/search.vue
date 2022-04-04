<template>
  <form @submit.prevent="search">
    <div class="fr-grid-row justify-between align-items-center search-bar" ref="searchRef">
      <SearchInput
        class="fr-mb-4w"
        :onChange="handleSearchChange"
        :value="queryString"
        :placeholder="$t('Search for data...')"
      />
    </div>
    <div class="fr-grid-row fr-grid-row--gutters justify-between align-items-center">
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
          <MultiSelect
            :placeholder="$t('Organizations')"
            :searchPlaceholder="$t('Search an organization...')"
            listUrl="/organizations/?sort=-followers"
            suggestUrl="/organizations/suggest/"
            entityUrl="/organizations/"
            :values="facets.organization"
            :onChange="handleSuggestorChange('organization')"
          />
        </div>
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
          <MultiSelect
            :placeholder="$t('Tags')"
            :searchPlaceholder="$t('Search a tag...')"
            suggestUrl="/tags/suggest/"
            :values="facets.tag"
            :onChange="handleSuggestorChange('tag')"
            :minimumCharacterBeforeSuggest="3"
          />
        </div>
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
          <MultiSelect
            :placeholder="$t('Licenses')"
            :searchPlaceholder="$t('Search a license...')"
            listUrl="/datasets/licenses/"
            :values="facets.license"
            :onChange="handleSuggestorChange('license')"
          />
        </div>
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
          <MultiSelect
            :placeholder="$t('Formats')"
            :searchPlaceholder="$t('Search a format...')"
            suggestUrl="/datasets/suggest/formats/"
            :values="facets.format"
            :onChange="handleSuggestorChange('format')"
            :minimumCharacterBeforeSuggest="2"
          />
        </div>
      </div>
      <div class="fr-grid-row fr-grid-row--gutters fr-mt-3v align-items-center">
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-6 row-inline">
          <Rangepicker
            :value="facets.temporal_coverage"
            :onChange="handleSuggestorChange('temporal_coverage')"
          />
        </div>
        <div class="fr-col-12 fr-col-md-3">
          <MultiSelect
            :placeholder="$t('Geographic area')"
            :searchPlaceholder="$t('Search a geographic area...')"
            suggestUrl="/spatial/zones/suggest/"
            entityUrl="/spatial/zone/"
            :values="facets.geozone"
            :onChange="handleSuggestorChange('geozone')"
          />
        </div>
        <div class="fr-col-12 fr-col-md-3">
          <MultiSelect
            :placeholder="$t('Territorial granularity')"
            :searchPlaceholder="$t('Search a granularity...')"
            listUrl="/spatial/granularities/"
            :values="facets.granularity"
            :onChange="handleSuggestorChange('granularity')"
          />
        </div>
      </div>
  </form>
  <section class="search-results fr-mt-1w fr-mt-md-3w" ref="resultsRef" v-bind="$attrs">
    <transition mode="out-in">
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else-if="results.length">
        <div class="fr-grid-row fr-mt-4w justify-between align-items-center">
          <h2 class="fr-mb-2w fr-h6">
            {{ $t("X Results", totalResults) }}
          </h2>
        </div>
        <ul>
          <li v-for="result in results" :key="result.id">
            <a :href="result.page" class="unstyled w-10 block">
              <Dataset v-bind="result" />
            </a>
          </li>
          <Pagination
            v-if="totalResults > pageSize"
            :page="currentPage"
            :pageSize="pageSize"
            :totalResults="totalResults"
            :changePage="changePage"
            class="fr-mt-2w"
          />
        </ul>
      </div>
      <div v-else>
        <Empty
          wide
          :queryString="queryString"
          :cta="$t('Reset filters')"
          :copy="$t('No dataset matching your query')"
          :copyAfter="
            $t('You can try to reset the filters to expand your search.')
          "
          :onClick="() => resetFilters()"
        />
      </div>
    </transition>
  </section>
</template>

<script>
import { defineComponent, ref, Ref, onMounted, computed, watch } from "vue";
import {useI18n} from 'vue-i18n';
import axios from "axios";
import { CancelTokenSource } from "axios";
import { generateCancelToken, apiv2 } from "../../plugins/api";
import {useToast} from "../../composables/useToast";
import useSearchUrl from "../../composables/useSearchUrl";
import SearchInput from "./search-input.vue";
import Suggestor from "./suggestor.vue";
import Rangepicker from "./rangepicker.vue";
import Dataset from "../dataset/search-result.vue";
import Loader from "../dataset/loader.vue";
import Empty from "./empty.vue";
import Pagination from "../pagination/pagination.vue";
import filterIcon from "svg/filter.svg";
import MultiSelect from "./multi-select.vue";

export default defineComponent({
  components: {
    MultiSelect,
    SearchInput,
    Rangepicker,
    Suggestor,
    Dataset,
    Empty,
    Loader,
    Pagination,
  },
  props: {
    disableFirstSearch: {
      type: Boolean,
      default: false,
    },
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

    const {reuseUrl} = useSearchUrl(queryString);

    /**
     * Search results
     */
    const results = ref([]);

    /**
     * Count of search results
     */
    const totalResults = ref(0);

    /**
     * Current page of results
     */
    const currentPage = ref(0);

    /**
     * Search page size
     */
    const pageSize = 20;

    /**
     * All other params are kept here as facets
     */
    const facets = ref({});

    /**
     * Search loading state
     */
    const loading = ref(false);

    /**
     * Current request if any to be cancelled if a new one comes
     * @type {Ref<CancelTokenSource | null>}
     */
    const currentRequest = ref(null);

    /**
     * Vue ref to results HTML
     * @type {Ref<HTMLElement | null>}
     */
    const resultsRef = ref(null);

    /**
     * Vue ref to results HTML
     * @type {Ref<HTMLElement | null>}
     */
    const searchRef = ref(null);

    /**
     * Search new dataset results
     */
    const search = () => {
      loading.value = true;
      if (currentRequest.value) currentRequest.value.cancel();

      currentRequest.value = generateCancelToken();

      apiv2
        .get("/datasets/search/", {
          cancelToken: currentRequest.value.token,
          params: {
            q: queryString.value,
            ...facets.value,
            page_size: pageSize,
            page: currentPage.value,
          },
        })
        .then((res) => res.data)
        .then((result) => {
          results.value = result.data;
          totalResults.value = result.total;
          loading.value = false;
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            toast.error(t("Error getting search results."));
            loading.value = false;
          }
        });
    }

    const handleSearchChange = (input) => {
      queryString.value = input;
      currentPage.value = 1;
      search();
    };
    
    /**
     * Called on every facet selector change, updates the `facets.xxx` object then searches with new values 
     */
    const handleSuggestorChange = (facet) => {
      return (values) => {
        // Values can either be an array of varying length, or a String.
        if (Array.isArray(values)) {
          if (values.length > 1)
            facets.value[facet] = values.map((obj) => obj.value);
          else if (values.length === 1) facets.value[facet] = values[0].value;
          else facets.value[facet] = null;
        } else {
          facets.value[facet] = values;
        }
        currentPage.value = 1;
        search();
      };
    };

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

    const resetFilters = () => {
      queryString.value = "";
      facets.value = {};
      currentPage.value = 1;
      search();
    };

    /**
     * Is any filter active ?
     */ 
    const isFiltered = computed(() => {
      return Object.keys(facets.value).some(
        (key) => facets.value[key]?.length > 0
      );
    });

    const paramUrl = computed(() => {
      /**
       *  @type Record<string, string>
       */
      let params = {};
      for (key in facets.value) {
        if(facets.value[key]) {
          params[key] = facets.value[key];
        }
      }
      if (currentPage.value > 1) params.page = currentPage.value.toString();
      if (queryString.value) params.q = queryString.value;
      return params;
    });

    let q = params.get('q');
    if (q) {
      queryString.value = q;
      params.delete('q');
    }
    let page = params.get('page');
    if (page) {
      currentPage.value = parseInt(page);
      params.delete('page');
    }

    watch(paramUrl, (val) => {
        // Update URL to match current search params value for deep linking
        let url = new URL(window.location.href);
        url.search = new URLSearchParams(val).toString();
        history.pushState(null, "", url);
      }, {deep: true});

    /**
     * @type {Ref<{organization: ?string, tag: ?string, license: ?string, format: ?string, temporal_coverage: ?string, geozone: ?string, granularity: ?string}>}
     */
    facets.value = Object.fromEntries(params);
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
    });

    return {
      reuseUrl,
      isFiltered,
      search,
      handleSearchChange,
      handleSuggestorChange,
      changePage,
      resetFilters,
      filterIcon,
      facets,
      results,
      totalResults,
      queryString,
      loading,
      pageSize,
      currentPage,
      resultsRef,
      searchRef,
    };
  },
});
</script>
